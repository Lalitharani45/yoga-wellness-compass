
import { ReactNode } from "react";
import { Heart } from "lucide-react";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

const steps = [
  "Profile",
  "Password", 
  "Health",
  "Goals",
  "Yoga Plan",
  "Diet Preferences",
  "Diet Plan",
  "Complete"
];

const OnboardingLayout = ({ children, currentStep, totalSteps }: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SmartWell</h1>
              <p className="text-sm text-gray-600">Health Assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${index + 1 <= currentStep 
                    ? index + 1 === currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {index + 1}
                </div>
                <div className={`
                  text-xs mt-1 font-medium
                  ${index + 1 === currentStep ? 'text-blue-600' : 'text-gray-500'}
                `}>
                  {step}
                </div>
              </div>
            ))}
          </div>
          
          {/* Progress Line */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 -translate-y-1/2 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default OnboardingLayout;
