
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

interface ProfileSocialLinksProps {
  githubUrl: string;
  linkedinUrl: string;
}

export function ProfileSocialLinks({ githubUrl, linkedinUrl }: ProfileSocialLinksProps) {
  return (
    <div className="flex gap-4 mt-2">
      <Button asChild size="icon" variant="outline">
        <a 
          href={githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
      </Button>
      <Button asChild size="icon" variant="outline">
        <a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </Button>
    </div>
  );
}
