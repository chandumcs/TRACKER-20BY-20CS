import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
