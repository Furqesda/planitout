import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 parallax">
          <img
            src={heroBg}
            alt="Event crowd"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white space-y-8 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold tracking-wide leading-tight">
            Discover what's next,
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              right near you
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            From idea to meetup — PlanItout connects you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/explore">
              <Button
                size="lg"
                className="text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
              >
                Explore Events
              </Button>
            </Link>
            <Link to="/host">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Host an Event
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <ArrowRight className="w-6 h-6 text-white rotate-90" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up sticky top-24">
              <h2 className="text-5xl font-bold tracking-wide">
                How PlanItout works for you
              </h2>
            </div>

            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                All you've gotta do is explore events and find the one that matches your vibe — maybe it's a reason to spend a lovely evening with your girlfriend, or a day out with the family (they'll love it even more if you're the one paying 😉).
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Whether you're looking to discover something new or create an experience yourself, PlanItout makes it effortless. Join thousands who've already found their next adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold tracking-wide text-center mb-16 animate-fade-in">
            The PlanItout Flow
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Create",
                description: "Host your event effortlessly",
                delay: "0ms",
              },
              {
                icon: MapPin,
                title: "Discover",
                description: "Find experiences near you",
                delay: "200ms",
              },
              {
                icon: Users,
                title: "Connect",
                description: "Meet people who share your vibe",
                delay: "400ms",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 text-center space-y-4 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: item.delay }}
              >
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                  <item.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="glass rounded-2xl h-96 flex items-center justify-center animate-fade-in">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 text-primary mx-auto" />
                <p className="text-2xl font-semibold">Local Magic</p>
                <p className="text-muted-foreground">Interactive map coming soon</p>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <h2 className="text-5xl font-bold tracking-wide">
                Explore what's happening around you
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                See events in your neighborhood and beyond. Distance, timing, and vibes — all at a glance.
              </p>
              <Button size="lg" className="transition-all duration-300 hover:scale-105">
                Enable my location
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-6 relative z-10 text-center text-white space-y-8 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold tracking-wide">
            Ready to find your next event?
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Join thousands already discovering moments worth showing up for
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/explore">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
              >
                Start Exploring
              </Button>
            </Link>
            <Link to="/host">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Host an Event
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
