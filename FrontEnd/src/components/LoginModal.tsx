
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: () => void;
  onRegisterClick?: () => void;
  initialEmail?: string;
  initialPassword?: string;
}

export function LoginModal({ 
  open, 
  onOpenChange, 
  onLoginSuccess,
  onRegisterClick,
  initialEmail = "",
  initialPassword = ""
}: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: initialEmail,
      password: initialPassword,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Create a user object
      const user = {
        id: crypto.randomUUID(),
        name: "User", // In a real app, you'd get the name from the API
        email: values.email
      };
      
      // Login the user
      login(user);
      
      toast.success("Login successful!");
      setIsLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Enter your credentials to continue
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
        
        {onRegisterClick && (
          <div className="w-full flex items-center justify-center mt-4">
            <div className="text-sm text-center">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-primary"
                onClick={onRegisterClick}
              >
                Create an account
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
