import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Clock, Award, BookOpen, Filter, Star } from 'lucide-react';
import { UserData } from '../App';

interface CoursesProps {
  userData: UserData | null;
  onNavigate: (view: any) => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

const coursesData = {
  inProgress: [
    {
      id: 1,
      title: 'Advanced React Patterns',
      category: 'Web Development',
      progress: 65,
      totalLessons: 20,
      completedLessons: 13,
      duration: '12 hours',
      level: 'Advanced',
      instructor: 'Kent C. Dodds',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Python for Data Science',
      category: 'Data Science',
      progress: 40,
      totalLessons: 25,
      completedLessons: 10,
      duration: '20 hours',
      level: 'Intermediate',
      instructor: 'Jose Portilla',
      rating: 4.7
    },
    {
      id: 3,
      title: 'UX Design Fundamentals',
      category: 'UX/UI Design',
      progress: 80,
      totalLessons: 15,
      completedLessons: 12,
      duration: '10 hours',
      level: 'Beginner',
      instructor: 'Sarah Drasner',
      rating: 4.9
    }
  ],
  completed: [
    {
      id: 4,
      title: 'JavaScript ES6+',
      category: 'Web Development',
      completedDate: '2025-10-15',
      duration: '8 hours',
      level: 'Intermediate',
      certified: true,
      rating: 4.8
    },
    {
      id: 5,
      title: 'Git & GitHub Mastery',
      category: 'DevOps',
      completedDate: '2025-09-20',
      duration: '6 hours',
      level: 'Beginner',
      certified: true,
      rating: 4.6
    },
    {
      id: 6,
      title: 'SQL for Data Analysis',
      category: 'Data Science',
      completedDate: '2025-08-10',
      duration: '15 hours',
      level: 'Intermediate',
      certified: true,
      rating: 4.7
    }
  ],
  recommended: [
    {
      id: 7,
      title: 'TypeScript Deep Dive',
      category: 'Web Development',
      duration: '16 hours',
      level: 'Advanced',
      instructor: 'Maximilian Schwarzmüller',
      rating: 4.9,
      enrolled: 45320
    },
    {
      id: 8,
      title: 'Machine Learning A-Z',
      category: 'Data Science',
      duration: '44 hours',
      level: 'Intermediate',
      instructor: 'Kirill Eremenko',
      rating: 4.8,
      enrolled: 78540
    },
    {
      id: 9,
      title: 'Advanced CSS & Sass',
      category: 'Web Development',
      duration: '28 hours',
      level: 'Advanced',
      instructor: 'Jonas Schmedtmann',
      rating: 4.7,
      enrolled: 52100
    },
    {
      id: 10,
      title: 'User Research Methods',
      category: 'UX/UI Design',
      duration: '12 hours',
      level: 'Intermediate',
      instructor: 'Sarah Gibbons',
      rating: 4.8,
      enrolled: 23450
    },
    {
      id: 11,
      title: 'Docker & Kubernetes',
      category: 'DevOps',
      duration: '22 hours',
      level: 'Advanced',
      instructor: 'Bret Fisher',
      rating: 4.9,
      enrolled: 41230
    },
    {
      id: 12,
      title: 'System Design Interview Prep',
      category: 'Web Development',
      duration: '18 hours',
      level: 'Advanced',
      instructor: 'Alex Xu',
      rating: 4.9,
      enrolled: 32890
    }
  ]
};

export function Courses({ userData, onNavigate, onSignOut, onRetakeSurvey }: CoursesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Data Science', 'UX/UI Design', 'DevOps'];

  const filterCourses = (courses: any[]) => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <DashboardLayout
      userData={userData}
      currentPage="courses"
      onNavigate={onNavigate}
      onSignOut={onSignOut}
      onRetakeSurvey={onRetakeSurvey}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Courses & Learning Paths</h1>
          <p className="text-gray-600">
            Build your skills with curated courses and earn certifications
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-gray-400" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="in-progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
          </TabsList>

          {/* In Progress */}
          <TabsContent value="in-progress" className="space-y-4">
            {filterCourses(coursesData.inProgress).length === 0 ? (
              <Card className="p-12 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No courses in progress</h3>
                <p className="text-gray-600 mb-4">Start learning something new today!</p>
                <Button className="bg-blue-600 hover:bg-blue-700">Explore Courses</Button>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filterCourses(coursesData.inProgress).map((course) => (
                  <Card key={course.id} className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-12 h-12 text-blue-600" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-gray-900 mb-1">{course.title}</h3>
                              <p className="text-gray-600">{course.instructor}</p>
                            </div>
                            <Badge>{course.level}</Badge>
                          </div>

                          <div className="flex items-center gap-4 text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">
                              {course.completedLessons} of {course.totalLessons} lessons completed
                            </span>
                            <span className="text-blue-600">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="flex gap-3">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Continue Learning
                          </Button>
                          <Button variant="outline">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Completed */}
          <TabsContent value="completed" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {filterCourses(coursesData.completed).map((course) => (
                <Card key={course.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-2">{course.title}</h3>
                      <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    {course.certified && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Award className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-green-800">
                      ✓ Completed on {new Date(course.completedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {course.certified && (
                      <Button variant="outline" className="flex-1">
                        <Award className="w-4 h-4 mr-2" />
                        View Certificate
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1">Review</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Explore */}
          <TabsContent value="explore" className="space-y-4">
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-gray-900 mb-2">Recommended For You</h3>
              <p className="text-gray-600">Based on your interests and goals</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterCourses(coursesData.recommended).map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-blue-600" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <Badge>{course.level}</Badge>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.instructor}</p>

                    <div className="flex items-center gap-4 text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <span className="text-gray-400">|</span>
                      <span>{course.enrolled.toLocaleString()} students</span>
                    </div>

                    <Badge variant="outline" className="mb-4">{course.category}</Badge>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Enroll Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
