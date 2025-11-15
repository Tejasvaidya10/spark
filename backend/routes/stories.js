import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { TABLES, scanItems, getItem } from '../services/dynamodb.js';
import { matchSuccessStories } from '../services/bedrock.js';

const router = express.Router();

/**
 * GET /api/stories/matched
 * Get success stories matched to user profile using LLM
 */
router.get('/matched', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user profile
    const user = await getItem(TABLES.USERS, { userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Build user profile for LLM matching
    const userProfile = {
      category: user.category,
      subcategories: user.subcategories,
      location: user.location,
      age: user.demographics?.age,
      gender: user.demographics?.gender,
      race: user.race,
      ethnicity: user.ethnicity
    };

    // Get conversation history if available for better matching
    const conversationHistory = user.assessmentHistory
      ? user.assessmentHistory.map(msg => msg.message).join(' ')
      : '';

    // Use LLM to match success stories from JSON data
    const result = await matchSuccessStories(userProfile, conversationHistory);

    res.json({
      stories: result.stories,
      reasoning: result.reasoning
    });
  } catch (error) {
    console.error('Get matched stories error:', error);
    res.status(500).json({ error: 'Failed to get success stories' });
  }
});

/**
 * GET /api/stories/all
 * Get all success stories (for admin/browsing)
 */
router.get('/all', async (req, res) => {
  try {
    const stories = await scanItems(TABLES.SUCCESS_STORIES);
    res.json({ stories: stories || [] });
  } catch (error) {
    console.error('Get all stories error:', error);
    res.status(500).json({ error: 'Failed to get stories' });
  }
});

export default router;
