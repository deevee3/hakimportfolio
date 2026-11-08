import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Hakim Portfolio. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="text-secondary-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="text-secondary-foreground hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Facebook" className="text-secondary-foreground hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
