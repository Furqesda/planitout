import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventModal from "@/components/EventModal";
import DeleteEventDialog from "@/components/DeleteEventDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sampleEvents, Event } from "@/lib/sampleEvents";
import { isLoggedIn, getAttendedEvents, getUserEmail, removeAttendedEvent } from "@/lib/authHelpers";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
      return;
    }
    loadEvents();
  }, [navigate]);

  const loadEvents = async () => {
    try {
      // Load all events
      const { data: allEvents, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;

      const combinedEvents = [...sampleEvents, ...(allEvents || [])];
      
      // Filter attended events
      const attendedIds = getAttendedEvents();
      const attended = combinedEvents.filter((event) =>
        attendedIds.includes(event.id)
      );
      setMyEvents(attended);

      // Filter created events
      const userEmail = getUserEmail();
      const created = combinedEvents.filter(
        (event) => event.host_email === userEmail
      );
      setCreatedEvents(created);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const handleUnattend = (eventId: string) => {
    removeAttendedEvent(eventId);
    toast.success("Removed from your events");
    loadEvents();
  };

  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    if (eventToDelete.id.startsWith("sample-")) {
      toast.error("Cannot delete sample events");
      setDeleteDialogOpen(false);
      setEventToDelete(null);
      return;
    }

    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventToDelete.id);

      if (error) throw error;

      setDeleteDialogOpen(false);
      setEventToDelete(null);
      toast.success("🗑️ Event deleted successfully");
      loadEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
              Your
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {" "}Dashboard
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Manage your events and experiences
            </p>
          </div>

          <Tabs defaultValue="attending" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 sm:mb-12">
              <TabsTrigger value="attending">Attending</TabsTrigger>
              <TabsTrigger value="hosting">Hosting</TabsTrigger>
            </TabsList>

            <TabsContent value="attending" className="space-y-6 sm:space-y-8">
              {myEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {myEvents.map((event, index) => (
                    <div
                      key={event.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <EventCard
                        event={event}
                        onViewDetails={() => {
                          setSelectedEvent(event);
                          setIsModalOpen(true);
                        }}
                        onAttend={() => handleUnattend(event.id)}
                        isAttended={true}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 sm:py-20 space-y-3 sm:space-y-4 animate-fade-in px-4">
                  <p className="text-xl sm:text-2xl text-muted-foreground">
                    You haven't joined any events yet
                  </p>
                  <Button onClick={() => navigate("/explore")} className="w-full sm:w-auto">
                    Explore Events
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="hosting" className="space-y-6 sm:space-y-8">
              {createdEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {createdEvents.map((event, index) => (
                    <div
                      key={event.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="relative"
                    >
                      <EventCard
                        event={event}
                        onViewDetails={() => {
                          setSelectedEvent(event);
                          setIsModalOpen(true);
                        }}
                        onAttend={() => {}}
                        onDelete={() => handleDeleteClick(event)}
                        isOwnEvent={true}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 sm:py-20 space-y-3 sm:space-y-4 animate-fade-in px-4">
                  <p className="text-xl sm:text-2xl text-muted-foreground">
                    You haven't created any events yet
                  </p>
                  <Button
                    onClick={() => navigate("/host")}
                    className="gap-2 w-full sm:w-auto"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Host Your First Event
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAttend={() => {}}
        isAttended={true}
      />

      <DeleteEventDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
