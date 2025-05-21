
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";

export function SocialConnections() {
  useEffect(() => {
    // Define the lord-icon custom element
    defineElement(lottie.loadAnimation);
  }, []);

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <lord-icon
            src="https://cdn.lordicon.com/xxdqfhbi.json"
            trigger="hover"
            colors="primary:#4361ee"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          Connect With Me
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Button asChild variant="outline" size="icon" className="rounded-full group">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
          </Button>
          
          <Button asChild variant="outline" size="icon" className="rounded-full group">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
          </Button>
          
          <Button asChild variant="outline" size="icon" className="rounded-full group">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
