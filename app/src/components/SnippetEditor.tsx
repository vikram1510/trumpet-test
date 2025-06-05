import React, { useState } from "react";
import Button from "./Button";

interface SnippetEditorProps {
  initialText?: string;
  placeholder?: string;
  className?: string;
  onDelete?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

const SnippetEditor: React.FC<SnippetEditorProps> = ({
  initialText = "",
  placeholder = "Enter your text here...",
  className = "",
  onDelete,
  onCancel,
  onSave,
}) => {
  const [value, setValue] = useState(initialText);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-sm">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full h-32 rounded-md resize-none focus:border-blue-500 focus:outline-none transition-colors text-gray-900 ${className}`}
        />
      </div>
      {isFocused && (
        <div className="mt-4 flex justify-between">
          <div>
            <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700">Delete</Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={onCancel} className="bg-gray-600 hover:bg-gray-700">Cancel</Button>
            <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">Save</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnippetEditor;