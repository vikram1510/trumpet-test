import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";

vi.mock("./api/api");

import { snippetApi } from "./api/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockSnippetApi = snippetApi as any;

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    mockSnippetApi.getSnippets.mockImplementation(() => new Promise(() => {}));

    render(<App />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders error state when API fails", async () => {
    mockSnippetApi.getSnippets.mockRejectedValue(new Error("API Error"));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });

  it("renders snippet list when data is loaded", async () => {
    const mockSnippets = [
      { id: 1, text: "First snippet" },
      { id: 2, text: "Second snippet" },
    ];

    mockSnippetApi.getSnippets.mockResolvedValue(mockSnippets);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("First snippet")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Second snippet")).toBeInTheDocument();
    });
  });

  it("renders add new snippet button", async () => {
    mockSnippetApi.getSnippets.mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("+ Add new snippet")).toBeInTheDocument();
    });
  });

  it("shows new snippet editor when add button is clicked", async () => {
    mockSnippetApi.getSnippets.mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      const addButton = screen.getByText("+ Add new snippet");
      fireEvent.click(addButton);
    });

    expect(
      screen.getByPlaceholderText("Enter your text here...")
    ).toBeInTheDocument();
  });

  it("handles create new snippet successfully", async () => {
    const existingSnippets = [{ id: 1, text: "Existing snippet" }];
    const newSnippet = { id: 2, text: "New snippet" };

    mockSnippetApi.getSnippets.mockResolvedValue(existingSnippets);
    mockSnippetApi.createSnippet.mockResolvedValue(newSnippet);

    render(<App />);

    await waitFor(() => {
      const addButton = screen.getByText("+ Add new snippet");
      fireEvent.click(addButton);
    });

    const textareas = screen.getAllByPlaceholderText("Enter your text here...");
    const newSnippetTextarea = textareas[textareas.length - 1];
    fireEvent.focus(newSnippetTextarea);
    fireEvent.change(newSnippetTextarea, { target: { value: "New snippet" } });

    const saveButtons = screen.getAllByText("Save");
    const newSnippetSaveButton = saveButtons[saveButtons.length - 1];
    fireEvent.click(newSnippetSaveButton);

    await waitFor(() => {
      expect(mockSnippetApi.createSnippet).toHaveBeenCalledWith({
        text: "New snippet",
      });
    });
  });

  it("handles update existing snippet successfully", async () => {
    const originalSnippets = [{ id: 1, text: "Original snippet" }];
    const updatedSnippet = { id: 1, text: "Updated snippet" };

    mockSnippetApi.getSnippets.mockResolvedValue(originalSnippets);
    mockSnippetApi.updateSnippet.mockResolvedValue(updatedSnippet);

    render(<App />);

    await waitFor(() => {
      const textarea = screen.getByDisplayValue("Original snippet");
      fireEvent.focus(textarea);
      fireEvent.change(textarea, { target: { value: "Updated snippet" } });
    });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockSnippetApi.updateSnippet).toHaveBeenCalledWith({
        text: "Updated snippet",
        id: 1,
      });
    });
  });

  it("cancels adding new snippet", async () => {
    mockSnippetApi.getSnippets.mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      const addButton = screen.getByText("+ Add new snippet");
      fireEvent.click(addButton);
    });

    const textarea = screen.getByPlaceholderText("Enter your text here...");
    fireEvent.focus(textarea);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(
      screen.queryByPlaceholderText("Enter your text here...")
    ).not.toBeInTheDocument();
  });
});
