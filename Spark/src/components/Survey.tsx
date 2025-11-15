import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserData } from '../App';

interface SurveyProps {
  onComplete: (data: UserData) => void;
  onBack: () => void;
}

const careerOptions = [
  'Web Development',
  'Data Science',
  'UX/UI Design',
  'Mobile Development',
  'DevOps',
  'Cloud Architecture',
  'Cybersecurity',
  'AI/Machine Learning',
  'Product Management',
  'Digital Marketing'
];

const skillsToRate = [
  { id: 'javascript', label: 'JavaScript/TypeScript' },
  { id: 'python', label: 'Python' },
  { id: 'design', label: 'Design Tools' },
  { id: 'communication', label: 'Communication' },
  { id: 'leadership', label: 'Leadership' }
];

export function Survey({ onComplete, onBack }: SurveyProps) {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  
  // Form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<{ [key: string]: number }>({
    javascript: 50,
    python: 50,
    design: 50,
    communication: 50,
    leadership: 50
  });
  const [goals, setGoals] = useState('');

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSkillChange = (skillId: string, value: number[]) => {
    setSkills(prev => ({ ...prev, [skillId]: value[0] }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setIsComplete(true);
    setTimeout(() => {
      onComplete({
        name,
        email,
        interests: selectedInterests,
        skills,
        goals
      });
    }, 2000);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return name.trim() !== '' && email.trim() !== '';
      case 2:
        return selectedInterests.length > 0;
      case 3:
        return true;
      case 4:
        return goals.trim() !== '';
      default:
        return false;
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your survey has been submitted successfully. We're creating your personalized career dashboard...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Survey Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-gray-900 mb-2">Let's get to know you</h2>
                <p className="text-gray-600">Tell us a bit about yourself to get started</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-gray-900 mb-2">What interests you?</h2>
                <p className="text-gray-600">Select all career areas that interest you</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careerOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => handleInterestToggle(option)}>
                    <Checkbox
                      id={option}
                      checked={selectedInterests.includes(option)}
                      onCheckedChange={() => handleInterestToggle(option)}
                    />
                    <Label htmlFor={option} className="cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-gray-900 mb-2">Rate your skills</h2>
                <p className="text-gray-600">How would you rate your experience in these areas?</p>
              </div>

              <div className="space-y-6">
                {skillsToRate.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2">
                      <Label>{skill.label}</Label>
                      <span className="text-blue-600">{skills[skill.id]}%</span>
                    </div>
                    <Slider
                      value={[skills[skill.id]]}
                      onValueChange={(value) => handleSkillChange(skill.id, value)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-gray-900 mb-2">What are your goals?</h2>
                <p className="text-gray-600">Tell us about your career aspirations and what you hope to achieve</p>
              </div>

              <div>
                <Label htmlFor="goals">Your Goals *</Label>
                <Textarea
                  id="goals"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="I want to become a senior developer in the next 2 years, learn new technologies, and mentor junior developers..."
                  rows={6}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Survey
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
