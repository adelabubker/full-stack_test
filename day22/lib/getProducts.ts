export async function getProducts(){
  const res = await fetch("https://fakestoreapi.com/products",{
    cache:"force-cache"
  });

  return res.json();
}
