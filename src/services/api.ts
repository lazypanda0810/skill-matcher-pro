/**
 * API Service Layer
 * Centralizes all API calls using Axios.
 * In production, replace mock implementations with real API endpoints.
 */

import axios from "axios";
import {
  sampleMatchResults,
  sampleCandidates,
  adminStats,
  usageData,
  adminUsers,
  type MatchResult,
  type CandidateResume,
  type UserStats,
} from "@/utils/mockData";

// Configure base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Simulate API delay for realistic UX
 */
const simulateDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ===================== AUTH =====================

// Demo credentials for role-based login
const DEMO_ACCOUNTS: Record<string, { password: string; role: "candidate" | "recruiter" | "admin"; name: string }> = {
  "candidate@demo.com": { password: "Candidate@123", role: "candidate", name: "Demo Candidate" },
  "recruiter@demo.com": { password: "Recruiter@123", role: "recruiter", name: "Demo Recruiter" },
  "admin@demo.com": { password: "Admin@123", role: "admin", name: "Admin" },
};

export const authService = {
  async login(email: string, password: string) {
    await simulateDelay(1000);
    const demo = DEMO_ACCOUNTS[email.toLowerCase()];
    if (demo && demo.password === password) {
      return {
        token: "mock_jwt_token_" + Date.now(),
        user: { id: "user_" + demo.role, email, name: demo.name, role: demo.role },
      };
    }
    // For non-demo accounts, reject
    throw new Error("Invalid credentials. Please use a demo account.");
  },

  async register(email: string, password: string, role: "candidate" | "recruiter") {
    await simulateDelay(1000);
    return {
      token: "mock_jwt_token_" + Date.now(),
      user: { id: "user_" + Date.now(), email, name: email.split("@")[0], role },
    };
  },

  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  getUser() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem("auth_token");
  },
};

// ===================== CANDIDATE =====================

export const candidateService = {
  async uploadResume(file: File): Promise<{ message: string; resumeId: string }> {
    await simulateDelay(1500);
    // In production: upload file via multipart form data
    // const formData = new FormData();
    // formData.append("resume", file);
    // return apiClient.post("/resume/upload", formData);
    return {
      message: "Resume uploaded successfully",
      resumeId: "resume_" + Date.now(),
    };
  },

  async matchResume(resumeId: string, jobDescription: string): Promise<MatchResult> {
    await simulateDelay(2000);
    // In production: POST to AI matching endpoint
    return sampleMatchResults[0];
  },

  async getMatchHistory(): Promise<MatchResult[]> {
    await simulateDelay(600);
    return sampleMatchResults;
  },
};

// ===================== RECRUITER =====================

export const recruiterService = {
  async uploadJobDescription(description: string): Promise<{ jobId: string }> {
    await simulateDelay(1000);
    return { jobId: "job_" + Date.now() };
  },

  async getRankedCandidates(jobId?: string): Promise<CandidateResume[]> {
    await simulateDelay(800);
    return sampleCandidates;
  },

  async downloadResume(candidateId: string): Promise<Blob> {
    await simulateDelay(500);
    // In production: return actual file blob
    return new Blob(["Mock resume content"], { type: "application/pdf" });
  },
};

// ===================== ADMIN =====================

export const adminService = {
  async getStats(): Promise<UserStats> {
    await simulateDelay(500);
    return adminStats;
  },

  async getUsageData() {
    await simulateDelay(600);
    return usageData;
  },

  async getUsers() {
    await simulateDelay(700);
    return adminUsers;
  },
};

export default apiClient;
