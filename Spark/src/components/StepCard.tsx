import { useState } from "react";
import { Check } from "lucide-react";
import { Step } from "./ProgressTracker";

interface StepCardProps {
  step: Step;
  stepNumber: number;
  onToggleTask: (stepId: number, taskId: string) => void;
}

export function StepCard({ step, stepNumber, onToggleTask }: StepCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = step.icon;

  const getStatusBadge = () => {
    if (step.status === "completed") {
      return (
        <span className="inline-block px-3 py-1 bg-[#8BA888]/10 text-[#8BA888] text-sm rounded-full">
          Completed
        </span>
      );
    } else if (step.status === "ongoing") {
      return (
        <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-sm rounded-full">
          Ongoing
        </span>
      );
    } else {
      return (
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-400 text-sm rounded-full">
          Yet to Start
        </span>
      );
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Step Header */}
      <div className="text-center mb-4">
        <div className="text-gray-400 text-sm mb-3">STEP {stepNumber}</div>
        
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className={`p-3 rounded-lg ${
            step.status === "completed" ? "bg-[#8BA888]/10" :
            step.status === "ongoing" ? "bg-orange-500/10" :
            "bg-gray-100"
          }`}>
            <Icon className={`w-6 h-6 ${step.statusColor}`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-gray-800 mb-2">{step.title}</h3>

        {/* Status Badge */}
        {getStatusBadge()}
      </div>

      {/* Tasks List - Only visible on hover */}
      {isHovered && (
        <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {step.tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-2">
              <button
                onClick={() => onToggleTask(step.id, task.id)}
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? "bg-[#8BA888] border-[#8BA888]"
                    : "bg-white border-gray-300 hover:border-[#8BA888]"
                }`}
              >
                {task.completed && <Check className="w-3 h-3 text-white" />}
              </button>
              <span className={`text-sm ${
                task.completed ? "text-gray-600" : "text-gray-500"
              }`}>
                {task.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}