
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-lg bg-background/80 subtle-border",
      className
    )}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-medium">
            A
          </div>
          <h1 className="text-lg font-medium tracking-tight">
            <span className="text-primary">API</span> Provenance Guard
          </h1>
        </div>
        
        <div className="flex items-center space-x-1">
          <a 
            href="#verifier" 
            className="px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Verifier
          </a>
          <a 
            href="#history" 
            className="px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            History
          </a>
          <a 
            href="#about" 
            className="px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            About
          </a>
        </div>
      </div>
    </header>
  );
};
