import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Zap, 
  Target, 
  Activity, 
  Users, 
  Settings,
  Download,
  Upload,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Cpu,
  Clock,
  Shield
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AIModel {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  status: 'active' | 'inactive' | 'training' | 'error';
  lastTrained: string;
  confidence: number;
  usageCount: number;
  description: string;
}

export const AIModelsManager = () => {
  const [models, setModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'Desk Posture Analyzer',
      type: 'Posture Detection',
      accuracy: 94.5,
      status: 'active',
      lastTrained: '2024-01-15',
      confidence: 92,
      usageCount: 1247,
      description: 'Specialized in detecting desk posture issues and providing real-time feedback'
    },
    {
      id: '2',
      name: 'Squat Form Checker',
      type: 'Exercise Analysis',
      accuracy: 89.2,
      status: 'active',
      lastTrained: '2024-01-10',
      confidence: 87,
      usageCount: 856,
      description: 'Analyzes squat form and provides corrective suggestions'
    },
    {
      id: '3',
      name: 'Walking Gait Analyzer',
      type: 'Movement Pattern',
      accuracy: 91.8,
      status: 'training',
      lastTrained: '2024-01-12',
      confidence: 90,
      usageCount: 432,
      description: 'Evaluates walking patterns and identifies potential issues'
    },
    {
      id: '4',
      name: 'Yoga Pose Validator',
      type: 'Pose Recognition',
      accuracy: 86.7,
      status: 'inactive',
      lastTrained: '2024-01-08',
      confidence: 85,
      usageCount: 298,
      description: 'Validates yoga poses and provides alignment feedback'
    }
  ]);

  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  const handleModelToggle = (modelId: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: model.status === 'active' ? 'inactive' : 'active' }
        : model
    ));
    toast({
      title: "Model Status Updated",
      description: "AI model status has been changed successfully.",
    });
  };

  const handleTrainModel = (modelId: string) => {
    setIsTraining(true);
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'training' }
        : model
    ));
    
    // Simulate training
    setTimeout(() => {
      setModels(prev => prev.map(model => 
        model.id === modelId 
          ? { 
              ...model, 
              status: 'active', 
              accuracy: Math.min(100, model.accuracy + Math.random() * 5),
              lastTrained: new Date().toISOString().split('T')[0]
            }
          : model
      ));
      setIsTraining(false);
      toast({
        title: "Training Complete",
        description: "AI model has been retrained successfully.",
      });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'training': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'inactive': return <Pause className="h-4 w-4" />;
      case 'training': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Models Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Models</p>
                <p className="text-2xl font-bold">{models.length}</p>
              </div>
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Models</p>
                <p className="text-2xl font-bold text-success">
                  {models.filter(m => m.status === 'active').length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Accuracy</p>
                <p className="text-2xl font-bold text-primary">
                  {(models.reduce((acc, m) => acc + m.accuracy, 0) / models.length).toFixed(1)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold text-accent">
                  {models.reduce((acc, m) => acc + m.usageCount, 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Models Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Models</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {models.map((model) => (
              <Card key={model.id} className={`border-l-4 ${
                model.status === 'active' ? 'border-l-success' : 
                model.status === 'training' ? 'border-l-warning' : 
                model.status === 'error' ? 'border-l-error' : 'border-l-muted'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="font-semibold">{model.name}</h3>
                        <Badge className={getStatusColor(model.status)}>
                          {getStatusIcon(model.status)}
                          <span className="ml-1 capitalize">{model.status}</span>
                        </Badge>
                        <Badge variant="outline">{model.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {model.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Accuracy</p>
                          <p className="font-medium">{model.accuracy.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Confidence</p>
                          <p className="font-medium">{model.confidence}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Usage</p>
                          <p className="font-medium">{model.usageCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Trained</p>
                          <p className="font-medium">{model.lastTrained}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={model.status === 'active'}
                        onCheckedChange={() => handleModelToggle(model.id)}
                        disabled={model.status === 'training'}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTrainModel(model.id)}
                        disabled={model.status === 'training' || isTraining}
                      >
                        {model.status === 'training' ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        <span className="ml-1">
                          {model.status === 'training' ? 'Training...' : 'Train'}
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedModel(model)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Details */}
      {selectedModel && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cpu className="h-5 w-5" />
              <span>{selectedModel.name} - Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Accuracy Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall Accuracy</span>
                            <span>{selectedModel.accuracy.toFixed(1)}%</span>
                          </div>
                          <Progress value={selectedModel.accuracy} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Confidence Level</span>
                            <span>{selectedModel.confidence}%</span>
                          </div>
                          <Progress value={selectedModel.confidence} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Usage Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Predictions</span>
                          <span className="font-medium">{selectedModel.usageCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Success Rate</span>
                          <span className="font-medium">{(selectedModel.accuracy * 0.95).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Avg Response Time</span>
                          <span className="font-medium">45ms</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="training" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Training Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Learning Rate</label>
                          <p className="text-sm text-muted-foreground">0.001</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Batch Size</label>
                          <p className="text-sm text-muted-foreground">32</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Epochs</label>
                          <p className="text-sm text-muted-foreground">100</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Validation Split</label>
                          <p className="text-sm text-muted-foreground">20%</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="gradient" className="flex-1">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Training Data
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Export Model
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Model Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Auto-retrain</label>
                          <p className="text-sm text-muted-foreground">Automatically retrain when accuracy drops</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Real-time feedback</label>
                          <p className="text-sm text-muted-foreground">Provide instant feedback during analysis</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Data collection</label>
                          <p className="text-sm text-muted-foreground">Collect anonymous usage data for improvement</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};