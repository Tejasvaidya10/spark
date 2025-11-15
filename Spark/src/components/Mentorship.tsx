import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Search, Star, MapPin, Briefcase, Clock, Mail, MessageCircle } from 'lucide-react';
import { UserData } from '../App';

interface MentorshipProps {
  userData: UserData | null;
  onNavigate: (view: any) => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

const mentors = [
  {
    id: 1,
    name: 'Sarah Williams',
    title: 'Senior Software Engineer',
    company: 'Google',
    expertise: ['Web Development', 'React', 'System Design'],
    experience: '12 years',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviews: 45,
    availability: 'Available',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'I help developers transition from junior to senior roles by focusing on system design and leadership skills.',
    sessionsCompleted: 120,
    responseTime: '< 24 hours'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Lead Data Scientist',
    company: 'Amazon',
    expertise: ['Data Science', 'Machine Learning', 'Python'],
    experience: '10 years',
    location: 'Seattle, WA',
    rating: 4.8,
    reviews: 38,
    availability: 'Available',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    bio: 'Passionate about helping aspiring data scientists break into the field and advance their careers.',
    sessionsCompleted: 95,
    responseTime: '< 48 hours'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Lead UX Designer',
    company: 'Airbnb',
    expertise: ['UX/UI Design', 'User Research', 'Design Systems'],
    experience: '8 years',
    location: 'San Francisco, CA',
    rating: 5.0,
    reviews: 52,
    availability: 'Limited',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    bio: 'I mentor designers on building strong portfolios and mastering the UX design process.',
    sessionsCompleted: 140,
    responseTime: '< 24 hours'
  },
  {
    id: 4,
    name: 'David Park',
    title: 'Technical Lead',
    company: 'Microsoft',
    expertise: ['Web Development', 'DevOps', 'Cloud Architecture'],
    experience: '15 years',
    location: 'Redmond, WA',
    rating: 4.9,
    reviews: 61,
    availability: 'Available',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    bio: 'Helping developers grow into technical leadership roles through hands-on guidance.',
    sessionsCompleted: 180,
    responseTime: '< 24 hours'
  },
  {
    id: 5,
    name: 'Jennifer Taylor',
    title: 'Senior Product Manager',
    company: 'Spotify',
    expertise: ['Product Management', 'Strategy', 'User Analytics'],
    experience: '9 years',
    location: 'New York, NY',
    rating: 4.8,
    reviews: 42,
    availability: 'Available',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    bio: 'I guide PMs through product strategy, stakeholder management, and career advancement.',
    sessionsCompleted: 110,
    responseTime: '< 48 hours'
  },
  {
    id: 6,
    name: 'Alex Thompson',
    title: 'DevOps Engineer',
    company: 'Netflix',
    expertise: ['DevOps', 'Kubernetes', 'CI/CD'],
    experience: '11 years',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviews: 55,
    availability: 'Available',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Specialized in helping engineers transition into DevOps and cloud infrastructure roles.',
    sessionsCompleted: 130,
    responseTime: '< 24 hours'
  }
];

export function Mentorship({ userData, onNavigate, onSignOut, onRetakeSurvey }: MentorshipProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);

  const allExpertise = Array.from(new Set(mentors.flatMap(m => m.expertise)));

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesExpertise = selectedExpertise === 'all' || mentor.expertise.includes(selectedExpertise);
    const matchesAvailability = selectedAvailability === 'all' || mentor.availability === selectedAvailability;
    
    return matchesSearch && matchesExpertise && matchesAvailability;
  });

  const handleRequestMentorship = (mentor: typeof mentors[0]) => {
    setSelectedMentor(mentor);
    setIsRequestDialogOpen(true);
  };

  return (
    <DashboardLayout
      userData={userData}
      currentPage="mentorship"
      onNavigate={onNavigate}
      onSignOut={onSignOut}
      onRetakeSurvey={onRetakeSurvey}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Find a Mentor</h1>
          <p className="text-gray-600">
            Connect with experienced professionals who can guide your career journey
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                {allExpertise.map(exp => (
                  <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Limited">Limited</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 truncate">{mentor.name}</h3>
                    <p className="text-gray-600 truncate">{mentor.title}</p>
                    <p className="text-gray-500 truncate">{mentor.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-700">{mentor.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{mentor.reviews} reviews</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{mentor.bio}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{mentor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Responds {mentor.responseTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map(exp => (
                    <Badge key={exp} variant="outline">{exp}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge className={mentor.availability === 'Available' ? 'bg-green-600' : 'bg-yellow-600'}>
                    {mentor.availability}
                  </Badge>
                  <span className="text-gray-600">{mentor.sessionsCompleted} sessions</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleRequestMentorship(mentor)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Request Session
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedMentor(mentor)}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </Card>
        )}

        {/* Request Mentorship Dialog */}
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogContent className="max-w-2xl">
            {selectedMentor && (
              <>
                <DialogHeader>
                  <DialogTitle>Request Mentorship Session</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img src={selectedMentor.image} alt={selectedMentor.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="text-gray-900">{selectedMentor.name}</p>
                      <p className="text-gray-600">{selectedMentor.title} at {selectedMentor.company}</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Session Topic *</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Career transition advice, System design review"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message to Mentor *</Label>
                    <Textarea
                      id="message"
                      placeholder="Introduce yourself and explain what you'd like to discuss..."
                      rows={6}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability">Your Availability</Label>
                    <Textarea
                      id="availability"
                      placeholder="e.g., Weekday evenings after 6pm PST, or weekends"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsRequestDialogOpen(false)}
                    >
                      Send Request
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsRequestDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Mentor Profile Dialog */}
        <Dialog open={!!selectedMentor && !isRequestDialogOpen} onOpenChange={() => setSelectedMentor(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedMentor && (
              <>
                <DialogHeader>
                  <div className="flex items-start gap-4">
                    <img src={selectedMentor.image} alt={selectedMentor.name} className="w-20 h-20 rounded-full" />
                    <div className="flex-1">
                      <DialogTitle>{selectedMentor.name}</DialogTitle>
                      <p className="text-gray-600">{selectedMentor.title}</p>
                      <p className="text-gray-500">{selectedMentor.company}</p>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-700">{selectedMentor.rating} ({selectedMentor.reviews} reviews)</span>
                    </div>
                    <Badge className={selectedMentor.availability === 'Available' ? 'bg-green-600' : 'bg-yellow-600'}>
                      {selectedMentor.availability}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-2">About</h3>
                    <p className="text-gray-700">{selectedMentor.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.expertise.map(exp => (
                        <Badge key={exp} variant="outline">{exp}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-5 h-5" />
                      <span>{selectedMentor.experience} of experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedMentor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>Responds {selectedMentor.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                      <span>{selectedMentor.sessionsCompleted} sessions completed</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setIsRequestDialogOpen(true);
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Request Mentorship Session
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
