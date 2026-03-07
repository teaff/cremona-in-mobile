export interface Event {
  id: string;
  title: string;
  date: string; // ISO string or simple string
  dayLabel: string; // e.g., "18"
  monthLabel: string; // e.g., "AUG"
  category: string; // e.g., "Open Bar"
  priceLabel: string; // e.g., "12,99€" or "Free"
  location: string; // e.g., "Piazza della Pace 1, Cremona"
  imageUrl: string;
  isFeatured?: boolean;
  description?: string;
  specialGuest?: string;
  duration?: string;
  time?: string;
  host?: {
    name: string;
    subtitle: string;
    avatar: string;
    phone: string;
    email: string;
    website: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Music Show Open Bar Over 35+',
    date: '2023-08-18T20:00:00Z',
    dayLabel: '18',
    monthLabel: 'AUG',
    category: 'Open Bar',
    priceLabel: '12,99€',
    location: 'Club House, Cremona',
    coordinates: { lat: 45.133, lng: 10.021 },
    imageUrl:
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Party/DJ
    isFeatured: true,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    specialGuest: 'Steve Aoki',
    duration: 'Durata 4h e 30 min',
    time: '22:00 - 02:30',
    host: {
      name: 'BAR IS THE NAME',
      subtitle: 'Event organized by',
      avatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop',
      phone: '3887446777',
      email: 'baristhename@gmail.com',
      website: 'baristhename.com',
    },
  },
  {
    id: '2',
    title: 'Arts And Wine Soirée Experience',
    date: '2023-08-24T18:30:00Z',
    dayLabel: '24',
    monthLabel: 'AUG',
    category: 'Culture',
    priceLabel: 'Free',
    location: 'Piazza Della Pace 1, Cremona',
    coordinates: { lat: 45.136, lng: 10.024 },
    imageUrl:
      'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Wine/Food
    isFeatured: false,
    description:
      'Experience an evening of fine art and wine tasting in the heart of Cremona. Local artists will display their work while you enjoy a selection of regional wines.',
    specialGuest: 'Maria Rossi',
    duration: 'Durata 3h',
    time: '18:30 - 21:30',
    host: {
      name: 'Cremona Art Collective',
      subtitle: 'Cultural Association',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      phone: '3331234567',
      email: 'info@cremonaart.it',
      website: 'cremonaart.it',
    },
  },
  {
    id: '3',
    title: 'Summer Night Jazz Festival',
    date: '2023-08-25T21:00:00Z',
    dayLabel: '25',
    monthLabel: 'AUG',
    category: 'Music',
    priceLabel: '25,00€',
    location: 'Teatro Ponchielli',
    coordinates: { lat: 45.134, lng: 10.027 },
    imageUrl:
      'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Jazz/Concert
    isFeatured: true,
    description:
      'A magical night of jazz under the stars. Featuring international jazz stars and local talent in the beautiful setting of Teatro Ponchielli.',
    specialGuest: 'Paolo Fresu',
    duration: 'Durata 2h e 30 min',
    time: '21:00 - 23:30',
    host: {
      name: 'Jazz Club Cremona',
      subtitle: 'Music Promoters',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      phone: '0372123456',
      email: 'info@jazzclubcremona.it',
      website: 'jazzclubcremona.it',
    },
  },
  {
    id: '4',
    title: 'Tech Meetup Cremona',
    date: '2023-09-01T19:00:00Z',
    dayLabel: '01',
    monthLabel: 'SEP',
    category: 'Tech',
    priceLabel: 'Free',
    location: 'Coworking Space',
    coordinates: { lat: 45.131, lng: 10.019 },
    imageUrl:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Meeting
    isFeatured: false,
    description:
      'Join local developers and tech enthusiasts for networking and talks on the latest industry trends. Pizza and drinks provided!',
    specialGuest: 'Tech Leader',
    duration: 'Durata 2h',
    time: '19:00 - 21:00',
    host: {
      name: 'Cremona Tech',
      subtitle: 'Community',
      avatar:
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop',
      phone: '3456789012',
      email: 'meetup@cremonatech.io',
      website: 'cremonatech.io',
    },
  },
  {
    id: '5',
    title: 'Cocktail Masterclass',
    date: '2023-08-24T20:00:00Z',
    dayLabel: '24',
    monthLabel: 'AUG',
    category: 'Workshop',
    priceLabel: '45,00€',
    location: 'The Old Pub',
    coordinates: { lat: 45.138, lng: 10.025 },
    imageUrl:
      'https://images.pexels.com/photos/1189257/pexels-photo-1189257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Cocktail
    isFeatured: true, // Another featured event potentially
    description:
      'Learn how to mix classic cocktails like a pro. Includes tasting of 3 cocktails and light snacks.',
    specialGuest: 'Luca Cinalli',
    duration: 'Durata 3h',
    time: '20:00 - 23:00',
    host: {
      name: 'The Old Pub',
      subtitle: 'Venue',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop',
      phone: '0372987654',
      email: 'events@theoldpub.com',
      website: 'theoldpub.com',
    },
  },
];
