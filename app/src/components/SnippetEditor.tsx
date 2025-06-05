import React, { useState } from "react";
import Button from "./Button";

export interface SnippetEdit {
  id: number | null;
  text: string;
}

interface SnippetEditorProps {
  snippet: SnippetEdit;
  placeholder?: string;
  className?: string;
  onDelete?: () => void;
  onSave: (snippet: SnippetEdit) => void;
}

const SnippetEditor: React.FC<SnippetEditorProps> = ({
  snippet,
  placeholder = "Enter your text here...",
  className = "",
  onDelete,
  onSave,
}) => {
  const [value, setValue] = useState(snippet.text);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("saving");
        onSave({ ...snippet, text: value });
        setIsFocused(false);
      }}
      onBlur={(e) => {
        if (e.relatedTarget) return;
        setIsFocused(false);
      }}
    >
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-sm">
        <textarea
          onFocus={() => setIsFocused(true)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={` p-4 w-full h-32 rounded-md resize-none focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 ${className}`}
        />
      </div>
      <div
        className={`mt-4 flex justify-between ${
          isFocused ? "visible" : "invisible"
        }`}
      >
        <div>
          <Button
            type="button"
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => {
              setValue(snippet.text);
              setIsFocused(false);
            }}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SnippetEditor;
