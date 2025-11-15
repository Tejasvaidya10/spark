import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TrendingUp, Target, Award, Clock, ChevronRight, Quote, ChevronLeft, FileText, BookOpen, BadgeCheck, Briefcase, CheckCircle2, Circle, ArrowRight, Rocket, Users, GraduationCap, Home as HomeIcon, UserCircle, LogOut, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Textarea } from "../components/ui/textarea";
import { Progress } from "../components/ui/progress";
import { CoursesSection } from "../components/CoursesSectionUpdated";
import { ChatbotScreen } from "../components/ChatbotScreen";
import {
  CareerPathwaySection,
  MentorshipSection,
  NetworkingJobsSection,
  UserProfileSection,
  NetworkingPeopleSection
} from "../components/DashboardSections";
import {
  CareerPathwayStep,
  BehavioralPreferencesStep,
  CreativityInterestsStep,
  CareerExpectationsStep
} from "../components/SurveySteps";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "signup" | "survey" | "chatbot" | "dashboard">("landing");
  const [dashboardSection, setDashboardSection] = useState<"home" | "courses" | "networking" | "mentorship" | "jobs" | "profile">("home");
  const [surveyStep, setSurveyStep] = useState(1);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [courseProgress, setCourseProgress] = useState(0);
  const [wellnessCheckCompleted, setWellnessCheckCompleted] = useState(false);
  const [showWellnessCheck, setShowWellnessCheck] = useState(false);
  const [wellnessCheckDeclined, setWellnessCheckDeclined] = useState(false);

  // Survey form data
  const [surveyData, setSurveyData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    ethnicity: "",
    careerInterests: [] as string[],
    skills: [] as string[],
    experience: "",
    education: "",
    goals: "",
    availability: "",
    // New career pathway questions
    careerPathway: "",
    creativeWork: [] as string[],
    creativeIdeasImportance: "",
    careerFactors: "",
    // Behavioral preferences
    projectApproach: "",
    teamworkPreference: "",
    challengeResponse: "",
    leadershipPreference: "",
    // Creativity and interests
    enjoyedActivities: [] as string[],
    creativeFrequency: "",
    creativeMotivation: "",
    workEnvironment: "",
    // Career expectations
    careerGrowthImportance: "",
    stabilityVsRisk: "",
    fiveYearVision: ""
  });

  const successStories = [
    {
      name: "Sarah Johnson",
      role: "Senior Software Engineer at Google",
      quote: "After completing a 12-week coding bootcamp, I landed my first junior role. With dedication and continuous learning, I progressed to senior engineer in just 3 years.",
      fullStory: "After completing a 12-week coding bootcamp, I landed my first junior role at a startup. The transition wasn't easy - I spent countless nights debugging code and learning new frameworks. But with dedication and continuous learning, I progressed to senior engineer in just 3 years. The key was never stopping my education. I took online courses, attended tech meetups, contributed to open-source projects, and found mentors who guided me through challenges. Each project taught me something new, and I made sure to document my learnings. Today, I lead a team of 8 engineers at Google, and I'm passionate about helping others make similar career transitions. The journey from bootcamp graduate to senior engineer taught me that consistent effort and curiosity matter more than a traditional CS degree.",
      timeframe: "3 years journey",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzA5MzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Michael Chen",
      role: "ML Engineer at Amazon",
      quote: "Transitioning from data analysis to machine learning required dedication, but the right mentorship and courses made all the difference.",
      fullStory: "Transitioning from data analysis to machine learning required dedication, but the right mentorship and courses made all the difference. I spent two years working as a data analyst, running SQL queries and creating dashboards. I felt stuck until I discovered machine learning and decided to pivot my career. I enrolled in online ML courses, practiced with Kaggle competitions, and built personal projects analyzing everything from movie ratings to stock prices. Finding a mentor at a local tech meetup was transformative - they reviewed my code, suggested better approaches, and connected me with opportunities. After 8 months of intensive learning while working full-time, I landed my first ML role. Now at Amazon, I build recommendation systems that impact millions of users daily. The transition taught me that career changes are possible with strategic learning and the right support network.",
      timeframe: "2 years journey",
      image: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxMjEyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead UX Designer at Airbnb",
      quote: "With no formal design education, I built my portfolio through freelance projects and online courses, eventually landing my dream role.",
      fullStory: "With no formal design education, I built my portfolio through freelance projects and online courses, eventually landing my dream role at Airbnb. I started as a marketing coordinator but was fascinated by how users interacted with our products. I taught myself design fundamentals through YouTube tutorials and design bootcamps. My breakthrough came when I offered to redesign our company's internal tools for free. The positive feedback gave me confidence to take on freelance projects - redesigning local business websites, creating app mockups for startups, and even doing pro bono work for nonprofits. Each project went into my portfolio. I also participated in daily UI challenges and shared my work on social media, which helped me build a network. After two years of side hustling, I finally felt ready to apply for full-time design roles. Airbnb took a chance on me, and four years later, I'm leading a team that designs experiences for millions of travelers worldwide.",
      timeframe: "4 years journey",
      image: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFufGVufDF8fHx8MTc2MzA3MTY2MXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const steps = [
    {
      id: 1,
      title: "Completed Survey",
      icon: FileText,
      status: "completed",
      progress: 100,
      tasks: [
        { id: 1, text: "Survey done", completed: true },
        { id: 2, text: "Meet with the career advisor", completed: false }
      ]
    },
    {
      id: 2,
      title: "Course",
      icon: BookOpen,
      status: "ongoing",
      progress: courseProgress,
      tasks: [
        ...(courseProgress >= 25 ? [{ id: 1, text: "Complete wellness check", completed: wellnessCheckCompleted }] : []),
        { id: 2, text: "Explore Careers", completed: false },
        { id: 3, text: "Optimize Resume", completed: false }
      ]
    },
    {
      id: 3,
      title: "Certification",
      icon: BadgeCheck,
      status: "not-started",
      progress: 0,
      tasks: [
        { id: 1, text: "Mandatory Mentor checkin", completed: false },
        { id: 2, text: "Certification completion", completed: false }
      ]
    },
    {
      id: 4,
      title: "Networking & Jobs",
      icon: Briefcase,
      status: "not-started",
      progress: 0,
      tasks: [
        { id: 1, text: "Connection Request", completed: false },
        { id: 2, text: "Apply!", completed: false }
      ]
    }
  ];

  const careerInterestOptions = [
    "Software Development",
    "Data Science & Analytics",
    "Product Management",
    "UX/UI Design",
    "Digital Marketing",
    "Business Development",
    "Project Management",
    "Cybersecurity"
  ];

  const skillOptions = [
    "JavaScript/TypeScript",
    "Python",
    "Data Analysis",
    "Leadership",
    "Communication",
    "Problem Solving",
    "Design Thinking",
    "Agile/Scrum"
  ];

  // Auto-rotate success stories every 5 seconds
  useEffect(() => {
    if (currentView === "dashboard") {
      const interval = setInterval(() => {
        setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentView]);

  const completedSteps = steps.filter(s => s.status === "completed").length;
  const totalSteps = steps.length;
  const profileScore = Math.round((completedSteps / totalSteps) * 100);

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const careerRecommendations = [
    {
      id: 1,
      title: "Software Engineer",
      match: "92% Match",
      salary: "$95k - $150k",
      image: "https://images.unsplash.com/photo-1580894732930-0babd100d356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyJTIwd29ya2luZ3xlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Data Scientist",
      match: "88% Match",
      salary: "$100k - $160k",
      image: "https://images.unsplash.com/photo-1758685848061-3080d0780285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW50aXN0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MzE4MDg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "Product Manager",
      match: "85% Match",
      salary: "$110k - $170k",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbWFuYWdlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      title: "UX Designer",
      match: "82% Match",
      salary: "$85k - $140k",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbmVyJTIwd29ya2luZ3xlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 5,
      title: "Stand-Up Comedian",
      match: "79% Match",
      salary: "$50k - $200k+",
      image: "https://images.unsplash.com/photo-1641903806973-17eaf2d2634f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFuZCUyMHVwJTIwY29tZWR5JTIwcGVyZm9ybWVyfGVufDF8fHx8MTc2MzIwMTk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 6,
      title: "Live Music Performer",
      match: "81% Match",
      salary: "$40k - $150k+",
      image: "https://images.unsplash.com/photo-1727831140213-18650ae7ef36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMHBlcmZvcm1pbmclMjBjb25jZXJ0fGVufDF8fHx8MTc2MzEyMDc2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 7,
      title: "Stage Actor",
      match: "77% Match",
      salary: "$45k - $120k+",
      image: "https://images.unsplash.com/photo-1597169428688-254b4223ba7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMHN0YWdlJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzYzMjAxOTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 8,
      title: "Event Entertainer",
      match: "83% Match",
      salary: "$55k - $130k+",
      image: "https://images.unsplash.com/photo-1759415519170-6f78e9784cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHBlcmZvcm1lciUyMGVudGVydGFpbm1lbnR8ZW58MXx8fHwxNzYzMjAxOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const getStatusColor = (status: string) => {
    if (status === "completed") return "bg-[#8BA888]";
    if (status === "ongoing") return "bg-[#F59E0B]";
    return "bg-gray-300";
  };

  const getStatusLabel = (status: string) => {
    if (status === "completed") return "Completed";
    if (status === "ongoing") return "Ongoing";
    return "Yet to Start";
  };

  const toggleCareerInterest = (interest: string) => {
    setSurveyData(prev => ({
      ...prev,
      careerInterests: prev.careerInterests.includes(interest)
        ? prev.careerInterests.filter(i => i !== interest)
        : [...prev.careerInterests, interest]
    }));
  };

  const toggleSkill = (skill: string) => {
    setSurveyData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleCreativeWork = (work: string) => {
    setSurveyData(prev => ({
      ...prev,
      creativeWork: prev.creativeWork.includes(work)
        ? prev.creativeWork.filter(w => w !== work)
        : [...prev.creativeWork, work]
    }));
  };

  const toggleActivity = (activity: string) => {
    setSurveyData(prev => ({
      ...prev,
      enjoyedActivities: prev.enjoyedActivities.includes(activity)
        ? prev.enjoyedActivities.filter(a => a !== activity)
        : [...prev.enjoyedActivities, activity]
    }));
  };

  const handleSurveyNext = () => {
    // Go to chatbot after survey
    setCurrentView("chatbot");
  };

  const handleSurveyBack = () => {
    if (surveyStep > 1) {
      setSurveyStep(surveyStep - 1);
    }
  };

  // Landing Page
  if (currentView === "landing") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F7F8FA" }}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667EEA] to-[#8BA888] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">SparkPath</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setCurrentView("login")}>
                Login
              </Button>
              <Button className="bg-[#667EEA] hover:bg-[#5568D3]" onClick={() => setCurrentView("signup")}>
                Get Started
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl mb-6">
              Find Your Spark ✨
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Personalized career guidance, expert mentorship, and job opportunities tailored to your unique skills and aspirations.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#667EEA] hover:bg-[#5568D3]"
                onClick={() => setCurrentView("signup")}
              >
                Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setCurrentView("login")}>
                Sign In
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border-0 text-center">
              <div className="w-16 h-16 rounded-full bg-[#667EEA]/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#667EEA]" />
              </div>
              <h3 className="text-xl mb-3">Personalized Pathways</h3>
              <p className="text-gray-600">Get career recommendations based on your skills, interests, and goals</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border-0 text-center">
              <div className="w-16 h-16 rounded-full bg-[#8BA888]/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#8BA888]" />
              </div>
              <h3 className="text-xl mb-3">Expert Mentorship</h3>
              <p className="text-gray-600">Connect with industry professionals for guidance and support</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border-0 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl mb-3">Courses & Certifications</h3>
              <p className="text-gray-600">Learn new skills with curated courses and earn recognized certifications</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#667EEA] to-[#8BA888] rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl mb-4">Join 50,000+ professionals advancing their careers</h2>
            <p className="text-white/90 mb-6 text-lg">Start with a quick survey to get personalized recommendations</p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-[#667EEA] hover:bg-white/90"
              onClick={() => setCurrentView("signup")}
            >
              Get Started for Free
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Login Page
  if (currentView === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F8FA" }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#667EEA] to-[#8BA888] flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your career journey</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border-0">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <a href="#" className="text-sm text-[#667EEA] hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button 
                className="w-full bg-[#667EEA] hover:bg-[#5568D3]"
                onClick={() => setCurrentView("dashboard")}
              >
                Sign In
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button 
                  className="text-[#667EEA] hover:underline"
                  onClick={() => setCurrentView("signup")}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setCurrentView("landing")}
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Signup Page
  if (currentView === "signup") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F8FA" }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#667EEA] to-[#8BA888] flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2">Create Your Account</h1>
            <p className="text-gray-600">Start your personalized career journey today</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border-0">
            <div className="space-y-4">
              <div>
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name" 
                  type="text" 
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="you@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  placeholder="Create a strong password"
                  className="mt-1"
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>

              <Button 
                className="w-full bg-[#667EEA] hover:bg-[#5568D3]"
                onClick={() => setCurrentView("survey")}
              >
                Create Account
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button 
                  className="text-[#667EEA] hover:underline"
                  onClick={() => setCurrentView("login")}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setCurrentView("landing")}
            >
               Back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Survey Page
  if (currentView === "survey") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F7F8FA" }}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-8 py-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667EEA] to-[#8BA888] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Create Your Profile</span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-8 py-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border-0">
            {/* Step 1: Basic Information */}
            {surveyStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">Let's start with the basics</h2>
                  <p className="text-gray-600">Tell us a bit about yourself</p>
                </div>

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    value={surveyData.name}
                    onChange={(e) => setSurveyData({...surveyData, name: e.target.value})}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="survey-email">Email Address *</Label>
                  <Input 
                    id="survey-email" 
                    type="email"
                    value={surveyData.email}
                    onChange={(e) => setSurveyData({...surveyData, email: e.target.value})}
                    placeholder="you@example.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={surveyData.phone}
                    onChange={(e) => setSurveyData({...surveyData, phone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number"
                    value={surveyData.age}
                    onChange={(e) => setSurveyData({...surveyData, age: e.target.value})}
                    placeholder="25"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select 
                    id="gender"
                    value={surveyData.gender}
                    onChange={(e) => setSurveyData({...surveyData, gender: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={surveyData.location}
                    onChange={(e) => setSurveyData({...surveyData, location: e.target.value})}
                    placeholder="City, State, Country"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="ethnicity">Ethnicity</Label>
                  <Input 
                    id="ethnicity" 
                    value={surveyData.ethnicity}
                    onChange={(e) => setSurveyData({...surveyData, ethnicity: e.target.value})}
                    placeholder="E.g., Asian, Black, Hispanic, White, etc."
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-end mt-8 pt-6 border-t border-gray-200">
              <Button 
                className="bg-[#667EEA] hover:bg-[#5568D3]"
                onClick={handleSurveyNext}
              >
                Complete Profile <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Chatbot Page
  if (currentView === "chatbot") {
    return <ChatbotScreen onComplete={() => setCurrentView("dashboard")} />;
  }

  // Dashboard
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F8FA" }}>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#667EEA] flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
            <div>
              <h1 className="font-semibold">John Doe</h1>
              <p className="text-sm text-gray-600">Software Developer</p>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => setDashboardSection("home")}
              className={`flex items-center gap-2 ${dashboardSection === "home" ? "text-[#667EEA]" : "text-gray-700 hover:text-[#667EEA]"}`}
            >
              <HomeIcon className="w-4 h-4" />
              Dashboard
            </button>
            <button 
              onClick={() => setDashboardSection("courses")}
              className={`${dashboardSection === "courses" ? "text-[#667EEA]" : "text-gray-700 hover:text-[#667EEA]"}`}
            >
              Courses
            </button>
            <button 
              onClick={() => setDashboardSection("networking")}
              className={`${dashboardSection === "networking" ? "text-[#667EEA]" : "text-gray-700 hover:text-[#667EEA]"}`}
            >
              Networking
            </button>
            <button 
              onClick={() => setDashboardSection("mentorship")}
              className={`${dashboardSection === "mentorship" ? "text-[#667EEA]" : "text-gray-700 hover:text-[#667EEA]"}`}
            >
              Mentorship
            </button>
            <button 
              onClick={() => setDashboardSection("jobs")}
              className={`${dashboardSection === "jobs" ? "text-[#667EEA]" : "text-gray-700 hover:text-[#667EEA]"}`}
            >
              Jobs
            </button>
            <button 
              onClick={() => setDashboardSection("profile")}
              className={`flex items-center gap-2 ${dashboardSection === "profile" ? "text-[#667EEA]" : "text-gray-700 hover:text-[#667EEA]"}`}
            >
              <UserCircle className="w-4 h-4" />
              Profile
            </button>
            <Button variant="outline" size="sm" onClick={() => setCurrentView("landing")}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Home Dashboard */}
        {dashboardSection === "home" && (
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Progress Tracker */}
              <div className="bg-white rounded-xl p-8 shadow-sm border-0">
                <h2 className="text-2xl mb-6">Career Journey Progress</h2>
                
                {/* Overall Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Overall Progress</span>
                    <span className="text-sm font-medium">{profileScore}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#8BA888] transition-all duration-500"
                      style={{ width: `${profileScore}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.id}
                        className="relative"
                        onMouseEnter={() => setHoveredStep(index)}
                        onMouseLeave={() => setHoveredStep(null)}
                      >
                        <div className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-all">
                          <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full ${getStatusColor(step.status)} flex items-center justify-center mb-3`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-medium mb-1">{step.title}</h3>
                            <span className="text-xs text-gray-500 mb-3">{getStatusLabel(step.status)}</span>
                            
                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full ${getStatusColor(step.status)} transition-all duration-500`}
                                style={{ width: `${step.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600 mt-1">{step.progress}%</span>
                          </div>
                        </div>

                        {/* Hover Task List */}
                        {hoveredStep === index && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10 animate-in fade-in duration-200">
                            <h4 className="font-medium mb-3 text-sm">Tasks</h4>
                            <ul className="space-y-2">
                              {step.tasks.map(task => (
                                <li key={task.id} className="flex items-start gap-2 text-sm">
                                  {task.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#8BA888] flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                  )}
                                  <span className="text-gray-700">
                                    {task.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Career Recommendations */}
              <div className="bg-white rounded-xl p-8 shadow-sm border-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl">Career Recommendations</h2>
                  <Button variant="ghost" size="sm" className="text-[#667EEA]">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {careerRecommendations.map(career => (
                    <div key={career.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg mb-3 aspect-[4/3]">
                        <ImageWithFallback
                          src={career.image}
                          alt={career.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-[#8BA888] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {career.match}
                        </div>
                      </div>
                      <h3 className="font-medium mb-1">{career.title}</h3>
                      <p className="text-sm text-gray-600">{career.salary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 space-y-6">
              {/* Success Stories Carousel */}
              <div className="bg-white rounded-xl p-6 shadow-sm border-0">
                <h3 className="font-medium mb-4">Success Stories</h3>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#667EEA]/10 to-[#8BA888]/10 rounded-lg p-4">
                    <Quote className="w-6 h-6 text-[#667EEA] mb-3" />
                    
                    <div className="flex items-center gap-3 mb-3">
                      <ImageWithFallback
                        src={successStories[currentStoryIndex].image}
                        alt={successStories[currentStoryIndex].name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{successStories[currentStoryIndex].name}</h4>
                        <p className="text-xs text-gray-600">{successStories[currentStoryIndex].role}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-4">
                      {successStories[currentStoryIndex].quote}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{successStories[currentStoryIndex].timeframe}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[#667EEA] h-auto p-0 text-xs"
                        onClick={() => setExpandedStory(currentStoryIndex)}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={prevStory}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Previous story"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <div className="flex gap-2">
                      {successStories.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStoryIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentStoryIndex ? "bg-[#667EEA] w-6" : "bg-gray-300"
                          }`}
                          aria-label={`Go to story ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={nextStory}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Next story"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border-0">
                <h3 className="font-medium mb-4">Performance Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#667EEA]/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-[#667EEA]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Career Goals</p>
                      <p className="font-medium">3 Active</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#8BA888]/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-[#8BA888]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Skills Gained</p>
                      <p className="font-medium">12 Total</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Time Invested</p>
                      <p className="font-medium">48 Hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Insights */}
              <div className="bg-gradient-to-br from-[#667EEA] to-[#8BA888] rounded-xl p-6 text-white shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="font-medium">Weekly Insights</h3>
                </div>
                <p className="text-sm text-white/90 mb-4">
                  You're making great progress! Complete 2 more course modules to stay on track.
                </p>
                <Button variant="secondary" size="sm" className="w-full bg-white text-[#667EEA] hover:bg-white/90">
                  View Details
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border-0">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Continue Survey
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Courses
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Explore Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Dashboard */}
        {dashboardSection === "courses" && (
          <CoursesSection 
            courseProgress={courseProgress}
            setCourseProgress={setCourseProgress}
            wellnessCheckCompleted={wellnessCheckCompleted}
            setWellnessCheckCompleted={setWellnessCheckCompleted}
            showWellnessCheck={showWellnessCheck}
            setShowWellnessCheck={setShowWellnessCheck}
            wellnessCheckDeclined={wellnessCheckDeclined}
            setWellnessCheckDeclined={setWellnessCheckDeclined}
            setDashboardSection={setDashboardSection}
          />
        )}

        {/* Networking Dashboard */}
        {dashboardSection === "networking" && (
          <NetworkingPeopleSection />
        )}

        {/* Mentorship Dashboard */}
        {dashboardSection === "mentorship" && (
          <MentorshipSection />
        )}

        {/* Jobs Dashboard */}
        {dashboardSection === "jobs" && (
          <NetworkingJobsSection />
        )}

        {/* Profile Dashboard */}
        {dashboardSection === "profile" && (
          <UserProfileSection onRetakeSurvey={() => {
            setSurveyStep(1);
            setCurrentView("survey");
          }} />
        )}
      </div>

      {/* Success Story Expanded Dialog */}
      <Dialog open={expandedStory !== null} onOpenChange={() => setExpandedStory(null)}>
        <DialogContent className="max-w-2xl">
          {expandedStory !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Success Story</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  Learn from the experiences of professionals who have achieved their career goals.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={successStories[expandedStory].image}
                    alt={successStories[expandedStory].name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{successStories[expandedStory].name}</h3>
                    <p className="text-gray-600">{successStories[expandedStory].role}</p>
                    <p className="text-sm text-gray-500 mt-1">{successStories[expandedStory].timeframe}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#667EEA]/10 to-[#8BA888]/10 rounded-lg p-6">
                  <Quote className="w-8 h-8 text-[#667EEA] mb-4" />
                  <p className="text-base text-gray-800 leading-relaxed">
                    {successStories[expandedStory].fullStory}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}