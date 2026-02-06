export async function getUsers(){
  const res = await fetch("https://jsonplaceholder.typicode.com/users",{
    cache:"no-store"
  });

  return res.json();
}
