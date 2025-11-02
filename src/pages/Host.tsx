import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnboardingCards from "@/components/OnboardingCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { isLoggedIn, getUserEmail } from "@/lib/authHelpers";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Host = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    maxParticipants: 20,
    imageUrl: "",
  });

  const onboardingCards = [
    {
      title: "Plan an event and let that beast out…",
      description: "Not literally, or we'll have to put you down.",
    },
    {
      title: "Add the details",
      description:
        "Title, date, location, people. Keep it SFW (exceptions may apply 👀).",
    },
    {
      title: "Let's do it then",
      description: "Create an event like never before and go CRAZYYYYYY!",
    },
  ];

  useEffect(() => {
    if (!isLoggedIn()) {
      toast.error("Please login to host events");
      navigate("/auth");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.location || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      const hostEmail = getUserEmail() || "host@planitout.com";

      const { error } = await supabase.from("events").insert({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: dateTime.toISOString(),
        max_participants: formData.maxParticipants,
        current_participants: 0,
        image_url: formData.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        host_email: hostEmail,
      });

      if (error) throw error;

      toast.success("Event created successfully! 🎉");
      navigate("/explore");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {showOnboarding && (
        <OnboardingCards
          storageKey="hasSeenHostTips"
          cards={onboardingCards}
          onComplete={() => {}}
        />
      )}

      <main className="pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
              Host Your
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {" "}Event
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Create unforgettable experiences for your community
            </p>
          </div>

          <Card className="glass p-4 sm:p-6 md:p-8 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Sunset Yoga Session"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell people what makes your event special..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Central Park, New York"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/explore")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 transition-all duration-300 hover:scale-105"
                >
                  Create Event
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Host;
