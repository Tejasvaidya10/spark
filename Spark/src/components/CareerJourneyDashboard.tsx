import { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  CheckCircle, 
  BookOpen, 
  Award, 
  Users, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';
import { UserData } from '../App';

interface CareerJourneyDashboardProps {
  userData: UserData | null;
  onNavigate: (view: any) => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

const successStories = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    snippet: 'From bootcamp graduate to Senior Engineer at Google in just 3 years through dedication and continuous learning.',
    role: 'Senior Software Engineer at Google',
    fullStory: 'After completing a 12-week coding bootcamp, I landed my first junior role. With dedication and continuous learning, I progressed to senior engineer in just 3 years. The mentorship program was invaluable in my journey.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    snippet: 'Transitioned from data analyst to ML Engineer at Amazon by leveraging mentorship and targeted courses.',
    role: 'Machine Learning Engineer at Amazon',
    fullStory: 'I started as a data analyst but was curious about machine learning. Through this platform\'s courses and mentorship, I successfully transitioned to an ML engineering role at Amazon in under 2 years.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    snippet: 'Built my UX design portfolio from scratch and landed a Lead Designer role at Airbnb.',
    role: 'Lead UX Designer at Airbnb',
    fullStory: 'Without a formal design degree, I used the courses and freelance projects to build my portfolio. The career guidance helped me navigate the interview process and land my dream role at Airbnb.'
  },
  {
    id: 4,
    name: 'David Park',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    snippet: 'Grew from junior developer to Technical Lead at Microsoft through continuous skill development.',
    role: 'Technical Lead at Microsoft',
    fullStory: 'The structured learning path and mentorship opportunities helped me develop both technical and leadership skills. Five years later, I\'m now leading a team of talented engineers at Microsoft.'
  },
  {
    id: 5,
    name: 'Jennifer Williams',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    snippet: 'Successfully pivoted from marketing to Product Management at Spotify with strategic career planning.',
    role: 'Senior Product Manager at Spotify',
    fullStory: 'The career pathway feature helped me identify the skills I needed to transition from marketing to product management. With focused learning and networking, I achieved my goal in 3 years.'
  }
];

export function CareerJourneyDashboard({ userData, onNavigate, onSignOut, onRetakeSurvey }: CareerJourneyDashboardProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showContinueCourseDialog, setShowContinueCourseDialog] = useState(false);
  const [selectedStory, setSelectedStory] = useState<typeof successStories[0] | null>(null);
  const [courseDecision, setCourseDecision] = useState<'yes' | 'no' | null>(null);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const overallProgress = 50; // Calculate based on all steps

  const steps = [
    {
      id: 1,
      title: 'Survey Completed',
      icon: CheckCircle,
      progress: 100,
      status: 'completed',
      color: 'green',
      description: 'Meet with your career advisor to discuss the next steps.',
      cta: 'Schedule Meeting with Career Advisor',
      ctaAction: () => alert('Opening career advisor scheduling...')
    },
    {
      id: 2,
      title: 'Courses',
      icon: BookOpen,
      progress: 25,
      status: 'in-progress',
      color: 'yellow',
      description: 'You are 25% into the course. Complete the next steps to unlock the rest!',
      wellnessCheck: true,
      cta: 'Explore Courses',
      ctaAction: () => onNavigate('courses')
    },
    {
      id: 3,
      title: 'Certificate Completion',
      icon: Award,
      progress: 75,
      status: 'in-progress',
      color: 'yellow',
      description: 'Meet with your mentor to discuss your next steps.',
      cta: 'Schedule Mentor Meeting',
      ctaAction: () => alert('Opening mentor scheduling...')
    },
    {
      id: 4,
      title: 'Networking & Career Opportunities',
      icon: Users,
      progress: 0,
      status: 'upcoming',
      color: 'gray',
      description: 'Explore job opportunities and connect with professionals.',
      cta: 'View Networking Events',
      ctaAction: () => onNavigate('jobs')
    }
  ];

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusBadge = (status: string, color: string) => {
    if (status === 'completed') {
      return <Badge className="bg-green-600">Completed</Badge>;
    }
    if (status === 'in-progress') {
      return <Badge className="bg-yellow-600">In Progress</Badge>;
    }
    return <Badge className="bg-gray-400">Upcoming</Badge>;
  };

  return (
    <DashboardLayout
      userData={userData}
      currentPage="dashboard"
      onNavigate={onNavigate}
      onSignOut={onSignOut}
      onRetakeSurvey={onRetakeSurvey}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header with Breadcrumb and Overall Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span>Career Journey</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl">
              {userData?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-gray-900">Welcome back, {userData?.name}!</h1>
              <p className="text-gray-600">Track your career journey and celebrate your progress</p>
            </div>
          </div>

          {/* Overall Progress */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-gray-900">Overall Career Journey Progress</h3>
              </div>
              <span className="text-blue-600">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-gray-600 mt-3">You're making great progress! Keep up the momentum.</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Career Journey Steps */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Your Career Journey</h2>
              <Badge variant="outline">Step {steps.findIndex(s => s.status === 'in-progress') + 1} of {steps.length}</Badge>
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.status === 'in-progress';

              return (
                <Card 
                  key={step.id} 
                  className={`p-6 transition-all ${isActive ? 'border-2 border-blue-500 shadow-lg' : ''}`}
                >
                  <div className="flex gap-4">
                    {/* Step Number/Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'in-progress' ? 'bg-blue-600 text-white' :
                        'bg-gray-200 text-gray-500'
                      }`}>
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-gray-900">{step.title}</h3>
                            {getStatusBadge(step.status, step.color)}
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className={`font-medium ${
                            step.progress === 100 ? 'text-green-600' :
                            step.progress >= 50 ? 'text-yellow-600' :
                            'text-gray-600'
                          }`}>
                            {step.progress}%
                          </span>
                        </div>
                        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`absolute top-0 left-0 h-full ${getProgressColor(step.color)} transition-all duration-500`}
                            style={{ width: `${step.progress}%` }}
                          />
                        </div>
                        
                        {/* Progress Feedback */}
                        {step.progress === 100 && (
                          <p className="text-green-600 mt-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Great job! You've completed this step!
                          </p>
                        )}
                        {step.progress >= 25 && step.progress < 100 && (
                          <p className="text-yellow-600 mt-2 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            You are on track! Keep going!
                          </p>
                        )}
                      </div>

                      {/* Wellness Check for Courses */}
                      {step.wellnessCheck && !courseDecision && (
                        <Card className="p-4 mb-4 bg-blue-50 border-blue-200">
                          <p className="text-gray-900 mb-3">Do you want to continue the course?</p>
                          <div className="flex gap-3">
                            <Button 
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                setCourseDecision('yes');
                                setTimeout(() => alert('Great! The rest of the course is now unlocked.'), 100);
                              }}
                            >
                              Yes, Continue
                            </Button>
                            <Button 
                              variant="outline"
                              className="flex-1"
                              onClick={() => {
                                setCourseDecision('no');
                                setShowContinueCourseDialog(true);
                              }}
                            >
                              No, Get Help
                            </Button>
                          </div>
                        </Card>
                      )}

                      {courseDecision === 'yes' && step.wellnessCheck && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                          <p className="text-green-800 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Excellent! The full course content is now available.
                          </p>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={step.ctaAction}
                      >
                        {step.status === 'completed' && <CheckCircle className="w-4 h-4 mr-2" />}
                        {step.status === 'in-progress' && <Clock className="w-4 h-4 mr-2" />}
                        {step.status === 'upcoming' && <Calendar className="w-4 h-4 mr-2" />}
                        {step.cta}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Right Panel - Success Stories Carousel */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <h3 className="text-gray-900 mb-4">Success Stories</h3>
              
              {/* Carousel */}
              <div className="relative">
                <div className="overflow-hidden rounded-lg">
                  <div 
                    className="transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentStoryIndex * 100}%)` }}
                  >
                    <div className="flex">
                      {successStories.map((story) => (
                        <div key={story.id} className="w-full flex-shrink-0">
                          <div className="space-y-4">
                            {/* Profile Image */}
                            <div className="flex justify-center">
                              <img 
                                src={story.image} 
                                alt={story.name}
                                className="w-24 h-24 rounded-full border-4 border-blue-100"
                              />
                            </div>

                            {/* Name and Role */}
                            <div className="text-center">
                              <h4 className="text-gray-900 mb-1">{story.name}</h4>
                              <p className="text-gray-600">{story.role}</p>
                            </div>

                            {/* Story Snippet */}
                            <p className="text-gray-700 leading-relaxed min-h-[120px]">
                              "{story.snippet}"
                            </p>

                            {/* CTA Button */}
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => setSelectedStory(story)}
                            >
                              Read Full Story
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevStory}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextStory}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStoryIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStoryIndex 
                          ? 'bg-blue-600 w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to story ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Additional Actions */}
              <div className="mt-6 pt-6 border-t">
                <Button 
                  variant="outline" 
                  className="w-full mb-3"
                  onClick={() => onNavigate('steps')}
                >
                  View Step-by-Step Tasks
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('success-stories')}
                >
                  View All Success Stories
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Your Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Steps Completed</span>
                  <span className="text-gray-900">1 / 4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Courses In Progress</span>
                  <span className="text-gray-900">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificates Earned</span>
                  <span className="text-gray-900">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Network Connections</span>
                  <span className="text-gray-900">42</span>
                </div>
              </div>
            </Card>

            {/* Reminder Alert */}
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 mb-1">Reminder</p>
                  <p className="text-gray-600">Don't forget to schedule your mentor meeting to continue your certificate progress!</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Wellness Check Dialog */}
        <Dialog open={showContinueCourseDialog} onOpenChange={setShowContinueCourseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect with a Mentor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-700">
                We understand that sometimes courses can be challenging. Let's connect you with a mentor who can help guide you through the material.
              </p>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setShowContinueCourseDialog(false);
                    onNavigate('mentorship');
                  }}
                >
                  Find a Mentor
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowContinueCourseDialog(false)}
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Full Story Dialog */}
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-2xl">
            {selectedStory && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={selectedStory.image} 
                      alt={selectedStory.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <DialogTitle>{selectedStory.name}</DialogTitle>
                      <p className="text-gray-600">{selectedStory.role}</p>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{selectedStory.fullStory}</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-900 mb-2">Key Takeaway</p>
                    <p className="text-gray-700">"{selectedStory.snippet}"</p>
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setSelectedStory(null)}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}