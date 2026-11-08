"use server";

import { optimizeImageSizes, OptimizeImageSizesInput, OptimizeImageSizesOutput } from "@/ai/flows/optimize-image-sizes";

export async function optimizeImageAction(
  input: OptimizeImageSizesInput
): Promise<{ success: boolean; data: OptimizeImageSizesOutput | null; error?: string }> {
  try {
    const output = await optimizeImageSizes(input);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error optimizing image:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, data: null, error: `Failed to optimize image: ${errorMessage}` };
  }
}
