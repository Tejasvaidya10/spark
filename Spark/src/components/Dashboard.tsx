import { DashboardLayout } from './DashboardLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  TrendingUp, 
  Award, 
  Users, 
  Briefcase, 
  ArrowRight, 
  BookOpen, 
  Target,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Activity,
  BarChart3,
  MessageSquare,
  Lightbulb,
  ChevronRight,
  Circle,
  Dot
} from 'lucide-react';
import { UserData } from '../App';

interface DashboardProps {
  userData: UserData | null;
  onNavigate: (view: any) => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

export function Dashboard({ userData, onNavigate, onSignOut, onRetakeSurvey }: DashboardProps) {
  const careerSteps = [
    { 
      id: 1, 
      title: 'Resume', 
      subtitle: 'Build Your Profile',
      status: 'complete', 
      progress: 100,
      icon: FileText
    },
    { 
      id: 2, 
      title: 'Career Fit', 
      subtitle: 'Assessment & Goals',
      status: 'active', 
      progress: 65,
      icon: Target
    },
    { 
      id: 3, 
      title: 'Aspire', 
      subtitle: 'Learn & Develop',
      status: 'active', 
      progress: 40,
      icon: BookOpen
    },
    { 
      id: 4, 
      title: 'Interview', 
      subtitle: 'Land Your Role',
      status: 'pending', 
      progress: 0,
      icon: Briefcase
    },
  ];

  const myActivities = [
    { id: 1, type: 'course', title: 'Complete Advanced React Patterns', time: '2h 30m left', priority: 'high' },
    { id: 2, type: 'interview', title: 'Interview prep for TechCorp', time: 'Tomorrow 2:00 PM', priority: 'high' },
    { id: 3, type: 'mentorship', title: 'Mentorship session with John Davis', time: 'Dec 18, 10:00 AM', priority: 'medium' },
    { id: 4, type: 'deadline', title: 'Submit Python project', time: 'Dec 20, 11:59 PM', priority: 'medium' },
  ];

  const careerRecommendations = [
    { 
      id: 1, 
      role: 'Senior Frontend Developer', 
      company: 'TechCorp',
      match: 92,
      image: 'https://images.unsplash.com/photo-1762341123685-098ecb6c3ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2FyZWVyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MzE3OTA4MXww&ixlib=rb-4.1.0&q=80&w=400',
      location: 'Remote'
    },
    { 
      id: 2, 
      role: 'UX/UI Designer', 
      company: 'DesignHub',
      match: 87,
      image: 'https://images.unsplash.com/photo-1762341118954-d0ce391674d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzMTc5MDgxfDA&ixlib=rb-4.1.0&q=80&w=400',
      location: 'New York, NY'
    },
    { 
      id: 3, 
      role: 'Data Analyst', 
      company: 'Analytics Pro',
      match: 84,
      image: 'https://images.unsplash.com/photo-1758524056096-6bedf35a33f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lbnRvcnxlbnwxfHx8fDE3NjMxNzkwODF8MA&ixlib=rb-4.1.0&q=80&w=400',
      location: 'San Francisco, CA'
    },
  ];

  const insights = [
    { id: 1, icon: Lightbulb, text: 'You\'re in the top 15% of learners this month', type: 'success' },
    { id: 2, icon: BarChart3, text: 'Your profile views increased 28% after adding certifications', type: 'info' },
    { id: 3, icon: MessageSquare, text: '3 recruiters viewed your profile this week', type: 'info' },
  ];

  const overallProgress = Math.round(careerSteps.reduce((sum, step) => sum + step.progress, 0) / careerSteps.length);

  // Resume score distribution data for visualization
  const resumeScore = 866;

  return (
    <DashboardLayout
      userData={userData}
      currentPage="dashboard"
      onNavigate={onNavigate}
      onSignOut={onSignOut}
      onRetakeSurvey={onRetakeSurvey}
    >
      <div className="bg-[#F77F88FA] min-h-screen">
        {/* Horizontal Progress Tracker */}
        <div className="bg-white border-b border-[#E2E8F0]">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6">
              <h1 className="text-[#2D3748] mb-1">Welcome back, {userData?.name.split(' ')[0]}</h1>
              <p className="text-[#718096]">Your career journey progress</p>
            </div>

            {/* Horizontal Steps */}
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#E2E8F0] hidden md:block" style={{ marginLeft: '2.5rem', marginRight: '2.5rem' }}>
                <div className="h-full bg-[#667EEA] transition-all duration-500" style={{ width: `${(overallProgress / 100) * 100}%` }}></div>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {careerSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isComplete = step.status === 'complete';
                  const isActive = step.status === 'active';
                  
                  return (
                    <div key={step.id} className="relative">
                      <div className="flex flex-col items-center text-center">
                        {/* Icon Circle */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 relative z-10 transition-all ${
                          isComplete ? 'bg-[#8BA888] text-white' :
                          isActive ? 'bg-[#667EEA] text-white' :
                          'bg-[#E2E8F0] text-[#A0AEC0]'
                        }`}>
                          {isComplete ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
                        
                        {/* Step Info */}
                        <p className={`mb-1 ${isActive ? 'text-[#2D3748]' : 'text-[#718096]'}`}>
                          {step.title}
                        </p>
                        <p className="text-[#A0AEC0] mb-2">{step.subtitle}</p>
                        
                        {/* Progress */}
                        {(isComplete || isActive) && (
                          <div className="w-full max-w-[120px]">
                            <div className="h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all ${isComplete ? 'bg-[#8BA888]' : 'bg-[#667EEA]'}`}
                                style={{ width: `${step.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-[#718096] mt-1">{step.progress}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Resume Score Visualization */}
              <Card className="border-0 shadow-sm">
                <div className="p-88">
                  <div className="flex items-center justify-between mb-88">
                    <div>
                      <h2 className="text-[#2D3748] mb-22">ResResumme Scocore A Analysisalysis</h2>
                      <p className="text-[#718096]">YouYour profprofilele ccomparedmpared tto susucccessfulssful ccanndidatdates</p>
                    </div>
                    <Button variant="outline" className="border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7F88FAA]">
                      Improve Score
                    </Button>
                  </div>

                  {/* Score Display with Bell Curve with Bell Curve */}
                  <div className="flex items-center gap-166 mb-1010">
                    <div>
                      <p className="text-[#718096] mb-2">Your Score</p>
                      <p className="text-[#718096] mb-2">Your Score</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[#2D3748]">{{resumesumeScore}}</span>
                          <span className="text-[#A0AEC0]">span className="text-[#A0AEC0]">/ 100</span 100</span>
                      <//div>
                      <divdiv className="mmt-2 p-2 px-3 py-1 bg-3 py-1 bg-[#8BA888BA888]/10 /10 roundounded-fd-full inlinll inline-bl-block"ck">
                        <span className="text-[#8BA888]">TopTop 15%5%</span>
                      </div>
                    </div>
                    
                    {/* Bell Curve Visualization - Muted Green - Muted Green */}
                    <div className="flex-1">
                      <p className="text-[#718096] mb-3">Distribution</p>
                      <p className="text-[#718096] mb-3">Distribution</p>
                      <div className="relative h-332 flex items-end gap-1.5.5">
                        {[1010, 188, 26, 36, 32, 338, 442, 388, 32, 266, 1818, 100].map((height, i) => (
                          <div 
                            key={i} 
                            className="flex-1 rounded-t trtransnsitionion-allall"
                            style={{ 
                              
                              height: `${height}%`,
                              background: i >= 8 ? '#8BA888' : 'linear-gradient(to top, #8BA888, #A8C5A6)',
                              opacity: i >= 8 ? '0.9' : '0.15'
                           ,
                              background: i >= 8 ? '#8BA888' : 'linear-gradient(to top, #8BA888, #A8C5A6)',
                              opacity: i >= 8 ? '0.9' : '0.15'
                            }}
                          ></div>
                        ))}
                        {/* User's position marker */}
                        <div className="absolute right-88 top-22 flexflex flex-col-col items-center">
                          <div className="w-0.5 h-2020 bg-[#8BA888]"></div>
                          <div className="w-33 h-33 bg-[#8BA888] rounded-full border-2 border-white mt-1 mt-1"></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-33">
                        <span className="text-[#A0AEC0]">00</span>
                        <span className="text-[#A0AEC0]">5050</span>
                        <span className="text-[#8BA888]">You: {resumeScore}: {resumeScore}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-66">
                    <div className="bg-[#F7F8FA] rounded-lg p-5 bg-[#F7F8FA] rounded-lg p-5 border border-[#E2E8F0]">
                      <div className="flex items-center gap-2 mb-33">
                        <FileText className="w-4 h-4 text-[#718096]" />
                        <span className="text-[#718096]">Resume</span>
                      </div>
                      <p className="text-[#2D3748] mb-2 mb-2">Complete</p>
                      <div className="h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#8BA888] w-full"></div>
                      </div>
                    </div>
                    
                    <div className="bg-[#F7F8FA] rounded-lg p-5 bg-[#F7F8FA] rounded-lg p-5 border border-[#E2E8F0]">
                      <div className="flex items-center gap-2 mb-33">
                        <Award className="w-4 h-4 text-[#718096]" />
                        <span className="text-[#718096]">Certifications</span>
                      </div>
                      <p className="text-[#2D3748] mb-2 mb-2">5 earned</p>
                      <div className="h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#667EEA] w-4/5"></div>
                      </div>
                    </div>
                    
                    <div className="bg-[#F7F8FA] rounded-lg p-5 bg-[#F7F8FA] rounded-lg p-5 border border-[#E2E8F0]">
                      <div className="flex items-center gap-2 mb-33">
                        <BookOpen className="w-4 h-4 text-[#718096]" />
                        <span className="text-[#718096]">Skills</span>
                      </div>
                      <p className="text-[#2D3748] mb-2 mb-2">12 verified</p>
                      <div className="h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#667EEA] w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Career Recommendations */}
              <Card className="border-0 shadow-sm">
                <div className="p-88">
                  <div className="flex items-center justify-between mb-88">
                    <div>
                      <h2 className="text-[#2D3748] mb-22">Recommended Opportunities</h2>
                      <p className="text-[#718096]">Based on your skills and career goals</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7F88FAA]"
                      onClick={() => onNavigate('jobs')}
                    >
                      View All
                    </Button>
                  </div>

                  <div className="grid grid-colgrid grid-cols-1 md:grid--1 md:grid-colsols-3 gap3 gap-66">
                    {careerRecommendations.map((rec) => (
                      <div 
                        key={rec.id} 
                        className="grouroup cucurssor-ppoiintter"
              r"
                         o      onClClick={() => ck={() => onNNavvigagate('j('jobs')}bs')}
                      >
                        <div className="relative overflow-hidden rounded-lg mb-4">
                          <div className="relative overflow-hidden rounded-lg mb-4">
                          <ImageWithFallback 
                              src={rec.image}
                              alt={rec.company}
                              className="w-fullfull h-4848 object-cover transitiontransition-trantransform group-form group-hoveover:scale:scale-11055"
                            />
                            <div className="absoabsolutute top top-33 rrightght-33">
                              <div className="ppx-33 ppy-1 1 bg-g-whithite/95/95 bbackdrockdrop-blur-ur-sm rou roundedded-fullfull">
                              <spanspan className="text-[#8BBA888888]">{">{rec.mec.match}%h}% mmatchh</spanspan>
                            </d/divv>
                          </div>
                        <//div>
                        <h4h4 className="ttext-[#2D3748] -[#2D3748] mb-1 groupb-1 group-hovhover:r:text-[#667EEA]xt-[#667EEA] trtransitionnsition-colorscolors">{rec.role}</h4>{rec.role}</h4>
                        <p className="text-[#71718096096]">{rec.cocomppanyny}</p>
                        <p className="text-[#A0AEC0]">{rec.lo{rec.locattion}on}</pp>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Learning Progress */}
              <Card className="border-0 shadow-sm">
                <div className="p-88">
                  <div className="flex items-center justify-between mb-88">
                    <div>
                      <h2 className="text-[#2D3748] mb-22">Current Courses</h2>
                      <p className="text-[#718096]">Continue your learning journey</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7F88FAA]"
                      onClick={() => onNavigate('courses')}
                    >
                      View All
                    </Button>
                  </div>

                  <div className="space-y-55">
                    {[
                      { title: 'Advanced React Patterns', progress: 65, lessons: '13/20 lessons', deadline: '3 days left' },
                      { title: 'Python for Data Science', progress: 40, lessons: '10/25 lessons', deadline: '1 week left' },
                      { title: 'UX Design Fundamentals', progress: 80, lessons: '12/15 lessons', deadline: '2 days left' },
                    ].map((course, index) => (
                      <div key={index} className="p-5 bg-[#F7F8FA] rounded-lg5 bg-[#F7F8FA] rounded-lg border border-[#E2E8F0] hover:border-[#667EEA] transition-all">
                        <div className="flex items-center justify-between mb-44">
                          <h4 className="text-[#2D3748]">{course.title}</h4>
                          <span className="text-[#AA0AEC0AEC0]">{course.deadline}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#667EEA] transition-all"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-[#718096]">{course.lessons}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Community Insights */}
              <Card className="border-0 shadow-sm">
                <div className="p-88">
                  <h2 className="text-[#2D3748] mb-88">Insights & Analytics</h2>
                  
                  <div className="space-y-55">
                    {insights.map((insight) => {
                      const Icon = insight.icon;
                      return (
                        <div key={insight.id} className="flex gap-44 p-55 bg-[#F7F88FAA] rounded-lg border border-[#E2E8F0]">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            insight.type === 'success' ? 'bg-[#8BA888]/155' : 'bg-[#667EEA]/155'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              insight.type === 'success' ? 'text-[#8BA888]' : 'text-[#667EEA]'
                            }`} />
                          </div>
                          <p className="text-[#4A5568] flex-1">{insight.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Sidebar - Activities & Quick Actions (1/3 width) */}
            <div className="space-y-88">
              
              {/* My Activities */}
              <Card className="border-0 shadow-sm">
                <div className="p-6">
                  <h3 className="text-[#2D3748] mb-66">My Activities</h3>
                  
                  <div className="space-y-44">
                    {myActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="p-44 bgg-[#F7FF7F8FAA] rounded-lg bbordrder  border-[#E22E8F08F0] hover:borderorder-[#66667EEEEA] transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-22 flex-shrink-0 ${
                            activity.priority === 'high' ? 'bg-[#667EEA]' : 'bg-[#A0AEC0]'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#2D3748] mb-1">{activity.title}</p>
                            <p className="text-[#AA0AEC0AEC0]">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-66 border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7F88FAA]"
                    onClick={() => onNavigate('profile')}
                  >
                    View Calendar
                  </Button>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-sm">
                <div className="p-6">
                  <h3 className="text-[#2D3748] mb-66">PerformanPerformancee Stats</h3>
                  
                  <div className="space-y-66">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#718096]">Active Courses</span>
                        <span className="text-[#2D3748]">3</span>
                      </div>
                      <div className="h-1.5.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#667EEA] w-3/5"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#718096]">Certifications</span>
                        <span className="text-[#2D3748]">5</span>
                      </div>
                      <div className="h-1.5.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#8BA888] w-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#718096]">Network</span>
                        <span className="text-[#2D3748]">127</span>
                      </div>
                      <div className="h-1.5.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#667EEA] w-4/5"></div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-[#E2E8F0]" className="pt-2 border-t border-[#E2E8F0]">
                      <div className="flex items-center justify-between mb-11">
                        <span className="text-[#718096]">Profile Views</span>
                        <span className="text-[#2D3748]">48</span>
                      </div>
                      <p className="text-[#8BA888]">↑ 28% this week</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-sm">
                <div className="p-6">
                  <h3 className="text-[#2D3748] mb-66">Quick Actions</h3>
                  
                  <div className="space-y-33">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7F88FAA] hover:border-[#667EEA]"
                      onClick={() => onNavigate('mentorship')}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Schedule Mentor Session
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7F88FAA] hover:border-[#667EEA]"
                      onClick={() => onNavigate('jobs')}
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Browse Opportunities
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7F88FAA] hover:border-[#667EEA]"
                      onClick={() => onNavigate('pathway')}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Update Career Goals
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7F88FAA] hover:border-[#667EEA]"
                      onClick={() => onNavigate('courses')}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Explore New Courses
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Your Focus Areas */}
              <Card className="border-0 shadow-sm">
                <div className="p-6">
                  <h3 className="text-[#2D3748] mb-66">Your Focus Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData?.interests.slice(0, 6).map((interest) => (
                      <Badge 
                        key={interest} 
                        variant="outline"
                        className="border-[#E2E8F0] text-[#4A5568] bg-[#F7F88FAA]"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
