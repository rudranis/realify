import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Camera, 
  CameraOff, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Target, 
  Zap,
  Upload,
  Download,
  Maximize,
  Settings,
  Users,
  Timer
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PostureDetectionDashboardProps {
  isAnalyzing: boolean;
  postureScore: number;
  onScoreUpdate: (score: number) => void;
}

export const PostureDetectionDashboard = ({ 
  isAnalyzing, 
  postureScore, 
  onScoreUpdate 
}: PostureDetectionDashboardProps) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [currentDetection, setCurrentDetection] = useState<string | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [postureFeedback, setPostureFeedback] = useState<string[]>([]);
  const [detectedPostures, setDetectedPostures] = useState({
    deskPosture: { status: 'good', confidence: 92 },
    spineAlignment: { status: 'warning', confidence: 78 },
    shoulderPosition: { status: 'good', confidence: 89 },
    neckPosition: { status: 'error', confidence: 65 }
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing && cameraActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        // Simulate posture analysis
        simulatePostureAnalysis();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, cameraActive]);

  const simulatePostureAnalysis = () => {
    // Simulate real-time posture detection
    const postures = ['Desk Posture', 'Squat Form', 'Walking Gait', 'Yoga Pose'];
    const currentPosture = postures[Math.floor(Math.random() * postures.length)];
    setCurrentDetection(currentPosture);
    
    // Simulate score changes
    const newScore = Math.max(60, Math.min(100, postureScore + (Math.random() - 0.5) * 10));
    onScoreUpdate(Math.round(newScore));
    
    // Simulate feedback
    const feedback = [
      'Keep your shoulders back',
      'Align your spine',
      'Adjust screen height',
      'Take a break soon'
    ];
    setPostureFeedback(prev => [...prev.slice(-2), feedback[Math.floor(Math.random() * feedback.length)]]);
  };

  const handleCameraToggle = async () => {
    if (cameraActive) {
      setCameraActive(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      toast({
        title: "Camera Disabled",
        description: "Webcam access has been turned off.",
      });
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
        toast({
          title: "Camera Enabled",
          description: "Webcam access granted. Analysis starting...",
        });
      } catch (error) {
        toast({
          title: "Camera Error",
          description: "Unable to access webcam. Please check permissions.",
          variant: "destructive",
        });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good': return <Badge className="bg-success text-success-foreground">Good</Badge>;
      case 'warning': return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
      case 'error': return <Badge className="bg-error text-error-foreground">Poor</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Live Video Feed */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Live Analysis</span>
                {isAnalyzing && (
                  <Badge variant="outline" className="animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  <Timer className="h-3 w-3 mr-1" />
                  {formatTime(sessionTime)}
                </Badge>
                <Button
                  variant={cameraActive ? "destructive" : "success"}
                  size="sm"
                  onClick={handleCameraToggle}
                >
                  {cameraActive ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              {!cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Click to enable camera</p>
                  </div>
                </div>
              )}
              {cameraActive && currentDetection && (
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-sm">Detecting: {currentDetection}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Feedback */}
      <div className="space-y-6">
        {/* Posture Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Current Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-success">
                {postureScore}%
              </div>
              <Progress value={postureScore} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {postureScore >= 90 ? 'Excellent posture!' : 
                 postureScore >= 70 ? 'Good posture' : 
                 'Needs improvement'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Posture Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Analysis Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(detectedPostures).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      value.status === 'good' ? 'bg-success' : 
                      value.status === 'warning' ? 'bg-warning' : 'bg-error'
                    }`} />
                    <span className="text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {value.confidence}%
                    </span>
                    {getStatusBadge(value.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Live Feedback</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {postureFeedback.length > 0 ? (
                postureFeedback.map((feedback, index) => (
                  <Alert key={index} className="py-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {feedback}
                    </AlertDescription>
                  </Alert>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No feedback yet. Start analysis to see recommendations.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="h-auto p-2">
                <Upload className="h-4 w-4 mb-1" />
                <span className="text-xs">Upload Video</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto p-2">
                <Download className="h-4 w-4 mb-1" />
                <span className="text-xs">Save Session</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto p-2">
                <Maximize className="h-4 w-4 mb-1" />
                <span className="text-xs">Fullscreen</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto p-2">
                <Users className="h-4 w-4 mb-1" />
                <span className="text-xs">Share</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};