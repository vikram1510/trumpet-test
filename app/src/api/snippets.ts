import axios from "axios";
import type {
  Snippet,
  CreateSnippetRequest,
  UpdateSnippetRequest,
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

  createSnippet: async (data: CreateSnippetRequest): Promise<Snippet> => {
    const response = await api.post<Snippet>("/snippets", data);
    return response.data;
  },

  updateSnippet: async (
    id: number,
    data: UpdateSnippetRequest
  ): Promise<Snippet> => {
    const response = await api.patch<Snippet>(`/snippets/${id}`, data);
    return response.data;
  },

  deleteSnippet: async (id: number): Promise<void> => {
    await api.delete(`/snippets/${id}`);
  },
};
