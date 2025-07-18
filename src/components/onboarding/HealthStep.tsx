
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UserData } from "@/pages/Onboarding";
import { Heart } from "lucide-react";

interface HealthStepProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
  onBack: () => void;
}

const primaryHealthConditions = [
  "Diabetes Type 2",
  "Hypertension", 
  "Heart Disease",
  "Arthritis",
  "Thyroid Disorders",
  "PCOD/PCOS",
  "Obesity",
  "High Cholesterol"
];

const secondaryHealthConditions = [
  "Anxiety & Stress",
  "Lower Back Pain",
  "Insomnia",
  "Digestive Issues",
  "Joint Pain",
  "Chronic Fatigue",
  "Migraine",
  "Depression"
];

const HealthStep = ({ userData, onNext, onBack }: HealthStepProps) => {
  const [selectedPrimaryConditions, setSelectedPrimaryConditions] = useState<string[]>(userData.primaryHealthConditions);
  const [selectedSecondaryConditions, setSelectedSecondaryConditions] = useState<string[]>(userData.secondaryHealthConditions);

  const handlePrimaryConditionChange = (condition: string, checked: boolean) => {
    setSelectedPrimaryConditions(prev => 
      checked 
        ? [...prev, condition]
        : prev.filter(c => c !== condition)
    );
  };

  const handleSecondaryConditionChange = (condition: string, checked: boolean) => {
    setSelectedSecondaryConditions(prev => 
      checked 
        ? [...prev, condition]
        : prev.filter(c => c !== condition)
    );
  };

  const handleSubmit = () => {
    onNext({ 
      primaryHealthConditions: selectedPrimaryConditions,
      secondaryHealthConditions: selectedSecondaryConditions 
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-bold">Health Assessment</CardTitle>
          <CardDescription className="text-lg">Help us understand your health to provide personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Primary Health Conditions */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm font-bold">!</span>
              </div>
              <h3 className="text-lg font-semibold text-red-800">Primary Health Conditions</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {primaryHealthConditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={`primary-${condition}`}
                    checked={selectedPrimaryConditions.includes(condition)}
                    onCheckedChange={(checked) => handlePrimaryConditionChange(condition, !!checked)}
                  />
                  <Label htmlFor={`primary-${condition}`} className="text-sm">{condition}</Label>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 mt-4">
              Select major health conditions that require careful monitoring and medical attention.
            </p>
          </div>

          {/* Secondary Health Conditions */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-sm font-bold">+</span>
              </div>
              <h3 className="text-lg font-semibold text-orange-800">Secondary Health Conditions</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {secondaryHealthConditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={`secondary-${condition}`}
                    checked={selectedSecondaryConditions.includes(condition)}
                    onCheckedChange={(checked) => handleSecondaryConditionChange(condition, !!checked)}
                  />
                  <Label htmlFor={`secondary-${condition}`} className="text-sm">{condition}</Label>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 mt-4">
              Select minor conditions or symptoms that affect your daily wellness routine.
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12">
              Back
            </Button>
            <Button onClick={handleSubmit} className="flex-1 h-12">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthStep;
