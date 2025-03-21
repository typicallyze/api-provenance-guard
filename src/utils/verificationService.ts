
import { toast } from "@/hooks/use-toast";

// Types for verification
export interface VerificationRequest {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface VerificationRecord {
  id: string;
  timestamp: string;
  request: VerificationRequest;
  response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: any;
  };
  verified: boolean;
  hash: string;
}

// Mock function to simulate ICP HTTP outcalls and verification
export const verifyApiCall = async (request: VerificationRequest): Promise<VerificationRecord> => {
  try {
    // Create request options
    const options: RequestInit = {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    };

    // Make the actual API call
    const response = await fetch(request.url, options);
    const responseData = await response.json();
    
    // In a real app, this hash would be calculated by the ICP canister
    // and stored on-chain for immutable verification
    const hashValue = await generateMockHash(JSON.stringify(responseData));
    
    // Create verification record
    const record: VerificationRecord = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      request,
      response: {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseData
      },
      verified: true,
      hash: hashValue
    };
    
    // Store in local storage (in a real app, this would be stored on-chain)
    saveVerificationRecord(record);
    
    return record;
  } catch (error) {
    console.error("API verification failed:", error);
    toast({
      title: "Verification Failed",
      description: error instanceof Error ? error.message : "Failed to verify API call",
      variant: "destructive"
    });
    throw error;
  }
};

// Get all verification records
export const getVerificationRecords = (): VerificationRecord[] => {
  try {
    const records = localStorage.getItem('verificationRecords');
    return records ? JSON.parse(records) : [];
  } catch (e) {
    console.error("Failed to get verification records:", e);
    return [];
  }
};

// Save a verification record
export const saveVerificationRecord = (record: VerificationRecord): void => {
  try {
    const records = getVerificationRecords();
    const updatedRecords = [record, ...records];
    localStorage.setItem('verificationRecords', JSON.stringify(updatedRecords));
  } catch (e) {
    console.error("Failed to save verification record:", e);
  }
};

// Get a single verification record by ID
export const getVerificationRecordById = (id: string): VerificationRecord | undefined => {
  const records = getVerificationRecords();
  return records.find(record => record.id === id);
};

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Mock hash generation (would be done on-chain in a real implementation)
const generateMockHash = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
