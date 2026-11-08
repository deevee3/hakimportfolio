import { ContactForm } from './contact-form';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Get in Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind or need a consultation? Fill out the form below, and Hakim will respond as soon as possible.
          </p>
        </div>
        <div className="max-w-xl mx-auto mt-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
