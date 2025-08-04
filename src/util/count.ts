export async function getcount() {
  const data = await fetch(
    `https://cloud-hoisting.vercel.app/api/articles/count`,
    {
      cache: "no-store",
    }
  );
  const count1 = await data.json();

  return count1.count;
}
