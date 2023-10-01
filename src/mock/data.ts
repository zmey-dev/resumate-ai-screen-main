import { Candidate } from '@/components/candidates/CandidateTable';

// Extended interface for candidates with job application data
interface CandidateWithApplications extends Candidate {
  jobApplications: Array<{
    jobId: string;
    dateApplied: string;
    status: string;
  }>;
  matchRate: number;
  experience: number;
}

// Mock data for the dashboard
export const mockCandidates: CandidateWithApplications[] = [
  {
    id: "1",
    name: "Jessica Chen",
    email: "jessica.chen@example.com",
    position: "Senior Frontend Developer",
    matchScore: 92,
    matchRate: 92,
    experience: 5,
    status: "shortlisted",
    strengths: ["5+ years React experience", "Strong UI/UX skills", "Team leadership"],
    risks: ["Job hopping tendency"],
    appliedDate: "2025-05-09",
    jobApplications: [
      { jobId: "1", dateApplied: "2025-05-09", status: "Reviewed" }
    ]
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "m.rodriguez@example.com",
    position: "Senior Frontend Developer",
    matchScore: 85,
    matchRate: 85,
    experience: 7,
    status: "new",
    strengths: ["7 years frontend experience", "Strong TypeScript skills", "Open source contributor"],
    risks: ["No React Native experience", "Salary expectations may be high"],
    appliedDate: "2025-05-10",
    jobApplications: [
      { jobId: "1", dateApplied: "2025-05-10", status: "Pending" }
    ]
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    position: "Product Manager",
    matchScore: 78,
    matchRate: 78,
    experience: 4,
    status: "reviewed",
    strengths: ["Product launch experience", "User research background", "Technical understanding"],
    risks: ["Only 2 years in software industry"],
    appliedDate: "2025-05-08",
    jobApplications: [
      { jobId: "2", dateApplied: "2025-05-08", status: "Reviewed" }
    ]
  },
  {
    id: "4",
    name: "David Kim",
    email: "d.kim@example.com",
    position: "DevOps Engineer",
    matchScore: 67,
    matchRate: 67,
    experience: 3,
    status: "new",
    strengths: ["Strong AWS knowledge", "CI/CD pipeline experience", "Kubernetes certified"],
    risks: ["Limited team collaboration experience", "No Azure experience"],
    appliedDate: "2025-05-11",
    jobApplications: [
      { jobId: "3", dateApplied: "2025-05-11", status: "Pending" }
    ]
  },
  {
    id: "5",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    position: "UX Designer",
    matchScore: 95,
    matchRate: 95,
    experience: 6,
    status: "shortlisted",
    strengths: ["Award-winning portfolio", "User testing expertise", "Design system experience"],
    risks: ["Limited coding knowledge"],
    appliedDate: "2025-05-07",
    jobApplications: [
      { jobId: "4", dateApplied: "2025-05-07", status: "Reviewed" }
    ]
  },
  {
    id: "6",
    name: "Robert Taylor",
    email: "robert.t@example.com",
    position: "Backend Engineer",
    matchScore: 53,
    matchRate: 53,
    experience: 2,
    status: "rejected",
    strengths: ["Strong database knowledge", "Microservices architecture"],
    risks: ["No Node.js experience", "Poor communication skills", "Limited API design experience"],
    appliedDate: "2025-05-06",
    jobApplications: [
      { jobId: "5", dateApplied: "2025-05-06", status: "Rejected" }
    ]
  },
  {
    id: "7",
    name: "Alice Nguyen",
    email: "alice.n@example.com",
    position: "Data Scientist",
    matchScore: 88,
    matchRate: 88,
    experience: 4,
    status: "reviewed",
    strengths: ["PhD in Machine Learning", "Published research papers", "Python expert"],
    risks: ["Limited industry experience"],
    appliedDate: "2025-05-05",
    jobApplications: [
      { jobId: "1", dateApplied: "2025-05-12", status: "Pending" },
      { jobId: "5", dateApplied: "2025-05-05", status: "Reviewed" }
    ]
  },
];

export const dashboardStats = {
  newApplications: 23,
  reviewedCandidates: 12,
  shortlistedCandidates: 5,
  averageScore: 76,
};

export const mockJobDescriptions = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote (US)",
    candidates: 14,
    active: true,
    dateCreated: "2025-05-01",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "TechCorp Inc.",
    location: "New York, NY",
    candidates: 9,
    active: true,
    dateCreated: "2025-05-03",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "TechCorp Inc.",
    location: "Remote (US)",
    candidates: 7,
    active: true,
    dateCreated: "2025-05-05",
  },
  {
    id: "4",
    title: "UX Designer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    candidates: 11,
    active: true,
    dateCreated: "2025-05-02",
  },
  {
    id: "5",
    title: "Backend Engineer",
    company: "TechCorp Inc.",
    location: "Austin, TX",
    candidates: 5,
    active: false,
    dateCreated: "2025-04-25",
  },
];
