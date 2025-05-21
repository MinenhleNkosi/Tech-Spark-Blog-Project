
import { useAuthExtended } from "@/contexts/AuthContextExtended";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { SocialConnections } from "@/components/contact/SocialConnections";
import { InspirationCard } from "@/components/contact/InspirationCard";

export default function Contact() {
  const { userRole } = useAuthExtended();
  const isRecruiter = userRole === "recruiter";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="gradient-text">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Have a question or want to work together? Feel free to reach out using the contact form below
          {!isRecruiter && " or connect with me on social media"}.
        </p>
      </div>
      
      <div className={`grid grid-cols-1 ${!isRecruiter ? "lg:grid-cols-2" : ""} gap-8`}>
        {/* Contact Form */}
        <ContactForm />
        
        {/* Contact Information - Only show for non-recruiter users */}
        {!isRecruiter && (
          <div className="space-y-6">
            <ContactInformation />
            <SocialConnections />
            <InspirationCard />
          </div>
        )}
      </div>
    </div>
  );
}
