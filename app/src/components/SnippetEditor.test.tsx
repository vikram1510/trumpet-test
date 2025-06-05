import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SnippetEditor from "./SnippetEditor";

const mockSnippet = { id: 1, text: "Test snippet" };

describe("SnippetEditor", () => {
  it("shows buttons when textarea is focused", () => {
    render(<SnippetEditor snippet={mockSnippet} onSave={vi.fn()} />);

    const textarea = screen.getByDisplayValue("Test snippet");
    fireEvent.focus(textarea);

    expect(screen.getByText("Save")).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();
    expect(screen.getByText("Delete")).toBeVisible();
  });

  it("hides buttons when textarea loses focus", () => {
    render(<SnippetEditor snippet={mockSnippet} onSave={vi.fn()} />);

    const textarea = screen.getByDisplayValue("Test snippet");
    fireEvent.focus(textarea);
    fireEvent.blur(textarea);

    const buttonsDiv = screen.getByTestId("snippet-buttons");
    expect(buttonsDiv).toHaveClass("invisible");
  });

  it("calls onSave with updated snippet when Save button is clicked", () => {
    const handleSave = vi.fn();
    render(<SnippetEditor snippet={mockSnippet} onSave={handleSave} />);

    const textarea = screen.getByDisplayValue("Test snippet");
    fireEvent.focus(textarea);
    fireEvent.change(textarea, { target: { value: "Updated text" } });
    fireEvent.click(screen.getByText("Save"));

    expect(handleSave).toHaveBeenCalledWith({
      id: 1,
      text: "Updated text"
    });
  });

  it("calls onSave when form is submitted", () => {
    const handleSave = vi.fn();
    render(<SnippetEditor snippet={mockSnippet} onSave={handleSave} />);

    const textarea = screen.getByDisplayValue("Test snippet");
    const form = textarea.closest('form')!;
    fireEvent.submit(form);

    expect(handleSave).toHaveBeenCalledWith(mockSnippet);
  });

  it("calls onDelete when Delete button is clicked", () => {
    const handleDelete = vi.fn();
    render(<SnippetEditor snippet={mockSnippet} onSave={vi.fn()} onDelete={handleDelete} />);

    const textarea = screen.getByDisplayValue("Test snippet");
    fireEvent.focus(textarea);
    fireEvent.click(screen.getByText("Delete"));

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel and resets text when Cancel button is clicked", () => {
    const handleCancel = vi.fn();
    render(<SnippetEditor snippet={mockSnippet} onSave={vi.fn()} onCancel={handleCancel} />);

    const textarea = screen.getByDisplayValue("Test snippet");
    fireEvent.focus(textarea);
    fireEvent.change(textarea, { target: { value: "Changed text" } });
    fireEvent.click(screen.getByText("Cancel"));

    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(screen.getByDisplayValue("Test snippet")).toBeInTheDocument();
  });

  it("sets focus state to false after form submission", () => {
    render(<SnippetEditor snippet={mockSnippet} onSave={vi.fn()} />);

    const textarea = screen.getByDisplayValue("Test snippet");
    fireEvent.focus(textarea);
    
    const form = textarea.closest('form')!;
    fireEvent.submit(form);

    const buttonsDiv = screen.getByTestId("snippet-buttons");
    expect(buttonsDiv).toHaveClass("invisible");
  });
});
