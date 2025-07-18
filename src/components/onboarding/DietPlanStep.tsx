
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserData } from "@/pages/Onboarding";
import { Utensils, Clock, Droplets, Apple, Coffee } from "lucide-react";

interface DietPlanStepProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
  onBack: () => void;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Meal {
  name: string;
  calories: number;
  time: string;
  ingredients: string;
  icon: string;
}

const getMealPlan = (dietType: string, day: string, preferredMealTimes: string[]): Record<string, Meal> => {
  const isVegetarian = dietType === 'vegetarian' || dietType === 'vegan' || dietType === 'jain';
  
  const allVegetarianMeals: Record<string, Meal> = {
    "Early Morning": {
      name: "Lemon Water with Honey",
      calories: 50,
      time: "6:00 AM",
      ingredients: "Warm water, lemon juice, honey",
      icon: "🍯"
    },
    breakfast: {
      name: "Oats Poha with Green Tea",
      calories: 280,
      time: "7:00 AM",
      ingredients: "1/2 cup oats, 1/4 cup poha, mustard seeds, curry leaves, onions, green chilies, turmeric, green tea",
      icon: "🥣"
    },
    "Mid-Morning": {
      name: "Mixed Nuts & Fruits",
      calories: 150,
      time: "10:00 AM", 
      ingredients: "10 almonds, 5 walnuts, 1 apple, 1 small banana",
      icon: "🥜"
    },
    lunch: {
      name: "Dal Rice with Vegetables",
      calories: 420,
      time: "1:00 PM",
      ingredients: "1 cup brown rice, 1 cup mixed dal, seasonal vegetables, 1 roti, salad",
      icon: "🍛"
    },
    "Afternoon": {
      name: "Green Tea with Sprouts",
      calories: 120,
      time: "4:00 PM",
      ingredients: "1 cup mixed sprouts, green tea, lemon",
      icon: "🍵"
    },
    dinner: {
      name: "Quinoa Vegetable Curry",
      calories: 350,
      time: "7:30 PM",
      ingredients: "1 cup quinoa, mixed vegetables, coconut milk, spices",
      icon: "🍲"
    },
    "Night": {
      name: "Warm Turmeric Milk",
      calories: 80,
      time: "10:00 PM",
      ingredients: "1 glass warm milk, turmeric, honey",
      icon: "🥛"
    }
  };

  const allNonVegetarianMeals: Record<string, Meal> = {
    "Early Morning": {
      name: "Lemon Water with Honey",
      calories: 50,
      time: "6:00 AM",
      ingredients: "Warm water, lemon juice, honey",
      icon: "🍯"
    },
    breakfast: {
      name: "Egg White Omelette with Toast",
      calories: 320,
      time: "7:00 AM",
      ingredients: "3 egg whites, 2 whole wheat bread, vegetables, green tea",
      icon: "🍳"
    },
    "Mid-Morning": {
      name: "Greek Yogurt with Berries",
      calories: 180,
      time: "10:00 AM",
      ingredients: "1 cup Greek yogurt, mixed berries, 1 tbsp honey",
      icon: "🫐"
    },
    lunch: {
      name: "Grilled Chicken with Quinoa",
      calories: 480,
      time: "1:00 PM",
      ingredients: "150g grilled chicken breast, 1 cup quinoa, steamed vegetables, salad",
      icon: "🍗"
    },
    "Afternoon": {
      name: "Protein Smoothie",
      calories: 200,
      time: "4:00 PM",
      ingredients: "Protein powder, banana, spinach, almond milk",
      icon: "🥤"
    },
    dinner: {
      name: "Fish Curry with Brown Rice",
      calories: 400,
      time: "7:30 PM",
      ingredients: "150g fish, coconut curry, 1 cup brown rice, vegetables",
      icon: "🐟"
    },
    "Night": {
      name: "Herbal Tea",
      calories: 30,
      time: "10:00 PM",
      ingredients: "Chamomile tea, honey",
      icon: "🍵"
    }
  };

  const baseMeals = isVegetarian ? allVegetarianMeals : allNonVegetarianMeals;
  
  // Filter meals based on preferred meal times
  const filteredMeals: Record<string, Meal> = {};
  
  // Always include basic meals
  if (preferredMealTimes.includes("Morning")) {
    filteredMeals.breakfast = baseMeals.breakfast;
  }
  if (preferredMealTimes.includes("Afternoon")) {
    filteredMeals.lunch = baseMeals.lunch;
  }
  if (preferredMealTimes.includes("Evening")) {
    filteredMeals.dinner = baseMeals.dinner;
  }
  
  // Add optional meals based on preferences
  if (preferredMealTimes.includes("Early Morning")) {
    filteredMeals.earlyMorning = baseMeals["Early Morning"];
  }
  if (preferredMealTimes.includes("Mid-Morning")) {
    filteredMeals.midMorning = baseMeals["Mid-Morning"];
  }
  if (preferredMealTimes.includes("Night")) {
    filteredMeals.night = baseMeals["Night"];
  }

  return filteredMeals;
};

const DietPlanStep = ({ userData, onNext, onBack }: DietPlanStepProps) => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  
  const dailyMeals = getMealPlan(userData.dietType, selectedDay, userData.preferredMealTimes);
  const totalCalories = Object.values(dailyMeals).reduce((sum, meal) => sum + meal.calories, 0);

  const handleSubmit = () => {
    onNext({});
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Personalized {userData.dietType === 'vegetarian' ? 'Vegetarian' : 
                          userData.dietType === 'vegan' ? 'Vegan' :
                          userData.dietType === 'jain' ? 'Jain' : 'Non-vegetarian'} Diet Plan
            </h1>
            <p className="text-green-100 mb-4">
              Customized Indian diet plan for your wellness journey
            </p>
            
            <div className="flex items-center space-x-4 flex-wrap">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Utensils className="w-4 h-4" />
                <span>{userData.dietType}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>💪 Weight Loss</span>
              </Badge>
              {userData.mealPreference && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>🍽️ {userData.mealPreference}</span>
                </Badge>
              )}
            </div>
          </div>
          
          <div className="bg-blue-500 px-6 py-4 rounded-lg text-center">
            <div className="text-3xl font-bold">{totalCalories}</div>
            <div className="text-sm text-blue-100">Daily Calories</div>
          </div>
        </div>
      </div>

      {/* Allergies Alert */}
      {userData.allergies && userData.allergies.length > 0 && (
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-orange-600">⚠️</span>
              <span className="font-medium text-orange-800">Allergies to avoid:</span>
              <span className="text-orange-700">{userData.allergies.join(", ")}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Meal Plan */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Weekly Meal Plan</CardTitle>
          <CardDescription>Click on any day to view the complete meal schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {weekDays.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}
                className="flex-shrink-0"
              >
                {day}
              </Button>
            ))}
          </div>

          {/* Daily Meal Schedule */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{selectedDay} - Complete Meal Plan</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(dailyMeals).map(([mealType, meal]: [string, Meal]) => (
                <Card key={mealType} className="bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{meal.icon}</span>
                        <div>
                          <h4 className="font-semibold text-lg capitalize">{mealType.replace(/([A-Z])/g, ' $1')}</h4>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{meal.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{meal.calories}</div>
                        <div className="text-xs text-gray-600">calories</div>
                      </div>
                    </div>
                    
                    <h5 className="font-medium text-blue-800 mb-2">{meal.name}</h5>
                    
                    <div className="border-t pt-3">
                      <h6 className="font-medium text-xs text-gray-700 mb-1">Ingredients:</h6>
                      <p className="text-xs text-gray-600 leading-relaxed">{meal.ingredients}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Daily Summary */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Apple className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Daily Summary</span>
                </div>
                 <div className="flex items-center space-x-4 text-sm">
                   <span className="text-blue-700">Total Calories: <strong>{totalCalories}</strong></span>
                   <span className="text-blue-700">Meals: <strong>{Object.keys(dailyMeals).length}</strong></span>
                 </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12">
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1 h-12">
          Continue to Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default DietPlanStep;
