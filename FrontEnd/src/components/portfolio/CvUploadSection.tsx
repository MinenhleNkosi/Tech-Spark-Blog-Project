
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthExtended } from "@/contexts/AuthContextExtended";
import { FileUp } from "lucide-react";

interface CvUploadSectionProps {
  initialCvUrl?: string | null;
}

export default function CvUploadSection({ initialCvUrl }: CvUploadSectionProps) {
  const [cvUrl, setCvUrl] = useState<string | null>(initialCvUrl || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { userRole } = useAuthExtended();
  const { toast } = useToast();
  const isAdmin = userRole === "admin";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CV file to upload",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // In a real app, you would upload the file to a server or storage service
      // For now, we'll simulate an upload with a timeout and use a local URL
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a local URL for the file (this will be temporary)
      const localUrl = URL.createObjectURL(selectedFile);
      setCvUrl(localUrl);
      
      toast({
        title: "CV uploaded successfully",
        description: `File "${selectedFile.name}" has been uploaded.`
      });
      
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your CV",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (cvUrl) {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = cvUrl;
      link.setAttribute('download', 'cv.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isAdmin) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>CV/Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileChange}
              className="max-w-md"
            />
            <p className="text-sm text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              type="submit" 
              disabled={!selectedFile || isUploading}
            >
              <FileUp className="mr-2" />
              {isUploading ? "Uploading..." : "Upload CV"}
            </Button>
            
            {cvUrl && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleDownload}
              >
                Download Current CV
              </Button>
            )}
          </div>
          
          {cvUrl && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-1">Currently uploaded CV:</p>
              <p className="text-sm font-medium truncate max-w-md">
                {selectedFile?.name || "cv.pdf"}
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
