import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline text-white drop-shadow-lg">
          Crafting Elegance, One Stitch at a Time
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-stone-200 drop-shadow-md">
          Bespoke tailoring and custom designs that tell your story.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            <Link href="#contact">
              Get a Quote
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black font-bold">
            <Link href="#gallery">
              View Hakim's Work <ArrowDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
