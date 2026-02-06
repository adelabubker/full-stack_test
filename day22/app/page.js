export default function Home() {
  return (
    <div className="text-center">
      <h1 className="title">Next.js Data Fetching Strategy</h1>

      <p className="text-gray-400 mb-10">
        Static vs Server Rendering — Production demo
      </p>

      <div className="grid">
        <div className="card">
          <h2 className="text-xl font-bold mb-2">Static Rendering</h2>
          <p className="text-gray-400">
            Ultra fast cached pages. Best for blogs & landing pages.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-2">Server Rendering</h2>
          <p className="text-gray-400">
            Always fresh data. Best for dashboards.
          </p>
        </div>
      </div>
    </div>
  );
}
