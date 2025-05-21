
import {
  initialProfileData,
  initialCertifications,
  initialBadges,
  initialAwards
} from "@/components/portfolio/initialData";
import ProfileSection from "@/components/portfolio/ProfileSection";
import AchievementsSection from "@/components/portfolio/AchievementsSection";
import CvUploadSection from "@/components/portfolio/CvUploadSection";
import { useAuthExtended } from "@/contexts/AuthContextExtended";

export default function Portfolio() {
  const { userRole } = useAuthExtended();
  const isAdmin = userRole === "admin";
  const isRecruiter = userRole === "recruiter";
  const canEdit = isAdmin; // Only admin can edit
  const canView = isAdmin || isRecruiter; // Both admin and recruiter can view
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="gradient-text">Portfolio</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {isRecruiter ? (
            "Welcome to the portfolio view. As a recruiter, you can review profile information and download the CV."
          ) : (
            "Welcome to my portfolio page. Here you can find information about my professional background, skills, and achievements."
          )}
        </p>
      </div>

      {/* Profile Section */}
      <ProfileSection initialProfileData={initialProfileData} readOnly={!canEdit} />
      
      {/* CV Upload Section - only visible for admin */}
      {isAdmin && <CvUploadSection initialCvUrl={initialProfileData.cvUrl} />}
      
      {/* CV Download Section - visible for recruiters */}
      {isRecruiter && initialProfileData.cvUrl && (
        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-200 shadow-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Download CV</h2>
            <p className="text-muted-foreground mb-4">
              You can download the latest version of the CV below.
            </p>
          </div>
          <a 
            href={initialProfileData.cvUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-tech-blue text-white rounded-md hover:bg-tech-blue/90 transition"
          >
            Download CV
          </a>
        </div>
      )}
      
      {/* Achievements Section - read-only for recruiters */}
      <AchievementsSection 
        initialCertifications={initialCertifications}
        initialBadges={initialBadges}
        initialAwards={initialAwards}
        readOnly={!canEdit}
      />
    </div>
  );
}
