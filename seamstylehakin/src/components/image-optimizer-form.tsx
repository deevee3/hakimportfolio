"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { optimizeImageAction } from '@/app/actions/optimize-image';
import type { OptimizeImageSizesOutput } from '@/ai/flows/optimize-image-sizes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Upload } from 'lucide-react';
import { Separator } from './ui/separator';

export function ImageOptimizerForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<OptimizeImageSizesOutput | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultImage = PlaceHolderImages.find(img => img.id === 'optimizer-default');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        });
        return;
      }
      setFile(selectedFile);
      setResults(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleOptimize = async () => {
    if (!previewUrl) {
      toast({
        variant: "destructive",
        title: "No image selected",
        description: "Please select an image file to optimize.",
      });
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const response = await optimizeImageAction({ photoDataUri: previewUrl });
      if (response.success && response.data) {
        setResults(response.data);
        toast({
          title: "Optimization Complete",
          description: "Here are the suggested compression sizes.",
        });
      } else {
        throw new Error(response.error || "An unknown error occurred.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast({
        variant: "destructive",
        title: "Optimization Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="w-full aspect-video rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-muted/50 overflow-hidden">
          {previewUrl ? (
            <Image src={previewUrl} alt="Image preview" width={600} height={400} className="object-contain h-full w-full" />
          ) : defaultImage ? (
            <Image src={defaultImage.imageUrl} alt="Placeholder" width={600} height={400} className="object-contain h-full w-full opacity-50" />
          ) : (
            <p className="text-muted-foreground">Image preview will appear here</p>
          )}
        </div>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={triggerFileSelect} variant="outline" className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" />
                {file ? 'Change Image' : 'Select Image'}
            </Button>
            <Button onClick={handleOptimize} disabled={isLoading || !file} className="w-full sm:w-auto">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Optimizing...' : 'Optimize Image'}
            </Button>
        </div>
        {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
      </div>

      {(isLoading || results) && <Separator />}

      {isLoading && (
        <div className="text-center py-8">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">AI is analyzing your image...</p>
        </div>
      )}

      {results && (
        <div className="animate-in fade-in-50">
          <h3 className="text-2xl font-headline mb-4 text-center">Optimization Suggestions</h3>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Dimensions</TableHead>
                  <TableHead className="w-[120px]">File Size</TableHead>
                  <TableHead>Suggested Use</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.suggestedCompressionSizes.map((size, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{size.width} x {size.height}</TableCell>
                    <TableCell>{size.fileSizeKB} KB</TableCell>
                    <TableCell>{size.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
