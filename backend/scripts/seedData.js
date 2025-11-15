import { v4 as uuidv4 } from 'uuid';
import { TABLES, putItem } from '../services/dynamodb.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON data files
const successStoriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/success_stories.json'), 'utf-8')
);
const mentorsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/mentors.json'), 'utf-8')
);
const networkingData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/networking.json'), 'utf-8')
);

// Transform success stories from JSON to DynamoDB schema
const sampleSuccessStories = successStoriesData.map(story => ({
  storyId: uuidv4(),
  name: story.name,
  category: 'TECHNOLOGY',
  subcategory: story.title.split(' ')[0], // Extract role type
  imageUrl: story.image_url,
  location: 'Tech Industry',
  story: story.story,
  currentRole: story.title,
  company: story.title.split(' at ')[1] || 'Tech Company',
  journeyDuration: story.journey_duration,
  achievements: [],
  tags: ['tech', 'career-transition', 'inspiring']
}));

// Transform mentors from JSON to DynamoDB schema
const sampleMentors = mentorsData.map(mentor => ({
  mentorId: uuidv4(),
  name: mentor.name,
  category: 'TECHNOLOGY',
  subcategories: mentor.areas_of_expertise,
  bio: mentor.about,
  imageUrl: mentor.image_url,
  location: 'Tech Industry',
  availability: 'https://calendly.com/mentor',
  meetingLink: 'https://zoom.us/j/mentor',
  expertise: mentor.areas_of_expertise,
  yearsExperience: parseInt(mentor.experience_years) || 10,
  rating: mentor.rating,
  totalSessions: Math.floor(Math.random() * 200) + 50,
  role: mentor.role,
  mentorshipApproach: mentor.mentorship_approach
}));

const sampleCourses = [
  {
    courseId: uuidv4(),
    title: 'Music Production Fundamentals',
    description: 'Learn the basics of music production using industry-standard DAWs.',
    category: 'MUSIC',
    subcategory: 'Producer',
    modules: [
      {
        moduleId: '1',
        title: 'Introduction to DAWs',
        lessons: [
          {
            lessonId: '1-1',
            title: 'Getting Started with FL Studio',
            duration: 30,
            videoUrl: 'https://example.com/video1',
            content: 'Learn the basics of FL Studio interface and workflow.'
          },
          {
            lessonId: '1-2',
            title: 'Understanding MIDI',
            duration: 25,
            videoUrl: 'https://example.com/video2',
            content: 'Understand MIDI and how to use it in production.'
          }
        ]
      },
      {
        moduleId: '2',
        title: 'Beat Making Basics',
        lessons: [
          {
            lessonId: '2-1',
            title: 'Drum Programming',
            duration: 35,
            videoUrl: 'https://example.com/video3',
            content: 'Learn how to program drums for different genres.'
          },
          {
            lessonId: '2-2',
            title: 'Melody Creation',
            duration: 40,
            videoUrl: 'https://example.com/video4',
            content: 'Create catchy melodies using scales and music theory.'
          }
        ]
      }
    ],
    totalLessons: 4,
    estimatedHours: 2,
    difficulty: 'Beginner',
    createdAt: new Date().toISOString()
  },
  {
    courseId: uuidv4(),
    title: 'Directing for Film and TV',
    description: 'Master the fundamentals of directing for screen.',
    category: 'FILM & TELEVISION',
    subcategory: 'Directing',
    modules: [
      {
        moduleId: '1',
        title: 'Directing Fundamentals',
        lessons: [
          {
            lessonId: '1-1',
            title: 'Vision and Storytelling',
            duration: 45,
            videoUrl: 'https://example.com/video5',
            content: 'Develop your directorial vision and storytelling approach.'
          },
          {
            lessonId: '1-2',
            title: 'Working with Actors',
            duration: 50,
            videoUrl: 'https://example.com/video6',
            content: 'Learn how to communicate with and direct actors effectively.'
          }
        ]
      }
    ],
    totalLessons: 2,
    estimatedHours: 1.5,
    difficulty: 'Beginner',
    createdAt: new Date().toISOString()
  },
  {
    courseId: uuidv4(),
    title: '2D Animation Essentials',
    description: 'Create stunning 2D animations from scratch.',
    category: 'ANIMATION & VISUAL EFFECTS',
    subcategory: 'Animator',
    modules: [
      {
        moduleId: '1',
        title: 'Animation Principles',
        lessons: [
          {
            lessonId: '1-1',
            title: 'The 12 Principles of Animation',
            duration: 40,
            videoUrl: 'https://example.com/video7',
            content: 'Master the fundamental principles of animation.'
          },
          {
            lessonId: '1-2',
            title: 'Timing and Spacing',
            duration: 35,
            videoUrl: 'https://example.com/video8',
            content: 'Learn how timing and spacing bring animations to life.'
          }
        ]
      }
    ],
    totalLessons: 2,
    estimatedHours: 1.25,
    difficulty: 'Beginner',
    createdAt: new Date().toISOString()
  }
];

async function seedDatabase() {
  console.log('🌱 Seeding database with sample data...\n');

  try {
    // Seed Success Stories
    console.log('📚 Adding success stories...');
    for (const story of sampleSuccessStories) {
      await putItem(TABLES.SUCCESS_STORIES, story);
      console.log(`✓ Added story: ${story.name}`);
    }

    // Seed Mentors
    console.log('\n👥 Adding mentors...');
    for (const mentor of sampleMentors) {
      await putItem(TABLES.MENTORS, mentor);
      console.log(`✓ Added mentor: ${mentor.name}`);
    }

    // Seed Courses
    console.log('\n📖 Adding courses...');
    for (const course of sampleCourses) {
      await putItem(TABLES.COURSES, course);
      console.log(`✓ Added course: ${course.title}`);
    }

    console.log('\n✨ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

seedDatabase();
