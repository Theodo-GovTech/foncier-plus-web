// The France Foncier web component loads its bundles, config and Pollen stylesheet from
// root-relative paths, so we serve them from our origin.
const BDT_ORIGIN = "https://www.banquedesterritoires.fr";

// BdT blocks clients that send too many requests, and every visitor's request reaches it from our
// IP, so we keep each file in memory and fetch it again once a day. Next's fetch cache can't do it:
// it rejects entries over 2 MB, and main.js weighs ~5.6 MB.
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

// A page load needs ~20 files. BdT answers unknown paths with a 200 HTML page, so this cap keeps
// random paths from growing the cache forever.
const MAX_CACHED_FILES = 100;

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

const fetchFromBdt = async (pathname: string) => {
  try {
    const response = await fetch(new URL(pathname, BDT_ORIGIN), {
      cache: "no-store",
    });
    console.log(`[bdt-assets] fetched ${pathname} (${response.status})`);
    if (!response.ok) return undefined;

    return {
      body: await response.arrayBuffer(),
      contentType:
        response.headers.get("content-type") ?? "application/octet-stream",
      fetchedAt: Date.now(),
    };
  } catch (error) {
    console.log(`[bdt-assets] failed ${pathname} (${String(error)})`);
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
