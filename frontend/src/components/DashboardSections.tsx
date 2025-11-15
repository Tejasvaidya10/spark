import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  Filter,
  Search,
  User,
  Mail,
  Target,
  Calendar,
  TrendingUp,
  Code,
  Database,
  Palette,
  BarChart,
  ChevronRight,
  MessageCircle,
  Send
} from "lucide-react";
import { useState } from "react";

// Success Stories Section
export function SuccessStoriesSection() {
  const stories = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Software Engineer at Google",
      story: "After completing a 12-week coding bootcamp, I landed my first junior role. With dedication and continuous learning, I progressed to senior engineer in just 3 years.",
      timeframe: "3 years journey",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzA5MzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "ML Engineer at Amazon",
      story: "Transitioning from data analysis to machine learning required dedication, but the right mentorship and courses made all the difference.",
      timeframe: "2 years journey",
      image: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxMjEyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Lead UX Designer at Airbnb",
      story: "With no formal design education, I built my portfolio through freelance projects and online courses, eventually landing my dream role.",
      timeframe: "4 years journey",
      image: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFufGVufDF8fHx8MTc2MzA3MTY2MXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      name: "James Williams",
      role: "Product Manager at Microsoft",
      story: "I transitioned from engineering to product management through mentorship and strategic networking. The journey taught me invaluable leadership skills.",
      timeframe: "4 years journey",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc2MzE4MDg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Data Scientist at Meta",
      story: "Coming from a non-tech background, I invested in data science bootcamps and hands-on projects. Persistence paid off with my dream role.",
      timeframe: "2.5 years journey",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGFzaWFufGVufDF8fHx8MTc2MzE4MDg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 6,
      name: "David Kumar",
      role: "DevOps Engineer at Netflix",
      story: "I started as a system administrator and gradually learned cloud technologies and automation. The platform's courses were instrumental in my growth.",
      timeframe: "3.5 years journey",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-1">Success Stories</h2>
          <p className="text-gray-600">Get inspired by others who achieved their career goals</p>
        </div>
        <Button variant="ghost" className="text-[#667EEA]">
          Submit Your Story <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <div key={story.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] relative">
              <ImageWithFallback
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">{story.story}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{story.timeframe}</span>
                <Button variant="ghost" size="sm" className="text-[#667EEA] h-auto p-0">
                  Read More →
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Courses Section
export function CoursesSection() {
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "Development",
      progress: 65,
      totalHours: 40,
      completedHours: 26,
      certified: false,
      instructor: "Dr. Jane Smith",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGluZ3xlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      category: "Data Science",
      progress: 100,
      totalHours: 50,
      completedHours: 50,
      certified: true,
      instructor: "Prof. Michael Lee",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "UX/UI Design Fundamentals",
      category: "Design",
      progress: 30,
      totalHours: 35,
      completedHours: 10,
      certified: false,
      instructor: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzYzMTgwODY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      title: "Product Management Essentials",
      category: "Business",
      progress: 45,
      totalHours: 30,
      completedHours: 13,
      certified: false,
      instructor: "James Wilson",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-1">Your Courses</h2>
          <p className="text-gray-600">Continue learning and earn certifications</p>
        </div>
        <Button className="bg-[#667EEA] hover:bg-[#5568D3]">
          Explore New Courses
        </Button>
      </div>

      <div className="space-y-4">
        {courses.map(course => (
          <div key={course.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium mb-1">{course.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {course.instructor}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.completedHours}/{course.totalHours} hours
                      </span>
                    </div>
                  </div>
                  {course.certified && (
                    <Badge className="bg-[#8BA888] hover:bg-[#8BA888]/90">
                      <Award className="w-3 h-3 mr-1" />
                      Certified
                    </Badge>
                  )}
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Continue Learning
                  </Button>
                  <Badge variant="secondary">{course.category}</Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Career Pathway Section
export function CareerPathwaySection() {
  const pathwaySteps = [
    {
      id: 1,
      title: "Junior Developer",
      status: "completed",
      description: "Entry-level position, learning fundamentals",
      skills: ["HTML/CSS", "JavaScript", "Git"],
      duration: "0-2 years"
    },
    {
      id: 2,
      title: "Mid-Level Developer",
      status: "current",
      description: "Building complex features, mentoring juniors",
      skills: ["React", "Node.js", "Databases", "Testing"],
      duration: "2-4 years"
    },
    {
      id: 3,
      title: "Senior Developer",
      status: "upcoming",
      description: "System design, architecture decisions",
      skills: ["System Design", "Leadership", "Cloud Infrastructure"],
      duration: "4-7 years"
    },
    {
      id: 4,
      title: "Tech Lead",
      status: "future",
      description: "Leading teams, strategic planning",
      skills: ["Team Management", "Agile", "Stakeholder Communication"],
      duration: "7+ years"
    }
  ];

  const getStatusColor = (status: string) => {
    if (status === "completed") return "bg-[#8BA888]";
    if (status === "current") return "bg-[#667EEA]";
    if (status === "upcoming") return "bg-[#F59E0B]";
    return "bg-gray-300";
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-white" />;
    if (status === "current") return <TrendingUp className="w-5 h-5 text-white" />;
    return <Target className="w-5 h-5 text-white" />;
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border-0">
      <div className="mb-6">
        <h2 className="text-2xl mb-1">Your Career Pathway</h2>
        <p className="text-gray-600">Track your progression and plan next steps</p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-200 hidden md:block" />

        <div className="grid md:grid-cols-4 gap-6">
          {pathwaySteps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className={`rounded-lg border-2 p-5 ${
                step.status === "current" 
                  ? "border-[#667EEA] bg-[#667EEA]/5" 
                  : "border-gray-200"
              }`}>
                <div className={`w-12 h-12 rounded-full ${getStatusColor(step.status)} flex items-center justify-center mb-3 relative z-10`}>
                  {getStatusIcon(step.status)}
                </div>
                
                <h3 className="font-medium mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{step.duration}</p>
                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-700">Key Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {step.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {index < pathwaySteps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-0 w-6 h-0.5 bg-gray-200 transform translate-x-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mentorship Section
export function MentorshipSection() {
  const [selectedChat, setSelectedChat] = useState<"virtual" | number>("virtual");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "mentor",
      text: "Hi! I'm your Virtual Career Mentor. I can help answer basic questions about career guidance, course recommendations, and general advice. For in-depth mentorship, please connect with one of our expert mentors.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate mentor response for basic questions
    setTimeout(() => {
      const mentorResponse = {
        id: messages.length + 2,
        sender: "mentor",
        text: "Thanks for your question! Based on your profile, I'd recommend focusing on completing your current course modules. For personalized career strategies and detailed guidance, I recommend connecting with one of our expert mentors on the right.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, mentorResponse]);
    }, 1000);
  };

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      title: "Senior Tech Career Advisor",
      expertise: ["Software Engineering", "Career Transitions", "Leadership"],
      experience: "15+ years",
      rating: 4.9,
      sessions: 230,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzA5MzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Data Science Mentor",
      expertise: ["Machine Learning", "Data Analytics", "Python"],
      experience: "12+ years",
      rating: 4.8,
      sessions: 185,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxMjEyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX Design Lead",
      expertise: ["UX/UI Design", "Product Strategy", "Portfolio Building"],
      experience: "10+ years",
      rating: 5.0,
      sessions: 156,
      availability: "Busy",
      image: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFufGVufDF8fHx8MTc2MzA3MTY2MXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      name: "James Wilson",
      title: "Product Management Coach",
      expertise: ["Product Management", "Agile", "Stakeholder Management"],
      experience: "14+ years",
      rating: 4.9,
      sessions: 198,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc2MzE4MDg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="flex gap-6 h-[calc(100vh-12rem)]">
      {/* Left Sidebar - Mentors List */}
      <div className="w-80 bg-white rounded-xl shadow-sm border-0 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl mb-1">Mentorship</h2>
          <p className="text-sm text-gray-600">Connect with expert mentors</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Virtual Mentor Option */}
          <div
            onClick={() => setSelectedChat("virtual")}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChat === "virtual" ? "bg-blue-50 border-l-4 border-l-[#667EEA]" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667EEA] to-[#8BA888] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">Virtual Mentor</h3>
                <p className="text-xs text-gray-600 truncate">Basic questions & quick answers</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600">Always Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Human Mentors */}
          <div className="p-4 bg-gray-50">
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Expert Mentors</h4>
          </div>

          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              onClick={() => setSelectedChat(mentor.id)}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat === mentor.id ? "bg-blue-50 border-l-4 border-l-[#667EEA]" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <ImageWithFallback
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{mentor.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">{mentor.title}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs">{mentor.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">{mentor.sessions} sessions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${mentor.availability === "Available" ? "bg-green-500" : "bg-gray-400"}`}></div>
                    <span className={`text-xs ${mentor.availability === "Available" ? "text-green-600" : "text-gray-500"}`}>
                      {mentor.availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border-0 flex flex-col overflow-hidden">
        {selectedChat === "virtual" ? (
          <>
            {/* Virtual Mentor Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-[#667EEA]/5 to-[#8BA888]/5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#667EEA] to-[#8BA888] flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">Virtual Career Mentor</h3>
                  <p className="text-sm text-gray-600">AI-powered assistant for basic career questions</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-green-600">Always Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-[#667EEA] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="px-6 pb-3 border-t border-gray-200 pt-3">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => {
                    const msg = "What courses should I take?";
                    setInputMessage(msg);
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  Course recommendations
                </button>
                <button
                  onClick={() => {
                    const msg = "How do I improve my profile?";
                    setInputMessage(msg);
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  Profile tips
                </button>
                <button
                  onClick={() => {
                    const msg = "What skills should I learn?";
                    setInputMessage(msg);
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  Skills to learn
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask a basic career question..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#667EEA] hover:bg-[#5568D3]"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 For in-depth mentorship and personalized guidance, connect with an expert mentor
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Human Mentor Chat Header */}
            {mentors
              .filter((m) => m.id === selectedChat)
              .map((mentor) => (
                <div key={mentor.id}>
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-medium">{mentor.name}</h3>
                          <p className="text-sm text-gray-600">{mentor.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{mentor.rating}</span>
                            </div>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-600">{mentor.experience} experience</span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-[#667EEA] hover:bg-[#5568D3]">
                        Schedule Session
                      </Button>
                    </div>
                  </div>

                  {/* Mentor Details */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-2xl mx-auto space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">About {mentor.name.split(" ")[0]}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {mentor.name} is a seasoned professional with {mentor.experience} of experience in the tech industry. 
                          They specialize in helping professionals navigate career transitions, develop leadership skills, 
                          and achieve their career goals through personalized mentorship.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((skill, idx) => (
                            <Badge key={idx} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Mentorship Approach</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#8BA888] flex-shrink-0 mt-0.5" />
                            <span>One-on-one personalized sessions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#8BA888] flex-shrink-0 mt-0.5" />
                            <span>Career roadmap development</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#8BA888] flex-shrink-0 mt-0.5" />
                            <span>Resume and portfolio review</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#8BA888] flex-shrink-0 mt-0.5" />
                            <span>Interview preparation and mock interviews</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#8BA888] flex-shrink-0 mt-0.5" />
                            <span>Ongoing support and accountability</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-[#667EEA]/10 to-[#8BA888]/10 rounded-lg p-6">
                        <h4 className="font-medium mb-2">Success Metrics</h4>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="text-center">
                            <p className="text-2xl font-semibold text-[#667EEA]">{mentor.sessions}</p>
                            <p className="text-xs text-gray-600 mt-1">Sessions</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-semibold text-[#667EEA]">{mentor.rating}</p>
                            <p className="text-xs text-gray-600 mt-1">Rating</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-semibold text-[#667EEA]">95%</p>
                            <p className="text-xs text-gray-600 mt-1">Success Rate</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Button className="w-full bg-[#667EEA] hover:bg-[#5568D3]" size="lg">
                          <Calendar className="w-4 h-4 mr-2" />
                          Book a Session with {mentor.name.split(" ")[0]}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

// Networking & Jobs Section
export function NetworkingJobsSection() {
  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      posted: "2 days ago",
      applicants: 45,
      match: "92%",
      tags: ["React", "Node.js", "AWS"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "DataVision Labs",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $170k",
      posted: "1 week ago",
      applicants: 67,
      match: "88%",
      tags: ["Python", "ML", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBzcGFjZXxlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Studio",
      location: "New York, NY",
      type: "Contract",
      salary: "$80k - $110k",
      posted: "3 days ago",
      applicants: 32,
      match: "85%",
      tags: ["Figma", "User Research", "Prototyping"],
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYzMTgwODY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$140k - $180k",
      posted: "5 days ago",
      applicants: 89,
      match: "82%",
      tags: ["Product Strategy", "Agile", "Analytics"],
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2MzE4MDg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border-0">
      <div className="mb-6">
        <h2 className="text-2xl mb-1">Networking & Job Opportunities</h2>
        <p className="text-gray-600">Find your next career opportunity</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search jobs..." className="pl-10" />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-md">
          <option>All Locations</option>
          <option>Remote</option>
          <option>San Francisco</option>
          <option>New York</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-md">
          <option>All Industries</option>
          <option>Technology</option>
          <option>Finance</option>
          <option>Healthcare</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-md">
          <option>Job Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
        </select>
      </div>

      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={job.image}
                  alt={job.company}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium mb-1">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-[#8BA888] hover:bg-[#8BA888]/90">
                    {job.match} Match
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {job.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{job.salary}</span>
                    <span>• {job.applicants} applicants</span>
                    <span>• {job.posted}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-[#667EEA] hover:bg-[#5568D3]">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// User Profile Section
export function UserProfileSection({ onRetakeSurvey }: { onRetakeSurvey: () => void }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border-0">
      <div className="mb-6">
        <h2 className="text-2xl mb-1">Your Profile</h2>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-[#667EEA] flex items-center justify-center">
              <span className="text-white text-2xl">JD</span>
            </div>
            <div>
              <h3 className="font-medium text-lg">John Doe</h3>
              <p className="text-gray-600">Software Developer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <p className="text-gray-900 mt-1">john.doe@example.com</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Career Interests</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge>Software Development</Badge>
                <Badge>Machine Learning</Badge>
                <Badge>Cloud Computing</Badge>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Experience Level</Label>
              <p className="text-gray-900 mt-1">3-5 years (Mid-Level)</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">Update Your Information</h4>
            <p className="text-sm text-gray-600 mb-4">
              Want to update your career goals, skills, or interests? Retake the survey to get updated recommendations.
            </p>
            <Button 
              className="w-full bg-[#667EEA] hover:bg-[#5568D3]"
              onClick={onRetakeSurvey}
            >
              Take New Survey
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">Account Settings</h4>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Email Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Networking People Section
export function NetworkingPeopleSection() {
  const people = [
    {
      id: 1,
      name: "Alex Thompson",
      title: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      mutualConnections: 12,
      skills: ["JavaScript", "React", "Node.js"],
      interests: ["Software Development", "Open Source"],
      matchScore: 95,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      name: "Maria Garcia",
      title: "Data Scientist",
      company: "Meta",
      location: "Remote",
      mutualConnections: 8,
      skills: ["Python", "Machine Learning", "TensorFlow"],
      interests: ["Data Science", "AI Research"],
      matchScore: 92,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzE4MDg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      name: "James Wilson",
      title: "Product Manager",
      company: "Amazon",
      location: "Seattle, WA",
      mutualConnections: 15,
      skills: ["Product Strategy", "Agile", "User Research"],
      interests: ["Product Management", "Innovation"],
      matchScore: 88,
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc2MzE4MDg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      name: "Sarah Chen",
      title: "UX Designer",
      company: "Airbnb",
      location: "Austin, TX",
      mutualConnections: 10,
      skills: ["Figma", "User Research", "Design Systems"],
      interests: ["UX Design", "Design Thinking"],
      matchScore: 90,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGFzaWFufGVufDF8fHx8MTc2MzE4MDg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 5,
      name: "David Kumar",
      title: "DevOps Engineer",
      company: "Netflix",
      location: "Los Angeles, CA",
      mutualConnections: 6,
      skills: ["AWS", "Docker", "Kubernetes"],
      interests: ["Cloud Computing", "Automation"],
      matchScore: 85,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 6,
      name: "Lisa Park",
      title: "Marketing Manager",
      company: "Spotify",
      location: "New York, NY",
      mutualConnections: 20,
      skills: ["Digital Marketing", "Analytics", "Content Strategy"],
      interests: ["Digital Marketing", "Brand Strategy"],
      matchScore: 82,
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzA5MzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 7,
      name: "Robert Lee",
      title: "Full Stack Developer",
      company: "Uber",
      location: "San Francisco, CA",
      mutualConnections: 9,
      skills: ["TypeScript", "Vue.js", "PostgreSQL"],
      interests: ["Web Development", "Startups"],
      matchScore: 87,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 8,
      name: "Emily Rodriguez",
      title: "Lead Designer",
      company: "Adobe",
      location: "San Jose, CA",
      mutualConnections: 14,
      skills: ["Photoshop", "Illustrator", "Branding"],
      interests: ["Graphic Design", "Creative Direction"],
      matchScore: 89,
      image: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFufGVufDF8fHx8MTc2MzA3MTY2MXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border-0">
      <div className="mb-6">
        <h2 className="text-2xl mb-1">Networking</h2>
        <p className="text-gray-600">Connect with relevant professionals in your field</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search by name, company, or skills..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {people.map(person => (
          <div key={person.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="relative mb-4">
                <ImageWithFallback
                  src={person.image}
                  alt={person.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
                <div className="absolute top-0 right-0 bg-[#8BA888] text-white px-2 py-1 rounded-full text-xs">
                  {person.matchScore}%
                </div>
              </div>

              <div className="text-center mb-4">
                <h3 className="font-medium mb-1">{person.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{person.title}</p>
                <p className="text-xs text-gray-500 mb-2">{person.company}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {person.location}
                </div>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  {person.mutualConnections} mutual connections
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {person.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button size="sm" className="w-full bg-[#667EEA] hover:bg-[#5568D3]">
                Connect
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}