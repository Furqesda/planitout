import concertImg from "@/assets/event-concert.jpg";
import coffeeImg from "@/assets/event-coffee.jpg";
import yogaImg from "@/assets/event-yoga.jpg";
import foodImg from "@/assets/event-food.jpg";
import artImg from "@/assets/event-art.jpg";
import hikingImg from "@/assets/event-hiking.jpg";

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  max_participants: number;
  current_participants: number;
  image_url: string;
  host_email: string;
  distance?: string;
}

export const sampleEvents: Event[] = [
  {
    id: "sample-1",
    title: "Sunset Music Festival",
    description: "Join us for an evening of live music featuring local bands. Bring your friends and enjoy great vibes under the stars. Food trucks and refreshments available!",
    location: "Central Park Amphitheater",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    max_participants: 150,
    current_participants: 87,
    image_url: concertImg,
    host_email: "events@musiclover.com",
  },
  {
    id: "sample-2",
    title: "Coffee & Connect Morning",
    description: "Start your day with meaningful conversations over artisan coffee. Perfect for networking, making new friends, or just enjoying good company in a cozy atmosphere.",
    location: "Brew & Chat Café",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    max_participants: 20,
    current_participants: 12,
    image_url: coffeeImg,
    host_email: "host@coffeemeetup.com",
  },
  {
    id: "sample-3",
    title: "Morning Yoga in the Park",
    description: "Reconnect with nature and yourself in this peaceful morning yoga session. All levels welcome! Bring your own mat and water. We'll focus on breathwork and gentle flows.",
    location: "Riverside Park Lawn",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    max_participants: 30,
    current_participants: 18,
    image_url: yogaImg,
    host_email: "yoga@wellness.com",
  },
  {
    id: "sample-4",
    title: "Street Food Festival",
    description: "Explore cuisines from around the world! Over 30 food vendors offering everything from tacos to sushi. Live entertainment throughout the day. Don't miss this culinary adventure!",
    location: "Downtown Plaza",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    max_participants: 500,
    current_participants: 342,
    image_url: foodImg,
    host_email: "info@foodfest.com",
  },
  {
    id: "sample-5",
    title: "Contemporary Art Gallery Opening",
    description: "Be among the first to experience our new contemporary art exhibition. Meet the artists, enjoy complimentary wine, and immerse yourself in thought-provoking modern pieces.",
    location: "Modern Art Museum",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    max_participants: 80,
    current_participants: 45,
    image_url: artImg,
    host_email: "gallery@artspace.com",
  },
  {
    id: "sample-6",
    title: "Mountain Hiking Adventure",
    description: "Challenge yourself with a scenic mountain hike! Moderate difficulty, approximately 8km trail. Stunning views guaranteed. Experienced guide included. Bring sturdy shoes and water.",
    location: "Summit Trail Head",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    max_participants: 25,
    current_participants: 15,
    image_url: hikingImg,
    host_email: "adventure@hikingclub.com",
  },
];

// Helper to calculate random distance
export const getRandomDistance = () => {
  const km = (Math.random() * 8 + 1).toFixed(1);
  return `${km} km away`;
};
