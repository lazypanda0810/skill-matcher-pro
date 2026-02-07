import { useState } from "react";
import {
  Users,
  FileText,
  Download,
  Filter,
  TrendingUp,
  Search,
  Loader2,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";
import { sampleCandidates } from "@/utils/mockData";
import type { CandidateResume } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const RecruiterDashboard = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [filterScore, setFilterScore] = useState(0);
  const [filterSkill, setFilterSkill] = useState("");
  const [candidates] = useState<CandidateResume[]>(sampleCandidates);
  const { toast } = useToast();

  const handlePostJob = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Missing job description",
        description: "Please enter a job description to find matching candidates.",
        variant: "destructive",
      });
      return;
    }
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    setShowResults(true);
    toast({
      title: "Candidates ranked!",
      description: `Found ${sampleCandidates.length} matching candidates.`,
    });
  };

  const filteredCandidates = candidates
    .filter((c) => c.matchScore >= filterScore)
    .filter((c) =>
      filterSkill
        ? c.skills.some((s) =>
            s.toLowerCase().includes(filterSkill.toLowerCase())
          )
        : true
    )
    .sort((a, b) => b.matchScore - a.matchScore);

  const handleDownload = (name: string) => {
    toast({ title: "Downloading", description: `Downloading ${name}'s resume...` });
  };

  const user = JSON.parse(localStorage.getItem("user") || '{"name":"Recruiter"}');

  return (
    <Layout isAuthenticated userName={user.name} userRole="recruiter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            Recruiter Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Post job descriptions and find the best matching candidates.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total Candidates" value={142} index={0} />
          <StatCard icon={Briefcase} label="Active Jobs" value={5} index={1} />
          <StatCard icon={TrendingUp} label="Top Match" value="92%" index={2} />
          <StatCard icon={FileText} label="Shortlisted" value={18} trend="+3 this week" index={3} />
        </div>

        {/* Job Description Input */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-card mb-6">
          <h2 className="text-base font-heading font-semibold text-foreground mb-3">
            Post Job Description
          </h2>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter the job description including required skills, qualifications, experience level, and responsibilities..."
            className="w-full h-36 p-4 rounded-lg border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            maxLength={5000}
          />
          <div className="flex justify-end mt-3">
            <Button
              variant="accent"
              onClick={handlePostJob}
              disabled={isProcessing}
              className="gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ranking Candidates...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Find Matching Candidates
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="animate-fade-in-up">
            {/* Filters */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-card mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Filter className="w-4 h-4 text-accent" />
                  Filters:
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">Min Score:</label>
                  <select
                    value={filterScore}
                    onChange={(e) => setFilterScore(Number(e.target.value))}
                    className="h-9 rounded-md border border-border bg-background text-foreground text-sm px-3 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value={0}>All</option>
                    <option value={60}>60%+</option>
                    <option value={70}>70%+</option>
                    <option value={80}>80%+</option>
                    <option value={90}>90%+</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">Skill:</label>
                  <Input
                    value={filterSkill}
                    onChange={(e) => setFilterSkill(e.target.value)}
                    placeholder="e.g. React, Python"
                    className="h-9 w-40"
                  />
                </div>
                <span className="text-xs text-muted-foreground ml-auto">
                  Showing {filteredCandidates.length} of {candidates.length} candidates
                </span>
              </div>
            </div>

            {/* Candidates Table */}
            <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                        Match Score
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                        Skills
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredCandidates.map((candidate, i) => (
                      <tr
                        key={candidate.id}
                        className="hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
                            {i + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {candidate.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {candidate.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 rounded-full bg-secondary overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  candidate.matchScore >= 80
                                    ? "bg-success"
                                    : candidate.matchScore >= 60
                                      ? "bg-warning"
                                      : "bg-destructive"
                                }`}
                                style={{ width: `${candidate.matchScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                              {candidate.matchScore}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {candidate.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground"
                              >
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground">
                                +{candidate.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {candidate.experience}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(candidate.name)}
                              className="gap-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Resume
                            </Button>
                            <Button variant="ghost" size="sm">
                              <CheckCircle className="w-3.5 h-3.5 text-success" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecruiterDashboard;
