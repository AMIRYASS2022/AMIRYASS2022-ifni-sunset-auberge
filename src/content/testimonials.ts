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
  { id: 'sophie', nameKey: 'testimonials.items.sophie.name', originKey: 'testimonials.items.sophie.origin', quoteKey: 'testimonials.items.sophie.quote' },
  { id: 'carlos', nameKey: 'testimonials.items.carlos.name', originKey: 'testimonials.items.carlos.origin', quoteKey: 'testimonials.items.carlos.quote' },
  { id: 'maya', nameKey: 'testimonials.items.maya.name', originKey: 'testimonials.items.maya.origin', quoteKey: 'testimonials.items.maya.quote' },
];