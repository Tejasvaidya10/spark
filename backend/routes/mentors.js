import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { TABLES, queryItems, scanItems, getItem } from '../services/dynamodb.js';
import { recommendMentors } from '../services/bedrock.js';

const router = express.Router();

/**
 * GET /api/mentors/match
 * Get matched mentors for user using LLM
 */
router.get('/match', authenticateToken, async (req, res) => {
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
      gender: user.demographics?.gender
    };

    // Get user's career goals from their profile or assessment
    const userGoals = user.careerGoals || user.assessmentSummary || '';

    // Use LLM to recommend mentors from JSON data
    const result = await recommendMentors(userProfile, user.category, userGoals);

    res.json({
      mentors: result.mentors,
      reasoning: result.reasoning
    });
  } catch (error) {
    console.error('Match mentors error:', error);
    res.status(500).json({ error: 'Failed to match mentors' });
  }
});

/**
 * GET /api/mentors/all
 * Get all mentors
 */
router.get('/all', async (req, res) => {
  try {
    const mentors = await scanItems(TABLES.MENTORS);
    res.json({ mentors: mentors || [] });
  } catch (error) {
    console.error('Get all mentors error:', error);
    res.status(500).json({ error: 'Failed to get mentors' });
  }
});

export default router;
