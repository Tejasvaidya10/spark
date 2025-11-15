import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  User,
  MessageCircle
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

interface CoursesSectionProps {
  courseProgress: number;
  setCourseProgress: (progress: number) => void;
  wellnessCheckCompleted: boolean;
  setWellnessCheckCompleted: (completed: boolean) => void;
  showWellnessCheck: boolean;
  setShowWellnessCheck: (show: boolean) => void;
  wellnessCheckDeclined: boolean;
  setWellnessCheckDeclined: (declined: boolean) => void;
  setDashboardSection: (section: "home" | "courses" | "networking" | "mentorship" | "jobs" | "profile") => void;
}

export function CoursesSection({
  courseProgress,
  setCourseProgress,
  wellnessCheckCompleted,
  setWellnessCheckCompleted,
  showWellnessCheck,
  setShowWellnessCheck,
  wellnessCheckDeclined,
  setWellnessCheckDeclined,
  setDashboardSection
}: CoursesSectionProps) {
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "Development",
      progress: courseProgress,
      totalHours: 40,
      completedHours: Math.floor((courseProgress / 100) * 40),
      certified: false,
      instructor: "Dr. Jane Smith",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGluZ3xlbnwxfHx8fDE3NjMxODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      modules: [
        { id: 1, title: "HTML & CSS Basics", duration: "4 hours", locked: courseProgress >= 25 && !wellnessCheckCompleted },
        { id: 2, title: "JavaScript Fundamentals", duration: "6 hours", locked: courseProgress >= 25 && !wellnessCheckCompleted },
        { id: 3, title: "React Introduction", duration: "8 hours", locked: courseProgress >= 25 && !wellnessCheckCompleted },
        { id: 4, title: "Backend with Node.js", duration: "10 hours", locked: courseProgress >= 25 && !wellnessCheckCompleted },
        { id: 5, title: "Database Integration", duration: "6 hours", locked: courseProgress >= 25 && !wellnessCheckCompleted },
        { id: 6, title: "Deployment & DevOps", duration: "6 hours", locked: courseProgress >= 25 && !wellnessCheckCompleted }
      ]
    }
  ];

  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  
  // Get the current course with latest data
  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleModuleClick = (module: any) => {
    if (module.locked) {
      setShowWellnessCheck(true);
      return;
    }

    // Simulate module completion and progress
    if (courseProgress < 25) {
      const newProgress = Math.min(courseProgress + 10, 25);
      setCourseProgress(newProgress);
      
      // Show wellness check when reaching 25%
      if (newProgress === 25) {
        setTimeout(() => {
          setShowWellnessCheck(true);
        }, 500);
      }
    }
  };

  const handleContinueCourse = () => {
    setWellnessCheckCompleted(true);
    setWellnessCheckDeclined(false);
    setShowWellnessCheck(false);
  };

  const handleDeclineCourse = () => {
    setWellnessCheckDeclined(true);
    setShowWellnessCheck(false);
  };

  return (
    <>
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Course List */}
          <div className="lg:col-span-1 space-y-4">
            {courses.map(course => (
              <div 
                key={course.id} 
                onClick={() => setSelectedCourseId(course.id)}
                className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
                  selectedCourse?.id === course.id ? "border-[#667EEA] bg-[#667EEA]/5" : "border-gray-200"
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 truncate">{course.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                    
                    <div className="mb-1">
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{course.progress}%</span>
                      {course.certified && (
                        <Badge className="bg-[#8BA888] text-xs h-5">
                          <Award className="w-3 h-3 mr-1" />
                          Certified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Course Details */}
          {selectedCourse && (
            <div className="lg:col-span-2">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Course Header */}
                <div className="aspect-[21/9] relative">
                  <ImageWithFallback
                    src={selectedCourse.image}
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Badge className="bg-white/20 text-white mb-2">{selectedCourse.category}</Badge>
                    <h3 className="text-2xl font-medium mb-2">{selectedCourse.title}</h3>
                    <p className="text-sm text-white/90">{selectedCourse.instructor}</p>
                  </div>
                </div>

                {/* Course Progress */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Course Progress</span>
                    <span className="text-sm font-medium">{selectedCourse.progress}%</span>
                  </div>
                  <Progress value={selectedCourse.progress} className="h-2.5 mb-2" />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{selectedCourse.completedHours}/{selectedCourse.totalHours} hours completed</span>
                    {selectedCourse.certified && (
                      <Badge className="bg-[#8BA888]">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>

                  {/* Wellness Check Alert */}
                  {selectedCourse.id === 1 && courseProgress >= 25 && !wellnessCheckCompleted && !wellnessCheckDeclined && (
                    <div className="mt-4 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-[#F59E0B]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">Wellness Check Required</h4>
                          <p className="text-xs text-gray-600 mb-3">
                            You've completed 25% of the course! Take a quick wellness check to unlock the remaining modules and continue your learning journey.
                          </p>
                          <Button 
                            size="sm" 
                            className="bg-[#F59E0B] hover:bg-[#D97706] text-white"
                            onClick={() => setShowWellnessCheck(true)}
                          >
                            Take Wellness Check
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Declined Wellness Check Alert */}
                  {selectedCourse.id === 1 && wellnessCheckDeclined && (
                    <div className="mt-4 bg-[#667EEA]/10 border border-[#667EEA]/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#667EEA]/20 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-4 h-4 text-[#667EEA]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">Need Support?</h4>
                          <p className="text-xs text-gray-600 mb-3">
                            We understand learning can be challenging. Connect with a mentor who can provide personalized guidance and help you overcome any obstacles.
                          </p>
                          <Button 
                            size="sm" 
                            className="bg-[#667EEA] hover:bg-[#5568D3]"
                            onClick={() => setDashboardSection("mentorship")}
                          >
                            Connect with Mentor
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Course Modules */}
                {"modules" in selectedCourse && selectedCourse.modules && (
                  <div className="p-6">
                    <h4 className="font-medium mb-4">Course Modules</h4>
                    <div className="space-y-2">
                      {selectedCourse.modules.map((module, index) => (
                        <div
                          key={module.id}
                          onClick={() => handleModuleClick(module)}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                            module.locked
                              ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                              : "border-gray-200 hover:border-[#667EEA] hover:bg-[#667EEA]/5 cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              module.locked ? "bg-gray-200" : "bg-[#667EEA]/10"
                            }`}>
                              {module.locked ? (
                                <span className="text-sm text-gray-500">🔒</span>
                              ) : (
                                <BookOpen className="w-4 h-4 text-[#667EEA]" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{module.title}</p>
                              <p className="text-xs text-gray-600">{module.duration}</p>
                            </div>
                          </div>
                          {module.locked && (
                            <Badge variant="secondary" className="text-xs">Locked</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other courses without modules */}
                {(!("modules" in selectedCourse) || !selectedCourse.modules) && (
                  <div className="p-6">
                    <Button className="w-full bg-[#667EEA] hover:bg-[#5568D3]">
                      Continue Learning
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Wellness Check Dialog */}
      <Dialog open={showWellnessCheck} onOpenChange={setShowWellnessCheck}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#667EEA] to-[#8BA888] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              Great Progress!
            </DialogTitle>
            <DialogDescription className="text-center">
              You've completed 25% of the Full Stack Web Development course. How are you feeling about the material so far?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">Quick Check-In</h4>
              <p className="text-sm text-gray-600">
                We want to ensure you're comfortable with the material before moving forward. Do you feel ready to continue with the advanced modules?
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDeclineCourse}
            >
              I Need Help
            </Button>
            <Button
              className="flex-1 bg-[#8BA888] hover:bg-[#7A9777]"
              onClick={handleContinueCourse}
            >
              Yes, Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}