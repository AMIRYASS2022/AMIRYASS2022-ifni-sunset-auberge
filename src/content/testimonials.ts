export type Testimonial = {
  id: string;
  nameKey: string;
  originKey: string;
  quoteKey: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { id: 'anna', nameKey: 'testimonials.items.anna.name', originKey: 'testimonials.items.anna.origin', quoteKey: 'testimonials.items.anna.quote' },
  { id: 'omar', nameKey: 'testimonials.items.omar.name', originKey: 'testimonials.items.omar.origin', quoteKey: 'testimonials.items.omar.quote' },
  { id: 'lucie', nameKey: 'testimonials.items.lucie.name', originKey: 'testimonials.items.lucie.origin', quoteKey: 'testimonials.items.lucie.quote' },
];