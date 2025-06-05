import React from "react";

interface SnippetViewProps {
  content: string;
  className?: string;
}

const SnippetView: React.FC<SnippetViewProps> = ({
  content,
  className = "",
}) => {
  return (
    <div className={`w-full h-32 p-3 border-2 border-gray-200 rounded-md bg-gray-50 overflow-y-auto ${className}`}>
      {content ? (
        <p className="text-gray-800 whitespace-pre-wrap">
          {content}
        </p>
      ) : (
        <p className="text-gray-400 italic">
          No content saved yet...
        </p>
      )}
    </div>
  );
};

export default SnippetView;