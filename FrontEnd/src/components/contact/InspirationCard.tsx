
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";

export function InspirationCard() {
  useEffect(() => {
    // Define the lord-icon custom element
    defineElement(lottie.loadAnimation);
  }, []);

  return (
    <Card className="card bg-gradient-to-r from-tech-blue/10 to-tech-lightblue/5">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <lord-icon
            src="https://cdn.lordicon.com/hbvgknxo.json"
            trigger="hover"
            colors="primary:#4361ee,secondary:#7209b7"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
          <h4 className="text-lg font-medium">Inspiration</h4>
        </div>
        <p className="italic text-muted-foreground">
          "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
        </p>
      </CardContent>
    </Card>
  );
}
