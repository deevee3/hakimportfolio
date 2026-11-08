import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

export default function InstagramSection() {
  const instaImages = PlaceHolderImages.filter(img => img.id.startsWith('instagram-'));

  return (
    <section id="instagram" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-headline text-secondary-foreground">Latest on Instagram</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary-foreground/80">
            Follow Hakim's journey and see behind-the-scenes content @Hakim.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {instaImages.map((image) => (
            <div key={image.id} className="aspect-square overflow-hidden rounded-lg shadow-md group relative">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                <p className="text-white text-xs text-center line-clamp-3">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-5 w-5" /> Follow on Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
