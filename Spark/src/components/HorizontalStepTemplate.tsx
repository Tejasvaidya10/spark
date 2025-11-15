import { useState } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  CheckCircle2, 
  FileText, 
  GraduationCap, 
  Award, 
  Users,
  Clock,
  Circle
} from 'lucide-react';

interface Task {
  id: string;
  label: string;
  completed: boolean;
}

interface Step {
  id: number;
  title: string;
  icon: any;
  status: 'completed' | 'ongoing' | 'yet-to-start';
  tasks: Task[];
  description: string;
}

interface HorizontalStepTemplateProps {
  onTaskToggle?: (stepId: number, taskId: string) => void;
  onWellnessCheck?: (decision: 'yes' | 'no') => void;
}

export function HorizontalStepTemplate({ onTaskToggle, onWellnessCheck }: HorizontalStepTemplateProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [showWellnessCheck, setShowWellnessCheck] = useState(false);
  const [wellnessDecision, setWellnessDecision] = useState<'yes' | 'no' | null>(null);
  
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: 'Survey',
      icon: FileText,
      status: 'completed',
      description: 'Complete your career assessment survey',
      tasks: [
        { id: 'survey-1', label: 'Complete Basic Information', completed: true },
        { id: 'survey-2', label: 'Select Career Interests', completed: true },
        { id: 'survey-3', label: 'Rate Your Skills', completed: true },
        { id: 'survey-4', label: 'Define Career Goals', completed: true }
      ]
    },
    {
      id: 2,
      title: 'Courses',
      icon: GraduationCap,
      status: 'ongoing',
      description: 'Learn and develop new skills',
      tasks: [
        { id: 'course-1', label: 'Explore Courses', completed: true },
        { id: 'course-2', label: 'Complete Course Modules', completed: true },
        { id: 'course-3', label: 'Achieve 25% Progress', completed: false },
        { id: 'course-4', label: 'Wellness Check', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Certificate Completion',
      icon: Award,
      status: 'yet-to-start',
      description: 'Earn professional certifications',
      tasks: [
        { id: 'cert-1', label: 'Upload Certificate', completed: false },
        { id: 'cert-2', label: 'Complete Certification Exam', completed: false },
        { id: 'cert-3', label: 'Schedule Certificate Review', completed: false }
      ]
    },
    {
      id: 4,
      title: 'Networking & Career Opportunities',
      icon: Users,
      status: 'yet-to-start',
      description: 'Build connections and explore opportunities',
      tasks: [
        { id: 'network-1', label: 'Attend Networking Event', completed: false },
        { id: 'network-2', label: 'Apply for Jobs', completed: false },
        { id: 'network-3', label: 'Connect with Mentors', completed: false }
      ]
    }
  ]);

  const handleTaskToggle = (stepId: number, taskId: string) => {
    setSteps(prevSteps => 
      prevSteps.map(step => {
        if (step.id === stepId) {
          const updatedTasks = step.tasks.map(task => {
            if (task.id === taskId) {
              // If this is the wellness check task, show the dialog
              if (task.label === 'Wellness Check' && !task.completed) {
                setShowWellnessCheck(true);
                return task; // Don't toggle yet
              }
              return { ...task, completed: !task.completed };
            }
            return task;
          });
          return { ...step, tasks: updatedTasks };
        }
        return step;
      })
    );
    onTaskToggle?.(stepId, taskId);
  };

  const handleWellnessDecision = (decision: 'yes' | 'no') => {
    setWellnessDecision(decision);
    setShowWellnessCheck(false);
    
    // Mark wellness check as complete
    setSteps(prevSteps => 
      prevSteps.map(step => {
        if (step.id === 2) {
          const updatedTasks = step.tasks.map(task => 
            task.label === 'Wellness Check' ? { ...task, completed: true } : task
          );
          return { ...step, tasks: updatedTasks };
        }
        return step;
      })
    );
    
    onWellnessCheck?.(decision);
  };

  const getStatusColor = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-500',
          lightBg: 'bg-green-100',
          border: 'border-green-500',
          text: 'text-green-700',
          icon: 'text-white',
          badge: 'bg-green-600',
          progressBar: 'bg-green-500'
        };
      case 'ongoing':
        return {
          bg: 'bg-orange-500',
          lightBg: 'bg-orange-100',
          border: 'border-orange-500',
          text: 'text-orange-700',
          icon: 'text-white',
          badge: 'bg-orange-600',
          progressBar: 'bg-orange-500'
        };
      case 'yet-to-start':
        return {
          bg: 'bg-gray-400',
          lightBg: 'bg-gray-100',
          border: 'border-gray-400',
          text: 'text-gray-600',
          icon: 'text-white',
          badge: 'bg-gray-500',
          progressBar: 'bg-gray-400'
        };
    }
  };

  const getStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'ongoing':
        return <Clock className="w-4 h-4" />;
      case 'yet-to-start':
        return <Circle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'ongoing':
        return 'Ongoing';
      case 'yet-to-start':
        return 'Yet to Start';
    }
  };

  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return (completed / tasks.length) * 100;
  };

  const calculateOverallProgress = () => {
    const totalTasks = steps.reduce((acc, step) => acc + step.tasks.length, 0);
    const completedTasks = steps.reduce(
      (acc, step) => acc + step.tasks.filter(t => t.completed).length,
      0
    );
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="w-full space-y-8">
      {/* Header with User Welcome */}
      <div className="text-center mb-8">
        <h1 className="text-gray-900 mb-2">Your Career Journey</h1>
        <p className="text-gray-600">
          Track your progress through each step and complete tasks to advance your career
        </p>
      </div>

      {/* Overall Progress Bar */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-900">Overall Progress</h2>
          <span className="text-blue-600">{Math.round(overallProgress)}%</span>
        </div>
        <Progress value={overallProgress} className="h-4" />
        <p className="text-gray-600 mt-3">
          {steps.filter(s => s.status === 'completed').length} of {steps.length} steps completed • 
          {' '}{steps.reduce((acc, step) => acc + step.tasks.filter(t => t.completed).length, 0)} of {steps.reduce((acc, step) => acc + step.tasks.length, 0)} tasks done
        </p>
      </Card>

      {/* Horizontal Steps Layout - Desktop */}
      <div className="hidden lg:block">
        <div className="relative pb-64">
          {/* Connection Lines between steps */}
          <div className="absolute top-20 left-0 right-0 px-16">
            <div className="flex items-center justify-between">
              {steps.slice(0, -1).map((step, index) => {
                const nextStep = steps[index + 1];
                const colors = getStatusColor(step.status);
                const nextColors = getStatusColor(nextStep.status);
                
                return (
                  <div key={step.id} className="flex-1 flex items-center">
                    <div className="w-8 h-8" /> {/* Spacer for icon */}
                    <div className={`flex-1 h-1 ${
                      step.status === 'completed' && nextStep.status !== 'yet-to-start' 
                        ? colors.progressBar 
                        : 'bg-gray-300'
                    }`} />
                  </div>
                );
              })}
              <div className="w-8 h-8" /> {/* Spacer for last icon */}
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-4 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              const colors = getStatusColor(step.status);
              const progress = calculateProgress(step.tasks);
              const isHovered = hoveredStep === step.id;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step Icon */}
                  <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center mb-3 transition-all duration-300 ${
                    isHovered ? 'scale-110 shadow-lg' : 'shadow-md'
                  }`}>
                    <Icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>

                  {/* Step Title and Badge */}
                  <h3 className="text-gray-900 text-center mb-2">{step.title}</h3>
                  <Badge className={`${colors.badge} flex items-center gap-1 mb-2`}>
                    {getStatusIcon(step.status)}
                    {getStatusLabel(step.status)}
                  </Badge>

                  {/* Step Description */}
                  <p className="text-gray-600 text-center mb-3">{step.description}</p>

                  {/* Mini Progress */}
                  <div className="w-full px-4">
                    <div className="flex justify-between text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Hover - Task List Expansion */}
                  {isHovered && (
                    <div className="absolute top-full mt-6 w-80 animate-in fade-in slide-in-from-top-4 duration-300">
                      <Card className="p-6 shadow-2xl border-2 border-blue-500 bg-white">
                        {/* Arrow Pointer */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-l-2 border-t-2 border-blue-500 rotate-45" />
                        
                        <div className="relative">
                          <h4 className="text-gray-900 mb-1 flex items-center gap-2">
                            <Icon className="w-5 h-5 text-blue-600" />
                            {step.title} Tasks
                          </h4>
                          <p className="text-gray-600 mb-4">
                            {step.tasks.filter(t => t.completed).length} of {step.tasks.length} completed
                          </p>

                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {step.tasks.map((task) => (
                              <div
                                key={task.id}
                                className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${
                                  task.completed 
                                    ? 'bg-green-50 border border-green-200' 
                                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                <Checkbox
                                  id={task.id}
                                  checked={task.completed}
                                  onCheckedChange={() => handleTaskToggle(step.id, task.id)}
                                  className="mt-0.5"
                                />
                                <label
                                  htmlFor={task.id}
                                  className={`flex-1 cursor-pointer transition-all ${
                                    task.completed 
                                      ? 'text-green-800 line-through' 
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {task.label}
                                </label>
                                {task.completed && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Progress Summary */}
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Step Progress</span>
                              <span className={`${progress === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                                {Math.round(progress)}%
                              </span>
                            </div>
                            <Progress value={progress} className="h-2 mt-2" />
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vertical Steps Layout - Mobile */}
      <div className="lg:hidden space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const colors = getStatusColor(step.status);
          const progress = calculateProgress(step.tasks);
          const [isExpanded, setIsExpanded] = useState(false);

          return (
            <Card key={step.id} className="overflow-hidden">
              {/* Step Header */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <Badge className={`${colors.badge} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(step.status)}
                      {getStatusLabel(step.status)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-gray-500">
                    {step.tasks.filter(t => t.completed).length} of {step.tasks.length} tasks completed
                  </p>
                </div>
              </div>

              {/* Expandable Task List */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t bg-gray-50 animate-in slide-in-from-top-2 duration-300">
                  <h4 className="text-gray-900 mb-3">Tasks</h4>
                  <div className="space-y-2">
                    {step.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                          task.completed 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <Checkbox
                          id={`mobile-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => handleTaskToggle(step.id, task.id)}
                          className="mt-0.5"
                        />
                        <label
                          htmlFor={`mobile-${task.id}`}
                          className={`flex-1 cursor-pointer ${
                            task.completed 
                              ? 'text-green-800 line-through' 
                              : 'text-gray-700'
                          }`}
                        >
                          {task.label}
                        </label>
                        {task.completed && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Wellness Check Dialog */}
      {showWellnessCheck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6 animate-in fade-in zoom-in duration-300">
            <h3 className="text-gray-900 mb-4">Wellness Check</h3>
            <p className="text-gray-700 mb-6">
              Do you want to continue the course?
            </p>
            <div className="space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleWellnessDecision('yes')}
              >
                Yes, Continue Course
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleWellnessDecision('no')}
              >
                No, Connect with Mentor
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Wellness Decision Feedback */}
      {wellnessDecision && (
        <Card className={`p-4 ${
          wellnessDecision === 'yes' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-start gap-3">
            {wellnessDecision === 'yes' ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-900 mb-1">Great choice!</p>
                  <p className="text-green-700">The rest of the course has been unlocked. Keep up the great work!</p>
                </div>
              </>
            ) : (
              <>
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 mb-1">We're here to help!</p>
                  <p className="text-blue-700 mb-3">Let's connect you with a mentor who can guide you through the course material.</p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Find a Mentor
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
