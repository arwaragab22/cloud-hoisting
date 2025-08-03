export async function getarticlesbusearch(searchtxt: string | string[] | undefined) {
  const articles = await fetch(
    `http://localhost:3000/api/articles/search?searchText=${searchtxt}`
  );
  const data = await articles.json();
    return data;
}