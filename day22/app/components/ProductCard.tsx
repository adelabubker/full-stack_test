export default function Card({ title, body }: any) {
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400">{body}</p>
    </div>
  );
}
