import { useState } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  FileText, 
  Briefcase, 
  Star, 
  MessageSquare,
  CheckCircle2,
  Circle,
  Clock
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
}

interface StepTemplateProps {
  onTaskToggle?: (stepId: number, taskId: string) => void;
}

export function StepTemplate({ onTaskToggle }: StepTemplateProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: 'Resume',
      icon: FileText,
      status: 'ongoing',
      tasks: [
        { id: 'resume-1', label: 'Upload Resume', completed: true },
        { id: 'resume-2', label: 'Edit Resume', completed: true },
        { id: 'resume-3', label: 'View Feedback', completed: false },
        { id: 'resume-4', label: 'Reach Green Zone', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Career Fit',
      icon: Briefcase,
      status: 'yet-to-start',
      tasks: [
        { id: 'career-1', label: 'Explore Careers', completed: false },
        { id: 'career-2', label: 'Optimize Resume', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Aspire',
      icon: Star,
      status: 'completed',
      tasks: [
        { id: 'aspire-1', label: 'Connect LinkedIn', completed: true },
        { id: 'aspire-2', label: 'Upload LinkedIn PDF', completed: true },
        { id: 'aspire-3', label: 'Improve Score', completed: true },
        { id: 'aspire-4', label: 'Reach Green Zone', completed: true }
      ]
    },
    {
      id: 4,
      title: 'Interview',
      icon: MessageSquare,
      status: 'yet-to-start',
      tasks: [
        { id: 'interview-1', label: 'Record an Elevator Pitch', completed: false },
        { id: 'interview-2', label: 'Reach Level 4 in Elevator Pitch', completed: false },
        { id: 'interview-3', label: 'Record a Mock Interview', completed: false },
        { id: 'interview-4', label: 'Reach Level 4 in Mock Interview', completed: false }
      ]
    }
  ]);

  const handleTaskToggle = (stepId: number, taskId: string) => {
    setSteps(prevSteps => 
      prevSteps.map(step => {
        if (step.id === stepId) {
          const updatedTasks = step.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          return { ...step, tasks: updatedTasks };
        }
        return step;
      })
    );
    onTaskToggle?.(stepId, taskId);
  };

  const getStatusColor = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100',
          border: 'border-green-500',
          text: 'text-green-700',
          icon: 'text-green-600',
          badge: 'bg-green-600'
        };
      case 'ongoing':
        return {
          bg: 'bg-orange-100',
          border: 'border-orange-500',
          text: 'text-orange-700',
          icon: 'text-orange-600',
          badge: 'bg-orange-600'
        };
      case 'yet-to-start':
        return {
          bg: 'bg-gray-100',
          border: 'border-gray-400',
          text: 'text-gray-600',
          icon: 'text-gray-500',
          badge: 'bg-gray-500'
        };
    }
  };

  const getStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'ongoing':
        return <Clock className="w-5 h-5" />;
      case 'yet-to-start':
        return <Circle className="w-5 h-5" />;
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

  return (
    <div className="w-full space-y-8">
      {/* Overall Progress */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-900">Career Journey Progress</h2>
          <span className="text-blue-600">{Math.round(calculateOverallProgress())}%</span>
        </div>
        <Progress value={calculateOverallProgress()} className="h-3" />
        <p className="text-gray-600 mt-2">Complete all tasks across the four steps to finish your career journey</p>
      </div>

      {/* Horizontal Steps - Desktop View */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-16 left-0 right-0 flex items-center px-24">
            <div className="flex-1 grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="h-1 bg-gray-300 rounded" />
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-6 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colors = getStatusColor(step.status);
              const progress = calculateProgress(step.tasks);
              const isHovered = hoveredStep === step.id;

              return (
                <div
                  key={step.id}
                  className="relative"
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step Card */}
                  <Card 
                    className={`p-6 transition-all duration-300 cursor-pointer ${
                      isHovered ? 'shadow-2xl scale-105 border-2 ' + colors.border : 'shadow-md'
                    }`}
                  >
                    {/* Icon and Status */}
                    <div className="flex flex-col items-center mb-4">
                      <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center mb-3 transition-transform ${isHovered ? 'scale-110' : ''}`}>
                        <Icon className={`w-8 h-8 ${colors.icon}`} />
                      </div>
                      <h3 className="text-gray-900 text-center mb-2">{step.title}</h3>
                      <Badge className={`${colors.badge} flex items-center gap-1`}>
                        {getStatusIcon(step.status)}
                        {getStatusLabel(step.status)}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-gray-500 text-center">
                        {step.tasks.filter(t => t.completed).length} / {step.tasks.length} tasks
                      </p>
                    </div>
                  </Card>

                  {/* Hover Task List */}
                  {isHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Card className="p-6 shadow-2xl border-2 border-blue-500">
                        <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                          <Icon className="w-5 h-5 text-blue-600" />
                          {step.title} Tasks
                        </h4>
                        <div className="space-y-3">
                          {step.tasks.map((task) => (
                            <div
                              key={task.id}
                              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                                task.completed 
                                  ? 'bg-green-50 hover:bg-green-100' 
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                            >
                              <Checkbox
                                id={task.id}
                                checked={task.completed}
                                onCheckedChange={() => handleTaskToggle(step.id, task.id)}
                                className="mt-1"
                              />
                              <label
                                htmlFor={task.id}
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
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between text-gray-600">
                            <span>Completion</span>
                            <span className={progress === 100 ? 'text-green-600' : 'text-gray-900'}>
                              {Math.round(progress)}%
                            </span>
                          </div>
                        </div>
                      </Card>
                      {/* Arrow pointer */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-blue-500 rotate-45" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vertical Steps - Mobile View */}
      <div className="lg:hidden space-y-6">
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
                    {step.tasks.filter(t => t.completed).length} / {step.tasks.length} tasks completed
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
                            ? 'bg-green-50' 
                            : 'bg-white'
                        }`}
                      >
                        <Checkbox
                          id={`mobile-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => handleTaskToggle(step.id, task.id)}
                          className="mt-1"
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
    </div>
  );
}
