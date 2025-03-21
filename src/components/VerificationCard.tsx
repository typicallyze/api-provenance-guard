
import React from 'react';
import { Card } from '@/components/ui/card';
import { ApiResponseViewer } from '@/components/ApiResponseViewer';
import { VerificationRecord } from '@/utils/verificationService';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Globe, ArrowRight } from 'lucide-react';

interface VerificationCardProps {
  record: VerificationRecord;
  className?: string;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({ record, className }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card className={`neo-card hover-lift ${className}`}>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium flex items-center">
            <Globe className="w-5 h-5 mr-2 text-primary" />
            API Verification Record
          </h2>
          <Badge variant={record.verified ? "outline" : "destructive"} className="font-medium">
            {record.verified ? (
              <span className="flex items-center">
                <CheckCircle className="mr-1 h-3.5 w-3.5" /> Verified
              </span>
            ) : (
              <span className="flex items-center">
                <XCircle className="mr-1 h-3.5 w-3.5" /> Unverified
              </span>
            )}
          </Badge>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <time dateTime={record.timestamp}>
            {formatDate(record.timestamp)}
          </time>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-secondary/50 p-3 rounded-md">
          <h3 className="text-sm font-medium mb-2">Request Details</h3>
          <div className="flex flex-wrap items-center text-sm mb-1 overflow-hidden">
            <Badge variant="secondary" className="mr-2 mb-1">
              {record.request.method}
            </Badge>
            <span className="truncate text-muted-foreground font-mono text-xs max-w-full">
              {record.request.url}
            </span>
          </div>
          
          {record.request.headers && Object.keys(record.request.headers).length > 0 && (
            <details className="mt-2">
              <summary className="text-xs cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                Headers
              </summary>
              <div className="mt-2 text-xs font-mono bg-background/50 p-2 rounded-md overflow-x-auto">
                <pre>{JSON.stringify(record.request.headers, null, 2)}</pre>
              </div>
            </details>
          )}
          
          {record.request.body && (
            <details className="mt-2">
              <summary className="text-xs cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                Body
              </summary>
              <div className="mt-2 text-xs font-mono bg-background/50 p-2 rounded-md overflow-x-auto">
                <pre>{JSON.stringify(record.request.body, null, 2)}</pre>
              </div>
            </details>
          )}
        </div>
        
        <div className="flex justify-center">
          <ArrowRight className="text-primary/50" />
        </div>
        
        <ApiResponseViewer 
          data={record.response.body} 
          status={record.response.status}
          hash={record.hash}
        />
      </div>
    </Card>
  );
};
