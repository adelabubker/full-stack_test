async function getUsers() {
  const res = await fetch("https://dummyjson.com/users?limit=6", {
    cache: "no-store", // server render
  });

  return res.json();
}

export default async function Dashboard() {
  const data = await getUsers();

  return (
    <div>
      <h1 className="title">Live Dashboard (SSR)</h1>

      <div className="grid">
        {data.users.map((u: any) => (
          <div key={u.id} className="card">
            <img src={u.image} alt={u.firstName} />
            <h2 className="font-bold">
              {u.firstName} {u.lastName}
            </h2>
            <p className="text-gray-400">{u.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
