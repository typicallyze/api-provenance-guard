
import React, { useState } from 'react';
import { VerificationRequest, verifyApiCall } from '@/utils/verificationService';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Loader2, Send, Globe } from 'lucide-react';

interface VerificationFormProps {
  onVerificationComplete: (result: any) => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({ onVerificationComplete }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState('{\n  "title": "Example request",\n  "completed": false\n}');
  const [activeTab, setActiveTab] = useState('url');

  const handleVerify = async () => {
    try {
      setLoading(true);

      // Basic validation
      if (!url) {
        toast({
          title: "Missing URL",
          description: "Please enter a valid API URL",
          variant: "destructive"
        });
        return;
      }

      let parsedHeaders = {};
      if (headers) {
        try {
          parsedHeaders = JSON.parse(headers);
        } catch (e) {
          toast({
            title: "Invalid Headers",
            description: "Please enter valid JSON for headers",
            variant: "destructive"
          });
          return;
        }
      }

      let parsedBody = undefined;
      if (method !== 'GET' && method !== 'HEAD' && body) {
        try {
          parsedBody = body;
        } catch (e) {
          toast({
            title: "Invalid Body",
            description: "Please enter valid JSON for request body",
            variant: "destructive"
          });
          return;
        }
      }

      const request: VerificationRequest = {
        url,
        method,
        headers: parsedHeaders,
        body: parsedBody
      };

      const result = await verifyApiCall(request);
      onVerificationComplete(result);
      
      toast({
        title: "Verification Successful",
        description: "API call has been verified and recorded",
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="neo-card overflow-hidden animate-fade-in">
      <h2 className="text-xl font-medium mb-6 flex items-center">
        <Globe className="mr-2 h-5 w-5 text-primary" />
        API Verification
      </h2>
      
      <Tabs defaultValue="url" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="url">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-1">
                API Endpoint URL
              </label>
              <Input
                id="url"
                placeholder="https://api.example.com/endpoint"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="method" className="block text-sm font-medium mb-1">
                Request Method
              </label>
              <Select defaultValue={method} onValueChange={setMethod}>
                <SelectTrigger id="method" className="w-full">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleVerify}
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Verifying...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> 
                Verify API Call
              </>
            )}
          </Button>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="headers" className="block text-sm font-medium mb-1">
                Request Headers (JSON)
              </label>
              <Textarea 
                id="headers"
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder="Enter headers as JSON"
                className="font-mono text-sm h-20"
              />
            </div>
            
            {method !== 'GET' && method !== 'HEAD' && (
              <div>
                <label htmlFor="body" className="block text-sm font-medium mb-1">
                  Request Body
                </label>
                <Textarea 
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter request body"
                  className="font-mono text-sm h-32"
                />
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleVerify}
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Verifying...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> 
                Verify API Call
              </>
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
