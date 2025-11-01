import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface OnboardingCardsProps {
  storageKey: string;
  cards: {
    title: string;
    description: string;
  }[];
  onComplete: () => void;
}

const OnboardingCards = ({ storageKey, cards, onComplete }: OnboardingCardsProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isVisible, setIsVisible] = useState(
    !localStorage.getItem(storageKey)
  );

  if (!isVisible) return null;

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem(storageKey, "true");
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem(storageKey, "true");
    setIsVisible(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="glass max-w-lg mx-4 p-8 animate-scale-in relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSkip}
          className="absolute top-4 right-4 hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-wide">
              {cards[currentCard].title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {cards[currentCard].description}
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentCard ? "bg-primary w-8" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            {currentCard > 0 && currentCard < cards.length - 1 && (
              <Button
                variant="outline"
                onClick={handleSkip}
                className="flex-1 transition-all duration-300"
              >
                Skip Tutorial
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 transition-all duration-300 hover:scale-105"
            >
              {currentCard === cards.length - 1 ? "Let's Go →" : "Next →"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingCards;
