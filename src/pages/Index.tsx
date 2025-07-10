import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Brain, 
  TrendingUp, 
  Activity, 
  Target, 
  Zap,
  PlayCircle,
  Pause,
  BarChart3,
  Settings,
  User,
  Shield,
  Sparkles,
  Eye,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { PostureDetectionDashboard } from "@/components/PostureDetectionDashboard";
import { AIModelsManager } from "@/components/AIModelsManager";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ExerciseRecommendations } from "@/components/ExerciseRecommendations";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [postureScore, setPostureScore] = useState(85);
  const [alertsCount, setAlertsCount] = useState(3);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    toast({
      title: "Analysis Started",
      description: "Real-time posture detection is now active.",
    });
  };

  const handleStopAnalysis = () => {
    setIsAnalyzing(false);
    toast({
      title: "Analysis Stopped",
      description: "Posture detection has been paused.",
    });
  };

  const stats = [
    { label: "Posture Score", value: postureScore, suffix: "%", color: "text-success" },
    { label: "Today's Sessions", value: "4", suffix: "", color: "text-primary" },
    { label: "Active Alerts", value: alertsCount, suffix: "", color: "text-warning" },
    { label: "Streak Days", value: "12", suffix: "", color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Realfy AI
                </span>
              </div>
              <Badge variant="secondary" className="hidden sm:flex">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={isAnalyzing ? "destructive" : "ai"}
                size="sm"
                onClick={isAnalyzing ? handleStopAnalysis : handleStartAnalysis}
                className="animate-pulse-glow"
              >
                {isAnalyzing ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Analysis
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}{stat.suffix}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    {stat.label === "Posture Score" && <Target className="h-6 w-6 text-white" />}
                    {stat.label === "Today's Sessions" && <Activity className="h-6 w-6 text-white" />}
                    {stat.label === "Active Alerts" && <AlertTriangle className="h-6 w-6 text-white" />}
                    {stat.label === "Streak Days" && <TrendingUp className="h-6 w-6 text-white" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI Models</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Exercises</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <PostureDetectionDashboard 
              isAnalyzing={isAnalyzing}
              postureScore={postureScore}
              onScoreUpdate={setPostureScore}
            />
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <AIModelsManager />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressTracker />
          </TabsContent>

          <TabsContent value="exercises" className="space-y-6">
            <ExerciseRecommendations />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Real-time Alerts</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Analysis Sensitivity</span>
                    <div className="w-32">
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Privacy</span>
                    <Badge variant="outline">
                      <Shield className="h-3 w-3 mr-1" />
                      Secure
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;