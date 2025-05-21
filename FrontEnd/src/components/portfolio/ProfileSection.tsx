
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthExtended } from "@/contexts/AuthContextExtended";
import * as z from "zod";

import { ProfileViewMode } from "./profile/ProfileViewMode";
import { ProfileEditForm } from "./profile/ProfileEditForm";
import { ProfileData, profileFormSchema } from "./profile/types";

interface ProfileSectionProps {
  initialProfileData: ProfileData;
  readOnly?: boolean;
}

export default function ProfileSection({ initialProfileData, readOnly = false }: ProfileSectionProps) {
  const { toast } = useToast();
  const { userRole } = useAuthExtended();
  const isAdmin = userRole === "admin";
  const canEdit = isAdmin && !readOnly;
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  
  // Save profile changes
  const onSubmitProfile = (values: z.infer<typeof profileFormSchema>) => {
    setProfileData({ ...profileData, ...values });
    setIsEditingProfile(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Professional Profile</CardTitle>
          {!readOnly && (
            <Button 
              variant="outline" 
              onClick={() => {
                if (isEditingProfile) {
                  setIsEditingProfile(false);
                } else {
                  setIsEditingProfile(true);
                }
              }}
            >
              {isEditingProfile ? "Cancel" : "Edit Profile"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isEditingProfile ? (
          <ProfileViewMode 
            profileData={profileData}
            setProfileData={setProfileData}
            canEdit={canEdit}
            userRole={userRole}
          />
        ) : (
          <ProfileEditForm 
            profileData={profileData}
            setProfileData={setProfileData}
            onCancel={() => setIsEditingProfile(false)}
            onSave={onSubmitProfile}
          />
        )}
      </CardContent>
    </Card>
  );
}
