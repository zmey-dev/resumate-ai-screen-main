
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Check, Download, Search, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Define candidate data type
export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  matchScore: number;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  strengths: string[];
  risks: string[];
  appliedDate: string;
}

interface CandidateTableProps {
  candidates: Candidate[];
  onViewCandidate?: (id: string) => void;
  onDownloadResume?: (id: string) => void;
}

export function CandidateTable({ candidates, onViewCandidate, onDownloadResume }: CandidateTableProps) {
  // Function to determine badge color based on match score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-score-high text-white';
    if (score >= 60) return 'bg-score-medium text-black';
    return 'bg-score-low text-white';
  };

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
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Candidate</TableHead>
            <TableHead>Position</TableHead>
            <TableHead className="w-[100px] text-center">Match</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link to={`/candidates/${candidate.id}`} className="font-medium hover:underline text-primary">
                      {candidate.name}
                    </Link>
                    <div className="text-sm text-muted-foreground">{candidate.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{candidate.position}</TableCell>
              <TableCell className="text-center">
                <Badge className={cn("rounded-md px-2 py-1 text-xs font-medium", getScoreColor(candidate.matchScore))}>
                  {candidate.matchScore}%
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {candidate.status}
                </Badge>
              </TableCell>
              <TableCell>{candidate.appliedDate}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => onViewCandidate?.(candidate.id)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => onDownloadResume?.(candidate.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">Status</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Check className="mr-2 h-4 w-4" /> Shortlist
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <X className="mr-2 h-4 w-4" /> Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
