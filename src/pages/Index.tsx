
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { VerificationForm } from '@/components/VerificationForm';
import { VerificationCard } from '@/components/VerificationCard';
import { HistoryList } from '@/components/HistoryList';
import { VerificationRecord } from '@/utils/verificationService';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, AlertTriangle, ExternalLink } from 'lucide-react';

const Index = () => {
  const [latestVerification, setLatestVerification] = useState<VerificationRecord | null>(null);

  // Function to handle when verification is complete
  const handleVerificationComplete = (result: VerificationRecord) => {
    setLatestVerification(result);
    // Smooth scroll to the result
    setTimeout(() => {
      document.getElementById('verification-result')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  // Incase of refresh, auto scroll back to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground page-transition">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Powered by Internet Computer Protocol
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Immutable API Call 
              <span className="text-primary"> Verification</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Securely verify and record HTTP API calls with blockchain-level immutability. 
              Prove that you used a specific API at a specific time with the exact response preserved.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center text-sm font-medium">
                <Shield className="h-4 w-4 mr-1.5 text-primary" />
                Tamper-proof Records
              </div>
              <div className="flex items-center text-sm font-medium">
                <Lock className="h-4 w-4 mr-1.5 text-primary" />
                Cryptographically Secured
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Verification Section */}
      <section id="verifier" className="py-16 px-6 bg-gradient-to-b from-transparent to-secondary/50">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <VerificationForm onVerificationComplete={handleVerificationComplete} />
            </div>
            
            <div id="verification-result" className="lg:w-1/2">
              {latestVerification ? (
                <VerificationCard record={latestVerification} />
              ) : (
                <div className="neo-card flex flex-col items-center justify-center p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Verification Yet</h3>
                  <p className="text-muted-foreground max-w-md">
                    Use the verification form to make and verify an API call. The result will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* History Section */}
      <section id="history" className="py-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <HistoryList />
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-gradient-to-b from-transparent to-secondary/50">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              About API Provenance Guard
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <p>
                API Provenance Guard leverages Internet Computer Protocol's HTTP outcalls to create 
                verifiable records of API interactions. Each verification is securely stored and 
                cannot be modified after creation, ensuring the integrity of the record.
              </p>
              
              <div className="neo-card">
                <h3 className="text-lg font-medium mb-4 text-foreground">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary mr-3 mt-0.5">1</span>
                    <span>Submit an API endpoint to be verified through our secure interface.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary mr-3 mt-0.5">2</span>
                    <span>Our ICP canister makes the API call using HTTP outcalls and records all details.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary mr-3 mt-0.5">3</span>
                    <span>A cryptographic hash of the response is generated and stored on-chain.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary mr-3 mt-0.5">4</span>
                    <span>The verification record becomes immutable and can be accessed at any time.</span>
                  </li>
                </ol>
              </div>
              
              <p>
                <strong className="text-foreground">Use Cases:</strong> Third-party API verification, 
                financial transaction proofs, data provenance for compliance and auditing, 
                price verification for NFTs and DeFi, and much more.
              </p>
              
              <div className="flex items-center text-sm">
                <a 
                  href="https://internetcomputer.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary flex items-center hover:underline"
                >
                  Learn more about Internet Computer Protocol
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t subtle-border">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white text-xs font-medium">
                A
              </div>
              <span className="text-sm font-medium">API Provenance Guard</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} API Provenance Guard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
