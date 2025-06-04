export interface Snippet {
  id: number;
  text: string;
}

export interface CreateSnippetRequest {
  text: string;
}

export interface UpdateSnippetRequest {
  text: string;
}