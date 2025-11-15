import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1'
});

const MODEL_ID = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0';

/**
 * Invoke Claude via AWS Bedrock
 */
export const invokeClaude = async (prompt, systemPrompt = '', maxTokens = 2000) => {
  try {
    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: maxTokens,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      ...(systemPrompt && { system: systemPrompt })
    };

    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload)
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    return responseBody.content[0].text;
  } catch (error) {
    console.error('Bedrock invocation error:', error);
    throw new Error('Failed to get LLM response');
  }
};

/**
 * Career Assessment System Prompt
 */
export const CAREER_ASSESSMENT_SYSTEM_PROMPT = `You are a friendly career counselor chatbot helping young people discover their career path in the entertainment industry.

Your goal is to ask 5-7 conversational questions to determine which category fits best:
- BUSINESS & MANAGEMENT
- ANIMATION & VISUAL EFFECTS
- WRITING & JOURNALISM
- MUSIC
- SPORTS
- FILM & TELEVISION

Guidelines:
1. Ask ONE question at a time
2. Be warm, encouraging, and conversational
3. Build on their previous answers
4. Ask about interests, strengths, what excites them
5. After 5-7 questions, recommend a category and explain why
6. Keep responses concise (2-3 sentences max)

When ready to recommend, format your response as:
RECOMMENDATION: [CATEGORY]
REASON: [1-2 sentence explanation]`;

/**
 * Analyze career assessment conversation
 */
export const analyzeCareerAssessment = async (conversationHistory) => {
  const prompt = `Based on this conversation, determine the best career category:

${conversationHistory.map(msg => `${msg.role}: ${msg.message}`).join('\n')}

Analyze the user's interests and recommend ONE category from:
- BUSINESS & MANAGEMENT
- ANIMATION & VISUAL EFFECTS
- WRITING & JOURNALISM
- MUSIC
- SPORTS
- FILM & TELEVISION

Respond in this exact format:
CATEGORY: [category name]
CONFIDENCE: [0-100]
REASONING: [brief explanation]`;

  const response = await invokeClaude(prompt);

  // Parse response
  const categoryMatch = response.match(/CATEGORY:\s*(.+)/i);
  const confidenceMatch = response.match(/CONFIDENCE:\s*(\d+)/i);
  const reasoningMatch = response.match(/REASONING:\s*(.+)/is);

  return {
    category: categoryMatch ? categoryMatch[1].trim() : null,
    confidence: confidenceMatch ? parseInt(confidenceMatch[1]) : 0,
    reasoning: reasoningMatch ? reasoningMatch[1].trim() : ''
  };
};

/**
 * Get subcategory recommendations
 */
export const getSubcategoryRecommendations = async (category, userResponses) => {
  const subcategories = {
    'BUSINESS & MANAGEMENT': [
      'Talent Management', 'Talent Agency', 'Production Management',
      'Event Management', 'Marketing & PR', 'Business Development',
      'Legal', 'Accounting/Finance', 'Casting', 'Administrative Support'
    ],
    'ANIMATION & VISUAL EFFECTS': [
      'Animator', 'Graphic Design Artist'
    ],
    'WRITING & JOURNALISM': [
      'Entertainment Journalist', 'Publicist', 'Content Creator'
    ],
    'MUSIC': [
      'Musician/Singer', 'Producer', 'Songwriter', 'Audio Engineer'
    ],
    'SPORTS': [
      'Broadcasting', 'Game Day Operations', 'Events Coordinator',
      'Sound Engineer', 'Advertising', 'Marketing', 'Digital Design',
      'Merchandising', 'Content Production', 'Talent Recruitment'
    ],
    'FILM & TELEVISION': [
      'Acting', 'Directing', 'Writing', 'Casting', 'Cinematography',
      'Editing', 'Sound Design', 'Sound Engineer', 'Costume Design',
      'Set Design/Engineer', 'Equipment Operations', 'Makeup Artists'
    ]
  };

  const availableSubcategories = subcategories[category] || [];

  const prompt = `The user is interested in ${category}. Based on their responses:
${userResponses}

From these subcategories, recommend the top 3-5 that best match their interests:
${availableSubcategories.join(', ')}

Format: Return ONLY a comma-separated list of subcategories, no explanation.`;

  const response = await invokeClaude(prompt, '', 500);

  return response.split(',').map(s => s.trim()).filter(s => availableSubcategories.includes(s));
};

/**
 * Generate career pathway
 */
export const generateCareerPathway = async (category, subcategory, userProfile) => {
  const prompt = `Create a 5-step career pathway for someone interested in:
Category: ${category}
Subcategory: ${subcategory}
Location: ${userProfile.location || 'Unknown'}

Each step should include:
- Title
- Description (1 sentence)
- Estimated time
- Key resources/actions

Format as JSON array of steps.`;

  const response = await invokeClaude(prompt, '', 1500);

  try {
    // Try to parse JSON, fallback to text parsing
    return JSON.parse(response);
  } catch {
    return null;
  }
};

/**
 * Match success stories to user profile
 */
export const rankSuccessStories = async (stories, userProfile) => {
  const prompt = `Rank these success stories by relevance for a user with:
- Category: ${userProfile.category}
- Location: ${userProfile.location}
- Race: ${userProfile.race}
- Ethnicity: ${userProfile.ethnicity}

Stories:
${stories.map((s, i) => `${i + 1}. ${s.name} - ${s.category} - ${s.location}`).join('\n')}

Return ONLY comma-separated story numbers in order of relevance (e.g., "3,1,5,2,4").`;

  const response = await invokeClaude(prompt, '', 300);
  const indices = response.match(/\d+/g)?.map(n => parseInt(n) - 1) || [];

  return indices.map(i => stories[i]).filter(Boolean);
};

/**
 * Wellness check conversation
 */
export const WELLNESS_CHECK_SYSTEM_PROMPT = `You are a supportive career counselor conducting a wellness check.

Ask the user:
1. How they're feeling about their course
2. If the career path still feels right
3. Any challenges they're facing

Based on their responses, determine:
- HAPPY_WITH_PATH: Continue current course
- UNHAPPY_WITH_COURSE: Suggest meeting with mentor, offer alternative subcategories
- UNHAPPY_WITH_CATEGORY: Suggest meeting with career advisor for reassessment

Be empathetic and encouraging.`;

export const analyzeWellnessCheck = async (userResponses) => {
  const prompt = `Analyze this wellness check conversation:

${userResponses}

Determine the outcome:
- HAPPY_WITH_PATH
- UNHAPPY_WITH_COURSE
- UNHAPPY_WITH_CATEGORY

Format:
OUTCOME: [outcome]
REASONING: [brief explanation]
RECOMMENDATION: [specific next steps]`;

  const response = await invokeClaude(prompt);

  const outcomeMatch = response.match(/OUTCOME:\s*(.+)/i);
  const reasoningMatch = response.match(/REASONING:\s*(.+)/i);
  const recommendationMatch = response.match(/RECOMMENDATION:\s*(.+)/is);

  return {
    outcome: outcomeMatch ? outcomeMatch[1].trim() : 'HAPPY_WITH_PATH',
    reasoning: reasoningMatch ? reasoningMatch[1].trim() : '',
    recommendation: recommendationMatch ? recommendationMatch[1].trim() : ''
  };
};

/**
 * Match success stories from JSON data based on user profile
 */
export const matchSuccessStories = async (userProfile, conversationHistory = '') => {
  try {
    // Load success stories from JSON
    const storiesPath = path.join(__dirname, '../data/success_stories.json');
    const storiesData = JSON.parse(fs.readFileSync(storiesPath, 'utf-8'));

    // Create prompt for Claude to analyze and match
    const prompt = `You are helping match a user with inspiring success stories that relate to their career journey.

User Profile:
- Interests/Goals: ${conversationHistory || userProfile.category || 'Technology career'}
- Demographics: Age ${userProfile.age || 'N/A'}, Gender: ${userProfile.gender || 'N/A'}, Location: ${userProfile.location || 'N/A'}

Available Success Stories:
${storiesData.map((story, i) => `
${i + 1}. ${story.name} - ${story.title}
   Journey: ${story.journey_duration}
   Story: ${story.story}
`).join('\n')}

Task: Analyze which success stories would be most inspiring and relevant for this user. Consider:
1. Similar career path or interests
2. Relatable journey duration
3. Inspiring story that matches user's goals
4. Diversity of backgrounds

Return the top 3-5 success stories in this exact format:
MATCHES: [comma-separated story numbers, e.g., "2,4,1,3"]
REASONING: [Brief explanation of why these stories match the user]`;

    const response = await invokeClaude(prompt, '', 1500);

    // Parse response
    const matchesLine = response.match(/MATCHES:\s*(.+)/i);
    const reasoningLine = response.match(/REASONING:\s*(.+)/is);

    if (!matchesLine) {
      // Fallback: return first 3 stories
      return {
        stories: storiesData.slice(0, 3),
        reasoning: 'Default selection based on available data'
      };
    }

    // Extract indices and map to stories
    const indices = matchesLine[1]
      .match(/\d+/g)
      ?.map(n => parseInt(n) - 1)
      .filter(i => i >= 0 && i < storiesData.length) || [];

    const matchedStories = indices.map(i => storiesData[i]).filter(Boolean);

    return {
      stories: matchedStories.length > 0 ? matchedStories : storiesData.slice(0, 3),
      reasoning: reasoningLine ? reasoningLine[1].trim() : 'Matched based on career interests'
    };
  } catch (error) {
    console.error('Error matching success stories:', error);
    return {
      stories: [],
      reasoning: 'Unable to match success stories at this time'
    };
  }
};

/**
 * Recommend mentors from JSON data based on user profile and career category
 */
export const recommendMentors = async (userProfile, careerCategory, userGoals = '') => {
  try {
    // Load mentors from JSON
    const mentorsPath = path.join(__dirname, '../data/mentors.json');
    const mentorsData = JSON.parse(fs.readFileSync(mentorsPath, 'utf-8'));

    // Create prompt for Claude to analyze and recommend
    const prompt = `You are helping match a user with career mentors who can guide their professional development.

User Profile:
- Career Category: ${careerCategory || userProfile.category || 'Technology'}
- Career Goals: ${userGoals || 'Career growth and skill development'}
- Demographics: Age ${userProfile.age || 'N/A'}, Location: ${userProfile.location || 'N/A'}

Available Mentors:
${mentorsData.map((mentor, i) => `
${i + 1}. ${mentor.name} - ${mentor.role}
   Rating: ${mentor.rating}/5.0 | Experience: ${mentor.experience_years} years
   Expertise: ${mentor.areas_of_expertise.join(', ')}
   About: ${mentor.about}
   Approach: ${mentor.mentorship_approach.join(', ')}
`).join('\n')}

Task: Recommend the top 3-5 mentors who would be most helpful for this user. Consider:
1. Relevant expertise matching career category
2. Mentorship approach that suits career goals
3. High ratings and experience
4. Diversity of perspectives

Return your recommendations in this exact format:
MENTORS: [comma-separated mentor numbers, e.g., "1,5,3,2"]
REASONING: [Brief explanation of why these mentors are recommended]`;

    const response = await invokeClaude(prompt, '', 2000);

    // Parse response
    const mentorsLine = response.match(/MENTORS:\s*(.+)/i);
    const reasoningLine = response.match(/REASONING:\s*(.+)/is);

    if (!mentorsLine) {
      // Fallback: return top 3 highest rated mentors
      const sorted = [...mentorsData].sort((a, b) => b.rating - a.rating);
      return {
        mentors: sorted.slice(0, 3),
        reasoning: 'Top-rated mentors based on available data'
      };
    }

    // Extract indices and map to mentors
    const indices = mentorsLine[1]
      .match(/\d+/g)
      ?.map(n => parseInt(n) - 1)
      .filter(i => i >= 0 && i < mentorsData.length) || [];

    const recommendedMentors = indices.map(i => mentorsData[i]).filter(Boolean);

    return {
      mentors: recommendedMentors.length > 0 ? recommendedMentors : mentorsData.slice(0, 3),
      reasoning: reasoningLine ? reasoningLine[1].trim() : 'Recommended based on expertise and ratings'
    };
  } catch (error) {
    console.error('Error recommending mentors:', error);
    return {
      mentors: [],
      reasoning: 'Unable to recommend mentors at this time'
    };
  }
};

/**
 * Suggest networking connections from JSON data based on user profile and skills
 */
export const suggestNetworkingConnections = async (userProfile, userSkills = [], userInterests = '') => {
  try {
    // Load networking connections from JSON
    const networkingPath = path.join(__dirname, '../data/networking.json');
    const networkingData = JSON.parse(fs.readFileSync(networkingPath, 'utf-8'));

    // Create prompt for Claude to analyze and suggest
    const prompt = `You are helping match a user with networking connections who can expand their professional network.

User Profile:
- Career Interests: ${userInterests || userProfile.category || 'Technology'}
- Skills: ${userSkills.length > 0 ? userSkills.join(', ') : 'General tech skills'}
- Location: ${userProfile.location || 'N/A'}
- Demographics: Age ${userProfile.age || 'N/A'}, Gender: ${userProfile.gender || 'N/A'}

Available Networking Connections:
${networkingData.map((conn, i) => `
${i + 1}. ${conn.name} - ${conn.role} at ${conn.company}
   Location: ${conn.location}
   Skills: ${conn.skills.join(', ')}
   Mutual Connections: ${conn.mutual_connections}
   Match: ${conn.match_percent}%
`).join('\n')}

Task: Suggest the top 5-8 networking connections that would be most valuable for this user. Consider:
1. Similar skills and interests
2. Relevant roles and companies
3. Location proximity (if relevant)
4. High match percentage
5. Good mutual connections
6. Diversity of companies and roles

Return your suggestions in this exact format:
CONNECTIONS: [comma-separated connection numbers, e.g., "1,5,3,11,7,2"]
REASONING: [Brief explanation of why these connections are valuable]`;

    const response = await invokeClaude(prompt, '', 2000);

    // Parse response
    const connectionsLine = response.match(/CONNECTIONS:\s*(.+)/i);
    const reasoningLine = response.match(/REASONING:\s*(.+)/is);

    if (!connectionsLine) {
      // Fallback: return top connections by match_percent
      const sorted = [...networkingData].sort((a, b) => b.match_percent - a.match_percent);
      return {
        connections: sorted.slice(0, 5),
        reasoning: 'Top matches based on match percentage'
      };
    }

    // Extract indices and map to connections
    const indices = connectionsLine[1]
      .match(/\d+/g)
      ?.map(n => parseInt(n) - 1)
      .filter(i => i >= 0 && i < networkingData.length) || [];

    const suggestedConnections = indices.map(i => networkingData[i]).filter(Boolean);

    return {
      connections: suggestedConnections.length > 0 ? suggestedConnections : networkingData.slice(0, 5),
      reasoning: reasoningLine ? reasoningLine[1].trim() : 'Suggested based on skills and interests'
    };
  } catch (error) {
    console.error('Error suggesting networking connections:', error);
    return {
      connections: [],
      reasoning: 'Unable to suggest connections at this time'
    };
  }
};

export default { invokeClaude };
