// src/components/SalesPitch.js
export default function SalesPitch({ pitch }) {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-100 text-gray-800">
      <h2 className="text-2xl text-gray-800">Your Sales Pitch:</h2>
      <pre><code>{pitch}</code></pre>
    </div>
  );
}
