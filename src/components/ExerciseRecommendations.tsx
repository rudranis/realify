import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle,
  Star,
  Heart,
  Award,
  Activity,
  Timer,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  Download,
  Share,
  Settings,
  Filter
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  targetAreas: string[];
  instructions: string[];
  benefits: string[];
  equipment: string[];
  videoUrl?: string;
  completed: boolean;
  rating: number;
  saved: boolean;
}

interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: string[];
  totalDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  popularity: number;
}

export const ExerciseRecommendations = () => {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [isExercising, setIsExercising] = useState(false);
  const [exerciseTime, setExerciseTime] = useState(0);

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: '1',
      name: 'Neck Stretch Relief',
      description: 'Gentle neck stretches to relieve tension and improve posture',
      category: 'neck',
      difficulty: 'beginner',
      duration: 5,
      targetAreas: ['neck', 'shoulders', 'upper back'],
      instructions: [
        'Sit or stand with your spine straight',
        'Slowly tilt your head to the right, bringing your ear toward your shoulder',
        'Hold for 15-30 seconds',
        'Return to center and repeat on the left side',
        'Perform 3 sets on each side'
      ],
      benefits: [
        'Reduces neck tension',
        'Improves flexibility',
        'Relieves headaches',
        'Enhances posture'
      ],
      equipment: ['None'],
      completed: false,
      rating: 4.5,
      saved: false
    },
    {
      id: '2',
      name: 'Shoulder Blade Squeeze',
      description: 'Strengthens upper back muscles and improves posture',
      category: 'shoulders',
      difficulty: 'beginner',
      duration: 10,
      targetAreas: ['upper back', 'shoulders', 'rhomboids'],
      instructions: [
        'Stand with feet hip-width apart',
        'Raise arms to shoulder height, elbows bent at 90 degrees',
        'Squeeze shoulder blades together',
        'Hold for 5 seconds',
        'Release and repeat 10-15 times'
      ],
      benefits: [
        'Strengthens upper back',
        'Improves posture',
        'Reduces shoulder tension',
        'Prevents rounded shoulders'
      ],
      equipment: ['None'],
      completed: true,
      rating: 4.8,
      saved: true
    },
    {
      id: '3',
      name: 'Hip Flexor Stretch',
      description: 'Counteracts tight hips from prolonged sitting',
      category: 'hips',
      difficulty: 'intermediate',
      duration: 8,
      targetAreas: ['hip flexors', 'quadriceps', 'core'],
      instructions: [
        'Start in a lunge position',
        'Lower your back knee to the ground',
        'Push your hips forward gently',
        'Hold for 30 seconds',
        'Switch legs and repeat'
      ],
      benefits: [
        'Improves hip flexibility',
        'Reduces lower back pain',
        'Enhances posture',
        'Increases mobility'
      ],
      equipment: ['Yoga mat (optional)'],
      completed: false,
      rating: 4.3,
      saved: false
    },
    {
      id: '4',
      name: 'Thoracic Spine Mobility',
      description: 'Improves mid-back flexibility and posture',
      category: 'spine',
      difficulty: 'intermediate',
      duration: 12,
      targetAreas: ['thoracic spine', 'upper back', 'shoulders'],
      instructions: [
        'Start on hands and knees',
        'Place one hand behind your head',
        'Rotate your torso, bringing elbow toward the ceiling',
        'Hold for 2 seconds',
        'Perform 10 repetitions on each side'
      ],
      benefits: [
        'Improves spinal mobility',
        'Reduces upper back stiffness',
        'Enhances posture',
        'Prevents back pain'
      ],
      equipment: ['Yoga mat'],
      completed: false,
      rating: 4.6,
      saved: true
    }
  ]);

  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: '1',
      name: 'Desk Worker Relief',
      description: 'A comprehensive routine for office workers',
      exercises: ['1', '2', '3'],
      totalDuration: 23,
      difficulty: 'beginner',
      category: 'desk',
      popularity: 95
    },
    {
      id: '2',
      name: 'Posture Reset',
      description: 'Quick routine to reset your posture throughout the day',
      exercises: ['2', '4'],
      totalDuration: 22,
      difficulty: 'intermediate',
      category: 'general',
      popularity: 88
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Exercises', count: exercises.length },
    { id: 'neck', name: 'Neck & Shoulders', count: exercises.filter(e => e.category === 'neck' || e.category === 'shoulders').length },
    { id: 'back', name: 'Back & Spine', count: exercises.filter(e => e.category === 'spine').length },
    { id: 'hips', name: 'Hip Flexors', count: exercises.filter(e => e.category === 'hips').length },
    { id: 'core', name: 'Core Stability', count: exercises.filter(e => e.category === 'core').length }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success text-success-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(e => e.category === selectedCategory);

  const handleExerciseStart = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setIsExercising(true);
    setExerciseTime(0);
    toast({
      title: "Exercise Started",
      description: `Starting ${exercise.name}`,
    });
  };

  const handleExerciseComplete = () => {
    if (currentExercise) {
      setExercises(prev => prev.map(e => 
        e.id === currentExercise.id ? { ...e, completed: true } : e
      ));
      setIsExercising(false);
      setCurrentExercise(null);
      setExerciseTime(0);
      toast({
        title: "Exercise Completed!",
        description: "Great job! Keep up the good work.",
      });
    }
  };

  const handleSaveExercise = (exerciseId: string) => {
    setExercises(prev => prev.map(e => 
      e.id === exerciseId ? { ...e, saved: !e.saved } : e
    ));
  };

  const completedCount = exercises.filter(e => e.completed).length;
  const savedCount = exercises.filter(e => e.saved).length;

  return (
    <div className="space-y-6">
      {/* Exercise Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Exercises</p>
                <p className="text-2xl font-bold">{exercises.length}</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{completedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Saved</p>
                <p className="text-2xl font-bold text-warning">{savedCount}</p>
              </div>
              <Heart className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold text-accent">{Math.round((completedCount / exercises.length) * 100)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="routines">Routines</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Exercise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSaveExercise(exercise.id)}
                      >
                        {exercise.saved ? (
                          <BookmarkCheck className="h-4 w-4 text-warning" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                      {exercise.completed && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {exercise.duration}min
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-sm">{exercise.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Target Areas:</p>
                      <div className="flex flex-wrap gap-1">
                        {exercise.targetAreas.map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    variant={exercise.completed ? "success" : "gradient"}
                    onClick={() => handleExerciseStart(exercise)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {exercise.completed ? "Do Again" : "Start Exercise"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="routines" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Exercise Routines</h3>
            <Button variant="gradient">
              <Zap className="h-4 w-4 mr-2" />
              Create Custom Routine
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routines.map((routine) => (
              <Card key={routine.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{routine.name}</CardTitle>
                    <Badge variant="outline">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {routine.popularity}% popularity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{routine.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge className={getDifficultyColor(routine.difficulty)}>
                      {routine.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {routine.totalDuration}min
                    </Badge>
                    <Badge variant="outline">
                      {routine.exercises.length} exercises
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-medium text-muted-foreground">Includes:</p>
                    <div className="space-y-1">
                      {routine.exercises.map((exerciseId) => {
                        const exercise = exercises.find(e => e.id === exerciseId);
                        return exercise ? (
                          <div key={exerciseId} className="text-sm flex items-center justify-between">
                            <span>{exercise.name}</span>
                            <span className="text-muted-foreground">{exercise.duration}min</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <Button className="w-full" variant="gradient">
                    <Play className="h-4 w-4 mr-2" />
                    Start Routine
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exercise" className="space-y-4">
          {currentExercise ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Exercise Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>{currentExercise.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(currentExercise.difficulty)}>
                        {currentExercise.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        <Timer className="h-3 w-3 mr-1" />
                        {currentExercise.duration} minutes
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {currentExercise.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Benefits:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {currentExercise.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exercise Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Exercise Session</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {Math.floor(exerciseTime / 60)}:{(exerciseTime % 60).toString().padStart(2, '0')}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Session Time
                      </p>
                    </div>

                    <Progress 
                      value={(exerciseTime / (currentExercise.duration * 60)) * 100} 
                      className="h-3"
                    />

                    <div className="flex space-x-2">
                      <Button 
                        variant={isExercising ? "destructive" : "success"}
                        className="flex-1"
                        onClick={() => setIsExercising(!isExercising)}
                      >
                        {isExercising ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Resume
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setExerciseTime(0)}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button 
                      variant="gradient"
                      className="w-full"
                      onClick={handleExerciseComplete}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Exercise
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Zap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Exercise Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Choose an exercise from the recommendations to get started.
                </p>
                <Button 
                  variant="gradient"
                  onClick={() => setActiveTab("recommendations")}
                >
                  Browse Exercises
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};