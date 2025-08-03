export async function getcount() {
    
  const data = await fetch(`http://localhost:3000/api/articles/count`, {
    cache: "no-store",
  });
    const count1 = await data.json();

    return count1.count;

}

