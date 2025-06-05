import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SnippetEditor from './SnippetEditor';

describe('SnippetEditor click handlers', () => {
  it('calls onDelete when Delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(<SnippetEditor onDelete={handleDelete} />);
    
    const textarea = screen.getByPlaceholderText('Enter your text here...');
    fireEvent.focus(textarea);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel button is clicked', () => {
    const handleCancel = vi.fn();
    render(<SnippetEditor onCancel={handleCancel} />);
    
    const textarea = screen.getByPlaceholderText('Enter your text here...');
    fireEvent.focus(textarea);
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSave when Save button is clicked', () => {
    const handleSave = vi.fn();
    render(<SnippetEditor onSave={handleSave} />);
    
    const textarea = screen.getByPlaceholderText('Enter your text here...');
    fireEvent.focus(textarea);
    
    fireEvent.click(screen.getByText('Save'));
    expect(handleSave).toHaveBeenCalledTimes(1);
  });
});