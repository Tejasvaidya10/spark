import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Search, TrendingUp, Award, Clock, Plus } from 'lucide-react';
import { UserData } from '../App';

interface SuccessStoriesProps {
  userData: UserData | null;
  onNavigate: (view: any) => void;
  onSignOut: () => void;
  onRetakeSurvey: () => void;
}

const stories = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'From Bootcamp to Senior Engineer',
    role: 'Senior Software Engineer at Google',
    timeframe: '3 years',
    category: 'Web Development',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    excerpt: 'After completing a 12-week coding bootcamp, I landed my first junior role. With dedication and continuous learning, I progressed to senior engineer in just 3 years.',
    fullStory: 'My journey started with a career change at 28. I was working in retail management but felt unfulfilled. After researching different career paths, I decided to pursue software development. I enrolled in a coding bootcamp and gave it my all. The first few months were incredibly challenging, but the support from my mentors and peers kept me going. After graduation, I applied to over 100 positions and finally got my break at a small startup. I spent every spare moment learning and building projects. Within a year, I moved to a mid-level role at a larger company, and two years later, I achieved my dream of working at Google as a senior engineer.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Data Analyst to ML Engineer',
    role: 'Machine Learning Engineer at Amazon',
    timeframe: '2 years',
    category: 'Data Science',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    excerpt: 'Transitioning from data analysis to machine learning required dedication, but the right mentorship and courses made all the difference.',
    fullStory: 'I started my career as a data analyst, working with SQL and Excel daily. I was curious about machine learning but felt intimidated by the math and programming requirements. Through this platform, I connected with a mentor who guided my learning path. I took courses in Python, statistics, and ML fundamentals. I worked on personal projects during weekends and gradually built a portfolio. After 18 months of consistent effort, I applied for ML engineering roles and received multiple offers. Today, I work on recommendation systems at Amazon, and I couldn\'t be happier with my career trajectory.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Self-Taught to UX Lead',
    role: 'Lead UX Designer at Airbnb',
    timeframe: '4 years',
    category: 'UX/UI Design',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    excerpt: 'With no formal design education, I built my portfolio through freelance projects and online courses, eventually landing my dream role.',
    fullStory: 'I discovered UX design by accident when helping a friend with their startup. I was fascinated by the process of understanding user needs and creating solutions. Without a design degree, I knew I had to work extra hard to break into the field. I spent a year learning through online courses, reading design books, and redesigning popular apps as practice. I started taking small freelance projects on the side while working my day job. Each project taught me something new. After building a strong portfolio, I applied to design roles and eventually got hired as a junior designer. Through continuous learning and mentorship, I grew into leadership roles and now lead a team of talented designers at Airbnb.'
  },
  {
    id: 4,
    name: 'David Park',
    title: 'Junior Dev to Tech Lead',
    role: 'Technical Lead at Microsoft',
    timeframe: '5 years',
    category: 'Web Development',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    excerpt: 'From writing my first line of code to leading a team of engineers, continuous learning and mentorship were key to my success.',
    fullStory: 'I started learning to code in college but didn\'t pursue it professionally at first. After a few years in a different field, I decided to make the switch to software engineering. I started as a junior developer at a small company, often feeling overwhelmed by the complexity of production systems. I sought out mentors who helped me understand not just coding, but system design, team collaboration, and leadership. I focused on mastering fundamentals and took on challenging projects that pushed me out of my comfort zone. Five years later, I\'m now a technical lead at Microsoft, mentoring others who were once in my shoes.'
  },
  {
    id: 5,
    name: 'Jennifer Williams',
    title: 'Career Pivot to Product Manager',
    role: 'Senior Product Manager at Spotify',
    timeframe: '3 years',
    category: 'Product Management',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    excerpt: 'Leveraging my background in marketing and learning product management fundamentals helped me transition into tech product roles.',
    fullStory: 'I worked in marketing for 7 years before discovering product management. I realized I loved understanding customer problems and working with cross-functional teams to build solutions. I started by taking PM courses and reading extensively about the role. I also started contributing to product discussions at my company and eventually moved into an associate PM role internally. The transition wasn\'t easy—I had to learn about technical concepts, data analysis, and stakeholder management. But with the support of great mentors and a willingness to learn, I progressed quickly. Now at Spotify, I lead product strategy for a major feature used by millions of users.'
  },
  {
    id: 6,
    name: 'Alex Thompson',
    title: 'From QA to DevOps Engineer',
    role: 'DevOps Engineer at Netflix',
    timeframe: '2.5 years',
    category: 'DevOps',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    excerpt: 'Starting in QA gave me a unique perspective on software quality, which I leveraged to transition into DevOps and infrastructure.',
    fullStory: 'I began my tech career as a QA engineer, testing software and writing automated tests. While I enjoyed ensuring quality, I became increasingly interested in the deployment and infrastructure side of things. I started learning about CI/CD pipelines, Docker, and Kubernetes in my spare time. I volunteered to help with deployment tasks at my company and gradually took on more DevOps responsibilities. After completing several cloud certifications and building a strong understanding of infrastructure as code, I successfully transitioned to a full DevOps role. Today at Netflix, I work on building and maintaining the infrastructure that serves millions of users worldwide.'
  }
];

export function SuccessStories({ userData, onNavigate, onSignOut, onRetakeSurvey }: SuccessStoriesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  const filteredStories = stories.filter(story =>
    story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      userData={userData}
      currentPage="success-stories"
      onNavigate={onNavigate}
      onSignOut={onSignOut}
      onRetakeSurvey={onRetakeSurvey}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Success Stories</h1>
          <p className="text-gray-600">
            Get inspired by real career transformation stories from our community
          </p>
        </div>

        {/* Search and Submit */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search stories by name, title, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Submit Your Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Share Your Success Story</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="story-title">Story Title *</Label>
                  <Input id="story-title" placeholder="e.g., From Bootcamp to Senior Engineer" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="current-role">Current Role *</Label>
                  <Input id="current-role" placeholder="e.g., Senior Software Engineer at Google" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="timeframe">Timeframe *</Label>
                  <Input id="timeframe" placeholder="e.g., 3 years" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input id="category" placeholder="e.g., Web Development" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="story-content">Your Story *</Label>
                  <Textarea
                    id="story-content"
                    placeholder="Share your journey, challenges, and key learnings..."
                    rows={8}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setIsSubmitDialogOpen(false)}>
                    Submit Story
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setIsSubmitDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full" />
                  <div className="flex-1">
                    <h3 className="text-gray-900">{story.name}</h3>
                    <p className="text-gray-600">{story.role}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-gray-900 mb-2">{story.title}</h4>
                  <p className="text-gray-600">{story.excerpt}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{story.timeframe}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {story.category}
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedStory(story)}
                >
                  Read Full Story
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Full Story Dialog */}
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedStory && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={selectedStory.image} alt={selectedStory.name} className="w-16 h-16 rounded-full" />
                    <div>
                      <DialogTitle>{selectedStory.title}</DialogTitle>
                      <p className="text-gray-600">{selectedStory.name}</p>
                      <p className="text-gray-500">{selectedStory.role}</p>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{selectedStory.timeframe}</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {selectedStory.category}
                    </span>
                  </div>

                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedStory.fullStory}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-gray-900 mb-1">Key Takeaway</p>
                        <p className="text-gray-600">
                          {selectedStory.excerpt}
                        </p>
                      </div>
                    </div>
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
