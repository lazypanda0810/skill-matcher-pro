import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

const FeatureCard = ({ icon: Icon, title, description, index = 0 }: FeatureCardProps) => {
  return (
    <div
      className="group relative p-7 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
    >
      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-info/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500">
          <Icon className="w-7 h-7 text-accent" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
