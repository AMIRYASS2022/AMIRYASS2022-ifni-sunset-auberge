# Assets & Copy Sources

- Preview site: https://preview--ifni-sunset-magic.lovable.app/#activities
  - Copy used: hero headline/subtitle, activities list, contact & location text.
  - Images targeted: hero, terrace, rooms, activities (to be downloaded into `assets/originals/`).

- Booking.com: https://www.booking.com/hotel/ma/ifni-sunset.es.html
  - Copy used: short description, amenities, contact details.
  - Booking button links directly to this URL with UTM parameters.

Place originals under `assets/originals/` and run `npm run optimize:images` to produce webp + responsive sizes into `src/assets/`.