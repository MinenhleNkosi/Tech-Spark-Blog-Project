
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type ProfileFormValues = {
  name: string;
  email: string;
  skills: string;
  github: string;
  linkedin: string;
  twitter: string;
};

export default function Profile() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      skills: "",
      github: "",
      linkedin: "",
      twitter: ""
    }
  });

  useEffect(() => {
    // Load profile data from localStorage if available
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      Object.entries(profileData).forEach(([key, value]) => {
        setValue(key as keyof ProfileFormValues, value as string);
      });
      
      // Load avatar if saved
      const savedAvatar = localStorage.getItem("userAvatar");
      if (savedAvatar) {
        setPreviewUrl(savedAvatar);
      }
    }
  }, [setValue]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        localStorage.setItem("userAvatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    // Save profile data to localStorage
    localStorage.setItem("userProfile", JSON.stringify(data));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    // Redirect to home page after saving changes
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <Avatar className="h-24 w-24">
            {previewUrl ? (
              <AvatarImage src={previewUrl} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-tech-blue/20 text-xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="absolute bottom-0 right-0">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="bg-white rounded-full p-1 border shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                  <path d="m18 2 4 4"></path>
                  <path d="m14 6 4 4"></path>
                </svg>
              </div>
            </label>
            <Input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Textarea 
            id="skills" 
            placeholder="JavaScript, React, Node.js, etc."
            {...register("skills")}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-gray-500" />
              <Input 
                placeholder="GitHub URL" 
                {...register("github")}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Linkedin className="h-5 w-5 text-gray-500" />
              <Input 
                placeholder="LinkedIn URL" 
                {...register("linkedin")}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Twitter className="h-5 w-5 text-gray-500" />
              <Input 
                placeholder="Twitter/X URL" 
                {...register("twitter")}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="bg-tech-blue hover:bg-tech-blue/90">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
