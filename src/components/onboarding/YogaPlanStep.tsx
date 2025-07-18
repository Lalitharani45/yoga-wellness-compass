
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserData } from "@/pages/Onboarding";
import { Heart, Clock, Target, Star } from "lucide-react";

interface YogaPlanStepProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
  onBack: () => void;
}

const yogaExperienceOptions = [
  { level: "Beginner", description: "New to yoga", duration: "15-20 minutes" },
  { level: "Intermediate", description: "Some yoga experience", duration: "25-35 minutes" },
  { level: "Advanced", description: "Regular practitioner", duration: "40-60 minutes" }
];

const yogaStyles = [
  { id: "hatha", name: "Hatha Yoga", description: "Gentle, slow-paced practice" },
  { id: "vinyasa", name: "Vinyasa Flow", description: "Dynamic movement with breath" },
  { id: "ashtanga", name: "Ashtanga", description: "Traditional structured sequence" },
  { id: "iyengar", name: "Iyengar", description: "Alignment and precision focused" }
];

const practiceGoals = [
  { id: "flexibility", label: "Flexibility" },
  { id: "strength", label: "Strength" },
  { id: "stress", label: "Stress Relief" },
  { id: "meditation", label: "Meditation" },
  { id: "balance", label: "Balance" },
  { id: "breathing", label: "Pranayama (Breathing)" }
];

const practiceTime = [
  { id: "morning", label: "Morning", time: "5:30 - 7:00 AM" },
  { id: "evening", label: "Evening", time: "6:00 - 8:00 PM" },
  { id: "both", label: "Both", time: "Morning & Evening" }
];

const YogaPlanStep = ({ userData, onNext, onBack }: YogaPlanStepProps) => {
  const [selectedExperience, setSelectedExperience] = useState(userData.yogaExperience);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleSubmit = () => {
    if (selectedExperience && selectedStyle && selectedGoals.length > 0 && selectedTime) {
      onNext({ 
        yogaExperience: selectedExperience,
        yogaStyle: selectedStyle,
        yogaGoals: selectedGoals,
        yogaTime: selectedTime
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-orange-200">
        <CardHeader className="text-center bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-orange-800">Your Personalized Yoga Journey</CardTitle>
          <CardDescription className="text-lg text-orange-600">
            Create your sacred practice tailored to your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Experience Level */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-orange-800">Experience Level</h3>
            </div>

            <RadioGroup value={selectedExperience} onValueChange={setSelectedExperience} className="space-y-4">
              {yogaExperienceOptions.map((option) => (
                <div key={option.level} className="flex items-center space-x-3 p-4 border border-orange-200 rounded-lg hover:bg-orange-25">
                  <RadioGroupItem value={option.level} id={option.level} />
                  <Label htmlFor={option.level} className="flex-1 cursor-pointer">
                    <div className="font-medium text-orange-800">{option.level}</div>
                    <div className="text-sm text-orange-600">{option.description}</div>
                    <div className="text-sm text-orange-500 flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {option.duration}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Yoga Style */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800">Yoga Style</h3>
            </div>

            <RadioGroup value={selectedStyle} onValueChange={setSelectedStyle} className="grid md:grid-cols-2 gap-4">
              {yogaStyles.map((style) => (
                <div key={style.id} className="flex items-center space-x-3 p-4 border border-amber-200 rounded-lg hover:bg-amber-25">
                  <RadioGroupItem value={style.id} id={style.id} />
                  <Label htmlFor={style.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-amber-800">{style.name}</div>
                    <div className="text-sm text-amber-600">{style.description}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Practice Goals */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-6">Practice Goals</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {practiceGoals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-3 p-3 border border-green-200 rounded-lg hover:bg-green-25">
                  <Checkbox 
                    id={goal.id}
                    checked={selectedGoals.includes(goal.id)}
                    onCheckedChange={() => handleGoalToggle(goal.id)}
                  />
                  <Label htmlFor={goal.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-green-800">{goal.label}</div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Time */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-6">Preferred Practice Time</h3>
            <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className="space-y-4">
              {practiceTime.map((time) => (
                <div key={time.id} className="flex items-center space-x-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-25">
                  <RadioGroupItem value={time.id} id={time.id} />
                  <Label htmlFor={time.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-blue-800">{time.label}</div>
                    <div className="text-sm text-blue-600">{time.time}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex space-x-4 mt-8">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12 border-orange-300 text-orange-700 hover:bg-orange-50">
              Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600" 
              disabled={!selectedExperience || !selectedStyle || selectedGoals.length === 0 || !selectedTime}
            >
              Create Yoga Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YogaPlanStep;
