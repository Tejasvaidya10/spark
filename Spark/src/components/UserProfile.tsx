import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, Mail, Target, BookOpen, Award, TrendingUp, Edit, Save } from 'lucide-react';
import { UserData } from '../App';

interface UserProfileProps {
  userData: UserData | null;
  onNavigate: (view: any) => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

export function UserProfile({ userData, onNavigate, onSignOut, onRetakeSurvey }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData?.name || '');
  const [editedEmail, setEditedEmail] = useState(userData?.email || '');
  const [editedGoals, setEditedGoals] = useState(userData?.goals || '');

  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false);
  };

  const achievements = [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first online course',
      date: '2025-08-10',
      icon: BookOpen
    },
    {
      id: 2,
      title: 'Survey Champion',
      description: 'Completed the career assessment survey',
      date: '2025-09-01',
      icon: Target
    },
    {
      id: 3,
      title: 'Certification Earned',
      description: 'Earned your first professional certification',
      date: '2025-10-15',
      icon: Award
    },
    {
      id: 4,
      title: 'Consistent Learner',
      description: 'Maintained a 30-day learning streak',
      date: '2025-11-05',
      icon: TrendingUp
    }
  ];

  const stats = [
    { label: 'Courses Completed', value: 5 },
    { label: 'Courses In Progress', value: 3 },
    { label: 'Certifications', value: 5 },
    { label: 'Learning Hours', value: 127 }
  ];

  return (
    <DashboardLayout
      userData={userData}
      currentPage="profile"
      onNavigate={onNavigate}
      onSignOut={onSignOut}
      onRetakeSurvey={onRetakeSurvey}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Your Profile</h1>
          <p className="text-gray-600">
            Manage your account settings and track your progress
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Personal Information</h2>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl">
                    {userData?.name.charAt(0).toUpperCase()}
                  </div>
                  {!isEditing && (
                    <div>
                      <h3 className="text-gray-900">{userData?.name}</h3>
                      <p className="text-gray-600">{userData?.email}</p>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="goals">Career Goals</Label>
                      <Textarea
                        id="goals"
                        value={editedGoals}
                        onChange={(e) => setEditedGoals(e.target.value)}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label className="text-gray-600">Full Name</Label>
                      <p className="text-gray-900 mt-1">{userData?.name}</p>
                    </div>

                    <div>
                      <Label className="text-gray-600">Email Address</Label>
                      <p className="text-gray-900 mt-1">{userData?.email}</p>
                    </div>

                    <div>
                      <Label className="text-gray-600">Career Goals</Label>
                      <p className="text-gray-900 mt-1">{userData?.goals}</p>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Career Interests */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Career Interests</h2>
                <Button variant="outline" size="sm" onClick={onRetakeSurvey}>
                  Update
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData?.interests.map((interest) => (
                  <Badge key={interest} className="bg-blue-600">
                    {interest}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Skills Assessment</h2>
                <Button variant="outline" size="sm" onClick={onRetakeSurvey}>
                  Reassess
                </Button>
              </div>
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

            {/* Achievements */}
            <Card className="p-6">
              <h2 className="text-gray-900 mb-4">Achievements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-900 mb-1">{achievement.title}</h3>
                          <p className="text-gray-600 mb-2">{achievement.description}</p>
                          <p className="text-gray-500">
                            {new Date(achievement.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-gray-600">{stat.label}</span>
                    <span className="text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={onRetakeSurvey}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Retake Survey
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('courses')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('pathway')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Career Path
                </Button>
              </div>
            </Card>

            {/* Account Actions */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Account</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  Delete Account
                </Button>
              </div>
            </Card>

            {/* Member Since */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="text-gray-900">September 2025</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
