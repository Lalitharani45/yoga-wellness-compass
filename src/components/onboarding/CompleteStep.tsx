
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserData } from "@/pages/Onboarding";
import { CheckCircle } from "lucide-react";

interface CompleteStepProps {
  userData: UserData;
  onNext: () => void;
  onBack: () => void;
}

const CompleteStep = ({ userData, onNext, onBack }: CompleteStepProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg text-center">
        <CardHeader>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-600">Setup Complete!</CardTitle>
          <CardDescription className="text-lg">
            Welcome to SmartWell, {userData.fullName}! Your personalized wellness journey is ready to begin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Your Personalized Plan Includes:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Custom yoga routines</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Personalized diet plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Health condition support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Progress tracking</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12">
              Back
            </Button>
            <Button onClick={onNext} className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600">
              Start Your Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteStep;
