import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

const RootPage = () => {
  redirect(`/${routing.defaultLocale}`);
};

export default RootPage;
