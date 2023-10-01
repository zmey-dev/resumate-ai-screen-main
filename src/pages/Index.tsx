
import React from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { CandidateTable } from '@/components/candidates/CandidateTable';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart } from '@/components/dashboard/BarChart';
import { dashboardStats, mockCandidates } from '@/mock/data';
import { BarChart as BarChartIcon, Download, List, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  
  const handleDownloadResume = (id: string) => {
    toast({
      title: "Resume download initiated",
      description: `Downloading resume for candidate ID: ${id}`,
    });
  };
  
  const handleViewCandidate = (id: string) => {
    toast({
      title: "View candidate",
      description: `Opening details for candidate ID: ${id}`,
    });
  };
  
  // Recent candidates data (top 5)
  const recentCandidates = mockCandidates.slice(0, 5);
  
  // Data for the match score distribution chart
  const matchScoreData = [
    { name: '< 60%', value: mockCandidates.filter(c => c.matchScore < 60).length },
    { name: '60-70%', value: mockCandidates.filter(c => c.matchScore >= 60 && c.matchScore < 70).length },
    { name: '70-80%', value: mockCandidates.filter(c => c.matchScore >= 70 && c.matchScore < 80).length },
    { name: '80-90%', value: mockCandidates.filter(c => c.matchScore >= 80 && c.matchScore < 90).length },
    { name: '90-100%', value: mockCandidates.filter(c => c.matchScore >= 90).length },
  ];
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <div className="flex items-center gap-2">
            <Button onClick={() => toast({ title: "Refreshing data...", description: "Checking for new applications" })}>
              Refresh Data
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="New Applications" 
            value={dashboardStats.newApplications} 
            icon={<List className="h-5 w-5" />} 
            description="Last 7 days" 
          />
          <StatCard 
            title="Reviewed Candidates" 
            value={dashboardStats.reviewedCandidates}
            icon={<Users className="h-5 w-5" />}
            description="Last 7 days" 
          />
          <StatCard 
            title="Shortlisted" 
            value={dashboardStats.shortlistedCandidates}
            icon={<Users className="h-5 w-5" />}
            description="Ready for interviews" 
          />
          <StatCard 
            title="Average Match Score" 
            value={`${dashboardStats.averageScore}%`}
            icon={<BarChartIcon className="h-5 w-5" />}
            description="All candidates" 
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Candidates</CardTitle>
              <CardDescription>Latest applications received</CardDescription>
            </CardHeader>
            <CardContent>
              <CandidateTable 
                candidates={recentCandidates} 
                onViewCandidate={handleViewCandidate}
                onDownloadResume={handleDownloadResume}
              />
              <div className="mt-4 flex justify-center">
                <Button variant="outline" asChild>
                  <a href="/candidates">View All Candidates</a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Match Score Distribution</CardTitle>
              <CardDescription>Candidate match quality breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <BarChart
                data={matchScoreData}
                index="name"
                categories={["value"]}
                colors={["#3b82f6"]}
                valueFormatter={(value) => `${value} candidates`}
                showLegend={false}
                showAnimation
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
