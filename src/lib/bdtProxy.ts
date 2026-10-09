// The France Foncier web component loads its bundles, config and Pollen stylesheet from
// root-relative paths, so we serve them from our origin.
const BDT_ORIGIN = "https://www.banquedesterritoires.fr";

// BdT blocks clients that send too many requests, and every visitor's request reaches it from our
// IP, so we keep each file in memory and fetch it again once a day by default. Next's fetch cache
// can't do it: it rejects entries over 2 MB, and main.js weighs ~5.6 MB.
const CACHE_DURATION_MS =
  (Number(process.env.BDT_CACHE_DURATION_HOURS) || 24) * 60 * 60 * 1000;

// A page load needs ~20 files, so this cap is only a safety net against unbounded growth.
const MAX_CACHED_FILES = 100;

// The web component loads dozens of files whose names change with BdT's releases, so instead of
// allowing a list of paths, we cap the calls to BdT: requests for unknown paths can't get our IP
// blocked. A cold page load stays well under the cap.
const MAX_BDT_FETCHES_PER_MINUTE = 60;

// Leaves room for main.js (~5.6 MB) while not keeping visitors waiting on a hung BdT
const BDT_TIMEOUT_MS = 15_000;

// BdT ships a new web component every few weeks: browsers keep the files for an hour, so a new
// release reaches visitors soon after we fetch it.
const BROWSER_CACHE_CONTROL = "public, max-age=3600";

interface BdtFile {
  body: ArrayBuffer;
  contentType: string;
  fetchedAt: number;
}

const cache = new Map<string, BdtFile>();
// Visitors asking for the same file at the same time share a single call to BdT
const pendingFetches = new Map<string, Promise<BdtFile | undefined>>();

let fetchWindowStart = 0;
let fetchesInWindow = 0;

const canFetchFromBdt = () => {
  const now = Date.now();
  if (now - fetchWindowStart >= 60_000) {
    fetchWindowStart = now;
    fetchesInWindow = 0;
  }
  fetchesInWindow += 1;
  return fetchesInWindow <= MAX_BDT_FETCHES_PER_MINUTE;
};

const fetchFromBdt = async (pathname: string) => {
  if (!canFetchFromBdt()) return undefined;

  try {
    const response = await fetch(new URL(pathname, BDT_ORIGIN), {
      cache: "no-store",
      signal: AbortSignal.timeout(BDT_TIMEOUT_MS),
    });
    const contentType = response.headers.get("content-type") ?? "";
    // BdT answers unknown paths and maintenance with a 200 HTML page, and the web component loads
    // no HTML, so caching it would only replace a good copy or evict a real file
    if (!response.ok || contentType.startsWith("text/html")) return undefined;

    return {
      body: await response.arrayBuffer(),
      contentType: contentType || "application/octet-stream",
      fetchedAt: Date.now(),
    };
  } catch (error) {
    // The only trace we get if BdT blocks our IP or stops answering
    console.error(`[bdt-assets] failed ${pathname} (${String(error)})`);
    return undefined;
  }
};

const getFile = async (pathname: string) => {
  const cached = cache.get(pathname);
  if (cached && Date.now() - cached.fetchedAt < CACHE_DURATION_MS) {
    return cached;
  }

  let pendingFetch = pendingFetches.get(pathname);
  if (!pendingFetch) {
    pendingFetch = fetchFromBdt(pathname).finally(() =>
      pendingFetches.delete(pathname),
    );
    pendingFetches.set(pathname, pendingFetch);
  }
  const file = await pendingFetch;

  // If BdT fails, keep serving the copy we have
  if (!file) return cached;

  // Re-inserting keeps the Map in fetch order, so the first key is the oldest file
  cache.delete(pathname);
  cache.set(pathname, file);
  if (cache.size > MAX_CACHED_FILES) {
    cache.delete(cache.keys().next().value!);
  }
  return file;
};

export const proxyBdtWebComponentAsset = async (request: Request) => {
  // The query string is a cache buster (`style.css?tm6lfi`): dropping it keeps the cache bounded.
  const { pathname } = new URL(request.url);
  const file = await getFile(pathname);
  if (!file) {
    return new Response("BdT unavailable", { status: 502 });
  }

  return new Response(file.body, {
    headers: {
      "Content-Type": file.contentType,
      "Cache-Control": BROWSER_CACHE_CONTROL,
    },
  });
};
