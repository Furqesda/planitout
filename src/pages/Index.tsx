import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";
import cityMap from "@/assets/city-map.jpg";
import { useScrollAnimation, useHeroScroll } from "@/hooks/useScrollAnimation";

const Index = () => {
  const { heroScale, heroOpacity } = useHeroScroll();
  const section2 = useScrollAnimation();
  const section3 = useScrollAnimation();
  const section4 = useScrollAnimation();
  const section5 = useScrollAnimation();

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

        <div 
          className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white space-y-6 sm:space-y-8 animate-fade-in transition-all duration-700 ease-in-out"
          style={{
            transform: `scale(${heroScale})`,
            opacity: heroOpacity,
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide leading-tight">
            Discover what's next,
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              right near you
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            From idea to meetup — PlanItout connects you
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Link to="/explore" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 transition-all duration-300 hover:scale-105"
              >
                Explore Events
              </Button>
            </Link>
            <Link to="/host" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
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
      <section 
        ref={section2.ref as React.RefObject<HTMLElement>}
        className={`py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 transition-all duration-700 ${
          section2.isVisible ? 'animate-slide-in-left' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 md:sticky md:top-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
                How PlanItout works for you
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                All you've gotta do is explore events and find the one that matches your vibe — maybe it's a reason to spend a lovely evening with your girlfriend, or a day out with the family (they'll love it even more if you're the one paying 😉).
              </p>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                Whether you're looking to discover something new or create an experience yourself, PlanItout makes it effortless. Join thousands who've already found their next adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section 
        ref={section3.ref as React.RefObject<HTMLElement>}
        className={`py-12 sm:py-16 md:py-24 relative overflow-hidden transition-all duration-700 ${
          section3.isVisible ? 'animate-slide-in-right' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-center mb-8 sm:mb-12 md:mb-16">
            The PlanItout Flow
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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
                className="glass rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="inline-block p-3 sm:p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                  <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-base sm:text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section 
        ref={section4.ref as React.RefObject<HTMLElement>}
        className={`py-12 sm:py-16 md:py-24 bg-muted/30 transition-all duration-700 ${
          section4.isVisible ? 'animate-slide-in-bottom' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative rounded-2xl h-64 sm:h-80 md:h-96 overflow-hidden shadow-2xl order-2 md:order-1">
              <img 
                src={cityMap} 
                alt="Interactive city map with event locations" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            </div>

            <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
                Explore what's happening around you
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                See events in your neighborhood and beyond. Distance, timing, and vibes — all at a glance.
              </p>
              <Button size="lg" className="w-full sm:w-auto transition-all duration-300 hover:scale-105">
                Enable my location
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={section5.ref as React.RefObject<HTMLElement>}
        className={`py-12 sm:py-16 md:py-24 relative overflow-hidden transition-all duration-700 ${
          section5.isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center text-white space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
            Ready to find your next event?
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
            Join thousands already discovering moments worth showing up for
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Link to="/explore" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 transition-all duration-300 hover:scale-105"
              >
                Start Exploring
              </Button>
            </Link>
            <Link to="/host" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
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
