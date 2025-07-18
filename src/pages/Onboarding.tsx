import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/OnboardingLayout";
import ProfileStep from "@/components/onboarding/ProfileStep";
import PasswordStep from "@/components/onboarding/PasswordStep";
import HealthStep from "@/components/onboarding/HealthStep";
import GoalsStep from "@/components/onboarding/GoalsStep";
import YogaPlanStep from "@/components/onboarding/YogaPlanStep";
import DietPreferencesStep from "@/components/onboarding/DietPreferencesStep";
import DietPlanStep from "@/components/onboarding/DietPlanStep";
import CompleteStep from "@/components/onboarding/CompleteStep";

export interface UserData {
  fullName: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  password: string;
  confirmPassword: string;
  primaryHealthConditions: string[];
  secondaryHealthConditions: string[];
  primaryGoal: string;
  targetWeight?: string;
  duration?: string;
  secondaryGoals: string[];
  yogaExperience: string;
  yogaStyle: string;
  yogaGoals: string[];
  yogaTime: string;
  dietType: string;
  allergies: string[];
  preferredMealTimes: string[];
  mealPreference: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    password: "",
    confirmPassword: "",
    primaryHealthConditions: [],
    secondaryHealthConditions: [],
    primaryGoal: "",
    secondaryGoals: [],
    yogaExperience: "",
    yogaStyle: "",
    yogaGoals: [],
    yogaTime: "",
    dietType: "",
    allergies: [],
    preferredMealTimes: [],
    mealPreference: ""
  });

  const totalSteps = 8;

  const handleNext = (stepData?: Partial<UserData>) => {
    if (stepData) {
      setUserData(prev => ({ ...prev, ...stepData }));
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete onboarding
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProfileStep userData={userData} onNext={handleNext} />;
      case 2:
        return <PasswordStep userData={userData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <HealthStep userData={userData} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <GoalsStep userData={userData} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <YogaPlanStep userData={userData} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <DietPreferencesStep userData={userData} onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <DietPlanStep userData={userData} onNext={handleNext} onBack={handleBack} />;
      case 8:
        return <CompleteStep userData={userData} onNext={handleNext} onBack={handleBack} />;
      default:
        return <ProfileStep userData={userData} onNext={handleNext} />;
    }
  };

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={totalSteps}>
      {renderStep()}
    </OnboardingLayout>
  );
};

export default Onboarding;
