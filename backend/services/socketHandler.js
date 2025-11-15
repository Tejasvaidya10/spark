import { v4 as uuidv4 } from 'uuid';
import { TABLES, putItem, queryItems, getItem, updateItem } from './dynamodb.js';
import {
  invokeClaude,
  CAREER_ASSESSMENT_SYSTEM_PROMPT,
  analyzeCareerAssessment,
  getSubcategoryRecommendations,
  WELLNESS_CHECK_SYSTEM_PROMPT,
  analyzeWellnessCheck
} from './bedrock.js';
import { ASSESSMENT_QUESTIONS, ACKNOWLEDGMENTS, COMPLETION_MESSAGE } from '../data/assessmentQuestions.js';

// Store active sessions in memory (for hackathon - use Redis in production)
const activeSessions = new Map();

export const handleChatConnection = (socket, io) => {

  /**
   * Start career assessment chat
   */
  socket.on('start-assessment', async (data) => {
    try {
      const { userId } = data;
      const sessionId = uuidv4();

      activeSessions.set(socket.id, {
        sessionId,
        userId,
        type: 'assessment',
        messages: [],
        questionCount: 0,
        currentQuestionIndex: 0
      });

      // Use first predetermined question (greeting)
      const firstQuestion = ASSESSMENT_QUESTIONS[0];
      const greeting = firstQuestion.question;

      // Save to chat history
      await putItem(TABLES.CHAT_HISTORY, {
        chatId: `${userId}#${sessionId}`,
        timestamp: Date.now(),
        userId,
        sessionId,
        sessionType: 'assessment',
        role: 'assistant',
        message: greeting,
        metadata: {
          questionNumber: 1,
          questionId: firstQuestion.id
        }
      });

      activeSessions.get(socket.id).messages.push({
        role: 'assistant',
        message: greeting
      });

      socket.emit('assistant-message', {
        message: greeting,
        questionNumber: 1
      });

    } catch (error) {
      console.error('Start assessment error:', error);
      socket.emit('error', { message: 'Failed to start assessment' });
    }
  });

  /**
   * Handle user message in assessment
   */
  socket.on('user-message', async (data) => {
    try {
      const { message } = data;
      const session = activeSessions.get(socket.id);

      if (!session) {
        socket.emit('error', { message: 'No active session' });
        return;
      }

      // Save user message
      session.messages.push({ role: 'user', message });
      session.questionCount++;

      await putItem(TABLES.CHAT_HISTORY, {
        chatId: `${session.userId}#${session.sessionId}`,
        timestamp: Date.now(),
        userId: session.userId,
        sessionId: session.sessionId,
        sessionType: session.type,
        role: 'user',
        message,
        metadata: { questionNumber: session.questionCount }
      });

      // Move to next question index
      session.currentQuestionIndex++;

      // Check if we've asked all predetermined questions
      if (session.currentQuestionIndex >= ASSESSMENT_QUESTIONS.length) {
        // Send completion message
        const completionMsg = COMPLETION_MESSAGE;

        session.messages.push({ role: 'assistant', message: completionMsg });

        await putItem(TABLES.CHAT_HISTORY, {
          chatId: `${session.userId}#${session.sessionId}`,
          timestamp: Date.now(),
          userId: session.userId,
          sessionId: session.sessionId,
          sessionType: 'assessment',
          role: 'assistant',
          message: completionMsg,
          metadata: {
            questionNumber: session.questionCount + 1,
            isCompletion: true
          }
        });

        socket.emit('assistant-message', {
          message: completionMsg,
          questionNumber: session.questionCount + 1
        });

        // Now analyze with Bedrock (only at the end)
        const analysis = await analyzeCareerAssessment(session.messages);

        if (analysis.category && analysis.confidence > 60) {
          // Get subcategory recommendations
          const userResponsesText = session.messages
            .filter(m => m.role === 'user')
            .map(m => m.message)
            .join('\n');

          const subcategories = await getSubcategoryRecommendations(
            analysis.category,
            userResponsesText
          );

          // Save assessment
          const assessmentId = uuidv4();
          await putItem(TABLES.ASSESSMENTS, {
            assessmentId,
            userId: session.userId,
            sessionId: session.sessionId,
            questions: session.messages,
            recommendedCategory: analysis.category,
            recommendedSubcategories: subcategories,
            selectedSubcategories: [],
            completedAt: new Date().toISOString()
          });

          const recommendationMessage = `Based on our conversation, I recommend exploring **${analysis.category}**!\n\n${analysis.reasoning}\n\nHere are some specific roles that might interest you: ${subcategories.join(', ')}.\n\nWhich of these sound most exciting to you?`;

          await putItem(TABLES.CHAT_HISTORY, {
            chatId: `${session.userId}#${session.sessionId}`,
            timestamp: Date.now(),
            userId: session.userId,
            sessionId: session.sessionId,
            sessionType: 'assessment',
            role: 'assistant',
            message: recommendationMessage,
            metadata: {
              questionNumber: session.questionCount + 2,
              recommendation: true
            }
          });

          socket.emit('assessment-complete', {
            category: analysis.category,
            subcategories,
            reasoning: analysis.reasoning,
            assessmentId
          });

          activeSessions.delete(socket.id);
          return;
        }

        // If analysis failed, still complete but with error
        socket.emit('error', { message: 'Analysis confidence too low. Please try again.' });
        activeSessions.delete(socket.id);
        return;
      }

      // Continue with next predetermined question
      const nextQuestionObj = ASSESSMENT_QUESTIONS[session.currentQuestionIndex];

      // Add acknowledgment for natural conversation flow
      const acknowledgment = ACKNOWLEDGMENTS[Math.floor(Math.random() * ACKNOWLEDGMENTS.length)];
      const nextQuestion = acknowledgment + nextQuestionObj.question;

      session.messages.push({ role: 'assistant', message: nextQuestion });

      await putItem(TABLES.CHAT_HISTORY, {
        chatId: `${session.userId}#${session.sessionId}`,
        timestamp: Date.now(),
        userId: session.userId,
        sessionId: session.sessionId,
        sessionType: 'assessment',
        role: 'assistant',
        message: nextQuestion,
        metadata: {
          questionNumber: session.questionCount + 1,
          questionId: nextQuestionObj.id
        }
      });

      socket.emit('assistant-message', {
        message: nextQuestion,
        questionNumber: session.questionCount + 1
      });

    } catch (error) {
      console.error('User message error:', error);
      socket.emit('error', { message: 'Failed to process message' });
    }
  });

  /**
   * Start wellness check
   */
  socket.on('start-wellness-check', async (data) => {
    try {
      const { userId, courseId } = data;
      const sessionId = uuidv4();

      activeSessions.set(socket.id, {
        sessionId,
        userId,
        courseId,
        type: 'wellness',
        messages: []
      });

      const greeting = await invokeClaude(
        "Start a wellness check. Ask how the user is feeling about their course and career path. Be warm and supportive.",
        WELLNESS_CHECK_SYSTEM_PROMPT,
        200
      );

      await putItem(TABLES.CHAT_HISTORY, {
        chatId: `${userId}#${sessionId}`,
        timestamp: Date.now(),
        userId,
        sessionId,
        sessionType: 'wellness',
        role: 'assistant',
        message: greeting,
        metadata: { courseId }
      });

      activeSessions.get(socket.id).messages.push({
        role: 'assistant',
        message: greeting
      });

      socket.emit('assistant-message', { message: greeting });

    } catch (error) {
      console.error('Wellness check error:', error);
      socket.emit('error', { message: 'Failed to start wellness check' });
    }
  });

  /**
   * Handle wellness check response
   */
  socket.on('wellness-response', async (data) => {
    try {
      const { message } = data;
      const session = activeSessions.get(socket.id);

      if (!session || session.type !== 'wellness') {
        socket.emit('error', { message: 'No active wellness check session' });
        return;
      }

      session.messages.push({ role: 'user', message });

      await putItem(TABLES.CHAT_HISTORY, {
        chatId: `${session.userId}#${session.sessionId}`,
        timestamp: Date.now(),
        userId: session.userId,
        sessionId: session.sessionId,
        sessionType: 'wellness',
        role: 'user',
        message,
        metadata: { courseId: session.courseId }
      });

      // After 2-3 exchanges, analyze
      if (session.messages.filter(m => m.role === 'user').length >= 2) {
        const userResponsesText = session.messages
          .map(m => `${m.role}: ${m.message}`)
          .join('\n');

        const analysis = await analyzeWellnessCheck(userResponsesText);

        // Update progress with wellness check completed
        await updateItem(
          TABLES.USER_PROGRESS,
          { progressId: `${session.userId}#${session.courseId}` },
          'SET wellnessCheckCompleted = :completed, wellnessOutcome = :outcome',
          {
            ':completed': true,
            ':outcome': analysis.outcome
          }
        );

        socket.emit('wellness-complete', {
          outcome: analysis.outcome,
          reasoning: analysis.reasoning,
          recommendation: analysis.recommendation
        });

        activeSessions.delete(socket.id);
        return;
      }

      // Continue conversation
      const conversationContext = session.messages
        .map(m => `${m.role}: ${m.message}`)
        .join('\n');

      const response = await invokeClaude(
        `Conversation:\n${conversationContext}\n\nContinue the wellness check conversation. Ask follow-up questions to understand their satisfaction.`,
        WELLNESS_CHECK_SYSTEM_PROMPT,
        300
      );

      session.messages.push({ role: 'assistant', message: response });

      await putItem(TABLES.CHAT_HISTORY, {
        chatId: `${session.userId}#${session.sessionId}`,
        timestamp: Date.now(),
        userId: session.userId,
        sessionId: session.sessionId,
        sessionType: 'wellness',
        role: 'assistant',
        message: response,
        metadata: { courseId: session.courseId }
      });

      socket.emit('assistant-message', { message: response });

    } catch (error) {
      console.error('Wellness response error:', error);
      socket.emit('error', { message: 'Failed to process wellness response' });
    }
  });

  socket.on('disconnect', () => {
    activeSessions.delete(socket.id);
    console.log('Client disconnected:', socket.id);
  });
};
