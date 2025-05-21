
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";

export function ContactInformation() {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-tech-blue" />
          <div>
            <p className="font-medium">Location</p>
            <p className="text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-tech-blue" />
          <div>
            <p className="font-medium">Email</p>
            <a href="mailto:hello@techspark.dev" className="text-muted-foreground hover:text-tech-blue">
              hello@techspark.dev
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-tech-blue" />
          <div>
            <p className="font-medium">Phone</p>
            <a href="tel:+14155550123" className="text-muted-foreground hover:text-tech-blue">
              +1 (415) 555-0123
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
