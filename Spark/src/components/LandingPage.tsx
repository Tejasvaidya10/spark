import { Button } from './ui/button';
import { ArrowRight, Users, TrendingUp, Award, Briefcase } from 'lucide-react';

interface LandingPageProps {
  onStartSurvey: () => void;
  onLogin: () => void;
}

export function LandingPage({ onStartSurvey, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <span className="text-blue-900">CareerPath</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </nav>
          <Button variant="outline" onClick={onLogin}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-gray-900 mb-6">
            Shape Your Future with Personalized Career Guidance
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover your path to success with tailored career recommendations, 
            expert mentorship, and a community of professionals ready to help you grow.
          </p>
          <Button 
            size="lg"
            onClick={onStartSurvey}
            className="bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105"
          >
            Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-gray-500 mt-4">
            Takes only 3 minutes • Completely free
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Career Pathways</h3>
            <p className="text-gray-600">
              Get a personalized roadmap to achieve your career goals
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Courses & Certifications</h3>
            <p className="text-gray-600">
              Access curated learning resources to build your skills
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Expert Mentorship</h3>
            <p className="text-gray-600">
              Connect with industry professionals who can guide you
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Job Networking</h3>
            <p className="text-gray-600">
              Discover opportunities and connect with employers
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <span>CareerPath</span>
              </div>
              <p className="text-gray-400">
                Empowering careers through personalized guidance and continuous learning.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CareerPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
