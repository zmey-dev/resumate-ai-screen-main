
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function EmailSetupForm() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>
          Connect your email account to automatically process incoming resumes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gmail">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gmail">Gmail</TabsTrigger>
            <TabsTrigger value="outlook">Outlook</TabsTrigger>
            <TabsTrigger value="custom">Custom IMAP</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gmail" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="gmail">Gmail Address</Label>
              <Input
                id="gmail"
                placeholder="your.email@gmail.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gmail-app-password">App Password</Label>
              <Input
                id="gmail-app-password"
                type="password"
                placeholder="Your Gmail app password"
              />
              <p className="text-xs text-muted-foreground">
                Use an app password instead of your regular password. 
                <a href="https://support.google.com/accounts/answer/185833" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                  Learn how to create one
                </a>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="outlook" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="outlook-email">Outlook Email</Label>
              <Input
                id="outlook-email"
                placeholder="your.email@outlook.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="outlook-password">Password</Label>
              <Input
                id="outlook-password"
                type="password"
                placeholder="Your Outlook password"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imap-server">IMAP Server</Label>
                <Input
                  id="imap-server"
                  placeholder="imap.example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imap-port">Port</Label>
                <Input
                  id="imap-port"
                  placeholder="993"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imap-username">Username</Label>
              <Input
                id="imap-username"
                placeholder="username or email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imap-password">Password</Label>
              <Input
                id="imap-password"
                type="password"
                placeholder="Your password"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="use-ssl"
                className="rounded border-gray-300"
                defaultChecked={true}
              />
              <Label htmlFor="use-ssl" className="text-sm">Use SSL/TLS</Label>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 space-y-2">
          <Label>Email Folder Configuration</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source-folder" className="text-sm">Source Folder</Label>
              <Select defaultValue="inbox">
                <SelectTrigger id="source-folder">
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbox">Inbox</SelectItem>
                  <SelectItem value="applications">Applications</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="processed-folder" className="text-sm">Processed Folder</Label>
              <Select defaultValue="processed">
                <SelectTrigger id="processed-folder">
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <Label>Processing Options</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="auto-process"
                className="rounded border-gray-300"
                defaultChecked={true}
              />
              <Label htmlFor="auto-process" className="text-sm">Automatically process new emails</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="deduplicate"
                className="rounded border-gray-300"
                defaultChecked={true}
              />
              <Label htmlFor="deduplicate" className="text-sm">Deduplicate candidates</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="daily-digest"
                className="rounded border-gray-300"
                defaultChecked={true}
              />
              <Label htmlFor="daily-digest" className="text-sm">Send daily digest email</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save Configuration</Button>
      </CardFooter>
    </Card>
  );
}
