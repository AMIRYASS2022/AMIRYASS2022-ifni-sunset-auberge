import type { RoomCard } from '../types';

import berber1_1080 from '../assets/rooms/HABITACIONES/BERBER/berber room 1 (1)-1080.webp';
import berber2_1080 from '../assets/rooms/HABITACIONES/BERBER/berber room 2-1080.webp';
import berber3_1080 from '../assets/rooms/HABITACIONES/BERBER/berber room 3-1080.webp';
import berber4_1080 from '../assets/rooms/HABITACIONES/BERBER/berber room 4-1080.webp';
import berber5_1080 from '../assets/rooms/HABITACIONES/BERBER/berber room 5-1080.webp';
import berber6_1080 from '../assets/rooms/HABITACIONES/BERBER/berber room 6-1080.webp';

import santa1_1080 from '../assets/rooms/HABITACIONES/Santa Cruz/santa cruz room 1-1080.webp';
import santa2_1080 from '../assets/rooms/HABITACIONES/Santa Cruz/santa-cruz-room-2-1080.webp';
import santa3_1080 from '../assets/rooms/HABITACIONES/Santa Cruz/santa-cruz-room-3-1080.webp';
import santa4_1080 from '../assets/rooms/HABITACIONES/Santa Cruz/santa-cruz-room-4-1080.webp';

import ocean1_1080 from '../assets/rooms/HABITACIONES/Ocean View/Occan view room 1-1080.webp';
import ocean2_1080 from '../assets/rooms/HABITACIONES/Ocean View/Occan view room 2-1080.webp';
import ocean3_1080 from '../assets/rooms/HABITACIONES/Ocean View/Occan view room 3-1080.webp';
import ocean4_1080 from '../assets/rooms/HABITACIONES/Ocean View/Occan view room 4-1080.webp';
import ocean5_1080 from '../assets/rooms/HABITACIONES/Ocean View/Occan view room 5-1080.webp';
import ocean6_1080 from '../assets/rooms/HABITACIONES/Ocean View/Occan view room 6-1080.webp';

import sunset1_1080 from '../assets/rooms/HABITACIONES/Sunset/sunset room 1-1080.webp';
import sunset2_1080 from '../assets/rooms/HABITACIONES/Sunset/sunset room 2-1080.webp';
import sunset3_1080 from '../assets/rooms/HABITACIONES/Sunset/sunset room 3-1080.webp';
import sunset4_1080 from '../assets/rooms/HABITACIONES/Sunset/sunset room 4-1080.webp';
import sunset5_1080 from '../assets/rooms/HABITACIONES/Sunset/sunset room 5-1080.webp';
import sunset6_1080 from '../assets/rooms/HABITACIONES/Sunset/sunset room 6-1080.webp';

import sunSuite1_1080 from '../assets/rooms/HABITACIONES/Sun Suite/sun suite 1-1080.webp';
import sunSuite2_1080 from '../assets/rooms/HABITACIONES/Sun Suite/sun suite 2-1080.webp';
import sunSuite3_1080 from '../assets/rooms/HABITACIONES/Sun Suite/sun suite 3-1080.webp';
import sunSuite4_1080 from '../assets/rooms/HABITACIONES/Sun Suite/sun suite 4-1080.webp';
import sunSuite5_1080 from '../assets/rooms/HABITACIONES/Sun Suite/sun suite 5-1080.webp';
import sunSuite6_1080 from '../assets/rooms/HABITACIONES/Sun Suite/sun suite 6-1080.webp';

export const ROOMS_CARDS: RoomCard[] = [
  {
    id: 'room-double',
    name: 'Berber Room — Double Bed',
    desc:
      'Cosy and warm with handcrafted touches. Perfect for couples seeking comfort and a touch of tradition.',
    image: berber1_1080,
    images: [
      berber1_1080,
      berber2_1080,
      berber3_1080,
      berber4_1080,
      berber5_1080,
      berber6_1080,
    ],
    price: '55 € per room/night',
    bookingUrl: 'https://booking.com/hotel/ma/auberge-ifni-sunset.en-gb',
  },
  {
    id: 'room-triple',
    name: 'Santa Cruz Room',
    desc:
      'The Santa Cruz Room is perfect for small groups or families. Spacious and bright, it combines modern comfort with traditional Moroccan touches.',
    image: santa1_1080,
    images: [
      santa1_1080,
      santa2_1080,
      santa3_1080,
      santa4_1080,
    ],
    price: '30 € per person/night',
    bookingUrl: 'https://booking.com/hotel/ma/auberge-ifni-sunset.en-gb',
  },
  {
    id: 'room-sea-view-triple',
    name: 'Ocean View Room — Triple',
    desc:
      'Bask in the Atlantic breeze from your window. A relaxing, sunlit room with a sea view — ideal for friends or families.',
    image: ocean1_1080,
    images: [
      ocean1_1080,
      ocean2_1080,
      ocean3_1080,
      ocean4_1080,
      ocean5_1080,
      ocean6_1080,
    ],
    price: '30 € per person/night',
    bookingUrl: 'https://booking.com/hotel/ma/auberge-ifni-sunset.en-gb',
  },
  {
    id: 'room-sea-view-double',
    name: 'Sunset Room — Sea View',
    desc:
      'Wake up to the glow of the ocean at dawn. A calm, luminous double room where every evening paints the sky.',
    image: sunset1_1080,
    images: [
      sunset1_1080,
      sunset2_1080,
      sunset3_1080,
      sunset4_1080,
      sunset5_1080,
      sunset6_1080,
    ],
    price: '60 € per room/night',
    bookingUrl: 'https://booking.com/hotel/ma/auberge-ifni-sunset.en-gb',
  },
  {
    id: 'room-sun-suite-triple',
    name: 'Sun Suite — Triple',
    desc:
      'Bright and spacious with three single beds — ideal for friends or families. Includes breakfast, private bath, and free Wi-Fi.',
    image: sunSuite1_1080,
    images: [
      sunSuite1_1080,
      sunSuite2_1080,
      sunSuite3_1080,
      sunSuite4_1080,
      sunSuite5_1080,
      sunSuite6_1080,
    ],
    price: '30 € per person/night',
    bookingUrl: 'https://booking.com/hotel/ma/auberge-ifni-sunset.en-gb',
  },
];