
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, MapPin, User, Building, AlertCircle } from 'lucide-react';
import { mockCandidates } from '@/mock/data';
import { CandidateDetail } from '@/components/candidates/CandidateDetail';

// Extended Candidate interface that includes the properties we need
interface JobCandidate {
  id: string;
  name: string;
  email: string;
  position: string;
  matchRate: number; 
  experience: number;
  status: string; // Changed from optional to required
  strengths: string[];
  risks: string[];
  appliedDate: string;
  jobApplications: Array<{
    jobId: string;
    dateApplied: string;
    status: string;
  }>;
  matchScore: number;
}

interface JobViewProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    description?: string;
    requirements?: string;
    dateCreated: string;
    active: boolean;
  };
  onClose: () => void;
}

export function JobView({ job, onClose }: JobViewProps) {
  // Filter candidates for this job (in real app would use API)
  const jobCandidates = mockCandidates.filter(candidate => 
    candidate.jobApplications.some(app => app.jobId === job.id)
  ).map(candidate => ({
    ...candidate,
    status: candidate.status || 'new' // Ensure status always has a value
  })) as JobCandidate[];

  // State for selected candidate
  const [selectedCandidate, setSelectedCandidate] = useState<JobCandidate | null>(null);

  // Handle viewing a candidate's profile
  const handleViewCandidate = (candidate: JobCandidate) => {
    setSelectedCandidate(candidate);
  };

  // Handle going back to candidates list
  const handleBackToList = () => {
    setSelectedCandidate(null);
  };

  // If a candidate is selected, show the candidate detail view
  if (selectedCandidate) {
    return <CandidateDetail candidate={selectedCandidate} onBack={handleBackToList} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{job.title}</h2>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>{job.company}</span>
            <MapPin className="h-4 w-4 ml-2" />
            <span>{job.location}</span>
            <Calendar className="h-4 w-4 ml-2" />
            <span>Posted: {job.dateCreated}</span>
          </div>
        </div>
        <Badge variant={job.active ? "default" : "secondary"}>
          {job.active ? "Active" : "Inactive"}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {job.description ? (
              <div className="prose max-w-none">
                <p>{job.description}</p>
              </div>
            ) : (
              <div className="text-muted-foreground">No description available</div>
            )}
            
            {job.requirements && (
              <>
                <h3 className="text-lg font-medium mt-2">Requirements</h3>
                <div className="prose max-w-none">
                  <p>{job.requirements}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Job Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Total Candidates</span>
                </div>
                <span className="font-medium">{jobCandidates.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Match Rate &gt; 80%</span>
                </div>
                <span className="font-medium">
                  {jobCandidates.filter(c => c.matchRate > 80).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Candidates ({jobCandidates.length})</CardTitle>
          <CardDescription>
            List of candidates who applied for this position
          </CardDescription>
        </CardHeader>
        <CardContent>
          {jobCandidates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Match Rate</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobCandidates.map((candidate) => {
                  const application = candidate.jobApplications.find(app => app.jobId === job.id);
                  return (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>
                        <Badge variant={candidate.matchRate > 80 ? "success" : candidate.matchRate > 60 ? "default" : "secondary"}>
                          {candidate.matchRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>{candidate.experience} years</TableCell>
                      <TableCell>{application?.dateApplied || "Unknown"}</TableCell>
                      <TableCell>
                        <Badge variant={application?.status === "Reviewed" ? "default" : "outline"}>
                          {application?.status || "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewCandidate(candidate)}
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-3">
              <p className="text-muted-foreground">No candidates have applied for this position yet</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t p-3 bg-muted/30">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={onClose}>Back to Job Listings</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
