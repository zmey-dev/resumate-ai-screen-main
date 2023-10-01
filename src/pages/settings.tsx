import React from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been applied successfully",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="ai">AI Configuration</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>
                  Your personal account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Global Staffing Co." />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dashboard-layout">Dashboard Layout</Label>
                  <Select defaultValue="default">
                    <SelectTrigger id="dashboard-layout">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="expanded">Expanded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* AI Configuration Settings */}
          <TabsContent value="ai" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Settings</CardTitle>
                <CardDescription>
                  Configure the AI model used for resume analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger id="ai-model">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="match-threshold">Match Threshold</Label>
                  <div className="flex items-center gap-2">
                    <Input id="match-threshold" type="number" defaultValue="70" min="0" max="100" />
                    <span>%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Minimum match score required to consider a candidate a good fit
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ranking-criteria">Ranking Criteria</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger id="ranking-criteria">
                      <SelectValue placeholder="Select criteria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="skills-focused">Skills-Focused</SelectItem>
                      <SelectItem value="experience-focused">Experience-Focused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resume Parsing Configuration</CardTitle>
                <CardDescription>
                  Configure how resumes are processed and analyzed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parser-engine">Resume Parser</Label>
                  <Select defaultValue="custom">
                    <SelectTrigger id="parser-engine">
                      <SelectValue placeholder="Select parser" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom AI Parser</SelectItem>
                      <SelectItem value="affinda">Affinda</SelectItem>
                      <SelectItem value="sovren">Sovren</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Processing Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="extract-contact"
                        defaultChecked
                      />
                      <Label htmlFor="extract-contact" className="text-sm">Extract contact information</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="extract-skills"
                        defaultChecked
                      />
                      <Label htmlFor="extract-skills" className="text-sm">Extract skills and technologies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="extract-education"
                        defaultChecked
                      />
                      <Label htmlFor="extract-education" className="text-sm">Extract education details</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="extract-experience"
                        defaultChecked
                      />
                      <Label htmlFor="extract-experience" className="text-sm">Extract work experience</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Configure when and how you receive email notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notify-new-applications"
                        defaultChecked
                      />
                      <Label htmlFor="notify-new-applications" className="text-sm">New applications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="daily-digest"
                        defaultChecked
                      />
                      <Label htmlFor="daily-digest" className="text-sm">Daily application digest</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="weekly-report"
                        defaultChecked
                      />
                      <Label htmlFor="weekly-report" className="text-sm">Weekly summary report</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="digest-time">Daily Digest Time</Label>
                  <Select defaultValue="09:00">
                    <SelectTrigger id="digest-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="17:00">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="digest-recipients">Additional Recipients</Label>
                  <Textarea 
                    id="digest-recipients" 
                    placeholder="Enter email addresses, separated by commas"
                  />
                  <p className="text-xs text-muted-foreground">
                    These people will also receive the daily digest email
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Slack Integration</CardTitle>
                <CardDescription>
                  Configure notifications to Slack
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input id="slack-webhook" placeholder="https://hooks.slack.com/..." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slack-channel">Slack Channel</Label>
                  <Input id="slack-channel" placeholder="#recruiting" />
                </div>
                
                <div className="space-y-2">
                  <Label>Slack Notification Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="slack-new-applications"
                        defaultChecked
                      />
                      <Label htmlFor="slack-new-applications" className="text-sm">New applications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="slack-high-match"
                        defaultChecked
                      />
                      <Label htmlFor="slack-high-match" className="text-sm">High match candidates (&gt;80%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="slack-summary"
                        defaultChecked
                      />
                      <Label htmlFor="slack-summary" className="text-sm">Daily summary</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => toast({ title: "Slack Notification", description: "Test notification sent to Slack" })}>
                  Test Slack Integration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* API Keys Settings */}
          <TabsContent value="api" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>OpenAI API Configuration</CardTitle>
                <CardDescription>
                  Configure your OpenAI API key for resume analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <Input id="openai-key" type="password" placeholder="sk-..." />
                  <p className="text-xs text-muted-foreground">
                    Your OpenAI API key is securely stored and never shared
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="openai-org">OpenAI Organization ID (Optional)</Label>
                  <Input id="openai-org" placeholder="org-..." />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => toast({ title: "API Key Validated", description: "Your OpenAI API key is valid and working" })}>
                  Validate API Key
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resume Parser API</CardTitle>
                <CardDescription>
                  Configure external resume parser API keys (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="affinda-key">Affinda API Key (Optional)</Label>
                  <Input id="affinda-key" type="password" placeholder="Enter your Affinda API key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sovren-key">Sovren API Key (Optional)</Label>
                  <Input id="sovren-key" type="password" placeholder="Enter your Sovren API key" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
