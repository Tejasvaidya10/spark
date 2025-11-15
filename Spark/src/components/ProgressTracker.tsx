import { useState } from "react";
import { FileText, Target, Sparkles, MessageSquare } from "lucide-react";
import { StepCard } from "./StepCard";

export interface Task {
  id: string;
  label: string;
  completed: boolean;
}

export interface Step {
  id: number;
  title: string;
  icon: typeof FileText;
  status: "completed" | "ongoing" | "yet-to-start";
  statusColor: string;
  tasks: Task[];
}

export function ProgressTracker() {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Survey",
      icon: FileText,
      status: "ongoing",
      statusColor: "text-orange-500",
      tasks: [
        { id: "r1", label: "Complete Basic Info", completed: true },
        { id: "r2", label: "Add Skills & Interests", completed: false },
        { id: "r3", label: "Career Preferences", completed: true },
        { id: "r4", label: "Review & Submit", completed: true },
      ],
    },
    {
      id: 2,
      title: "Course",
      icon: Target,
      status: "yet-to-start",
      statusColor: "text-gray-400",
      tasks: [
        { id: "c1", label: "Explore Careers", completed: false },
        { id: "c2", label: "Optimize Resume", completed: false },
      ],
    },
    {
      id: 3,
      title: "Certification",
      icon: Sparkles,
      status: "completed",
      statusColor: "text-[#8BA888]",
      tasks: [
        { id: "a1", label: "Connect LinkedIn", completed: true },
        { id: "a2", label: "Upload LinkedIn PDF", completed: true },
        { id: "a3", label: "Improve Score", completed: true },
        { id: "a4", label: "Reach Green Zone", completed: true },
      ],
    },
    {
      id: 4,
      title: "Networking & Jobs",
      icon: MessageSquare,
      status: "yet-to-start",
      statusColor: "text-gray-400",
      tasks: [
        { id: "i1", label: "Record an Elevator Pitch", completed: false },
        { id: "i2", label: "Reach Level 4 in Elevator Pitch", completed: false },
        { id: "i3", label: "Record a Mock Interview", completed: false },
        { id: "i4", label: "Reach Level 4 in Mock Interview", completed: false },
      ],
    },
  ]);

  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const toggleTask = (stepId: number, taskId: string) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            tasks: step.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          };
        }
        return step;
      })
    );
  };

  return (
    <div className="w-full">
      {/* Progress Header */}
      <div className="mb-8">
        <h2 className="text-gray-600 mb-3">Your progress</h2>
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#667EEA] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            stepNumber={index + 1}
            onToggleTask={toggleTask}
          />
        ))}
      </div>
    </div>
  );
}