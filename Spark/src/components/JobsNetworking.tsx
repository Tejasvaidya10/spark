import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Search, MapPin, Briefcase, DollarSign, Clock, Building, ExternalLink, Bookmark } from 'lucide-react';
import { UserData } from '../App';

interface JobsNetworkingProps {
  userData: UserData | null;
  onNavigate: (view: any) => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

const jobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'Full-time',
    level: 'Senior',
    salary: '$150k - $200k',
    posted: '2 days ago',
    remote: 'Hybrid',
    category: 'Web Development',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Google',
    description: 'We are looking for a Senior React Developer to join our team and work on cutting-edge web applications that serve millions of users.',
    requirements: ['5+ years of React experience', 'Strong TypeScript skills', 'Experience with large-scale applications', 'System design knowledge'],
    benefits: ['Health insurance', '401k matching', 'Unlimited PTO', 'Stock options'],
    saved: false
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'Amazon',
    location: 'Seattle, WA',
    type: 'Full-time',
    level: 'Mid-Level',
    salary: '$120k - $160k',
    posted: '1 week ago',
    remote: 'Remote',
    category: 'Data Science',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Amazon',
    description: 'Join our data science team to build ML models that power recommendation systems for millions of customers.',
    requirements: ['3+ years in data science', 'Python, SQL expertise', 'ML/AI experience', 'Statistical analysis'],
    benefits: ['Remote work', 'Health benefits', 'Professional development', 'Relocation assistance'],
    saved: true
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Airbnb',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Mid-Level',
    salary: '$110k - $150k',
    posted: '3 days ago',
    remote: 'Hybrid',
    category: 'UX/UI Design',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Airbnb',
    description: 'Design beautiful and intuitive experiences for travelers and hosts around the world.',
    requirements: ['4+ years UX design experience', 'Strong portfolio', 'Figma expertise', 'User research skills'],
    benefits: ['Flexible schedule', 'Travel credits', 'Health insurance', 'Design tools stipend'],
    saved: false
  },
  {
    id: 4,
    title: 'Full Stack Engineer',
    company: 'Microsoft',
    location: 'Redmond, WA',
    type: 'Full-time',
    level: 'Senior',
    salary: '$140k - $190k',
    posted: '5 days ago',
    remote: 'Hybrid',
    category: 'Web Development',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Microsoft',
    description: 'Build and maintain enterprise applications used by thousands of organizations worldwide.',
    requirements: ['5+ years full stack development', 'React and Node.js', 'Azure cloud experience', 'Microservices architecture'],
    benefits: ['Stock options', 'Comprehensive healthcare', 'Learning budget', 'Gym membership'],
    saved: false
  },
  {
    id: 5,
    title: 'Product Manager',
    company: 'Spotify',
    location: 'New York, NY',
    type: 'Full-time',
    level: 'Senior',
    salary: '$130k - $180k',
    posted: '1 day ago',
    remote: 'Remote',
    category: 'Product Management',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Spotify',
    description: 'Lead product strategy for features that impact millions of music lovers worldwide.',
    requirements: ['5+ years PM experience', 'Data-driven decision making', 'Stakeholder management', 'Technical background'],
    benefits: ['Remote work', 'Spotify Premium', 'Generous PTO', 'Professional growth'],
    saved: true
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    type: 'Full-time',
    level: 'Mid-Level',
    salary: '$130k - $170k',
    posted: '4 days ago',
    remote: 'Hybrid',
    category: 'DevOps',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Netflix',
    description: 'Build and maintain infrastructure that serves content to millions of users globally.',
    requirements: ['3+ years DevOps experience', 'Kubernetes and Docker', 'AWS expertise', 'CI/CD pipelines'],
    benefits: ['Unlimited PTO', 'Top-tier salary', 'Netflix subscription', 'Learning budget'],
    saved: false
  },
  {
    id: 7,
    title: 'Frontend Developer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    type: 'Full-time',
    level: 'Junior',
    salary: '$100k - $130k',
    posted: '6 days ago',
    remote: 'On-site',
    category: 'Web Development',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Meta',
    description: 'Join our team building the next generation of social experiences.',
    requirements: ['2+ years frontend experience', 'React proficiency', 'JavaScript/TypeScript', 'Responsive design'],
    benefits: ['Free meals', 'Health benefits', 'Equity compensation', 'Career development'],
    saved: false
  },
  {
    id: 8,
    title: 'Machine Learning Engineer',
    company: 'Apple',
    location: 'Cupertino, CA',
    type: 'Full-time',
    level: 'Senior',
    salary: '$160k - $220k',
    posted: '2 weeks ago',
    remote: 'On-site',
    category: 'Data Science',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Apple',
    description: 'Work on cutting-edge ML models that power Apple products used by billions.',
    requirements: ['5+ years ML experience', 'Deep learning expertise', 'Python and TensorFlow', 'Research background'],
    benefits: ['Employee discounts', 'Stock options', 'World-class facilities', 'Innovation culture'],
    saved: false
  }
];

export function JobsNetworking({ userData, onNavigate, onSignOut, onRetakeSurvey }: JobsNetworkingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([2, 5]);

  const locations = Array.from(new Set(jobs.map(j => j.location)));
  const types = Array.from(new Set(jobs.map(j => j.type)));
  const levels = Array.from(new Set(jobs.map(j => j.level)));

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesLevel = selectedLevel === 'all' || job.level === selectedLevel;
    
    return matchesSearch && matchesLocation && matchesType && matchesLevel;
  });

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <DashboardLayout
      userData={userData}
      currentPage="jobs"
      onNavigate={onNavigate}
      onSignOut={onSignOut}
      onRetakeSurvey={onRetakeSurvey}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Jobs & Networking</h1>
          <p className="text-gray-600">
            Discover opportunities that match your skills and career goals
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search jobs by title, company, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
            {savedJobs.length > 0 && ` • ${savedJobs.length} saved`}
          </p>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedJob(job)}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <img src={job.logo} alt={job.company} className="w-12 h-12 rounded" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{job.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`}
                      />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.posted}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge>{job.level}</Badge>
                    <Badge variant="outline">{job.remote}</Badge>
                    <Badge variant="outline">{job.category}</Badge>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={(e) => e.stopPropagation()}>
                      Apply Now
                    </Button>
                    <Button variant="outline" onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJob(job);
                    }}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </Card>
        )}

        {/* Job Details Dialog */}
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedJob && (
              <>
                <DialogHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img src={selectedJob.logo} alt={selectedJob.company} className="w-12 h-12 rounded" />
                    </div>
                    <div className="flex-1">
                      <DialogTitle>{selectedJob.title}</DialogTitle>
                      <p className="text-gray-600">{selectedJob.company}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaveJob(selectedJob.id)}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${savedJobs.includes(selectedJob.id) ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`}
                      />
                    </Button>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{selectedJob.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Posted {selectedJob.posted}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge>{selectedJob.level}</Badge>
                    <Badge variant="outline">{selectedJob.remote}</Badge>
                    <Badge variant="outline">{selectedJob.category}</Badge>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-2">About the Role</h3>
                    <p className="text-gray-700">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-2">Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline">{benefit}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Company Page
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
