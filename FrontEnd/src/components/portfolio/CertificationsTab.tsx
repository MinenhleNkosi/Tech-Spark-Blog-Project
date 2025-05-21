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

// Certification data type
export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  certUrl: string;
}

// Form schema for validation
export const certificationFormSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  issuer: z.string().min(2, { message: "Issuer is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }).default(""),
  certUrl: z.string().url({ message: "Please enter a valid URL" }).default("")
});

interface CertificationsTabProps {
  initialCertifications: CertificationItem[];
  readOnly?: boolean;
}

export default function CertificationsTab({ initialCertifications, readOnly = false }: CertificationsTabProps) {
  const { toast } = useToast();
  const [certifications, setCertifications] = useState<CertificationItem[]>(initialCertifications);
  const [isAddingCertification, setIsAddingCertification] = useState(false);

  // Form for adding certifications
  const certificationForm = useForm<z.infer<typeof certificationFormSchema>>({
    resolver: zodResolver(certificationFormSchema),
    defaultValues: {
      title: "",
      issuer: "",
      date: new Date().toISOString().split('T')[0],
      imageUrl: "",
      certUrl: ""
    }
  });

  // Add certification
  const onSubmitCertification = (values: z.infer<typeof certificationFormSchema>) => {
    const newCertification: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: values.title,
      issuer: values.issuer,
      date: values.date,
      imageUrl: values.imageUrl || "",  // Use empty string as fallback
      certUrl: values.certUrl || "",    // Use empty string as fallback
    };
    
    setCertifications([...certifications, newCertification]);
    setIsAddingCertification(false);
    certificationForm.reset();
    toast({
      title: "Certification added",
      description: "Your certification has been successfully added."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">My Certifications</h3>
        {!readOnly && (
          <Button
            onClick={() => setIsAddingCertification(!isAddingCertification)}
          >
            {isAddingCertification ? "Cancel" : "Add Certification"}
          </Button>
        )}
      </div>
      
      {isAddingCertification && !readOnly && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Certification</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...certificationForm}>
              <form onSubmit={certificationForm.handleSubmit(onSubmitCertification)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={certificationForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certification Title</FormLabel>
                        <FormControl>
                          <Input placeholder="AWS Certified Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={certificationForm.control}
                    name="issuer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issuing Organization</FormLabel>
                        <FormControl>
                          <Input placeholder="Amazon Web Services" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={certificationForm.control}
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
                    control={certificationForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/certificate.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={certificationForm.control}
                    name="certUrl"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Certificate URL (Verification)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/verify/123" {...field} />
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
                    onClick={() => setIsAddingCertification(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Certification</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      {/* List of certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={cert.imageUrl} 
                alt={cert.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-lg">{cert.title}</h4>
              <p className="text-sm text-muted-foreground">
                Issued by {cert.issuer} on {new Date(cert.date).toLocaleDateString()}
              </p>
              {cert.certUrl && (
                <Button 
                  variant="link" 
                  className="p-0 h-auto mt-2"
                  asChild
                >
                  <a 
                    href={cert.certUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Verify Certificate
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {certifications.length === 0 && (
        <div className="text-center p-12 text-muted-foreground">
          No certifications added yet. {!readOnly && "Click \"Add Certification\" to get started."}
        </div>
      )}
    </div>
  );
}
