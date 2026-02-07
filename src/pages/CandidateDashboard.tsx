import { useState } from "react";
import {
  FileText,
  History,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  CheckCircle,
  Loader2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import MatchScoreRing from "@/components/MatchScoreRing";
import SkillChart from "@/components/SkillChart";
import StatCard from "@/components/StatCard";
import { sampleMatchResults, skillOverlapData } from "@/utils/mockData";
import type { MatchResult } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState<"match" | "history">("match");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    toast({ title: "Resume uploaded", description: file.name });
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No resume",
        description: "Please upload your resume first.",
        variant: "destructive",
      });
      return;
    }
    if (!jobDescription.trim()) {
      toast({
        title: "No job description",
        description: "Please enter a job description.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulate AI processing
    await new Promise((r) => setTimeout(r, 2500));
    setMatchResult(sampleMatchResults[0]);
    setIsAnalyzing(false);
    toast({ title: "Analysis complete!", description: "Your match results are ready." });
  };

  const user = JSON.parse(localStorage.getItem("user") || '{"name":"Candidate"}');

  return (
    <Layout isAuthenticated userName={user.name} userRole="candidate">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            Candidate Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload your resume and match it with job descriptions.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FileText} label="Resumes Uploaded" value={3} index={0} />
          <StatCard icon={TrendingUp} label="Best Match" value="91%" index={1} />
          <StatCard icon={Search} label="Jobs Matched" value={7} index={2} />
          <StatCard icon={CheckCircle} label="Avg Score" value="76%" index={3} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-secondary rounded-lg mb-6 w-fit">
          <button
            onClick={() => setActiveTab("match")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "match"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            New Match
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "history"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <History className="w-4 h-4" /> History
            </span>
          </button>
        </div>

        {activeTab === "match" ? (
          <div className="space-y-6">
            {/* Upload & JD Input */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <FileUpload onFileSelect={handleFileSelect} />
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here... Include required skills, experience, and qualifications."
                  className="w-full h-48 p-4 rounded-lg border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  maxLength={5000}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-muted-foreground">
                    {jobDescription.length}/5000 characters
                  </span>
                  <Button
                    variant="accent"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Analyze Match
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Match Results */}
            {matchResult && (
              <div className="animate-fade-in-up space-y-6">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Match Results — {matchResult.jobTitle}
                </h2>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Score Ring */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-card flex items-center justify-center">
                    <MatchScoreRing score={matchResult.matchScore} />
                  </div>

                  {/* Skill Chart */}
                  <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-card">
                    <SkillChart data={skillOverlapData} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Matched Skills */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                    <h3 className="text-base font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      Matched Skills ({matchResult.matchedSkills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matchedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                    <h3 className="text-base font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      Missing Skills ({matchResult.missingSkills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                  <h3 className="text-base font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Improvement Suggestions
                  </h3>
                  <ul className="space-y-3">
                    {matchResult.suggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-accent">
                            {i + 1}
                          </span>
                        </span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* History Tab */
          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Company
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sampleMatchResults.map((match) => (
                    <tr key={match.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {match.jobTitle}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {match.company}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            match.matchScore >= 80
                              ? "bg-success/10 text-success"
                              : match.matchScore >= 60
                                ? "bg-warning/10 text-warning"
                                : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {match.matchScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {match.date}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                          <CheckCircle className="w-3 h-3" /> Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CandidateDashboard;
