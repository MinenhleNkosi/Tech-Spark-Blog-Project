
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProfileData } from "./types";

interface ProfileImageSectionProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  canEdit: boolean;
  userRole: string;
}

export function ProfileImageSection({
  profileData,
  setProfileData,
  canEdit,
  userRole
}: ProfileImageSectionProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle profile image file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (JPEG, PNG, GIF, or WebP).",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select an image less than 5MB.",
        variant: "destructive"
      });
      return;
    }

    // Create object URL for the image
    const imageUrl = URL.createObjectURL(file);
    setProfileData({ ...profileData, profileImage: imageUrl });
    
    toast({
      title: "Profile image updated",
      description: "Your profile image has been successfully updated."
    });
  };

  // Open file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle image URL update (for non-file uploads)
  const handleImageUrlUpdate = () => {
    const newImageUrl = window.prompt("Enter the URL of your profile image:", profileData.profileImage);
    if (newImageUrl) {
      setProfileData({ ...profileData, profileImage: newImageUrl });
      toast({
        title: "Profile image updated",
        description: "Your profile image has been successfully updated."
      });
    }
  };

  return (
    <div className="relative w-48 h-48 overflow-hidden rounded-xl">
      <img 
        src={profileData.profileImage} 
        alt={profileData.name}
        className="w-full h-full object-cover"
      />
      {canEdit && (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="sm" 
              variant="secondary"
              className="absolute bottom-2 right-2"
            >
              Change Photo
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="flex flex-col gap-2">
              <Button
                size="sm" 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleUploadClick}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start"
                onClick={handleImageUrlUpdate}
              >
                Use Image URL
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileSelect}
              />
            </div>
          </PopoverContent>
        </Popover>
      )}
      {!canEdit && userRole !== "recruiter" && (
        <Button 
          size="sm" 
          variant="secondary"
          className="absolute bottom-2 right-2"
          onClick={handleImageUrlUpdate}
        >
          Change Photo
        </Button>
      )}
    </div>
  );
}
