import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Clock, 
  Target, 
  Activity,
  Download,
  Filter,
  RefreshCw,
  Eye,
  AlertTriangle,
  CheckCircle,
  Timer,
  Users,
  Zap
} from "lucide-react";

export const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("posture_score");

  const analyticsData = {
    postureScore: {
      current: 85,
      previous: 78,
      trend: 'up',
      data: [72, 75, 78, 81, 83, 85, 85]
    },
    sessionsCount: {
      current: 28,
      previous: 21,
      trend: 'up',
      data: [3, 4, 5, 3, 4, 5, 4]
    },
    averageSessionTime: {
      current: 45,
      previous: 38,
      trend: 'up',
      data: [35, 38, 42, 40, 43, 45, 45]
    },
    alertsTriggered: {
      current: 12,
      previous: 18,
      trend: 'down',
      data: [3, 2, 1, 2, 2, 1, 1]
    }
  };

  const detectionBreakdown = [
    { type: 'Desk Posture', count: 156, percentage: 45, color: 'bg-primary' },
    { type: 'Squat Form', count: 89, percentage: 25, color: 'bg-accent' },
    { type: 'Walking Gait', count: 67, percentage: 19, color: 'bg-success' },
    { type: 'Yoga Poses', count: 38, percentage: 11, color: 'bg-warning' }
  ];

  const weeklyProgress = [
    { day: 'Mon', score: 78, sessions: 4, time: 42 },
    { day: 'Tue', score: 82, sessions: 5, time: 38 },
    { day: 'Wed', score: 85, sessions: 3, time: 45 },
    { day: 'Thu', score: 81, sessions: 4, time: 48 },
    { day: 'Fri', score: 87, sessions: 6, time: 52 },
    { day: 'Sat', score: 89, sessions: 3, time: 35 },
    { day: 'Sun', score: 85, sessions: 2, time: 28 }
  ];

  const recentSessions = [
    { id: 1, date: '2024-01-15', type: 'Desk Posture', duration: 45, score: 87, alerts: 2 },
    { id: 2, date: '2024-01-15', type: 'Squat Form', duration: 25, score: 92, alerts: 0 },
    { id: 3, date: '2024-01-14', type: 'Walking Gait', duration: 30, score: 78, alerts: 3 },
    { id: 4, date: '2024-01-14', type: 'Desk Posture', duration: 52, score: 85, alerts: 1 },
    { id: 5, date: '2024-01-13', type: 'Yoga Poses', duration: 35, score: 90, alerts: 0 }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-error" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <Badge variant="outline">
            <Activity className="h-3 w-3 mr-1" />
            Real-time
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Posture Score</p>
                <p className="text-2xl font-bold">{analyticsData.postureScore.current}%</p>
                <div className="flex items-center space-x-1 mt-1">
                  {getTrendIcon(analyticsData.postureScore.trend)}
                  <span className={`text-sm ${getTrendColor(analyticsData.postureScore.trend)}`}>
                    {Math.abs(analyticsData.postureScore.current - analyticsData.postureScore.previous)}% vs last week
                  </span>
                </div>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sessions</p>
                <p className="text-2xl font-bold">{analyticsData.sessionsCount.current}</p>
                <div className="flex items-center space-x-1 mt-1">
                  {getTrendIcon(analyticsData.sessionsCount.trend)}
                  <span className={`text-sm ${getTrendColor(analyticsData.sessionsCount.trend)}`}>
                    {Math.abs(analyticsData.sessionsCount.current - analyticsData.sessionsCount.previous)} vs last week
                  </span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Session Time</p>
                <p className="text-2xl font-bold">{analyticsData.averageSessionTime.current}m</p>
                <div className="flex items-center space-x-1 mt-1">
                  {getTrendIcon(analyticsData.averageSessionTime.trend)}
                  <span className={`text-sm ${getTrendColor(analyticsData.averageSessionTime.trend)}`}>
                    {Math.abs(analyticsData.averageSessionTime.current - analyticsData.averageSessionTime.previous)}m vs last week
                  </span>
                </div>
              </div>
              <Timer className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alerts</p>
                <p className="text-2xl font-bold">{analyticsData.alertsTriggered.current}</p>
                <div className="flex items-center space-x-1 mt-1">
                  {getTrendIcon(analyticsData.alertsTriggered.trend)}
                  <span className={`text-sm ${getTrendColor(analyticsData.alertsTriggered.trend)}`}>
                    {Math.abs(analyticsData.alertsTriggered.current - analyticsData.alertsTriggered.previous)} vs last week
                  </span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Weekly Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyProgress.map((day) => (
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

        {/* Detection Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Detection Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {detectionBreakdown.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Sessions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{session.type}</span>
                    <span className="text-xs text-muted-foreground">{session.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">{session.duration}m</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${getScoreColor(session.score)}`}>
                      {session.score}%
                    </p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${session.alerts > 0 ? 'text-warning' : 'text-success'}`}>
                      {session.alerts}
                    </p>
                    <p className="text-xs text-muted-foreground">Alerts</p>
                  </div>
                  <Badge variant={session.score >= 90 ? "default" : session.score >= 70 ? "secondary" : "destructive"}>
                    {session.score >= 90 ? "Excellent" : session.score >= 70 ? "Good" : "Needs Work"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};