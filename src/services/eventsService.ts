import { Event, MOCK_EVENTS } from '../data/events.mock';

// TODO: Integrate Supabase in the future
// This service currently returns mock data.

export const getEvents = async (): Promise<Event[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_EVENTS);
    }, 500);
  });
};

export const getFeaturedEvents = async (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_EVENTS.filter(e => e.isFeatured));
    }, 500);
  });
};

export const getUpcomingEvents = async (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_EVENTS.filter(e => !e.isFeatured));
    }, 500);
  });
};
