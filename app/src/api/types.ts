export interface Snippet {
  id: number;
  text: string;
}

export interface CreateSnippetPayload {
  text: string;
}

export interface UpdateSnippetPayload {
  id: number;
  text: string;
}
