import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const { product, audience, style } = await req.json(); // Parse incoming request data

  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        { "role": "system", "content": `Generate a ${style} sales pitch for a ${product} aimed at ${audience}.` }
      ],
      "model": "llama-3.1-70b-versatile",  // Ensure the correct model name is used
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": true,
      "stop": null,
    });

    let pitch = "";
    for await (const chunk of chatCompletion) {
      pitch += chunk.choices[0]?.delta?.content || '';
    }

    return new Response(JSON.stringify({ pitch }), { status: 200 });
  } catch (error) {
    console.error('Error generating sales pitch:', error); // Log the actual error
    return new Response(JSON.stringify({ message: 'Error generating sales pitch', error: error.message }), { status: 500 });
  }
}
