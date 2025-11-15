import { DashboardLayout } from './DashboardLayout';
import { HorizontalStepTemplate } from './HorizontalStepTemplate';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { TrendingUp, BookOpen, Users } from 'lucide-react';
import { UserData } from '../App';

interface CareerStepsPageProps {
  userData: UserData | null;
  onNavigate: (view: any) => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

export function CareerStepsPage({ userData, onNavigate, onSignOut, onRetakeSurvey }: CareerStepsPageProps) {
  return (
    <DashboardLayout
      userData={userData}
      currentPage="dashboard"
      onNavigate={onNavigate}
      onSignOut={onSignOut}
      onRetakeSurvey={onRetakeSurvey}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Horizontal Step Template */}
        <HorizontalStepTemplate 
          onWellnessCheck={(decision) => {
            if (decision === 'no') {
              setTimeout(() => onNavigate('mentorship'), 1500);
            }
          }}
        />

        {/* Additional Resources */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Career Pathway</h3>
            <p className="text-gray-600 mb-4">
              View your complete career roadmap and upcoming milestones
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate('pathway')}
            >
              View Pathway
            </Button>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Learning Resources</h3>
            <p className="text-gray-600 mb-4">
              Access courses and materials to help you complete your tasks
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate('courses')}
            >
              Browse Courses
            </Button>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Get Support</h3>
            <p className="text-gray-600 mb-4">
              Connect with mentors who can guide you through each step
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate('mentorship')}
            >
              Find a Mentor
            </Button>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="text-gray-900 mb-3">💡 Tips for Success</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Hover over each step on desktop to view and check off tasks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Complete tasks in order for the best learning experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Connect with mentors if you need help with any step</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Track your overall progress with the progress bar at the top</span>
            </li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}