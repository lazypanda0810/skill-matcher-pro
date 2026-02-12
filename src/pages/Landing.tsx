import { Link } from "react-router-dom";
import {
  BrainCircuit,
  Target,
  BarChart3,
  Shield,
  Upload,
  Zap,
  ArrowRight,
  CheckCircle,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import ParticleField from "@/components/ParticleField";
import HeroSlider from "@/components/HeroSlider";
import AnimatedCounter from "@/components/AnimatedCounter";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Matching",
    description:
      "Our NLP engine analyzes resumes and job descriptions to compute accurate compatibility scores in seconds.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description:
      "Identify exactly which skills are missing and get personalized recommendations to improve your profile.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description:
      "Interactive charts and dashboards make it easy to understand match results at a glance.",
  },
  {
    icon: Shield,
    title: "ATS-Compatible",
    description:
      "Designed to align with applicant tracking systems used by top employers worldwide.",
  },
  {
    icon: Upload,
    title: "Easy Upload",
    description:
      "Drag and drop your resume in PDF or DOCX format. We handle the parsing automatically.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get your match score, skill overlap chart, and improvement suggestions within seconds.",
  },
];

const steps = [
  {
    step: "01",
    title: "Upload Your Resume",
    description: "Upload your resume in PDF or DOCX format for AI analysis.",
    icon: Upload,
  },
  {
    step: "02",
    title: "Enter Job Description",
    description: "Paste or select the job description you want to match against.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Get Match Results",
    description: "View your match score, skill gaps, and actionable improvement suggestions.",
    icon: TrendingUp,
  },
];

const stats = [
  { label: "Resumes Analyzed", value: 12500, suffix: "+" },
  { label: "Companies Trust Us", value: 350, suffix: "+" },
  { label: "Match Accuracy", value: 96, suffix: "%" },
  { label: "Active Users", value: 4800, suffix: "+" },
];

const Landing = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
        <ParticleField />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-info/10 rounded-full blur-3xl animate-orb-2" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 animate-shimmer-border">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-xs font-medium text-accent tracking-wide uppercase">
                  AI-Powered Resume Matching
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-[1.1] mb-6">
                Match Your
                <br />
                Resume With
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-info to-accent bg-[length:200%_auto] animate-gradient-shift">
                  Precision
                </span>
              </h1>

              <p className="text-lg text-primary-foreground/60 max-w-lg mb-10 leading-relaxed">
                Upload your resume, paste a job description, and let our AI analyze the
                compatibility. Get instant match scores, skill gap insights, and
                actionable improvement suggestions.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/auth?mode=register">
                  <Button variant="accent" size="xl" className="gap-2 group shadow-accent-glow">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/auth?mode=login">
                  <Button variant="hero-outline" size="xl">
                    Login
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-primary bg-accent/20 flex items-center justify-center"
                    >
                      <Users className="w-3 h-3 text-accent" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-primary-foreground/50">
                  <span className="text-primary-foreground/80 font-semibold">4,800+</span> professionals trust us
                </p>
              </div>
            </div>

            {/* Right: Animated Slider */}
            <div className="hidden lg:block animate-fade-in-up delay-300">
              <HeroSlider />
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 text-center backdrop-blur-sm"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-3xl font-heading font-bold text-foreground mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">Features</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground mb-4">
              Powerful Features for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-info">
                Smart Hiring
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Everything candidates and recruiters need to streamline the matching
              process with AI-driven analytics.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-card/50 border-y border-border relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Three simple steps to find your perfect match.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0" />

            {steps.map((item, i) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="group text-center animate-fade-in-up relative"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl gradient-accent mx-auto flex items-center justify-center shadow-accent-glow group-hover:scale-110 transition-transform duration-500">
                      <StepIcon className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold border-2 border-background">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 sm:p-16 text-center">
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-orb-1" />
              <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-info/10 rounded-full blur-3xl animate-orb-2" />
            </div>

            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary-foreground mb-6">
                Ready to Find Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-info">
                  Perfect Match?
                </span>
              </h2>
              <p className="text-primary-foreground/60 max-w-lg mx-auto mb-10 text-lg">
                Join thousands of candidates and recruiters using AI to streamline the
                hiring process.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/auth?mode=register">
                  <Button variant="accent" size="xl" className="gap-2 group shadow-accent-glow">
                    Create Free Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-8 mt-10 text-primary-foreground/40 text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" /> Free to use
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" /> No credit card
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" /> Instant results
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
