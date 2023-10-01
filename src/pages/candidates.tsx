
import React, { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { CandidateTable } from '@/components/candidates/CandidateTable';
import { mockCandidates } from '@/mock/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Download, Search, Upload } from 'lucide-react';

const Candidates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter candidates based on search term and status
  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Candidates</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => toast({ title: "Export initiated", description: "Preparing candidate data for export" })}>
              <Download className="mr-2 h-4 w-4" /> Export List
            </Button>
            <Button onClick={() => toast({ title: "Upload feature", description: "The resume upload feature will be available in the next update" })}>
              <Upload className="mr-2 h-4 w-4" /> Upload Resumes
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search candidates by name, email or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <CandidateTable 
          candidates={filteredCandidates}
          onViewCandidate={handleViewCandidate}
          onDownloadResume={handleDownloadResume}
        />
        
        {filteredCandidates.length === 0 && (
          <div className="bg-card rounded-md border p-6 text-center">
            <h3 className="text-lg font-medium">No candidates found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Candidates;
