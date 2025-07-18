import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Apple, Utensils } from "lucide-react";

interface DietPlanProps {
  dietType: string;
  allergies: string[];
  preferredMealTimes: string[];
  mealPreference: string;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Meal {
  name: string;
  calories: number;
  time: string;
  ingredients: string;
  icon: string;
}

const getMealPlan = (dietType: string, day: string, preferredMealTimes: string[], allergies: string[]): Record<string, Meal> => {
  const isVegetarian = dietType === 'vegetarian' || dietType === 'vegan' || dietType === 'jain';
  const hasNutAllergy = allergies.includes('nuts');
  const hasDairyAllergy = allergies.includes('dairy');
  
  // Create different meals for each day
  const dayVariations = {
    Monday: { suffix: "", variant: 0 },
    Tuesday: { suffix: " with Herbs", variant: 1 },
    Wednesday: { suffix: " Bowl", variant: 2 },
    Thursday: { suffix: " Delight", variant: 3 },
    Friday: { suffix: " Special", variant: 4 },
    Saturday: { suffix: " Feast", variant: 5 },
    Sunday: { suffix: " Sunday", variant: 6 }
  };
  
  const dayInfo = dayVariations[day as keyof typeof dayVariations] || dayVariations.Monday;
  
  const allVegetarianMeals: Record<string, Meal> = {
    "Early Morning": {
      name: `${dayInfo.variant % 2 === 0 ? "Lemon Water with Honey" : "Warm Turmeric Water"}${dayInfo.suffix}`,
      calories: 50,
      time: "6:00 AM",
      ingredients: hasNutAllergy ? "Warm water, lemon juice, honey" : "Warm water, turmeric, ginger, honey",
      icon: dayInfo.variant % 2 === 0 ? "🍯" : "💛"
    },
    "Morning": {
      name: `${["Oats Poha", "Upma", "Idli Sambar", "Dosa", "Quinoa Porridge", "Ragi Dosa", "Vegetable Paratha"][dayInfo.variant]}${dayInfo.suffix}`,
      calories: 280 + (dayInfo.variant * 10),
      time: "7:00 AM",
      ingredients: hasDairyAllergy ? "Oats, vegetables, spices (dairy-free)" : "1/2 cup oats, vegetables, spices, herbal tea",
      icon: ["🥣", "🍲", "🥞", "🌯", "🥣", "🥞", "🫓"][dayInfo.variant]
    },
    "Mid-Morning": {
      name: `${hasNutAllergy ? "Fresh Fruits" : "Mixed Nuts & Fruits"}${dayInfo.suffix}`,
      calories: 150,
      time: "10:00 AM", 
      ingredients: hasNutAllergy ? "Seasonal fruits, seeds" : "Mixed nuts, seasonal fruits, seeds",
      icon: hasNutAllergy ? "🍎" : "🥜"
    },
    "Afternoon": {
      name: `${["Dal Rice", "Curd Rice", "Sambar Rice", "Rajma Rice", "Chana Rice", "Mixed Veg Rice", "Pulao"][dayInfo.variant]}${dayInfo.suffix}`,
      calories: 420 + (dayInfo.variant * 15),
      time: "1:00 PM",
      ingredients: hasDairyAllergy ? "Rice, dal, vegetables (dairy-free)" : "Rice, dal/curry, vegetables, yogurt, salad",
      icon: ["🍛", "🍚", "🍲", "🫘", "🍛", "🥗", "🍚"][dayInfo.variant]
    },
    "Evening": {
      name: `${["Quinoa Curry", "Millet Khichdi", "Vegetable Stir-fry", "Lentil Soup", "Stuffed Roti", "Vegetable Curry", "Bean Salad"][dayInfo.variant]}${dayInfo.suffix}`,
      calories: 350 + (dayInfo.variant * 20),
      time: "7:30 PM",
      ingredients: hasDairyAllergy ? "Grains, vegetables, coconut milk" : "Grains, vegetables, light dairy",
      icon: ["🍲", "🥣", "🥬", "🍜", "🫓", "🍛", "🥗"][dayInfo.variant]
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
    "Morning": {
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
    "Afternoon": {
      name: "Grilled Chicken with Quinoa",
      calories: 480,
      time: "1:00 PM",
      ingredients: "150g grilled chicken breast, 1 cup quinoa, steamed vegetables, salad",
      icon: "🍗"
    },
    "Evening": {
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
  
  preferredMealTimes.forEach(time => {
    if (baseMeals[time as keyof typeof baseMeals]) {
      filteredMeals[time.toLowerCase().replace(/[^a-z]/g, '')] = baseMeals[time as keyof typeof baseMeals];
    }
  });

  return filteredMeals;
};

const DietPlan = ({ dietType, allergies, preferredMealTimes, mealPreference }: DietPlanProps) => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  
  const dailyMeals = getMealPlan(dietType, selectedDay, preferredMealTimes, allergies);
  const totalCalories = Object.values(dailyMeals).reduce((sum: number, meal: Meal) => sum + meal.calories, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Your Personalized Diet Plan
          </CardTitle>
          <CardDescription className="text-green-100">
            Customized {dietType} meal plan based on your preferences
          </CardDescription>
          <div className="flex items-center space-x-4 flex-wrap mt-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              <Utensils className="w-4 h-4 mr-1" />
              {dietType}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              🍽️ {mealPreference}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {totalCalories} cal/day
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Allergies Alert */}
      {allergies && allergies.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-orange-600">⚠️</span>
              <span className="font-medium text-orange-800">Allergies to avoid:</span>
              <span className="text-orange-700">{allergies.join(", ")}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Meal Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Meal Plan</CardTitle>
          <CardDescription>Your personalized {preferredMealTimes.length} meal plan</CardDescription>
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
            <h3 className="text-xl font-semibold mb-4">{selectedDay} - Meal Plan</h3>
            
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
    </div>
  );
};

export default DietPlan;