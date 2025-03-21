
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApiResponseViewerProps {
  data: any;
  status?: number;
  timestamp?: string;
  hash?: string;
  className?: string;
}

export const ApiResponseViewer: React.FC<ApiResponseViewerProps> = ({
  data,
  status,
  timestamp,
  hash,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const formattedJson = JSON.stringify(data, null, 2);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status?: number) => {
    if (!status) return 'bg-gray-500';
    if (status >= 200 && status < 300) return 'bg-green-500';
    if (status >= 300 && status < 400) return 'bg-blue-500';
    if (status >= 400 && status < 500) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className={cn(
      "neo-card overflow-hidden animate-slide-up",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">API Response</h3>
          {status && (
            <Badge variant="outline" className="ml-2">
              <span 
                className={`w-2 h-2 rounded-full mr-1.5 ${getStatusColor(status)}`} 
              />
              Status: {status}
            </Badge>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {(timestamp || hash) && (
        <div className="mb-4 flex flex-col space-y-1">
          {timestamp && (
            <p className="text-xs text-muted-foreground">
              Verified at: {new Date(timestamp).toLocaleString()}
            </p>
          )}
          {hash && (
            <p className="text-xs text-muted-foreground font-mono break-all">
              Hash: {hash}
            </p>
          )}
        </div>
      )}
      
      <Tabs defaultValue="formatted">
        <TabsList className="mb-2">
          <TabsTrigger value="formatted">Formatted</TabsTrigger>
          <TabsTrigger value="raw">Raw</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formatted" className="relative">
          <pre className="bg-secondary/50 p-4 rounded-md overflow-auto max-h-[400px] text-sm font-mono">
            {formattedJson}
          </pre>
        </TabsContent>
        
        <TabsContent value="raw">
          <div className="bg-secondary/50 p-4 rounded-md overflow-auto max-h-[400px]">
            <code className="text-sm font-mono whitespace-pre-wrap break-all">
              {JSON.stringify(data)}
            </code>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
