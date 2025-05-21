
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key } from "lucide-react";
import { toast } from "sonner";

interface RecruiterAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecruiterAccessModal({ open, onOpenChange }: RecruiterAccessModalProps) {
  const [accessCode, setAccessCode] = useState("");
  const { setUserRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would validate the access code against a database
    // For this demo, we'll accept any non-empty code
    if (accessCode.trim()) {
      setUserRole("recruiter");
      toast.success("Welcome! You are now logged in as a Recruiter");
      onOpenChange(false);
      // Navigate to portfolio page
      navigate("/portfolio");
    } else {
      toast.error("Please enter a valid access code");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-tech-blue" />
            <span>Recruiter Access</span>
          </DialogTitle>
          <DialogDescription>
            Enter the access code provided by the admin to view the portfolio as a recruiter.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter code to access Recruiter page"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="mt-2"
          />
          <div className="flex justify-end">
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
