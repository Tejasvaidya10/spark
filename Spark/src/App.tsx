import { ProgressTracker } from "./components/ProgressTracker";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { TrendingUp, Target, Award, Clock, ChevronRight, Quote, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const successStories = [
    {
      name: "Sarah Johnson",
      role: "Senior Software Engineer at Google",
      quote: "After completing a 12-week coding bootcamp, I landed my first junior role. With dedication and continuous learning, I progressed to senior engineer in just 3 years.",
      timeframe: "3 years journey",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzA5MzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Michael Chen",
      role: "ML Engineer at Amazon",
      quote: "Transitioning from data analysis to machine learning required dedication, but the right mentorship and courses made all the difference.",
      timeframe: "2 years journey",
      image: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxMjEyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead UX Designer at Airbnb",
      quote: "With no formal design education, I built my portfolio through freelance projects and online courses, eventually landing my dream role.",
      timeframe: "4 years journey",
      image: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFufGVufDF8fHx8MTc2MzA3MTY2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Auto-rotate success stories every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextStory();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  // Calculate profile completion (1 completed out of 4 steps = 25%)
  const completedSteps = 1; // Based on the progress tracker - "Certification" is completed
  const totalSteps = 4;
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
      image: "https://images.unsplash.com/photo-1580894732930-0babd100d356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyJTIwd29ya2luZ3xlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      title: "Data Scientist",
      match: "88% Match",
      salary: "$100k - $160k",
      image: "https://images.unsplash.com/photo-1758685848061-3080d0780285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW50aXN0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MzE4MDg2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      title: "Business Analyst",
      match: "85% Match",
      salary: "$70k - $110k",
      image: "https://images.unsplash.com/photo-1748609379330-db65f1354c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5c3QlMjBvZmZpY2V8ZW58MXx8fHwxNzYzMTgwODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      title: "Product Manager",
      match: "82% Match",
      salary: "$110k - $170k",
      image: "https://images.unsplash.com/photo-1630672790237-38eeb57cb60b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbWFuYWdlciUyMG1lZXRpbmd8ZW58MXx8fHwxNzYzMTgwODY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="flex gap-8">
          {/* Left/Main Content */}
          <div className="flex-1">
            {/* Progress Tracker */}
            <div className="mb-12">
              <ProgressTracker />
            </div>

            {/* Resume Score Section */}
            <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-gray-800 mb-2">Profile Completion</h2>
                  <p className="text-gray-500 text-sm">
                    Complete all steps to unlock personalized recommendations
                  </p>
                </div>
                <button className="text-[#667EEA] text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Score Visualization */}
              <div className="relative flex items-center justify-center py-12">
                {/* Bell Curve Background */}
                <svg
                  width="100%"
                  height="200"
                  viewBox="0 0 600 200"
                  className="absolute"
                  style={{ maxWidth: "600px" }}
                >
                  {/* Gradient for bell curve */}
                  <defs>
                    <linearGradient id="bellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8BA888" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#8BA888" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Bell curve path */}
                  <path
                    d="M 50,180 Q 150,100 300,20 T 550,180"
                    fill="url(#bellGradient)"
                    stroke="#8BA888"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                </svg>

                {/* Score Display */}
                <div className="relative z-10 text-center">
                  <div className="text-7xl text-[#8BA888] mb-2">{profileScore}</div>
                  <div className="text-gray-500 text-sm">Profile Complete</div>
                  <div className="mt-4 inline-flex items-center gap-1 text-gray-600 bg-gray-100 px-4 py-2 rounded-full text-sm">
                    {completedSteps} of {totalSteps} steps completed
                  </div>
                </div>
              </div>

              {/* Score Range Indicators */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">INCOMPLETE</div>
                  <div className="text-gray-600">0-60%</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">PROGRESSING</div>
                  <div className="text-gray-600">61-80%</div>
                </div>
                <div className="text-center">
                  <div className="text-[#8BA888] text-xs mb-1">COMPLETE</div>
                  <div className="text-[#8BA888]">81-100%</div>
                </div>
              </div>
            </div>

            {/* Career Recommendations */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-gray-800 mb-2">Career Recommendations</h2>
                  <p className="text-gray-500 text-sm">
                    Based on your skills and experience
                  </p>
                </div>
                <button className="text-[#667EEA] text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Career Cards Grid */}
              <div className="grid grid-cols-2 gap-6">
                {careerRecommendations.map((career) => (
                  <div
                    key={career.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={career.image}
                        alt={career.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-[#8BA888]">
                        {career.match}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-gray-800 mb-2">{career.title}</h3>
                      <p className="text-gray-500 text-sm">{career.salary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Success Stories Carousel */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-800">Success Stories</h3>
                <button className="text-[#667EEA] text-xs flex items-center gap-1">
                  View All
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              
              {/* Carousel Card */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-4">
                  <ImageWithFallback
                    src={successStories[currentStoryIndex].image}
                    alt={successStories[currentStoryIndex].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-800 truncate">{successStories[currentStoryIndex].name}</h4>
                    <p className="text-gray-500 text-xs leading-tight">{successStories[currentStoryIndex].role}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Quote className="w-4 h-4 text-[#8BA888] mb-2" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {successStories[currentStoryIndex].quote}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{successStories[currentStoryIndex].timeframe}</span>
                  </div>
                  
                  {/* Carousel Navigation */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevStory}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Previous story"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#667EEA]" />
                    </button>
                    <div className="flex gap-1">
                      {successStories.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            idx === currentStoryIndex ? "bg-[#667EEA]" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextStory}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Next story"
                    >
                      <ChevronRight className="w-4 h-4 text-[#667EEA]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-gray-800 mb-6">Performance</h3>
              
              <div className="space-y-6">
                {/* Stat Item */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#667EEA]/10 rounded-lg">
                    <Target className="w-5 h-5 text-[#667EEA]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 mb-1">Career Goals</div>
                    <div className="text-gray-500 text-sm">3 of 5 completed</div>
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#667EEA] h-2 rounded-full" style={{ width: "60%" }} />
                    </div>
                  </div>
                </div>

                {/* Stat Item */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#8BA888]/10 rounded-lg">
                    <Award className="w-5 h-5 text-[#8BA888]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 mb-1">Skills Gained</div>
                    <div className="text-gray-500 text-sm">12 new skills</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">React</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Python</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">SQL</span>
                    </div>
                  </div>
                </div>

                {/* Stat Item */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 mb-1">Time Invested</div>
                    <div className="text-gray-500 text-sm">24 hours this month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Card */}
            <div className="bg-gradient-to-br from-[#667EEA] to-[#8BA888] rounded-2xl p-6 text-white shadow-sm">
              <h3 className="mb-3">💡 Weekly Insight</h3>
              <p className="text-white/90 text-sm mb-4">
                You're making great progress! Complete 2 more tasks to unlock the Career Fit module.
              </p>
              <button className="w-full bg-white text-[#667EEA] py-2 px-4 rounded-lg text-sm hover:bg-white/90 transition-colors">
                View Recommendations
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#667EEA] hover:bg-[#667EEA]/5 transition-colors text-sm text-gray-700">
                  Schedule Mock Interview
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#667EEA] hover:bg-[#667EEA]/5 transition-colors text-sm text-gray-700">
                  Browse Courses
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#667EEA] hover:bg-[#667EEA]/5 transition-colors text-sm text-gray-700">
                  Find Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}