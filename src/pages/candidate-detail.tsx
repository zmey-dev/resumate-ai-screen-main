import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { mockCandidates } from '@/mock/data';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Calendar, Trophy, AlertCircle, ArrowLeft, Briefcase, Check, X } from 'lucide-react';

const CandidateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, this would be an API call
    const foundCandidate = mockCandidates.find(c => c.id === id);
    setCandidate(foundCandidate);
    setLoading(false);
  }, [id]);

  // Function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading candidate details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!candidate) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <h2 className="text-2xl font-bold">Candidate not found</h2>
          <p>The candidate you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/candidates')}>Back to Candidates</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/candidates')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Candidates
          </Button>
          <Badge variant={candidate.status === 'shortlisted' ? 'default' : 'outline'} className="capitalize">
            {candidate.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left Side - Profile Summary */}
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl">{getInitials(candidate.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{candidate.name}</h2>
                  <p className="text-muted-foreground">{candidate.position}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
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
                <div className="flex flex-col space-y-2 w-full text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Applied on {candidate.appliedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{candidate.email}</span>
                  </div>
                </div>
                <Button variant="success" className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Detailed Profile */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Candidate Profile</CardTitle>
              <CardDescription>Complete information about {candidate.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="space-y-4">
                <TabsList className="grid grid-cols-4 md:w-[400px]">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="history">Work History</TabsTrigger>
                  <TabsTrigger value="assessment">Assessment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <User className="mr-2 h-5 w-5 text-muted-foreground" />
                      About
                    </h3>
                    <p className="text-muted-foreground">
                      Experienced {candidate.position} with {candidate.experience || 'several'} years 
                      of professional experience and a strong track record of delivering high-quality work.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Trophy className="mr-2 h-5 w-5 text-muted-foreground" />
                      Strengths
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {candidate.strengths.map((strength: string, index: number) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                      Potential Risks
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {candidate.risks.map((risk: string, index: number) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="resume" className="space-y-4">
                  <div className="border rounded-lg p-6 bg-muted/30">
                    <div className="text-center mb-4">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Resume Preview</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Summary</h4>
                        <p>
                          Dedicated {candidate.position} with {candidate.experience || 'several'} years of 
                          experience in developing and implementing effective solutions. 
                          Strong problem-solving abilities and excellent collaboration skills.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold">Technical Skills</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {['JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML/CSS', 'Git'].map((skill) => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold">Education</h4>
                        <p>Bachelor's Degree in Computer Science, University of Technology</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button variant="success">
                        <FileText className="mr-2 h-4 w-4" /> Download Full Resume
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-6">
                    <div className="border-l-2 border-primary pl-4 pb-6">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-muted-foreground mr-2" />
                        <h3 className="font-semibold">Senior Developer</h3>
                      </div>
                      <p className="text-muted-foreground">TechCorp Inc • 2021 - Present</p>
                      <p className="mt-2">
                        Led development of key features for the company's flagship product.
                        Mentored junior developers and improved team coding standards.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-muted pl-4 pb-6">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-muted-foreground mr-2" />
                        <h3 className="font-semibold">Developer</h3>
                      </div>
                      <p className="text-muted-foreground">DevSolutions • 2018 - 2021</p>
                      <p className="mt-2">
                        Implemented frontend features and optimized application performance.
                        Worked in an agile team environment.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-muted pl-4">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-muted-foreground mr-2" />
                        <h3 className="font-semibold">Junior Developer</h3>
                      </div>
                      <p className="text-muted-foreground">StartupX • 2016 - 2018</p>
                      <p className="mt-2">
                        Developed and maintained web applications.
                        Participated in code reviews and testing.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="assessment" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Technical Skills Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Technical Expertise</span>
                            <Badge className={`${candidate.matchScore >= 80 ? 'bg-score-high text-white' : 'bg-muted'}`}>{candidate.matchScore}%</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Problem Solving</span>
                            <Badge className={`${candidate.matchScore - 5 >= 80 ? 'bg-score-high text-white' : 'bg-muted'}`}>{Math.max(candidate.matchScore - 5, 40)}%</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Communication</span>
                            <Badge className={`${candidate.matchScore - 10 >= 80 ? 'bg-score-high text-white' : 'bg-muted'}`}>{Math.max(candidate.matchScore - 10, 35)}%</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Cultural Fit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Team Collaboration</span>
                            <Badge className={`${Math.min(candidate.matchScore + 5, 100) >= 80 ? 'bg-score-high text-white' : 'bg-muted'}`}>{Math.min(candidate.matchScore + 5, 100)}%</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Company Values Alignment</span>
                            <Badge className={`${Math.min(candidate.matchScore + 3, 100) >= 80 ? 'bg-score-high text-white' : 'bg-muted'}`}>{Math.min(candidate.matchScore + 3, 100)}%</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Growth Potential</span>
                            <Badge className={`${Math.min(candidate.matchScore + 7, 100) >= 80 ? 'bg-score-high text-white' : 'bg-muted'}`}>{Math.min(candidate.matchScore + 7, 100)}%</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Interview Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {candidate.name} demonstrated strong technical knowledge during the interview. 
                        They were able to solve the coding challenges efficiently and explained their 
                        thought process clearly. They showed enthusiasm about our company mission and 
                        values. Their experience aligns well with our current needs.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 flex justify-between">
              <Button variant="outline">Contact Candidate</Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center">
                  <X className="mr-2 h-4 w-4" /> Reject
                </Button>
                <Button variant="success" className="flex items-center">
                  <Check className="mr-2 h-4 w-4" /> Shortlist
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDetailPage;
