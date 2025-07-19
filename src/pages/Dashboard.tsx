import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import YogaPlan from "@/components/YogaPlan";
import DietPlan from "@/components/DietPlan";
import { Heart, User, LogOut, Edit, Target, Award, TrendingUp, Dumbbell, Apple, Flower2, Star, Clock, Utensils } from "lucide-react";

// Import meal plan logic to ensure consistency
const getMealPlan = (dietType: string, day: string, preferredMealTimes: string[], allergies: string[]) => {
  const isVegetarian = dietType === 'vegetarian' || dietType === 'vegan' || dietType === 'jain';
  const hasNutAllergy = allergies.includes('nuts');
  const hasDairyAllergy = allergies.includes('dairy');
  
  const dailyMealPlans = {
    Monday: {
      vegetarian: {
        "Morning": { name: "Oats Upma", calories: 280, time: "7:00 AM", ingredients: "Steel-cut oats, mixed vegetables, curry leaves, mustard seeds", icon: "🥣" },
        "Afternoon": { name: "Dal Rice Combo", calories: 420, time: "1:00 PM", ingredients: hasDairyAllergy ? "Toor dal, brown rice, ghee alternative" : "Toor dal, basmati rice, yogurt", icon: "🍛" },
        "Evening": { name: "Quinoa Salad", calories: 350, time: "7:30 PM", ingredients: "Quinoa, cucumber, tomatoes, olive oil dressing", icon: "🥗" }
      },
      nonVegetarian: {
        "Morning": { name: "Scrambled Eggs", calories: 320, time: "7:00 AM", ingredients: "2 whole eggs, whole wheat toast, spinach", icon: "🍳" },
        "Afternoon": { name: "Chicken Rice Bowl", calories: 480, time: "1:00 PM", ingredients: "Grilled chicken, brown rice, vegetables", icon: "🍗" },
        "Evening": { name: "Fish Curry", calories: 400, time: "7:30 PM", ingredients: "Fish fillet, coconut curry, steamed rice", icon: "🐟" }
      }
    }
  };

  const baseMeals = isVegetarian ? 
    dailyMealPlans.Monday.vegetarian :
    dailyMealPlans.Monday.nonVegetarian;
  
  return baseMeals;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

  // Progress state
  const [progressData, setProgressData] = useState({
    yogaSessions: 0,
    totalYogaSessions: 7,
    dietAdherence: 0,
    flexibility: 0,
    weightProgress: 0
  });

  const [streak, setStreak] = useState(0);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [progressForm, setProgressForm] = useState({
    yogaSessions: '',
    dietAdherence: '',
    flexibility: '',
    weight: '',
    notes: ''
  });

  // Mock user data - in real app this would come from context/state
  const userData = {
    name: "Lalitha Rani Kocharlakota",
    yogaExperience: "Intermediate",
    yogaStyle: "hatha",
    yogaGoals: ["flexibility", "stress", "meditation"],
    yogaTime: "morning",
    primaryGoal: "weight-loss",
    targetWeight: 60,
    currentWeight: 66,
    dietType: "vegetarian",
    allergies: ["nuts"],
    preferredMealTimes: ["Morning", "Afternoon", "Evening"],
    mealPreference: "moderate"
  };

  // Get today's meals using the same logic as DietPlan component
  const todaysMeals = getMealPlan(userData.dietType, "Monday", userData.preferredMealTimes, userData.allergies);
  const nextMeal = Object.values(todaysMeals)[0]; // Get first meal for today's activities

  // Calculate goal progress based on weight progress
  const calculateGoalProgress = () => {
    if (userData.primaryGoal === "weight-loss" && userData.targetWeight && userData.currentWeight) {
      const totalWeightToLose = userData.currentWeight - userData.targetWeight;
      const weightLost = userData.currentWeight - (progressData.weightProgress || userData.currentWeight);
      const progress = totalWeightToLose > 0 ? Math.max(0, Math.min(100, (weightLost / totalWeightToLose) * 100)) : 0;
      return Math.round(progress);
    } else if (userData.primaryGoal === "weight-gain" && userData.targetWeight && userData.currentWeight) {
      const totalWeightToGain = userData.targetWeight - userData.currentWeight;
      const weightGained = (progressData.weightProgress || userData.currentWeight) - userData.currentWeight;
      const progress = totalWeightToGain > 0 ? Math.max(0, Math.min(100, (weightGained / totalWeightToGain) * 100)) : 0;
      return Math.round(progress);
    }
    // For other goals, use a combination of yoga sessions and diet adherence
    const yogaProgress = (progressData.yogaSessions / progressData.totalYogaSessions) * 50;
    const dietProgress = (progressData.dietAdherence / 100) * 50;
    return Math.round(yogaProgress + dietProgress);
  };

  // Initialize streak on component mount
  useEffect(() => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLogin');
    const currentStreak = parseInt(localStorage.getItem('loginStreak') || '0');

    if (lastLogin === today) {
      // Already logged in today
      setStreak(currentStreak);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastLogin === yesterday.toDateString()) {
        // Logged in yesterday, increment streak
        const newStreak = currentStreak + 1;
        setStreak(newStreak);
        localStorage.setItem('loginStreak', newStreak.toString());
      } else {
        // Haven't logged in yesterday, reset streak
        setStreak(1);
        localStorage.setItem('loginStreak', '1');
      }
      
      localStorage.setItem('lastLogin', today);
    }

    // Load saved progress data
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress));
    }
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleUpdateProgress = () => {
    setIsProgressDialogOpen(true);
  };

  const handleProgressSubmit = () => {
    const updatedProgress = {
      yogaSessions: parseInt(progressForm.yogaSessions) || progressData.yogaSessions,
      totalYogaSessions: 7,
      dietAdherence: parseInt(progressForm.dietAdherence) || progressData.dietAdherence,
      flexibility: parseInt(progressForm.flexibility) || progressData.flexibility,
      weightProgress: parseFloat(progressForm.weight) || progressData.weightProgress
    };

    setProgressData(updatedProgress);
    localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
    
    setIsProgressDialogOpen(false);
    setProgressForm({
      yogaSessions: '',
      dietAdherence: '',
      flexibility: '',
      weight: '',
      notes: ''
    });

    console.log("Progress updated:", updatedProgress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                <Flower2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  SmartWell
                </h1>
                <p className="text-sm text-orange-600">Your Health Companion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-700">Hello, {userData.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-orange-600 hover:bg-orange-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-orange-800 mb-2">
              Welcome, {userData.name.split(' ')[0]}!
            </h2>
            <p className="text-orange-600 text-lg">Today: {currentDate}</p>
          </div>
          
          <div className="flex space-x-3">
            <Dialog open={isProgressDialogOpen} onOpenChange={setIsProgressDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                  onClick={handleUpdateProgress}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Update Progress
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Your Progress</DialogTitle>
                  <DialogDescription>
                    Track your weekly health and fitness progress.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="yogaSessions" className="text-right">
                      Yoga Sessions
                    </Label>
                    <Input
                      id="yogaSessions"
                      type="number"
                      placeholder="0-7"
                      value={progressForm.yogaSessions}
                      onChange={(e) => setProgressForm(prev => ({...prev, yogaSessions: e.target.value}))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dietAdherence" className="text-right">
                      Diet Adherence %
                    </Label>
                    <Input
                      id="dietAdherence"
                      type="number"
                      placeholder="0-100"
                      value={progressForm.dietAdherence}
                      onChange={(e) => setProgressForm(prev => ({...prev, dietAdherence: e.target.value}))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="flexibility" className="text-right">
                      Flexibility %
                    </Label>
                    <Input
                      id="flexibility"
                      type="number"
                      placeholder="0-100"
                      value={progressForm.flexibility}
                      onChange={(e) => setProgressForm(prev => ({...prev, flexibility: e.target.value}))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weight" className="text-right">
                      Current Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={progressForm.weight}
                      onChange={(e) => setProgressForm(prev => ({...prev, weight: e.target.value}))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional notes..."
                      value={progressForm.notes}
                      onChange={(e) => setProgressForm(prev => ({...prev, notes: e.target.value}))}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleProgressSubmit}>Save Progress</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-red-600">BMI</p>
                  <p className="text-2xl font-bold text-red-700">25.1</p>
                  <p className="text-sm text-red-600">Overweight</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-blue-600">Goal Progress</p>
                   <p className="text-2xl font-bold text-blue-700">{calculateGoalProgress()}%</p>
                  <p className="text-sm text-blue-600">
                    {userData.primaryGoal === "weight-loss" ? "Weight Loss" : 
                     userData.primaryGoal === "weight-gain" ? "Weight Gain" : "Overall"}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-yellow-600">Streak</p>
                  <p className="text-2xl font-bold text-yellow-700">{streak} days</p>
                  <p className="text-sm text-yellow-600">Keep it up!</p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-green-600">Weight</p>
                  <p className="text-2xl font-bold text-green-700">{progressData.weightProgress || userData.currentWeight} kg</p>
                  <p className="text-sm text-green-600">Current</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-orange-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="yoga" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Yoga
            </TabsTrigger>
            <TabsTrigger value="diet" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Diet
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Today's Activities */}
            <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-xl text-orange-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Today's Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Flower2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800">Daily Yoga Session</h3>
                          <p className="text-sm text-blue-600">Complete your personalized yoga routine</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Apple className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-green-800">Today's Diet Plan</h3>
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <Utensils className="w-3 h-3 mr-1" />
                              {userData.dietType}
                            </Badge>
                          </div>
                          <p className="text-sm text-green-600 mb-2">Next: {nextMeal.name} at {nextMeal.time}</p>
                          <div className="flex items-center text-xs text-green-600">
                            <span className="mr-2">{nextMeal.icon}</span>
                            <span>{nextMeal.calories} cal • {nextMeal.ingredients.split(',')[0]}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
                <CardHeader>
                  <CardTitle className="text-orange-800">Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-orange-700">Yoga Sessions</span>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                        {progressData.yogaSessions}/{progressData.totalYogaSessions} completed
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-orange-700">Diet Adherence</span>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                        {progressData.dietAdherence}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-gradient-to-br from-amber-50 to-yellow-50">
                <CardHeader>
                  <CardTitle className="text-amber-800">Health Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-amber-700">Anxiety and stress management in progress</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-amber-700">{progressData.flexibility}% improvement in flexibility</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-amber-700">Weight loss goal: 5kg remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="yoga" className="mt-6">
            <YogaPlan 
              experience={userData.yogaExperience}
              style={userData.yogaStyle}
              goals={userData.yogaGoals}
              time={userData.yogaTime}
            />
          </TabsContent>

           <TabsContent value="diet" className="mt-6">
             <DietPlan 
               dietType={userData.dietType}
               allergies={userData.allergies}
               preferredMealTimes={userData.preferredMealTimes}
               mealPreference={userData.mealPreference}
             />
           </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Track your health and fitness journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Progress tracking charts will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
