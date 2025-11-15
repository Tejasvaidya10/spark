import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface SurveyData {
  careerPathway: string;
  creativeWork: string[];
  creativeIdeasImportance: string;
  careerFactors: string;
  projectApproach: string;
  teamworkPreference: string;
  challengeResponse: string;
  leadershipPreference: string;
  enjoyedActivities: string[];
  creativeFrequency: string;
  creativeMotivation: string;
  workEnvironment: string;
  careerGrowthImportance: string;
  stabilityVsRisk: string;
  fiveYearVision: string;
}

interface SurveyStepsProps {
  surveyData: SurveyData;
  setSurveyData: (data: any) => void;
  toggleCreativeWork: (work: string) => void;
  toggleActivity: (activity: string) => void;
}

// Step 2: Career Pathway and Role Preferences
export function CareerPathwayStep({ surveyData, setSurveyData, toggleCreativeWork }: SurveyStepsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Career Pathway & Role Preferences</h2>
        <p className="text-gray-600">Help us understand your career aspirations</p>
      </div>

      <div>
        <Label htmlFor="careerPathway">Which career pathway are you most interested in exploring? *</Label>
        <select 
          id="careerPathway"
          value={surveyData.careerPathway}
          onChange={(e) => setSurveyData({...surveyData, careerPathway: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a pathway</option>
          <option value="business-management">Business & Management</option>
          <option value="animation-vfx">Animation & Visual Effects</option>
          <option value="writing-journalism">Writing & Journalism</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="film-television">Film & Television</option>
        </select>
      </div>

      <div>
        <Label>What kind of creative work excites you the most?</Label>
        <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
        <div className="space-y-2">
          {[
            "Designing and creating content",
            "Performing and being on stage",
            "Writing stories, scripts, or articles",
            "Producing and managing projects or events",
            "Technical work behind the scenes (e.g., editing, sound design)"
          ].map((work) => (
            <div 
              key={work}
              onClick={() => toggleCreativeWork(work)}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                surveyData.creativeWork.includes(work)
                  ? "border-[#667EEA] bg-[#667EEA]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Checkbox 
                checked={surveyData.creativeWork.includes(work)}
                onCheckedChange={() => toggleCreativeWork(work)}
              />
              <span className="text-sm">{work}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="creativeIdeasImportance">How important is it for you to work in an industry where your creative ideas are valued? *</Label>
        <select 
          id="creativeIdeasImportance"
          value={surveyData.creativeIdeasImportance}
          onChange={(e) => setSurveyData({...surveyData, creativeIdeasImportance: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select an option</option>
          <option value="very-important">Very important – I want my ideas to shape the work I do.</option>
          <option value="somewhat-important">Somewhat important – I prefer to have some input, but I'm open to following directions.</option>
          <option value="neutral">Neutral – It doesn't matter much to me as long as the work is interesting.</option>
          <option value="not-important">Not important – I prefer to work in a more structured or supportive role.</option>
        </select>
      </div>

      <div>
        <Label htmlFor="careerFactors">When considering a career, which of these factors is most important to you? *</Label>
        <select 
          id="careerFactors"
          value={surveyData.careerFactors}
          onChange={(e) => setSurveyData({...surveyData, careerFactors: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a factor</option>
          <option value="creative-expression">Creative expression and artistic freedom</option>
          <option value="stability-compensation">Job stability and financial compensation</option>
          <option value="growth-learning">Opportunities for growth and learning</option>
          <option value="positive-impact">Making a positive impact on others or society</option>
          <option value="flexibility">Flexibility in working hours and environment</option>
        </select>
      </div>
    </div>
  );
}

// Step 3: Behavioral Preferences and Work Style
export function BehavioralPreferencesStep({ surveyData, setSurveyData }: SurveyStepsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Your Work Style & Behavioral Preferences</h2>
        <p className="text-gray-600">Help us understand how you work best</p>
      </div>

      <div>
        <Label htmlFor="projectApproach">How do you typically approach a new project or task? *</Label>
        <select 
          id="projectApproach"
          value={surveyData.projectApproach}
          onChange={(e) => setSurveyData({...surveyData, projectApproach: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select your approach</option>
          <option value="plan-organize">I prefer to plan and organize everything before I begin.</option>
          <option value="dive-in">I dive right into the task and adjust along the way.</option>
          <option value="brainstorm-first">I like to brainstorm ideas first and then get started.</option>
          <option value="need-instructions">I prefer to get detailed instructions before starting.</option>
        </select>
      </div>

      <div>
        <Label htmlFor="teamworkPreference">How do you feel about working in teams? *</Label>
        <select 
          id="teamworkPreference"
          value={surveyData.teamworkPreference}
          onChange={(e) => setSurveyData({...surveyData, teamworkPreference: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select your preference</option>
          <option value="love-teams">I love working in teams and collaborating with others.</option>
          <option value="enjoy-but-independent">I enjoy teamwork but prefer to work independently when possible.</option>
          <option value="okay-prefer-alone">I'm okay with teamwork, but I prefer to work alone.</option>
          <option value="prefer-alone">I prefer to work alone and avoid team-based tasks.</option>
        </select>
      </div>

      <div>
        <Label htmlFor="challengeResponse">When facing a challenge, what's your usual response? *</Label>
        <select 
          id="challengeResponse"
          value={surveyData.challengeResponse}
          onChange={(e) => setSurveyData({...surveyData, challengeResponse: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select your response</option>
          <option value="stay-focused">I stay focused and try to find a solution on my own.</option>
          <option value="ask-help">I ask for help or feedback from others.</option>
          <option value="take-break">I take a break and come back to it later.</option>
          <option value="need-time">I get frustrated and may need time to think things through.</option>
        </select>
      </div>

      <div>
        <Label htmlFor="leadershipPreference">How do you feel about taking on leadership or responsibility in a creative project? *</Label>
        <select 
          id="leadershipPreference"
          value={surveyData.leadershipPreference}
          onChange={(e) => setSurveyData({...surveyData, leadershipPreference: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select your preference</option>
          <option value="enjoy-leading">I enjoy leading and organizing the project.</option>
          <option value="comfortable-if-needed">I'm comfortable with leadership if needed.</option>
          <option value="prefer-contribute">I prefer to contribute as a team member, not lead.</option>
          <option value="prefer-no-leadership">I prefer not to have leadership responsibilities.</option>
        </select>
      </div>
    </div>
  );
}

// Step 4: Creativity and Interests
export function CreativityInterestsStep({ surveyData, setSurveyData, toggleActivity }: SurveyStepsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Creativity & Interests</h2>
        <p className="text-gray-600">Tell us about your creative pursuits</p>
      </div>

      <div>
        <Label>Which of these activities do you enjoy the most?</Label>
        <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Writing and storytelling",
            "Drawing, painting, or creating visual designs",
            "Performing or acting",
            "Creating and producing music",
            "Organizing events or managing projects",
            "Editing and working with multimedia (video, audio, images)"
          ].map((activity) => (
            <div 
              key={activity}
              onClick={() => toggleActivity(activity)}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                surveyData.enjoyedActivities.includes(activity)
                  ? "border-[#8BA888] bg-[#8BA888]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Checkbox 
                checked={surveyData.enjoyedActivities.includes(activity)}
                onCheckedChange={() => toggleActivity(activity)}
              />
              <span className="text-sm">{activity}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="creativeFrequency">How often do you engage in creative activities? *</Label>
        <select 
          id="creativeFrequency"
          value={surveyData.creativeFrequency}
          onChange={(e) => setSurveyData({...surveyData, creativeFrequency: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select frequency</option>
          <option value="every-day">Every day</option>
          <option value="few-times-week">A few times a week</option>
          <option value="once-week">Once a week</option>
          <option value="few-times-month">A few times a month</option>
          <option value="rarely">Rarely or never</option>
        </select>
      </div>

      <div>
        <Label htmlFor="creativeMotivation">What motivates you most in your creative work? *</Label>
        <select 
          id="creativeMotivation"
          value={surveyData.creativeMotivation}
          onChange={(e) => setSurveyData({...surveyData, creativeMotivation: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select your motivation</option>
          <option value="express-myself">The freedom to express myself and be original</option>
          <option value="collaborate">The opportunity to collaborate with others</option>
          <option value="entertain-inspire">The ability to entertain or inspire others</option>
          <option value="solve-problems">The challenge of solving creative problems</option>
          <option value="recognition">Getting recognition and praise for my work</option>
        </select>
      </div>

      <div>
        <Label htmlFor="workEnvironment">Which type of creative environment would you prefer to work in? *</Label>
        <select 
          id="workEnvironment"
          value={surveyData.workEnvironment}
          onChange={(e) => setSurveyData({...surveyData, workEnvironment: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select your preferred environment</option>
          <option value="fast-paced">A fast-paced, high-energy environment (e.g., live events, on-set filming)</option>
          <option value="quiet-focused">A quiet, focused space (e.g., writing, designing)</option>
          <option value="collaborative">A collaborative, team-based setting (e.g., group projects, production teams)</option>
          <option value="flexible">A flexible environment where I can work independently and manage my own schedule</option>
        </select>
      </div>
    </div>
  );
}

// Step 5: Career Expectations and Growth
export function CareerExpectationsStep({ surveyData, setSurveyData }: SurveyStepsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Career Expectations & Growth</h2>
        <p className="text-gray-600">Tell us about your career aspirations</p>
      </div>

      <div>
        <Label htmlFor="careerGrowthImportance">How important is career growth and learning new skills to you in your ideal job? *</Label>
        <select 
          id="careerGrowthImportance"
          value={surveyData.careerGrowthImportance}
          onChange={(e) => setSurveyData({...surveyData, careerGrowthImportance: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select importance level</option>
          <option value="very-important">Very important, I want to constantly improve and learn.</option>
          <option value="somewhat-important">Somewhat important, I like opportunities to grow but it's not my top priority.</option>
          <option value="neutral">Neutral, I am okay with staying at a steady level in my career.</option>
          <option value="not-important">Not very important, I'm more focused on other aspects of the job.</option>
        </select>
      </div>

      <div>
        <Label htmlFor="stabilityVsRisk">How do you feel about job stability versus taking creative risks? *</Label>
        <select 
          id="stabilityVsRisk"
          value={surveyData.stabilityVsRisk}
          onChange={(e) => setSurveyData({...surveyData, stabilityVsRisk: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select your preference</option>
          <option value="prefer-stability">I prefer job stability and a secure income.</option>
          <option value="open-to-risks">I'm open to taking some risks, but stability is important.</option>
          <option value="willing-take-risks">I'm willing to take risks and pursue new opportunities, even if they're uncertain.</option>
          <option value="thrive-on-risks">I thrive on taking risks and exploring new, unpredictable paths.</option>
        </select>
      </div>

      <div>
        <Label htmlFor="fiveYearVision">Where do you see yourself in 5 years? *</Label>
        <select 
          id="fiveYearVision"
          value={surveyData.fiveYearVision}
          onChange={(e) => setSurveyData({...surveyData, fiveYearVision: e.target.value})}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select your vision</option>
          <option value="leading-team">Leading a team or company in the entertainment industry</option>
          <option value="professional">Working as a professional in my field (e.g., music producer, director, designer)</option>
          <option value="collaborating">Collaborating with others on creative projects</option>
          <option value="building-portfolio">Gaining experience and building a portfolio for future opportunities</option>
        </select>
      </div>
    </div>
  );
}
