/**
 * @fileOverview An AI agent to suggest optimal image compression sizes for faster display and storage efficiency.
 *
 * - optimizeImageSizes - A function that takes an image data URI and suggests optimal compression sizes.
 * - OptimizeImageSizesInput - The input type for the optimizeImageSizes function.
 * - OptimizeImageSizesOutput - The return type for the optimizeImageSizes function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeImageSizesInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type OptimizeImageSizesInput = z.infer<typeof OptimizeImageSizesInputSchema>;

const OptimizeImageSizesOutputSchema = z.object({
  suggestedCompressionSizes: z
    .array(z.object({
      width: z.number().describe('The width of the image.'),
      height: z.number().describe('The height of the image.'),
      fileSizeKB: z.number().describe('The suggested file size in KB.'),
      description: z.string().describe('The description of the image.'),
    }))
    .describe('Suggested compression sizes for the image.'),
});
export type OptimizeImageSizesOutput = z.infer<typeof OptimizeImageSizesOutputSchema>;

export async function optimizeImageSizes(input: OptimizeImageSizesInput): Promise<OptimizeImageSizesOutput> {
  return optimizeImageSizesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeImageSizesPrompt',
  input: {schema: OptimizeImageSizesInputSchema},
  output: {schema: OptimizeImageSizesOutputSchema},
  prompt: `You are an expert image optimization specialist. Given an image, you will suggest different compression sizes and dimensions to optimize it for web display, balancing image quality with file size. Provide at least three different size options.

Image: {{media url=photoDataUri}}

Consider the following factors:
- Target display size (e.g., thumbnail, medium, large).
- Perceived image quality at different compression levels.
- Impact on page load time.

Output the suggested compression sizes with width, height, fileSizeKB (suggested file size in kilobytes), and a description of the use case. The width and height should maintain the original image's aspect ratio.

Format your output as a JSON array of objects, each containing 'width', 'height', 'fileSizeKB', and 'description'.`,    
});

const optimizeImageSizesFlow = ai.defineFlow(
  {
    name: 'optimizeImageSizesFlow',
    inputSchema: OptimizeImageSizesInputSchema,
    outputSchema: OptimizeImageSizesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
