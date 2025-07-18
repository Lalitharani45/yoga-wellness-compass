
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, Target, Heart, Star, CheckCircle, Circle } from "lucide-react";

interface YogaPlanProps {
  experience: string;
  style: string;
  goals: string[];
  time: string;
}

const generatePersonalizedVideos = (experience: string, style: string, goals: string[]) => {
  // Create different video sets based on yoga style
  const styleBasedVideos = {
    hatha: {
      beginner: [
        {
          id: 1,
          title: "Gentle Hatha Morning Flow",
          duration: "20 min",
          difficulty: "Beginner",
          description: "Slow-paced traditional poses",
          thumbnail: "https://images.unsplash.com/photo-1506629905499-45b8394c0d3b?w=400&h=225&fit=crop",
          poses: ["Mountain Pose", "Tree Pose", "Forward Fold", "Child's Pose"]
        },
        {
          id: 2,
          title: "Hatha Strength Foundation",
          duration: "25 min",
          difficulty: "Beginner", 
          description: "Build core strength with Hatha",
          thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
          poses: ["Warrior I", "Plank", "Bridge", "Cobra"]
        }
      ],
      intermediate: [
        {
          id: 3,
          title: "Hatha Power Flow",
          duration: "35 min",
          difficulty: "Intermediate",
          description: "Dynamic Hatha sequences",
          thumbnail: "https://images.unsplash.com/photo-1506629905499-45b8394c0d3b?w=400&h=225&fit=crop",
          poses: ["Warrior III", "Extended Side Angle", "Twisted Triangle", "Wheel"]
        }
      ]
    },
    vinyasa: {
      beginner: [
        {
          id: 4,
          title: "Beginner Vinyasa Flow",
          duration: "25 min",
          difficulty: "Beginner",
          description: "Flowing movements for beginners",
          thumbnail: "https://images.unsplash.com/photo-1506629905499-45b8394c0d3b?w=400&h=225&fit=crop",
          poses: ["Sun Salutation A", "Low Lunge", "Downward Dog", "Savasana"]
        }
      ],
      intermediate: [
        {
          id: 5,
          title: "Power Vinyasa Flow",
          duration: "40 min",
          difficulty: "Intermediate",
          description: "Dynamic flowing sequence",
          thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
          poses: ["Sun Salutation B", "Crow Pose", "Side Plank", "Camel"]
        }
      ]
    },
    ashtanga: {
      intermediate: [
        {
          id: 6,
          title: "Ashtanga Primary Series",
          duration: "60 min",
          difficulty: "Intermediate",
          description: "Traditional Ashtanga sequence",
          thumbnail: "https://images.unsplash.com/photo-1506629905499-45b8394c0d3b?w=400&h=225&fit=crop",
          poses: ["Surya Namaskara", "Standing Poses", "Seated Forward Folds", "Backbends"]
        }
      ]
    }
  };

  const defaultVideos = {
    beginner: [
      {
        id: 1,
        title: "Gentle Morning Flow",
        duration: "15 min",
        difficulty: "Beginner",
        description: "Start your day with gentle stretches",
        thumbnail: "https://images.unsplash.com/photo-1506629905499-45b8394c0d3b?w=400&h=225&fit=crop",
        poses: ["Mountain Pose", "Forward Fold", "Downward Dog", "Child's Pose"]
      },
      {
        id: 2,
        title: "Basic Strength Building",
        duration: "20 min",
        difficulty: "Beginner",
        description: "Build foundational strength",
        thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
        poses: ["Plank", "Warrior I", "Tree Pose", "Cat-Cow"]
      }
    ],
    intermediate: [
      {
        id: 3,
        title: "Power Vinyasa Flow",
        duration: "30 min",
        difficulty: "Intermediate",
        description: "Dynamic flowing sequence",
        thumbnail: "https://images.unsplash.com/photo-1506629905499-45b8394c0d3b?w=400&h=225&fit=crop",
        poses: ["Sun Salutation", "Warrior III", "Side Plank", "Crow Pose"]
      },
      {
        id: 4,
        title: "Core Strength Focus",
        duration: "25 min",
        difficulty: "Intermediate",
        description: "Strengthen your core muscles",
        thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
        poses: ["Boat Pose", "Plank Variations", "Russian Twists", "Mountain Climbers"]
      }
    ],
    advanced: [
      {
        id: 5,
        title: "Advanced Arm Balances",
        duration: "45 min",
        difficulty: "Advanced",
        description: "Master challenging arm balances",
        thumbnail: "https://images.unsplash.com/photo-1506629905499-45b8394c0d3b?w=400&h=225&fit=crop",
        poses: ["Crow Pose", "Side Crow", "Firefly", "Eight-Angle Pose"]
      },
      {
        id: 6,
        title: "Deep Backbend Practice",
        duration: "50 min",
        difficulty: "Advanced",
        description: "Advanced backbending sequence",
        thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
        poses: ["Wheel Pose", "King Pigeon", "Scorpion", "Dropback"]
      }
    ]
  };

  // Add goal-specific videos
  const goalSpecificVideos = [];
  
  if (goals.includes("flexibility")) {
    goalSpecificVideos.push({
      id: 100,
      title: "Deep Flexibility Session",
      duration: "35 min",
      difficulty: experience,
      description: "Improve your flexibility with targeted stretches",
      thumbnail: "https://images.unsplash.com/photo-1506629905499-45b8394c0d3b?w=400&h=225&fit=crop",
      poses: ["Forward Fold", "Pigeon Pose", "Splits", "Seated Twist"]
    });
  }

  if (goals.includes("stress")) {
    goalSpecificVideos.push({
      id: 101,
      title: "Stress Relief Yoga",
      duration: "30 min",
      difficulty: experience,
      description: "Calm your mind and release tension",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
      poses: ["Child's Pose", "Legs Up Wall", "Gentle Twists", "Savasana"]
    });
  }

  if (goals.includes("strength")) {
    goalSpecificVideos.push({
      id: 102,
      title: "Power Strength Session",
      duration: "40 min",
      difficulty: experience,
      description: "Build muscular strength and endurance",
      thumbnail: "https://images.unsplash.com/photo-1506629905499-45b8394c0d3b?w=400&h=225&fit=crop",
      poses: ["Chaturanga", "Warrior III", "Chair Pose", "Eagle Pose"]
    });
  }

  // Get videos based on style and experience
  const styleVideos = styleBasedVideos[style.toLowerCase() as keyof typeof styleBasedVideos];
  const levelVideos = styleVideos?.[experience.toLowerCase() as keyof typeof styleVideos] || 
                     defaultVideos[experience.toLowerCase() as keyof typeof defaultVideos] || 
                     defaultVideos.beginner;
  
  return [...levelVideos, ...goalSpecificVideos];
};

const generateWeeklySchedule = (experience: string, goals: string[], time: string) => {
  const scheduleMap = {
    beginner: {
      Monday: "Gentle Morning Flow - Easy start to the week",
      Tuesday: "Basic Strength Building - Foundation building",
      Wednesday: "Flexibility Focus - Mid-week stretch",
      Thursday: "Balance Practice - Stability work",
      Friday: "Core Strengthening - End week strong",
      Saturday: "Restorative Yoga - Weekend recovery",
      Sunday: "Meditation & Breath - Mindful preparation"
    },
    intermediate: {
      Monday: "Power Vinyasa Flow - Energetic start",
      Tuesday: "Core Strength Focus - Build power",
      Wednesday: "Flexibility & Mobility - Recovery day",
      Thursday: "Standing Poses - Strength & stability",
      Friday: "Dynamic Flow - Full body workout",
      Saturday: "Hip Opening Flow - Deep stretches",
      Sunday: "Pranayama & Meditation - Mental clarity"
    },
    advanced: {
      Monday: "Advanced Arm Balances - Challenge yourself",
      Tuesday: "Deep Backbend Practice - Open your heart",
      Wednesday: "Intense Core Work - Power building",
      Thursday: "Advanced Standing Poses - Precision work",
      Friday: "Peak Pose Practice - Master difficult poses",
      Saturday: "Restorative & Yin - Deep restoration",
      Sunday: "Advanced Pranayama - Breath mastery"
    }
  };

  return scheduleMap[experience.toLowerCase() as keyof typeof scheduleMap] || scheduleMap.beginner;
};

const YogaPlan = ({ experience, style, goals, time }: YogaPlanProps) => {
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const videos = generatePersonalizedVideos(experience, style, goals);
  const weeklySchedule = generateWeeklySchedule(experience, goals, time);

  const toggleVideoComplete = (videoId: number) => {
    setCompletedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const getTimeSlot = () => {
    switch(time) {
      case 'morning': return '6:00 - 7:00 AM';
      case 'evening': return '6:00 - 8:00 PM';
      case 'both': return 'Morning & Evening';
      default: return '6:00 - 7:00 AM';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Your Personalized Yoga Journey</CardTitle>
          <CardDescription className="text-orange-100 text-lg">
            {experience} Level • {style.charAt(0).toUpperCase() + style.slice(1)} Style • {time.charAt(0).toUpperCase() + time.slice(1)} Practice
          </CardDescription>
          <div className="flex justify-center space-x-4 mt-4">
            {goals.map((goal, index) => (
              <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                {goal.charAt(0).toUpperCase() + goal.slice(1)}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="videos">Video Library</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white text-orange-600 hover:bg-orange-50 rounded-full w-16 h-16"
                      onClick={() => setActiveVideo(video.id)}
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-orange-500">
                    {video.difficulty}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleVideoComplete(video.id)}
                      className="text-green-600"
                    >
                      {completedVideos.includes(video.id) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {video.duration}
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {video.poses.length} poses
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Poses included:</p>
                    <div className="flex flex-wrap gap-1">
                      {video.poses.slice(0, 3).map((pose, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {pose}
                        </Badge>
                      ))}
                      {video.poses.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{video.poses.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-orange-500" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>
                Your personalized {experience.toLowerCase()} level practice schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(weeklySchedule).map(([day, practice]) => (
                  <div key={day} className="flex items-center justify-between p-4 border border-orange-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-orange-800">{day}</h3>
                      <p className="text-orange-600">{practice}</p>
                    </div>
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      {getTimeSlot()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Videos Completed</span>
                      <span>{completedVideos.length}/{videos.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedVideos.length / videos.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Goals Progress:</h4>
                    {goals.map((goal, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{goal}</span>
                        <Badge variant="secondary">
                          {completedVideos.length > 0 ? 'In Progress' : 'Not Started'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">Yoga Beginner</p>
                      <p className="text-sm text-gray-600">Started your yoga journey</p>
                    </div>
                  </div>
                  {completedVideos.length >= 1 && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">First Video Complete</p>
                        <p className="text-sm text-gray-600">Completed your first practice</p>
                      </div>
                    </div>
                  )}
                  {completedVideos.length >= 3 && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Consistency</p>
                        <p className="text-sm text-gray-600">3 videos completed!</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {videos.find(v => v.id === activeVideo)?.title}
                </h2>
                <Button variant="ghost" onClick={() => setActiveVideo(null)}>
                  ✕
                </Button>
              </div>
              <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-white text-center">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Video player would be integrated here</p>
                  <p className="text-sm text-gray-300">
                    Duration: {videos.find(v => v.id === activeVideo)?.duration}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveVideo(null)}>
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    toggleVideoComplete(activeVideo);
                    setActiveVideo(null);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Mark as Complete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YogaPlan;
