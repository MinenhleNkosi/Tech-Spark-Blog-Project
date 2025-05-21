import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Badge data type
export interface BadgeItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  badgeUrl: string;
}

// Form schema for validation
export const badgeFormSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  issuer: z.string().min(2, { message: "Issuer is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }).default(""),
  badgeUrl: z.string().url({ message: "Please enter a valid URL" }).default("")
});

interface BadgesTabProps {
  initialBadges: BadgeItem[];
  readOnly?: boolean;
}

export default function BadgesTab({ initialBadges, readOnly = false }: BadgesTabProps) {
  const { toast } = useToast();
  const [badges, setBadges] = useState<BadgeItem[]>(initialBadges);
  const [isAddingBadge, setIsAddingBadge] = useState(false);

  // Form for adding badges
  const badgeForm = useForm<z.infer<typeof badgeFormSchema>>({
    resolver: zodResolver(badgeFormSchema),
    defaultValues: {
      title: "",
      issuer: "",
      date: new Date().toISOString().split('T')[0],
      imageUrl: "",
      badgeUrl: ""
    }
  });

  // Add badge
  const onSubmitBadge = (values: z.infer<typeof badgeFormSchema>) => {
    const newBadge: BadgeItem = {
      id: `badge-${Date.now()}`,
      title: values.title,
      issuer: values.issuer,
      date: values.date,
      imageUrl: values.imageUrl || "",  // Use empty string as fallback
      badgeUrl: values.badgeUrl || "",  // Use empty string as fallback
    };
    
    setBadges([...badges, newBadge]);
    setIsAddingBadge(false);
    badgeForm.reset();
    toast({
      title: "Badge added",
      description: "Your badge has been successfully added."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">My Badges</h3>
        {!readOnly && (
          <Button
            onClick={() => setIsAddingBadge(!isAddingBadge)}
          >
            {isAddingBadge ? "Cancel" : "Add Badge"}
          </Button>
        )}
      </div>
      
      {isAddingBadge && !readOnly && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Badge</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...badgeForm}>
              <form onSubmit={badgeForm.handleSubmit(onSubmitBadge)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={badgeForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Badge Title</FormLabel>
                        <FormControl>
                          <Input placeholder="React Expert" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={badgeForm.control}
                    name="issuer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issuing Organization</FormLabel>
                        <FormControl>
                          <Input placeholder="React Community" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={badgeForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Issued</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={badgeForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Badge Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/badge.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={badgeForm.control}
                    name="badgeUrl"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Badge URL (Verification)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/badge/123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingBadge(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Badge</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      {/* List of badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <Card key={badge.id} className="overflow-hidden flex flex-col">
            <div className="w-full aspect-square relative">
              <img 
                src={badge.imageUrl} 
                alt={badge.title}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
            <CardContent className="p-4 flex-1 flex flex-col">
              <h4 className="font-semibold text-lg">{badge.title}</h4>
              <p className="text-sm text-muted-foreground">
                Issued by {badge.issuer} on {new Date(badge.date).toLocaleDateString()}
              </p>
              {badge.badgeUrl && (
                <Button 
                  variant="link" 
                  className="p-0 h-auto mt-2 mt-auto"
                  asChild
                >
                  <a 
                    href={badge.badgeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Verify Badge
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {badges.length === 0 && (
        <div className="text-center p-12 text-muted-foreground">
          No badges added yet. {!readOnly && "Click \"Add Badge\" to get started."}
        </div>
      )}
    </div>
  );
}
