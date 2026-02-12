import { useState, useEffect, useCallback } from "react";
import { BrainCircuit, FileSearch, BarChart3, Sparkles } from "lucide-react";

const slides = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Matching",
    subtitle: "NLP-driven resume analysis",
    gradient: "from-accent/20 to-info/20",
    iconColor: "text-accent",
  },
  {
    icon: FileSearch,
    title: "Smart Skill Detection",
    subtitle: "Identify gaps instantly",
    gradient: "from-info/20 to-accent/20",
    iconColor: "text-info",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    subtitle: "Interactive match insights",
    gradient: "from-success/20 to-accent/20",
    iconColor: "text-success",
  },
  {
    icon: Sparkles,
    title: "Instant Results",
    subtitle: "Get scores in seconds",
    gradient: "from-warning/20 to-info/20",
    iconColor: "text-warning",
  },
];

const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setIsTransitioning(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [active, goTo]);

  const slide = slides[active];
  const Icon = slide.icon;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glowing backdrop */}
      <div className="absolute -inset-8 rounded-3xl bg-accent/5 blur-3xl animate-pulse-ring" />

      {/* Main card */}
      <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 overflow-hidden">
        {/* Animated gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-700`}
        />

        {/* Floating orbs */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-accent/10 blur-2xl animate-pulse-ring" />
        <div className="absolute bottom-8 left-4 w-16 h-16 rounded-full bg-info/10 blur-xl animate-pulse-ring delay-200" />

        {/* Content */}
        <div
          className={`relative transition-all duration-300 ${
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/10">
            <Icon className={`w-8 h-8 ${slide.iconColor}`} />
          </div>
          <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-2">
            {slide.title}
          </h3>
          <p className="text-primary-foreground/60 text-sm">{slide.subtitle}</p>
        </div>

        {/* Progress dots */}
        <div className="relative flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-1.5 rounded-full overflow-hidden flex-1 bg-white/10"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-accent w-full"
                    : i < active
                    ? "bg-accent/40 w-full"
                    : "w-0"
                }`}
              />
              {i === active && (
                <div
                  className="absolute inset-y-0 left-0 bg-accent rounded-full"
                  style={{
                    animation: "progress-fill 3.5s linear forwards",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Floating mini cards */}
      <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 animate-float">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-xs text-primary-foreground/70 font-medium">98% Match</span>
        </div>
      </div>

      <div className="absolute -bottom-3 -left-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 animate-float-delayed">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-warning" />
          <span className="text-xs text-primary-foreground/70 font-medium">AI Ready</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
