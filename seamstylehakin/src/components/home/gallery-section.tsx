import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function GallerySection() {
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Hakim's Work</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A selection of Hakim's favorite custom pieces and alterations.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border-border/60">
              <CardHeader className="p-0">
                <div className="aspect-w-4 aspect-h-5">
                   <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={800}
                      height={1000}
                      className="object-cover w-full h-full"
                      data-ai-hint={image.imageHint}
                    />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">{image.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
