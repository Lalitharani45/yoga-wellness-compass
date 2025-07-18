
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { UserData } from "@/pages/Onboarding";
import { User, Calendar, Ruler, Weight } from "lucide-react";

interface ProfileStepProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
}

const ProfileStep = ({ userData, onNext }: ProfileStepProps) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    age: userData.age,
    gender: userData.gender,
    height: userData.height,
    weight: userData.weight,
    isGuest: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.age && formData.gender && formData.height) {
      onNext({
        fullName: formData.fullName,
        age: formData.age,
        gender: formData.gender,
        height: formData.height,
        weight: formData.weight
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">Welcome to SmartWell</CardTitle>
          <CardDescription className="text-lg">Your journey to wellness starts here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="guest" 
              checked={formData.isGuest}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isGuest: !!checked }))}
            />
            <Label htmlFor="guest" className="text-blue-600">Continue as Guest (Limited features)</Label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name *</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Age *</span>
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  required
                  className="h-12"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4" />
                  <span>Height (cm) *</span>
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height in cm"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  required
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center space-x-2">
                <Weight className="w-4 h-4" />
                <span>Weight (kg)</span>
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight in kg (optional)"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                className="h-12"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStep;
