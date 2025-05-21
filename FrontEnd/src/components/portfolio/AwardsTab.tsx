import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

// Award data type
export interface AwardItem {
  id: string;
  title: string;
  date: string;
  description: string;
  skills: string;
}

// Form schema for validation
export const awardFormSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().min(10, { message: "Description should be at least 10 characters" }),
  skills: z.string().min(2, { message: "Skills are required" })
});

interface AwardsTabProps {
  initialAwards: AwardItem[];
  readOnly?: boolean;
}

export default function AwardsTab({ initialAwards, readOnly = false }: AwardsTabProps) {
  const { toast } = useToast();
  const [awards, setAwards] = useState<AwardItem[]>(initialAwards);
  const [isAddingAward, setIsAddingAward] = useState(false);

  // Form for adding awards
  const awardForm = useForm<z.infer<typeof awardFormSchema>>({
    resolver: zodResolver(awardFormSchema),
    defaultValues: {
      title: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      skills: ""
    }
  });

  // Add award
  const onSubmitAward = (values: z.infer<typeof awardFormSchema>) => {
    const newAward: AwardItem = {
      id: `award-${Date.now()}`,
      title: values.title,
      date: values.date,
      description: values.description,
      skills: values.skills,
    };
    
    setAwards([...awards, newAward]);
    setIsAddingAward(false);
    awardForm.reset();
    toast({
      title: "Award added",
      description: "Your award has been successfully added."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">My Awards</h3>
        {!readOnly && (
          <Button
            onClick={() => setIsAddingAward(!isAddingAward)}
          >
            {isAddingAward ? "Cancel" : "Add Award"}
          </Button>
        )}
      </div>
      
      {isAddingAward && !readOnly && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Award</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...awardForm}>
              <form onSubmit={awardForm.handleSubmit(onSubmitAward)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={awardForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Award Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Outstanding Achievement Award" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={awardForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Awarded</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={awardForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your award and accomplishment" 
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={awardForm.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Leadership, Communication, Project Management" 
                            {...field}
                          />
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
                    onClick={() => setIsAddingAward(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Award</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      {/* List of awards */}
      <div className="space-y-4">
        {awards.map((award) => (
          <Card key={award.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-lg">{award.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Awarded on {new Date(award.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm mb-4">{award.description}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-sm font-medium text-tech-blue">Skills</p>
                  <div className="flex flex-wrap gap-2 mt-1 md:justify-end">
                    {award.skills.split(',').map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {awards.length === 0 && (
        <div className="text-center p-12 text-muted-foreground">
          No awards added yet. {!readOnly && "Click \"Add Award\" to get started."}
        </div>
      )}
    </div>
  );
}
