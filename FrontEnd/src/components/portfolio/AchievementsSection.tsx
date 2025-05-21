
import { useState } from "react";
import { Award, Badge, FileImage } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CertificationsTab, { CertificationItem } from "./CertificationsTab";
import BadgesTab, { BadgeItem } from "./BadgesTab";
import AwardsTab, { AwardItem } from "./AwardsTab";

interface AchievementsSectionProps {
  initialCertifications: CertificationItem[];
  initialBadges: BadgeItem[];
  initialAwards: AwardItem[];
  readOnly?: boolean; // Added readOnly property
}

export default function AchievementsSection({ 
  initialCertifications, 
  initialBadges, 
  initialAwards,
  readOnly = false // Default to false if not provided
}: AchievementsSectionProps) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>My certifications, badges, and awards</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="certifications" className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="certifications" className="flex items-center gap-2">
              <FileImage className="h-4 w-4" /> Certifications
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Badge className="h-4 w-4" /> Badges
            </TabsTrigger>
            <TabsTrigger value="awards" className="flex items-center gap-2">
              <Award className="h-4 w-4" /> Awards
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="certifications">
            <CertificationsTab initialCertifications={initialCertifications} readOnly={readOnly} />
          </TabsContent>
          
          <TabsContent value="badges">
            <BadgesTab initialBadges={initialBadges} readOnly={readOnly} />
          </TabsContent>
          
          <TabsContent value="awards">
            <AwardsTab initialAwards={initialAwards} readOnly={readOnly} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
