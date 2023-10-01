
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, FileText, Calendar, Trophy, AlertCircle } from 'lucide-react';

interface CandidateDetailProps {
  candidate: {
    id: string;
    name: string;
    email: string;
    position: string;
    matchScore: number;
    status: string;
    strengths: string[];
    risks: string[];
    appliedDate: string;
    experience?: number;
    jobApplications?: Array<{
      jobId: string;
      dateApplied: string;
      status: string;
    }>;
  };
  onBack: () => void;
}

export function CandidateDetail({ candidate, onBack }: CandidateDetailProps) {
  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Candidates
        </Button>
        <Badge variant={candidate.status === 'shortlisted' ? 'default' : 'outline'} className="capitalize">
          {candidate.status}
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Candidate Header Info */}
        <Card className="md:w-1/3">
          <CardContent className="pt-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">{getInitials(candidate.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{candidate.name}</h2>
                <p className="text-muted-foreground">{candidate.position}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`rounded-md px-2 py-1 ${
                  candidate.matchScore >= 80 ? 'bg-score-high text-white' : 
                  candidate.matchScore >= 60 ? 'bg-score-medium text-black' : 
                  'bg-score-low text-white'
                }`}>
                  Match: {candidate.matchScore}%
                </Badge>
                {candidate.experience && (
                  <Badge variant="outline">
                    {candidate.experience} years exp.
                  </Badge>
                )}
              </div>
              <p className="text-sm">
                <Calendar className="inline mr-1 h-4 w-4" />
                Applied on {candidate.appliedDate}
              </p>
              <p className="text-sm text-muted-foreground">{candidate.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Candidate Details */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Candidate Profile</CardTitle>
            <CardDescription>Detailed information about {candidate.name}</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="space-y-3 py-3">
                <div>
                  <h3 className="text-lg font-medium mb-1 flex items-center">
                    <User className="mr-2 h-5 w-5 text-muted-foreground" />
                    About
                  </h3>
                  <p className="text-muted-foreground">
                    Experienced {candidate.position} with {candidate.experience || 'several'} years 
                    of professional experience and a strong track record of delivering high-quality work.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-1 flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-muted-foreground" />
                    Strengths
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {candidate.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-1 flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                    Potential Risks
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {candidate.risks.map((risk, index) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="resume" className="py-3">
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg">
                  <FileText className="h-16 w-16 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">Resume Preview</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    Resume content would be displayed here in a real application.
                  </p>
                  <Button variant="success" className="mt-3">
                    Download Resume
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="assessment" className="py-3">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-medium">Technical Assessment</h3>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="border rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Technical Skills</p>
                        <p className="text-2xl font-bold">{candidate.matchScore}%</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Culture Fit</p>
                        <p className="text-2xl font-bold">{Math.min(candidate.matchScore + 5, 100)}%</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Interview Notes</h3>
                    <p className="text-muted-foreground">
                      Interview notes would be displayed here in a real application.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t bg-muted/30 flex justify-between p-3">
            <Button variant="outline">Contact Candidate</Button>
            <Button>Schedule Interview</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
