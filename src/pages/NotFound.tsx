
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="neo-card max-w-md w-full animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <AlertTriangle className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-white transition-all duration-300"
          >
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
