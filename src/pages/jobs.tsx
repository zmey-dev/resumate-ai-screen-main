
import React, { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { JobDescriptionForm } from '@/components/jobs/JobDescriptionForm';
import { JobView } from '@/components/jobs/JobView';
import { mockJobDescriptions } from '@/mock/data';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { File, Plus, Search } from 'lucide-react';

const Jobs = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof mockJobDescriptions[0] | null>(null);
  
  // Filter job descriptions based on search term
  const filteredJobs = mockJobDescriptions.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSaveJob = (data: any) => {
    toast({
      title: "Job Description Saved",
      description: `${data.title} at ${data.company} was successfully saved.`
    });
    setIsAddJobOpen(false);
  };

  const handleViewJob = (job: typeof mockJobDescriptions[0]) => {
    setSelectedJob(job);
  };

  const handleCloseJobView = () => {
    setSelectedJob(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {selectedJob ? (
          <JobView job={selectedJob} onClose={handleCloseJobView} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Job Descriptions</h2>
              <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Job Description</DialogTitle>
                  </DialogHeader>
                  <JobDescriptionForm onSave={handleSaveJob} />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search job descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Candidates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-muted-foreground" />
                          {job.title}
                        </div>
                      </TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.candidates}</TableCell>
                      <TableCell>
                        <Badge variant={job.active ? "default" : "secondary"}>
                          {job.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{job.dateCreated}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewJob(job)}
                          >
                            View
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => toast({ 
                              title: "Edit Job", 
                              description: `Opening editor for ${job.title}` 
                            })}
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredJobs.length === 0 && (
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium">No job descriptions found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or add a new job description</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Jobs;
