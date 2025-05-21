
import { ProfileData } from "./types";
import { ProfileImageSection } from "./ProfileImageSection";
import { ProfileSocialLinks } from "./ProfileSocialLinks";

interface ProfileViewModeProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  canEdit: boolean;
  userRole: string;
}

export function ProfileViewMode({ 
  profileData,
  setProfileData,
  canEdit,
  userRole
}: ProfileViewModeProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex flex-col items-center gap-4">
        <ProfileImageSection 
          profileData={profileData} 
          setProfileData={setProfileData} 
          canEdit={canEdit} 
          userRole={userRole}
        />
        <ProfileSocialLinks 
          githubUrl={profileData.githubUrl} 
          linkedinUrl={profileData.linkedinUrl} 
        />
      </div>
      
      <div className="flex-1 space-y-4">
        <div>
          <h2 className="text-3xl font-bold">{profileData.name}</h2>
          <p className="text-xl text-muted-foreground">{profileData.jobTitle}</p>
          <p className="text-sm text-muted-foreground">{profileData.city}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">About Me</h3>
          <p className="text-muted-foreground">{profileData.summary}</p>
        </div>
      </div>
    </div>
  );
}
