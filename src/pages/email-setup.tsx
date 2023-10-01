
import React from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { EmailSetupForm } from '@/components/email/EmailSetupForm';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EmailSetup = () => {
  const { toast } = useToast();
  // For demo purposes, assume email is not connected
  const [emailConnected, setEmailConnected] = React.useState(false);
  
  const handleConnect = () => {
    // Simulate connection process
    toast({
      title: "Testing connection...",
      description: "Attempting to connect to the email account",
    });
    
    // Simulate successful connection after a delay
    setTimeout(() => {
      setEmailConnected(true);
      toast({
        title: "Connection successful",
        description: "Your email account has been connected successfully",
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Email Setup</h2>
          {emailConnected ? (
            <Button variant="outline" onClick={() => setEmailConnected(false)}>
              Disconnect
            </Button>
          ) : (
            <Button onClick={handleConnect}>
              Test Connection
            </Button>
          )}
        </div>
        
        {/* Connection Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>
              Current status of your email connection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {emailConnected ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Connected</p>
                    <p className="text-sm text-muted-foreground">
                      Your email account is connected and actively monitoring for new applications
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium">Not Connected</p>
                    <p className="text-sm text-muted-foreground">
                      Configure your email settings below to start processing applications
                    </p>
                  </div>
                </>
              )}
            </div>
            
            {emailConnected && (
              <div className="mt-4 bg-muted p-4 rounded-md">
                <h4 className="text-sm font-medium">Connection Details</h4>
                <dl className="mt-2 grid grid-cols-2 gap-1 text-sm">
                  <dt className="text-muted-foreground">Email Address:</dt>
                  <dd>recruiter@example.com</dd>
                  <dt className="text-muted-foreground">Server:</dt>
                  <dd>imap.gmail.com</dd>
                  <dt className="text-muted-foreground">Last Check:</dt>
                  <dd>Just now</dd>
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd className="text-green-600">Active</dd>
                </dl>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Email Configuration Form */}
        <EmailSetupForm />
      </div>
    </DashboardLayout>
  );
};

export default EmailSetup;
