// src/app/page.js
"use client";
import { useState } from 'react';
import Form from './components/Form';
import SalesPitch from './components/SalesPitch';

export default function Page() {
  const [salesPitch, setSalesPitch] = useState('');

  const generatePitch = async ({ product, audience, style }) => {
    const response = await fetch('/api/generate-pitch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, audience, style }),
    });

    const data = await response.json();
    setSalesPitch(data.pitch);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-4xl mb-6">AI-Powered Sales Pitch Generator</h1>
      <Form onGeneratePitch={generatePitch} />
      {salesPitch && <SalesPitch pitch={salesPitch} />}
    </div>
  );
}
