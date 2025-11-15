import { ReactNode, useState } from 'react';
import { Button } from './ui/button';
import { TrendingUp, Home, Award, TrendingUp as PathwayIcon, Users, Briefcase, User, LogOut, FileText, Menu, X } from 'lucide-react';
import { UserData } from '../App';

interface DashboardLayoutProps {
  children: ReactNode;
  userData: UserData | null;
  currentPage: string;
  onNavigate: (view: 'dashboard' | 'success-stories' | 'courses' | 'pathway' | 'mentorship' | 'jobs' | 'profile') => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

export function DashboardLayout({
  children,
  userData,
  currentPage,
  onNavigate,
  onSignOut,
  onRetakeSurvey
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'success-stories', label: 'Success Stories', icon: Award },
    { id: 'courses', label: 'Courses', icon: FileText },
    { id: 'pathway', label: 'Career Pathway', icon: PathwayIcon },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'jobs', label: 'Jobs & Networking', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <span className="text-blue-900">CareerPath</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-1">
              {navItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    onClick={() => onNavigate(item.id as any)}
                    className={currentPage === item.id ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* Profile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-gray-900">{userData?.name}</p>
              <p className="text-gray-500">{userData?.email}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                {userData?.name.charAt(0).toUpperCase()}
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      onRetakeSurvey();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Retake Survey
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={onSignOut}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    onClick={() => {
                      onNavigate(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`justify-start ${currentPage === item.id ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-64 bg-white shadow-sm min-h-[calc(100vh-80px)] sticky top-[80px]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
