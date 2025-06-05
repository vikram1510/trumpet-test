import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useQuery } from "./useQuery";

describe("useQuery", () => {
  it("starts with loading state", () => {
    const mockQueryFn = vi.fn(() => new Promise(() => {}));
    
    const { result } = renderHook(() => useQuery(mockQueryFn));
    
    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("returns data on successful query", async () => {
    const mockData = { id: 1, text: "test" };
    const mockQueryFn = vi.fn().mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useQuery(mockQueryFn));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it("returns error on failed query", async () => {
    const mockError = new Error("Query failed");
    const mockQueryFn = vi.fn().mockRejectedValue(mockError);
    
    const { result } = renderHook(() => useQuery(mockQueryFn));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe("Query failed");
  });

  it("handles non-Error objects in catch", async () => {
    const mockQueryFn = vi.fn().mockRejectedValue("String error");
    
    const { result } = renderHook(() => useQuery(mockQueryFn));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe("An error occurred");
  });

  it("updates data using updater function", async () => {
    const mockData = [{ id: 1, text: "test" }];
    const mockQueryFn = vi.fn().mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useQuery(mockQueryFn));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    const newItem = { id: 2, text: "new" };
    result.current.update((prev) => {
      return [...(prev as typeof mockData), newItem];
    });
    
    expect(result.current.data).toEqual([{ id: 1, text: "test" }, { id: 2, text: "new" }]);
  });
});