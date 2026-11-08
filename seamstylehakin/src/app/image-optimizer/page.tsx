import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ImageOptimizerForm } from "@/components/image-optimizer-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImageOptimizerPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-lg border-border/60">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-headline">AI Image Optimizer</CardTitle>
              <CardDescription className="text-lg mt-2">
                Upload an image to get AI-powered suggestions for optimal web compression sizes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageOptimizerForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
