
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserData } from "@/pages/Onboarding";
import { Leaf, Droplets, Clock } from "lucide-react";

interface DietPreferencesStepProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
  onBack: () => void;
}

const dietTypes = [
  { 
    id: "vegetarian", 
    title: "Vegetarian", 
    description: "No meat, fish, or eggs",
    icon: "🌱"
  },
  { 
    id: "non-vegetarian", 
    title: "Non-Vegetarian", 
    description: "Includes all foods",
    icon: "🍗"
  },
  { 
    id: "vegan", 
    title: "Vegan", 
    description: "No animal products",
    icon: "🌿"
  },
  { 
    id: "jain", 
    title: "Jain", 
    description: "No root vegetables, strict vegetarian",
    icon: "🕉️"
  }
];

const mealPreferences = [
  { id: "light", label: "Light meals", description: "Smaller portions, easy to digest" },
  { id: "moderate", label: "Moderate meals", description: "Balanced portions" },
  { id: "heavy", label: "Heavy meals", description: "Larger portions, more filling" },
  { id: "frequent", label: "Frequent small meals", description: "5-6 small meals throughout the day" }
];

const DietPreferencesStep = ({ userData, onNext, onBack }: DietPreferencesStepProps) => {
  const [dietType, setDietType] = useState(userData.dietType || "");
  const [allergies, setAllergies] = useState<string[]>(userData.allergies || []);
  const [allergyText, setAllergyText] = useState("");
  const [preferredMealTimes, setPreferredMealTimes] = useState<string[]>(userData.preferredMealTimes || []);
  const [mealPreference, setMealPreference] = useState(userData.mealPreference || "");

  const commonAllergies = [
    "Nuts", "Dairy", "Gluten", "Eggs", "Shellfish", "Soy", "Fish", "Sesame"
  ];

  const handleAllergyToggle = (allergy: string) => {
    setAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const handleMealTimeToggle = (time: string) => {
    setPreferredMealTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleSubmit = () => {
    if (dietType && mealPreference) {
      const finalAllergies = allergyText ? [...allergies, allergyText] : allergies;
      onNext({ 
        dietType, 
        allergies: finalAllergies, 
        preferredMealTimes,
        mealPreference 
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold">Dietary Preferences</CardTitle>
          <CardDescription className="text-lg">Help us create your personalized Indian diet plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Diet Type */}
          <div>
            <h3 className="text-lg font-semibold mb-4">What type of diet do you follow?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {dietTypes.map((diet) => (
                <Card 
                  key={diet.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    dietType === diet.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                  }`}
                  onClick={() => setDietType(diet.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{diet.icon}</span>
                      <h4 className="font-semibold">{diet.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{diet.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Do you have any food allergies?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {commonAllergies.map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2">
                  <Checkbox 
                    id={allergy}
                    checked={allergies.includes(allergy)}
                    onCheckedChange={() => handleAllergyToggle(allergy)}
                  />
                  <Label htmlFor={allergy} className="text-sm">{allergy}</Label>
                </div>
              ))}
            </div>
            <div>
              <Label htmlFor="other-allergies" className="text-sm font-medium">Other allergies (if any)</Label>
              <Input
                id="other-allergies"
                placeholder="Please specify any other allergies..."
                value={allergyText}
                onChange={(e) => setAllergyText(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>


          {/* Meal Preferences */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-semibold">Meal Preference</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mealPreferences.map((preference) => (
                <Card 
                  key={preference.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    mealPreference === preference.id ? 'ring-2 ring-orange-500 bg-orange-50' : ''
                  }`}
                  onClick={() => setMealPreference(preference.id)}
                >
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-1">{preference.label}</h4>
                    <p className="text-sm text-gray-600">{preference.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Preferred Meal Times */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Preferred Meal Times</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Early Morning", "Morning", "Mid-Morning", "Afternoon", "Evening", "Night"].map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <Checkbox 
                    id={time}
                    checked={preferredMealTimes.includes(time)}
                    onCheckedChange={() => handleMealTimeToggle(time)}
                  />
                  <Label htmlFor={time} className="text-sm">{time}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12">
              Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 h-12" 
              disabled={!dietType || !mealPreference}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DietPreferencesStep;
