import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Trophy, 
  Flame, 
  Activity, 
  CheckCircle, 
  Clock,
  Star,
  Award,
  BarChart3,
  Zap,
  Timer,
  Users,
  Settings,
  Download
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  category: string;
  deadline: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const ProgressTracker = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Daily Posture Sessions',
      description: 'Complete 5 posture analysis sessions daily',
      current: 3,
      target: 5,
      unit: 'sessions',
      category: 'daily',
      deadline: '2024-01-31',
      progress: 60,
      status: 'active'
    },
    {
      id: '2',
      title: 'Weekly Posture Score',
      description: 'Maintain average posture score above 85%',
      current: 87,
      target: 85,
      unit: '%',
      category: 'weekly',
      deadline: '2024-01-21',
      progress: 102,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Monthly Streak',
      description: 'Use the app for 30 consecutive days',
      current: 12,
      target: 30,
      unit: 'days',
      category: 'monthly',
      deadline: '2024-02-15',
      progress: 40,
      status: 'active'
    },
    {
      id: '4',
      title: 'Exercise Completion',
      description: 'Complete 20 recommended exercises',
      current: 8,
      target: 20,
      unit: 'exercises',
      category: 'skill',
      deadline: '2024-02-01',
      progress: 40,
      status: 'active'
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first posture analysis',
      icon: '👶',
      unlockedAt: '2024-01-01',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Consistency King',
      description: 'Use the app for 7 consecutive days',
      icon: '👑',
      unlockedAt: '2024-01-08',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Perfect Form',
      description: 'Achieve 100% posture score',
      icon: '⭐',
      unlockedAt: '2024-01-10',
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Posture Master',
      description: 'Maintain excellent posture for 30 days',
      icon: '🏆',
      unlockedAt: '2024-01-15',
      rarity: 'legendary'
    }
  ]);

  const weeklyStats = [
    { day: 'Mon', score: 85, sessions: 4, time: 45 },
    { day: 'Tue', score: 88, sessions: 5, time: 52 },
    { day: 'Wed', score: 92, sessions: 3, time: 38 },
    { day: 'Thu', score: 89, sessions: 6, time: 48 },
    { day: 'Fri', score: 91, sessions: 4, time: 42 },
    { day: 'Sat', score: 87, sessions: 2, time: 28 },
    { day: 'Sun', score: 90, sessions: 3, time: 35 }
  ];

  const monthlyTrends = {
    averageScore: 87,
    totalSessions: 89,
    totalTime: 1245,
    streakDays: 12,
    improvementRate: 15
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'active': return 'bg-primary text-primary-foreground';
      case 'paused': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-muted bg-muted/20';
      case 'rare': return 'border-primary bg-primary/20';
      case 'epic': return 'border-warning bg-warning/20';
      case 'legendary': return 'border-accent bg-accent/20';
      default: return 'border-muted bg-muted/20';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Badge variant="secondary">Common</Badge>;
      case 'rare': return <Badge className="bg-primary">Rare</Badge>;
      case 'epic': return <Badge className="bg-warning">Epic</Badge>;
      case 'legendary': return <Badge className="bg-accent">Legendary</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-accent">{monthlyTrends.streakDays}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <Flame className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold text-primary">{monthlyTrends.totalSessions}</p>
                <p className="text-xs text-muted-foreground">this month</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-success">{monthlyTrends.averageScore}%</p>
                <p className="text-xs text-success">+{monthlyTrends.improvementRate}% improvement</p>
              </div>
              <Target className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold text-warning">{Math.floor(monthlyTrends.totalTime / 60)}h</p>
                <p className="text-xs text-muted-foreground">{monthlyTrends.totalTime % 60}m</p>
              </div>
              <Timer className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Progress Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Weekly Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyStats.map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 w-full">
                        <span className="text-sm font-medium w-8">{day.day}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Score: {day.score}%</span>
                            <span className="text-xs text-muted-foreground">
                              {day.sessions} sessions, {day.time}m
                            </span>
                          </div>
                          <Progress value={day.score} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Goals Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Active Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {goals.filter(g => g.status === 'active').slice(0, 3).map((goal) => (
                    <div key={goal.id} className="p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{goal.title}</h4>
                        <Badge variant="outline">{goal.category}</Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={goal.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{goal.current}/{goal.target} {goal.unit}</span>
                          <span>{goal.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Goals</h3>
            <Button variant="gradient">
              <Target className="h-4 w-4 mr-2" />
              Create New Goal
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal) => (
              <Card key={goal.id} className={`border-l-4 ${
                goal.status === 'completed' ? 'border-l-success' : 
                goal.status === 'active' ? 'border-l-primary' : 'border-l-muted'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{goal.title}</CardTitle>
                    <Badge className={getGoalStatusColor(goal.status)}>
                      {goal.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.current}/{goal.target} {goal.unit}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Deadline: {goal.deadline}</span>
                      <span>{goal.progress}% complete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <Badge variant="outline">
              <Trophy className="h-3 w-3 mr-1" />
              {achievements.length} Unlocked
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`border-2 ${getRarityColor(achievement.rarity)}`}>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      {getRarityBadge(achievement.rarity)}
                      <span className="text-xs text-muted-foreground">
                        {achievement.unlockedAt}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Performance Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weekly Average Score</span>
                    <span className="font-medium text-success">↑ 87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sessions per Week</span>
                    <span className="font-medium text-primary">↑ 27</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Session Length</span>
                    <span className="font-medium text-warning">↑ 41m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Improvement Rate</span>
                    <span className="font-medium text-accent">↑ 15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Personal Bests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Highest Score</span>
                    <span className="font-medium text-success">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Longest Streak</span>
                    <span className="font-medium text-accent">15 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Most Sessions (Day)</span>
                    <span className="font-medium text-primary">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Longest Session</span>
                    <span className="font-medium text-warning">85 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};