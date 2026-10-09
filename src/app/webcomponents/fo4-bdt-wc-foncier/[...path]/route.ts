import { proxyBdtWebComponentAsset } from "@/lib/bdtProxy";

export const GET = async (request: Request) => {
  return proxyBdtWebComponentAsset(request);
};
