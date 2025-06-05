import Button from "./components/Button";
import SnippetEditor, { type SnippetEdit } from "./components/SnippetEditor";
import { useQuery } from "./api/useQuery";
import { snippetApi } from "./api/api";
import { useMutate } from "./api/useMutate";
import { useState } from "react";

export default function App() {
  const [isAddingNewSnippet, setIsAddingNewSnippet] = useState(false);

  const {
    data: snippetsData,
    update,
    loading,
  } = useQuery(snippetApi.getSnippets);
  const createSnippetMutation = useMutate(snippetApi.createSnippet);
  const updateSnippetMutation = useMutate(snippetApi.updateSnippet);
  const deleteSnippetMutation = useMutate(snippetApi.deleteSnippet);

  const handleCreateNew = async (snippet: SnippetEdit) => {
    createSnippetMutation
      .mutate({ text: snippet.text })
      .then((newSnippet) => {
        if (!newSnippet) return;
        update((existingSnippets) => [...existingSnippets!, newSnippet]);
      })
      .finally(() => setIsAddingNewSnippet(false));
  };

  const handleUpdate = async (snippet: SnippetEdit) => {
    if (!snippet.id) return;
    updateSnippetMutation
      .mutate({ text: snippet.text, id: snippet.id })
      .then((newSnippet) => {
        if (!newSnippet) return;
        update((existingSnippets) => {
          return existingSnippets!.map((s) => {
            if (s.id === snippet.id) return newSnippet;
            return s;
          });
        });
      });
  };

  const handleDelete = async (id: number) => {
    deleteSnippetMutation.mutate(id).then((result) => {
      if (!result && deleteSnippetMutation.error) return;
      update((existingSnippets) => {
        return existingSnippets!.filter((s) => s.id !== id);
      });
    });
  };

  if (loading) return <div>Loading</div>;

  if (!snippetsData) return <div>Error</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex justify-end">
          <Button
            onClick={() => {
              setIsAddingNewSnippet(true);
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            + Add new snippet
          </Button>
        </div>

        {snippetsData.map((snippet) => (
          <div key={snippet.id} className="mb-6">
            <SnippetEditor
              snippet={snippet}
              onSave={handleUpdate}
              onDelete={() => handleDelete(snippet.id)}
            />
          </div>
        ))}
        {isAddingNewSnippet && (
          <SnippetEditor
            snippet={{ id: null, text: "" }}
            onSave={handleCreateNew}
            onCancel={() => setIsAddingNewSnippet(false)}
            onDelete={() => setIsAddingNewSnippet(false)}
          />
        )}
      </div>
    </div>
  );
}
