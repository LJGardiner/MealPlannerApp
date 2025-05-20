
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ImportIngredientFromUrl({ onImport }) {
  const [url, setUrl] = useState("");

  const handleImport = () => {
    onImport(url);
  };

  return (
    <div className="space-y-2">
      <Input placeholder="Paste product URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button onClick={handleImport}>Import</Button>
    </div>
  );
}
