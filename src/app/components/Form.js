import { useState } from 'react';

export default function Form() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [style, setStyle] = useState("");
  const [template, setTemplate] = useState("default");
  const [pitch, setPitch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Suggestions for user inputs
  const productSuggestions = ["Software", "Clothing", "Electronics"];
  const audienceSuggestions = ["Small Businesses", "Tech Enthusiasts", "Parents"];
  const styleSuggestions = ["Formal", "Casual", "Exciting"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Construct the body for the POST request
      const response = await fetch('/api/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, audience, style, template }),
      });

      const data = await response.json();

      if (response.ok) {
        setPitch(data.pitch);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Product input */}
      <label htmlFor="product">Product</label>
      <select
        id="product"
        onChange={(e) => setProduct(e.target.value)}
        value={product}
        required
      >
        <option disabled value="">Choose a product</option>
        {productSuggestions.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* Audience input */}
      <label htmlFor="audience">Audience</label>
      <select
        id="audience"
        onChange={(e) => setAudience(e.target.value)}
        value={audience}
        required
      >
        <option disabled value="">Choose an audience</option>
        {audienceSuggestions.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      {/* Style input */}
      <label htmlFor="style">Style</label>
      <select
        id="style"
        onChange={(e) => setStyle(e.target.value)}
        value={style}
        required
      >
        <option disabled value="">Choose a style</option>
        {styleSuggestions.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Template selection */}
      <label htmlFor="template">Template</label>
      <select
        id="template"
        onChange={(e) => setTemplate(e.target.value)}
        value={template}
      >
        <option value="default">Default</option>
        <option value="aggressive">Aggressive</option>
        <option value="friendly">Friendly</option>
      </select>

      {/* Submit button */}
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Pitch"}
      </button>

      {/* Error message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Display generated pitch */}
      {pitch && (
        <div className="mt-4 border rounded p-4">
          <h3>Your Generated Sales Pitch:</h3>
          <p>{pitch}</p>
        </div>
      )}
    </form>
  );
}
