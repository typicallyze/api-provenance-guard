
import React from 'react';
import { VerificationRecord, getVerificationRecords } from '@/utils/verificationService';
import { Badge } from '@/components/ui/badge';
import { VerificationCard } from './VerificationCard';
import { History, AlertCircle } from 'lucide-react';

export const HistoryList: React.FC = () => {
  const records = getVerificationRecords();
  
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Verification Records</h3>
        <p className="text-muted-foreground max-w-md">
          Use the verification form above to make and verify API calls. Your history will appear here.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium flex items-center">
          <History className="mr-2 h-5 w-5 text-primary" />
          Verification History
        </h2>
        <Badge variant="outline" className="font-medium">
          {records.length} {records.length === 1 ? 'Record' : 'Records'}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {records.map((record) => (
          <VerificationCard key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
};
