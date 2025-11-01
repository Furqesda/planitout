import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventModal from "@/components/EventModal";
import OnboardingCards from "@/components/OnboardingCards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sampleEvents, Event, getRandomDistance } from "@/lib/sampleEvents";
import { isLoggedIn, addAttendedEvent, isEventAttended } from "@/lib/authHelpers";
import { toast } from "sonner";

const Explore = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const onboardingCards = [
    {
      title: "Scroll & Discover 🎧",
      description: "Explore events that match your vibe.",
    },
    {
      title: "Click to Join 💃",
      description: "Peek inside events and see who's showing up.",
    },
    {
      title: "Show Up & Flex 😎",
      description: "When you find your jam, hit Attend and lock it in.",
    },
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchQuery, locationFilter]);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true });

      if (error) throw error;

      const supabaseEvents = data.map((event) => ({
        ...event,
        distance: getRandomDistance(),
      }));

      // Combine with sample events
      const allEvents = [...sampleEvents, ...supabaseEvents];
      setEvents(allEvents);
      setFilteredEvents(allEvents);
    } catch (error) {
      console.error("Error loading events:", error);
      setEvents(sampleEvents);
      setFilteredEvents(sampleEvents);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleAttend = (event: Event) => {
    if (!isLoggedIn()) {
      toast.error("Please login to attend events");
      navigate("/auth");
      return;
    }

    addAttendedEvent(event.id);
    toast.success("You're attending this event! 🎉");
    setIsModalOpen(false);
  };

  const handleOnboardingComplete = () => {
    // Optional: scroll to events grid
    setTimeout(() => {
      window.scrollTo({ top: 600, behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {showOnboarding && (
        <OnboardingCards
          storageKey="hasSeenExploreTips"
          cards={onboardingCards}
          onComplete={handleOnboardingComplete}
        />
      )}

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold tracking-wide">
              Discover Your Next
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {" "}Experience
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concerts to coffee chats, find events that match your vibe
            </p>
          </div>

          {/* Search & Filters */}
          <div className="glass rounded-2xl p-6 mb-12 space-y-4 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Filter by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setLocationFilter("");
                }}
                variant="outline"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EventCard
                  event={event}
                  onViewDetails={() => handleViewDetails(event)}
                  onAttend={() => handleAttend(event)}
                  isAttended={isEventAttended(event.id)}
                />
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-2xl text-muted-foreground">
                No events found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </main>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAttend={() => selectedEvent && handleAttend(selectedEvent)}
        isAttended={selectedEvent ? isEventAttended(selectedEvent.id) : false}
      />

      <Footer />
    </div>
  );
};

export default Explore;
