import AdminArticlesTable from "@/comp/AdminArticlesTable";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const rawPage = searchParams?.page;
  const page = Array.isArray(rawPage) ? rawPage[0] : rawPage ?? "1";

  return <AdminArticlesTable page={page} />;
}
