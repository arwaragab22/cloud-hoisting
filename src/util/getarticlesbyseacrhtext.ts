export async function getarticlesbusearch(
  searchtxt: string | string[] | undefined
) {
  const articles = await fetch(
    `https://cloud-hoisting.vercel.app/api/articles/search?searchText=${searchtxt}`
  );
  const data = await articles.json();
  return data;
}
