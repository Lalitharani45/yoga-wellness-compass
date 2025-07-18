
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/pages/Onboarding";
import { Target } from "lucide-react";

interface GoalsStepProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
  onBack: () => void;
}

const primaryGoals = [
  { id: "pcod-reduction", title: "PCOD Management", description: "Reduce PCOD symptoms naturally" },
  { id: "thyroid-balance", title: "Thyroid Balance", description: "Normalize thyroid function" },
  { id: "diabetes-control", title: "Diabetes Control", description: "Manage blood sugar levels" },
  { id: "weight-loss", title: "Weight Loss", description: "Lose weight naturally" },
  { id: "weight-gain", title: "Weight Gain", description: "Healthy weight gain" },
  { id: "stress-reduction", title: "Stress & Anxiety Relief", description: "Mental wellness & calm" },
  { id: "digestive-health", title: "Digestive Health", description: "Improve gut health" },
  { id: "hormonal-balance", title: "Hormonal Balance", description: "Regulate hormones naturally" }
];

const secondaryGoals = [
  { id: "stress-reduction", title: "Stress Reduction", description: "Mental wellness" },
  { id: "better-sleep", title: "Better Sleep", description: "Improve sleep quality" },
  { id: "energy-boost", title: "Energy Boost", description: "Increase daily energy" },
  { id: "posture-improvement", title: "Posture Improvement", description: "Better posture" },
  { id: "immunity", title: "Immunity Boost", description: "Strengthen immune system" },
  { id: "digestive-health", title: "Digestive Health", description: "Improve digestion" }
];

const GoalsStep = ({ userData, onNext, onBack }: GoalsStepProps) => {
  const [primaryGoal, setPrimaryGoal] = useState(userData.primaryGoal);
  const [selectedSecondaryGoals, setSelectedSecondaryGoals] = useState<string[]>(userData.secondaryGoals);
  const [targetWeight, setTargetWeight] = useState("");
  const [duration, setDuration] = useState("");

  const isWeightGoal = primaryGoal === "weight-loss" || primaryGoal === "weight-gain";

  const handleSecondaryGoalToggle = (goalId: string) => {
    setSelectedSecondaryGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleSubmit = () => {
    if (primaryGoal) {
      const goalData: Partial<UserData> = { 
        primaryGoal,
        secondaryGoals: selectedSecondaryGoals 
      };
      
      if (isWeightGoal && targetWeight && duration) {
        goalData.targetWeight = targetWeight;
        goalData.duration = duration;
      }
      
      onNext(goalData);
    }
  };

  const canSubmit = primaryGoal && (!isWeightGoal || (targetWeight && duration));

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold">Set Your Wellness Goals</CardTitle>
          <CardDescription className="text-lg">Define what you want to achieve on your wellness journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Primary Goal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">What is your primary goal?</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {primaryGoals.map((goal) => (
                  <Card 
                    key={goal.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      primaryGoal === goal.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setPrimaryGoal(goal.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold mb-2">{goal.title}</h4>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Secondary Goals */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select secondary goals (optional)</h3>
              
              <div className="grid md:grid-cols-3 gap-3">
                {secondaryGoals.map((goal) => (
                  <Card 
                    key={goal.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedSecondaryGoals.includes(goal.id) ? 'ring-2 ring-green-500 bg-green-50' : ''
                    }`}
                    onClick={() => handleSecondaryGoalToggle(goal.id)}
                  >
                    <CardContent className="p-3 text-center">
                      <h4 className="font-medium text-sm mb-1">{goal.title}</h4>
                      <p className="text-xs text-gray-600">{goal.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {isWeightGoal && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-4">
                  {primaryGoal === "weight-loss" ? "Weight Loss" : "Weight Gain"} Details
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetWeight" className="text-blue-700">
                      Target Weight (kg)
                    </Label>
                    <Input
                      id="targetWeight"
                      type="number"
                      placeholder="e.g., 65"
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value)}
                      className="mt-2 border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration" className="text-blue-700">
                      Target Duration (months)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="e.g., 6"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mt-2 border-blue-300 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-4 mt-8">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12">
              Back
            </Button>
            <Button onClick={handleSubmit} className="flex-1 h-12" disabled={!canSubmit}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsStep;
