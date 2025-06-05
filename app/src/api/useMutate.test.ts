import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useMutate } from "./useMutate";

describe("useMutate", () => {
  it("starts with initial state", () => {
    const mockMutateFn = vi.fn();
    
    const { result } = renderHook(() => useMutate(mockMutateFn));
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("returns data on successful mutation", async () => {
    const mockData = { id: 1, text: "created" };
    const mockMutateFn = vi.fn().mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useMutate(mockMutateFn));
    
    const mutationPromise = result.current.mutate({ text: "test" });
    
    const mutationResult = await mutationPromise;
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mutationResult).toEqual(mockData);
  });

  it("returns error on failed mutation", async () => {
    const mockError = new Error("Mutation failed");
    const mockMutateFn = vi.fn().mockRejectedValue(mockError);
    
    const { result } = renderHook(() => useMutate(mockMutateFn));
    
    const mutationResult = await result.current.mutate({ text: "test" });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Mutation failed");
    });
    
    expect(mutationResult).toBe(null);
  });

  it("handles non-Error objects in catch", async () => {
    const mockMutateFn = vi.fn().mockRejectedValue("String error");
    
    const { result } = renderHook(() => useMutate(mockMutateFn));
    
    const mutationResult = await result.current.mutate({ text: "test" });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("An error occurred");
    });
    
    expect(mutationResult).toBe(null);
  });

  it("resets error state on new mutation", async () => {
    const mockMutateFn = vi.fn()
      .mockRejectedValueOnce(new Error("First error"))
      .mockResolvedValueOnce({ id: 1, text: "success" });
    
    const { result } = renderHook(() => useMutate(mockMutateFn));
    
    await result.current.mutate({ text: "fail" });
    
    await waitFor(() => {
      expect(result.current.error).toBe("First error");
    });
    
    result.current.mutate({ text: "success" });
    
    await waitFor(() => {
      expect(result.current.error).toBe(null);
      expect(result.current.loading).toBe(true);
    });
  });
});