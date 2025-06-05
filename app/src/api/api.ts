import axios from "axios";
import type {
  Snippet,
  CreateSnippetPayload,
  UpdateSnippetPayload,
} from "./types";

const API_BASE_URL = "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const snippetApi = {
  getSnippets: async (): Promise<Snippet[]> => {
    const response = await api.get<Snippet[]>("/snippets");
    return response.data;
  },

  createSnippet: async (payload: CreateSnippetPayload): Promise<Snippet> => {
    const response = await api.post<Snippet>("/snippets", payload);
    return response.data;
  },

  updateSnippet: async (payload: UpdateSnippetPayload): Promise<Snippet> => {
    const response = await api.patch<Snippet>(`/snippets/${payload.id}`, {
      text: payload.text,
    });
    return response.data;
  },

  deleteSnippet: async (id: number): Promise<void> => {
    await api.delete(`/snippets/${id}`);
  },
};
