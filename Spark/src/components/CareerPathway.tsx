import { DashboardLayout } from './DashboardLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle, Target, BookOpen, Award, Briefcase, TrendingUp } from 'lucide-react';
import { UserData } from '../App';

interface CareerPathwayProps {
  userData: UserData | null;
  onNavigate: (view: any) => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

const pathwayStages = [
  {
    id: 1,
    title: 'Junior Developer',
    status: 'completed',
    description: 'Foundation building phase',
    skills: ['HTML/CSS', 'JavaScript Basics', 'Git', 'Responsive Design'],
    courses: ['JavaScript Fundamentals', 'Web Development Bootcamp'],
    achievements: ['First Deployed Project', 'Team Collaboration'],
    duration: '6-12 months',
    progress: 100
  },
  {
    id: 2,
    title: 'Mid-Level Developer',
    status: 'current',
    description: 'Expanding expertise and ownership',
    skills: ['React/Vue', 'TypeScript', 'Testing', 'API Design', 'State Management'],
    courses: ['Advanced React Patterns', 'TypeScript Deep Dive', 'System Design Basics'],
    achievements: ['Led Feature Development', 'Mentored Junior Developer'],
    duration: '12-24 months',
    progress: 60,
    currentFocus: 'Complete Advanced React course and lead next sprint'
  },
  {
    id: 3,
    title: 'Senior Developer',
    status: 'upcoming',
    description: 'Technical leadership and architecture',
    skills: ['System Design', 'Architecture Patterns', 'Team Leadership', 'Code Review', 'Performance Optimization'],
    courses: ['System Design Mastery', 'Leadership Essentials', 'Advanced Architecture'],
    achievements: ['Architect Major System', 'Technical Mentor', 'Cross-team Collaboration'],
    duration: '24-36 months',
    progress: 0
  },
  {
    id: 4,
    title: 'Tech Lead / Staff Engineer',
    status: 'future',
    description: 'Strategic technical direction',
    skills: ['Technical Strategy', 'Stakeholder Management', 'Large-scale Systems', 'Team Building'],
    courses: ['Engineering Management', 'Strategic Thinking', 'Org-level Impact'],
    achievements: ['Define Technical Vision', 'Cross-org Influence'],
    duration: '36+ months',
    progress: 0
  }
];

const upcomingMilestones = [
  {
    id: 1,
    title: 'Complete Advanced React Course',
    category: 'Learning',
    dueDate: '2025-12-15',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Build Portfolio Project',
    category: 'Project',
    dueDate: '2025-12-30',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Attend Tech Conference',
    category: 'Networking',
    dueDate: '2026-01-20',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Get AWS Certification',
    category: 'Certification',
    dueDate: '2026-02-28',
    priority: 'medium'
  }
];

export function CareerPathway({ userData, onNavigate, onSignOut, onRetakeSurvey }: CareerPathwayProps) {
  const currentStage = pathwayStages.find(s => s.status === 'current');
  const overallProgress = pathwayStages.reduce((acc, stage) => acc + stage.progress, 0) / pathwayStages.length;

  return (
    <DashboardLayout
      userData={userData}
      currentPage="pathway"
      onNavigate={onNavigate}
      onSignOut={onSignOut}
      onRetakeSurvey={onRetakeSurvey}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Your Career Pathway</h1>
          <p className="text-gray-600">
            Track your progress and plan your next steps
          </p>
        </div>

        {/* Overview Card */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-6 h-6 text-blue-600" />
                <h2 className="text-gray-900">Current Goal: {currentStage?.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{currentStage?.currentFocus}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Overall Progress</span>
                  <span>{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate('courses')}>
                <BookOpen className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
              <Button variant="outline" onClick={onRetakeSurvey}>
                Update Goals
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Career Path Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-gray-900">Career Roadmap</h2>
            
            <div className="space-y-6">
              {pathwayStages.map((stage, index) => {
                const isCompleted = stage.status === 'completed';
                const isCurrent = stage.status === 'current';
                const isUpcoming = stage.status === 'upcoming';
                const isFuture = stage.status === 'future';

                return (
                  <div key={stage.id} className="relative">
                    {/* Connection Line */}
                    {index < pathwayStages.length - 1 && (
                      <div className={`absolute left-6 top-16 w-0.5 h-full -mb-6 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}

                    <Card className={`p-6 relative ${
                      isCurrent ? 'border-2 border-blue-500 shadow-lg' : ''
                    }`}>
                      <div className="flex gap-4">
                        {/* Status Icon */}
                        <div className="flex-shrink-0">
                          {isCompleted && (
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                          )}
                          {isCurrent && (
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                              <TrendingUp className="w-6 h-6" />
                            </div>
                          )}
                          {(isUpcoming || isFuture) && (
                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                              <Circle className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-gray-900 mb-1">{stage.title}</h3>
                              <p className="text-gray-600">{stage.description}</p>
                            </div>
                            {isCurrent && (
                              <Badge className="bg-blue-600">In Progress</Badge>
                            )}
                            {isCompleted && (
                              <Badge className="bg-green-600">Completed</Badge>
                            )}
                          </div>

                          <p className="text-gray-500 mb-4">Typical Duration: {stage.duration}</p>

                          {/* Progress Bar for Current Stage */}
                          {isCurrent && (
                            <div className="mb-4">
                              <div className="flex justify-between text-gray-600 mb-2">
                                <span>Progress</span>
                                <span>{stage.progress}%</span>
                              </div>
                              <Progress value={stage.progress} className="h-2" />
                            </div>
                          )}

                          {/* Skills */}
                          <div className="mb-4">
                            <p className="text-gray-700 mb-2">Key Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {stage.skills.map((skill) => (
                                <Badge key={skill} variant="outline">{skill}</Badge>
                              ))}
                            </div>
                          </div>

                          {/* Courses */}
                          <div className="mb-4">
                            <p className="text-gray-700 mb-2">Recommended Courses:</p>
                            <div className="space-y-2">
                              {stage.courses.map((course) => (
                                <div key={course} className="flex items-center gap-2 text-gray-600">
                                  <BookOpen className="w-4 h-4 text-blue-600" />
                                  <span>{course}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Achievements */}
                          <div>
                            <p className="text-gray-700 mb-2">Target Achievements:</p>
                            <div className="space-y-2">
                              {stage.achievements.map((achievement) => (
                                <div key={achievement} className="flex items-center gap-2 text-gray-600">
                                  <Award className="w-4 h-4 text-green-600" />
                                  <span>{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {isCurrent && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-blue-600 mb-2">Current Focus:</p>
                              <p className="text-gray-700">{stage.currentFocus}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Milestones & Actions */}
          <div className="space-y-6">
            {/* Upcoming Milestones */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Upcoming Milestones</h3>
              <div className="space-y-3">
                {upcomingMilestones.map((milestone) => {
                  const priorityColors = {
                    high: 'border-red-200 bg-red-50',
                    medium: 'border-yellow-200 bg-yellow-50',
                    low: 'border-gray-200 bg-gray-50'
                  };

                  return (
                    <div
                      key={milestone.id}
                      className={`p-3 border rounded-lg ${priorityColors[milestone.priority as keyof typeof priorityColors]}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-gray-900">{milestone.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {milestone.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="text-xs">{milestone.category}</span>
                        <span className="text-xs">
                          Due {new Date(milestone.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('courses')}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('mentorship')}>
                  <Briefcase className="w-4 h-4 mr-2" />
                  Find a Mentor
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('jobs')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Explore Jobs
                </Button>
              </div>
            </Card>

            {/* Skills Progress */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Skill Development</h3>
              <div className="space-y-4">
                {Object.entries(userData?.skills || {}).map(([skill, level]) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 capitalize">{skill}</span>
                      <span className="text-blue-600">{level}%</span>
                    </div>
                    <Progress value={level as number} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
