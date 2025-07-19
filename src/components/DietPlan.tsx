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
  
  // Completely different meals for each day
  const dailyMealPlans = {
    Monday: {
      vegetarian: {
        "Early Morning": { name: "Lemon Honey Water", calories: 50, time: "6:00 AM", ingredients: "Warm water, fresh lemon, honey", icon: "🍯" },
        "Morning": { name: "Oats Upma", calories: 280, time: "7:00 AM", ingredients: "Steel-cut oats, mixed vegetables, curry leaves, mustard seeds", icon: "🥣" },
        "Mid-Morning": { name: "Mixed Nuts Bowl", calories: 150, time: "10:00 AM", ingredients: hasNutAllergy ? "Sunflower seeds, pumpkin seeds" : "Almonds, walnuts, dates", icon: hasNutAllergy ? "🌻" : "🥜" },
        "Afternoon": { name: "Dal Rice Combo", calories: 420, time: "1:00 PM", ingredients: hasDairyAllergy ? "Toor dal, brown rice, ghee alternative" : "Toor dal, basmati rice, yogurt", icon: "🍛" },
        "Evening": { name: "Quinoa Salad", calories: 350, time: "7:30 PM", ingredients: "Quinoa, cucumber, tomatoes, olive oil dressing", icon: "🥗" },
        "Night": { name: "Turmeric Milk", calories: 80, time: "10:00 PM", ingredients: hasDairyAllergy ? "Almond milk, turmeric, honey" : "Warm milk, turmeric, honey", icon: "🥛" }
      },
      nonVegetarian: {
        "Early Morning": { name: "Lemon Honey Water", calories: 50, time: "6:00 AM", ingredients: "Warm water, fresh lemon, honey", icon: "🍯" },
        "Morning": { name: "Scrambled Eggs", calories: 320, time: "7:00 AM", ingredients: "2 whole eggs, whole wheat toast, spinach", icon: "🍳" },
        "Mid-Morning": { name: "Greek Yogurt", calories: 180, time: "10:00 AM", ingredients: "Greek yogurt, berries, honey", icon: "🫐" },
        "Afternoon": { name: "Chicken Rice Bowl", calories: 480, time: "1:00 PM", ingredients: "Grilled chicken, brown rice, vegetables", icon: "🍗" },
        "Evening": { name: "Fish Curry", calories: 400, time: "7:30 PM", ingredients: "Fish fillet, coconut curry, steamed rice", icon: "🐟" },
        "Night": { name: "Herbal Tea", calories: 30, time: "10:00 PM", ingredients: "Chamomile tea, honey", icon: "🍵" }
      }
    },
    Tuesday: {
      vegetarian: {
        "Early Morning": { name: "Green Tea", calories: 40, time: "6:00 AM", ingredients: "Green tea, ginger, lemon", icon: "🍃" },
        "Morning": { name: "Poha", calories: 300, time: "7:00 AM", ingredients: "Flattened rice, peanuts, curry leaves, turmeric", icon: "🍚" },
        "Mid-Morning": { name: "Fruit Smoothie", calories: 160, time: "10:00 AM", ingredients: "Banana, mango, coconut water", icon: "🥤" },
        "Afternoon": { name: "Rajma Rice", calories: 450, time: "1:00 PM", ingredients: "Kidney beans curry, jeera rice, pickle", icon: "🫘" },
        "Evening": { name: "Vegetable Stir Fry", calories: 320, time: "7:30 PM", ingredients: "Mixed vegetables, tofu, brown rice", icon: "🥬" },
        "Night": { name: "Chamomile Tea", calories: 25, time: "10:00 PM", ingredients: "Chamomile flowers, honey", icon: "🌼" }
      },
      nonVegetarian: {
        "Early Morning": { name: "Green Tea", calories: 40, time: "6:00 AM", ingredients: "Green tea, ginger, lemon", icon: "🍃" },
        "Morning": { name: "Egg Benedict", calories: 350, time: "7:00 AM", ingredients: "Poached eggs, English muffin, hollandaise", icon: "🥚" },
        "Mid-Morning": { name: "Protein Shake", calories: 200, time: "10:00 AM", ingredients: "Whey protein, banana, almond milk", icon: "🥛" },
        "Afternoon": { name: "Mutton Biryani", calories: 520, time: "1:00 PM", ingredients: "Mutton, basmati rice, saffron, yogurt", icon: "🍖" },
        "Evening": { name: "Grilled Salmon", calories: 380, time: "7:30 PM", ingredients: "Salmon fillet, quinoa, asparagus", icon: "🐟" },
        "Night": { name: "Warm Milk", calories: 120, time: "10:00 PM", ingredients: "Warm milk, nutmeg", icon: "🥛" }
      }
    },
    Wednesday: {
      vegetarian: {
        "Early Morning": { name: "Detox Water", calories: 30, time: "6:00 AM", ingredients: "Water, cucumber, mint, lemon", icon: "💧" },
        "Morning": { name: "Idli Sambar", calories: 290, time: "7:00 AM", ingredients: "Steamed rice cakes, lentil sambar, coconut chutney", icon: "🥞" },
        "Mid-Morning": { name: "Coconut Water", calories: 80, time: "10:00 AM", ingredients: "Fresh coconut water, mint", icon: "🥥" },
        "Afternoon": { name: "Chole Bhature", calories: 480, time: "1:00 PM", ingredients: "Chickpea curry, fried bread, onions", icon: "🫓" },
        "Evening": { name: "Buddha Bowl", calories: 340, time: "7:30 PM", ingredients: "Quinoa, roasted vegetables, tahini dressing", icon: "🍲" },
        "Night": { name: "Golden Milk", calories: 90, time: "10:00 PM", ingredients: hasDairyAllergy ? "Oat milk, turmeric, cinnamon" : "Warm milk, turmeric, cinnamon", icon: "✨" }
      },
      nonVegetarian: {
        "Early Morning": { name: "Detox Water", calories: 30, time: "6:00 AM", ingredients: "Water, cucumber, mint, lemon", icon: "💧" },
        "Morning": { name: "Chicken Sandwich", calories: 340, time: "7:00 AM", ingredients: "Grilled chicken, multigrain bread, avocado", icon: "🥪" },
        "Mid-Morning": { name: "Boiled Eggs", calories: 140, time: "10:00 AM", ingredients: "2 boiled eggs, black pepper, salt", icon: "🥚" },
        "Afternoon": { name: "Prawn Curry", calories: 420, time: "1:00 PM", ingredients: "Prawns, coconut curry, jasmine rice", icon: "🦐" },
        "Evening": { name: "Turkey Salad", calories: 300, time: "7:30 PM", ingredients: "Sliced turkey, mixed greens, vinaigrette", icon: "🥗" },
        "Night": { name: "Protein Tea", calories: 50, time: "10:00 PM", ingredients: "Herbal tea, collagen powder", icon: "🍵" }
      }
    },
    Thursday: {
      vegetarian: {
        "Early Morning": { name: "Ginger Tea", calories: 35, time: "6:00 AM", ingredients: "Fresh ginger, honey, water", icon: "🫚" },
        "Morning": { name: "Paratha & Curd", calories: 340, time: "7:00 AM", ingredients: "Whole wheat paratha, fresh curd, pickle", icon: "🫓" },
        "Mid-Morning": { name: "Dates & Nuts", calories: 170, time: "10:00 AM", ingredients: hasNutAllergy ? "Dates, pumpkin seeds" : "Dates, almonds, cashews", icon: "🌰" },
        "Afternoon": { name: "Palak Paneer", calories: 400, time: "1:00 PM", ingredients: hasDairyAllergy ? "Spinach curry, tofu, roti" : "Spinach curry, paneer, naan", icon: "🥬" },
        "Evening": { name: "Lentil Soup", calories: 280, time: "7:30 PM", ingredients: "Mixed lentils, vegetables, herbs", icon: "🍜" },
        "Night": { name: "Ashwagandha Tea", calories: 40, time: "10:00 PM", ingredients: "Ashwagandha powder, warm water, honey", icon: "🌿" }
      },
      nonVegetarian: {
        "Early Morning": { name: "Ginger Tea", calories: 35, time: "6:00 AM", ingredients: "Fresh ginger, honey, water", icon: "🫚" },
        "Morning": { name: "Omelette", calories: 280, time: "7:00 AM", ingredients: "3-egg omelette, cheese, vegetables", icon: "🍳" },
        "Mid-Morning": { name: "Cottage Cheese", calories: 150, time: "10:00 AM", ingredients: "Low-fat cottage cheese, berries", icon: "🧀" },
        "Afternoon": { name: "Beef Stew", calories: 450, time: "1:00 PM", ingredients: "Beef chunks, vegetables, mashed potatoes", icon: "🥩" },
        "Evening": { name: "Grilled Chicken", calories: 350, time: "7:30 PM", ingredients: "Chicken breast, roasted vegetables", icon: "🍗" },
        "Night": { name: "Bone Broth", calories: 60, time: "10:00 PM", ingredients: "Slow-cooked bone broth, herbs", icon: "🍲" }
      }
    },
    Friday: {
      vegetarian: {
        "Early Morning": { name: "Mint Water", calories: 25, time: "6:00 AM", ingredients: "Water, fresh mint, lemon", icon: "🌿" },
        "Morning": { name: "Dosa Chutney", calories: 320, time: "7:00 AM", ingredients: "Crispy dosa, coconut chutney, sambar", icon: "🌯" },
        "Mid-Morning": { name: "Green Smoothie", calories: 140, time: "10:00 AM", ingredients: "Spinach, apple, banana, coconut water", icon: "🥤" },
        "Afternoon": { name: "Biryani", calories: 460, time: "1:00 PM", ingredients: "Vegetable biryani, raita, pickle", icon: "🍚" },
        "Evening": { name: "Stuffed Bell Peppers", calories: 310, time: "7:30 PM", ingredients: "Bell peppers, quinoa stuffing, herbs", icon: "🫑" },
        "Night": { name: "Lavender Tea", calories: 20, time: "10:00 PM", ingredients: "Dried lavender, honey", icon: "💜" }
      },
      nonVegetarian: {
        "Early Morning": { name: "Mint Water", calories: 25, time: "6:00 AM", ingredients: "Water, fresh mint, lemon", icon: "🌿" },
        "Morning": { name: "Bacon & Eggs", calories: 380, time: "7:00 AM", ingredients: "2 strips bacon, scrambled eggs, toast", icon: "🥓" },
        "Mid-Morning": { name: "Tuna Salad", calories: 190, time: "10:00 AM", ingredients: "Canned tuna, mixed greens, olive oil", icon: "🐟" },
        "Afternoon": { name: "Lamb Curry", calories: 500, time: "1:00 PM", ingredients: "Lamb curry, basmati rice, naan", icon: "🍖" },
        "Evening": { name: "Baked Cod", calories: 320, time: "7:30 PM", ingredients: "Cod fillet, herbs, roasted potatoes", icon: "🐟" },
        "Night": { name: "Protein Milk", calories: 100, time: "10:00 PM", ingredients: "Warm milk, protein powder", icon: "🥛" }
      }
    },
    Saturday: {
      vegetarian: {
        "Early Morning": { name: "Jeera Water", calories: 30, time: "6:00 AM", ingredients: "Cumin water, lemon", icon: "🌾" },
        "Morning": { name: "Pancakes", calories: 350, time: "7:00 AM", ingredients: "Whole wheat pancakes, maple syrup, fruits", icon: "🥞" },
        "Mid-Morning": { name: "Chia Pudding", calories: 180, time: "10:00 AM", ingredients: "Chia seeds, coconut milk, berries", icon: "🥥" },
        "Afternoon": { name: "South Indian Thali", calories: 480, time: "1:00 PM", ingredients: "Rice, sambar, rasam, vegetables, curd", icon: "🍽️" },
        "Evening": { name: "Grilled Vegetables", calories: 290, time: "7:30 PM", ingredients: "Zucchini, eggplant, bell peppers, quinoa", icon: "🍆" },
        "Night": { name: "Moon Milk", calories: 70, time: "10:00 PM", ingredients: hasDairyAllergy ? "Coconut milk, vanilla, cinnamon" : "Warm milk, vanilla, cinnamon", icon: "🌙" }
      },
      nonVegetarian: {
        "Early Morning": { name: "Jeera Water", calories: 30, time: "6:00 AM", ingredients: "Cumin water, lemon", icon: "🌾" },
        "Morning": { name: "Sausage Hash", calories: 420, time: "7:00 AM", ingredients: "Chicken sausage, hash browns, eggs", icon: "🍳" },
        "Mid-Morning": { name: "Smoked Salmon", calories: 160, time: "10:00 AM", ingredients: "Smoked salmon, cream cheese, bagel", icon: "🐟" },
        "Afternoon": { name: "Duck Curry", calories: 520, time: "1:00 PM", ingredients: "Duck curry, jasmine rice, vegetables", icon: "🦆" },
        "Evening": { name: "BBQ Chicken", calories: 370, time: "7:30 PM", ingredients: "BBQ chicken breast, coleslaw, corn", icon: "🍗" },
        "Night": { name: "Casein Shake", calories: 120, time: "10:00 PM", ingredients: "Casein protein, almond milk", icon: "🥛" }
      }
    },
    Sunday: {
      vegetarian: {
        "Early Morning": { name: "Warm Water", calories: 20, time: "6:00 AM", ingredients: "Warm water, rock salt, lemon", icon: "💧" },
        "Morning": { name: "Sunday Special", calories: 380, time: "7:00 AM", ingredients: "Aloo paratha, curd, butter, pickle", icon: "🥔" },
        "Mid-Morning": { name: "Fresh Juice", calories: 120, time: "10:00 AM", ingredients: "Orange juice, ginger, mint", icon: "🍊" },
        "Afternoon": { name: "Festive Meal", calories: 500, time: "1:00 PM", ingredients: "Puri, chole, halwa, lassi", icon: "🎉" },
        "Evening": { name: "Light Khichdi", calories: 260, time: "7:30 PM", ingredients: "Rice, lentils, ghee, vegetables", icon: "🍲" },
        "Night": { name: "Brahmi Tea", calories: 15, time: "10:00 PM", ingredients: "Brahmi leaves, honey", icon: "🍃" }
      },
      nonVegetarian: {
        "Early Morning": { name: "Warm Water", calories: 20, time: "6:00 AM", ingredients: "Warm water, rock salt, lemon", icon: "💧" },
        "Morning": { name: "Sunday Brunch", calories: 450, time: "7:00 AM", ingredients: "Eggs benedict, bacon, hash browns", icon: "🍽️" },
        "Mid-Morning": { name: "Chicken Soup", calories: 130, time: "10:00 AM", ingredients: "Clear chicken broth, vegetables", icon: "🍲" },
        "Afternoon": { name: "Roast Dinner", calories: 550, time: "1:00 PM", ingredients: "Roast chicken, potatoes, gravy, vegetables", icon: "🍗" },
        "Evening": { name: "Fish & Chips", calories: 400, time: "7:30 PM", ingredients: "Battered fish, sweet potato fries", icon: "🍟" },
        "Night": { name: "Relaxing Tea", calories: 25, time: "10:00 PM", ingredients: "Passionflower tea, honey", icon: "🌸" }
      }
    }
  };

  const baseMeals = isVegetarian ? 
    dailyMealPlans[day as keyof typeof dailyMealPlans]?.vegetarian || dailyMealPlans.Monday.vegetarian :
    dailyMealPlans[day as keyof typeof dailyMealPlans]?.nonVegetarian || dailyMealPlans.Monday.nonVegetarian;
  
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