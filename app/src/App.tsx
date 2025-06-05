import { useState } from "react";
import Button from "./components/Button";
import SnippetEditor from "./components/SnippetEditor";

export default function App() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Text Area</h1>
          <Button onClick={() => console.log(text)} className="bg-purple-600 hover:bg-purple-700">Log Text</Button>
        </div>

        <SnippetEditor initialText={text} />
      </div>
    </div>
  );
}
