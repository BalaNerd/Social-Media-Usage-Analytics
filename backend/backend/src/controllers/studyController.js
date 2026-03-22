import StudySession from '../models/StudySession.js';
import StudyGoal from '../models/StudyGoal.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { Op } from 'sequelize';

/**
 * @route   POST /api/study/sessions/start
 * @desc    Start a new study session
 * @access  Private
 */
export const startStudySession = asyncHandler(async (req, res) => {
  console.log('[Study Controller] Starting session for user:', req.user.id);
  console.log('[Study Controller] Request body:', req.body);
  
  const { subject, notes, tags } = req.body;
  const userId = req.user.id;

  // Check if there's already an active session
  const activeSession = await StudySession.findOne({
    where: {
      userId,
      endTime: null,
      isCompleted: false
    }
  });

  if (activeSession) {
    console.log('[Study Controller] User already has active session:', activeSession.id);
    return res.status(400).json({
      success: false,
      message: 'You already have an active study session. Please end it first.'
    });
  }

  const session = await StudySession.create({
    userId,
    subject: subject || 'General Study',
    notes: notes || '',
    tags: tags || [],
    startTime: new Date()
  });

  console.log('[Study Controller] Session created successfully:', session.id);
  
  res.status(201).json({
    success: true,
    data: session,
    message: 'Study session started successfully'
  });
});

/**
 * @route   POST /api/study/sessions/:sessionId/end
 * @desc    End a study session
 * @access  Private
 */
export const endStudySession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const { productivity, notes } = req.body;
  const userId = req.user.id;

  const session = await StudySession.findOne({
    where: {
      id: sessionId,
      userId,
      endTime: null,
      isCompleted: false
    }
  });

  if (!session) {
    return res.status(404).json({
      success: false,
      message: 'Active study session not found'
    });
  }

  const endTime = new Date();
  const duration = Math.floor((endTime - session.startTime) / 1000 / 60); // Duration in minutes

  // Calculate focus score based on duration and interruptions
  let focusScore = 85; // Base score
  if (duration < 15) focusScore = 60;
  else if (duration < 30) focusScore = 75;
  else if (duration > 120) focusScore = 80;

  await session.update({
    endTime,
    duration,
    productivity: productivity || 'medium',
    notes: notes || session.notes,
    focusScore,
    isCompleted: true
  });

  res.json({
    success: true,
    data: session,
    message: 'Study session ended successfully'
  });
});

/**
 * @route   GET /api/study/sessions/active
 * @desc    Get active study session
 * @access  Private
 */
export const getActiveSession = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log('[Study Controller] Getting active session for user:', userId);

  const activeSession = await StudySession.findOne({
    where: {
      userId,
      endTime: null,
      isCompleted: false
    }
  });

  console.log('[Study Controller] Active session found:', activeSession ? activeSession.id : 'None');

  res.json({
    success: true,
    data: activeSession
  });
});

/**
 * @route   PUT /api/study/sessions/:sessionId
 * @desc    Update a study session
 * @access  Private
 */
export const updateStudySession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.id;
  const updates = req.body;

  console.log('[Study Controller] Updating session:', sessionId, 'for user:', userId);
  console.log('[Study Controller] Update data:', updates);

  const session = await StudySession.findOne({
    where: { id: sessionId, userId }
  });

  if (!session) {
    console.log('[Study Controller] Session not found');
    return res.status(404).json({
      success: false,
      message: 'Study session not found'
    });
  }

  console.log('[Study Controller] Found session:', session.id);
  
  await session.update(updates);
  
  console.log('[Study Controller] Session updated successfully');

  res.json({
    success: true,
    data: session,
    message: 'Study session updated successfully'
  });
});

/**
 * @route   DELETE /api/study/sessions/:sessionId
 * @desc    Delete a study session
 * @access  Private
 */
export const deleteStudySession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.id;

  const session = await StudySession.findOne({
    where: { id: sessionId, userId }
  });

  if (!session) {
    return res.status(404).json({
      success: false,
      message: 'Study session not found'
    });
  }

  await session.destroy();

  res.json({
    success: true,
    message: 'Study session deleted successfully'
  });
});

/**
 * @route   GET /api/study/sessions
 * @desc    Get study sessions
 * @access  Private
 */
export const getStudySessions = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { limit = 10, offset = 0, subject } = req.query;

  const whereClause = { userId };
  if (subject) {
    whereClause.subject = { [Op.like]: `%${subject}%` };
  }

  const sessions = await StudySession.findAll({
    where: whereClause,
    order: [['startTime', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  res.json({
    success: true,
    data: sessions
  });
});

/**
 * @route   POST /api/study/goals
 * @desc    Create a new study goal
 * @access  Private
 */
export const createStudyGoal = asyncHandler(async (req, res) => {
  console.log('[Study Controller] Creating goal for user:', req.user.id);
  console.log('[Study Controller] Request body:', req.body);
  
  const { subject, targetHours, deadline, priority, color, description } = req.body;
  const userId = req.user.id;

  const goal = await StudyGoal.create({
    userId,
    subject,
    targetHours: parseFloat(targetHours),
    deadline: new Date(deadline),
    priority: priority || 'medium',
    color: color || '#3B82F6',
    description: description || ''
  });

  console.log('[Study Controller] Goal created successfully:', goal.id);
  
  res.status(201).json({
    success: true,
    data: goal,
    message: 'Study goal created successfully'
  });
});

/**
 * @route   GET /api/study/goals
 * @desc    Get study goals
 * @access  Private
 */
export const getStudyGoals = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { status, priority } = req.query;
  console.log('[Study Controller] Getting goals for user:', userId, 'filters:', { status, priority });

  const whereClause = { userId };
  if (status) whereClause.status = status;
  if (priority) whereClause.priority = priority;

  const goals = await StudyGoal.findAll({
    where: whereClause,
    order: [['deadline', 'ASC']]
  });

  console.log('[Study Controller] Found goals:', goals.length);

  res.json({
    success: true,
    data: goals
  });
});

/**
 * @route   PUT /api/study/goals/:goalId
 * @desc    Update a study goal
 * @access  Private
 */
export const updateStudyGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const userId = req.user.id;
  const updates = req.body;

  const goal = await StudyGoal.findOne({
    where: { id: goalId, userId }
  });

  if (!goal) {
    return res.status(404).json({
      success: false,
      message: 'Study goal not found'
    });
  }

  await goal.update(updates);

  res.json({
    success: true,
    data: goal,
    message: 'Study goal updated successfully'
  });
});

/**
 * @route   DELETE /api/study/goals/:goalId
 * @desc    Delete a study goal
 * @access  Private
 */
export const deleteStudyGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const userId = req.user.id;

  const goal = await StudyGoal.findOne({
    where: { id: goalId, userId }
  });

  if (!goal) {
    return res.status(404).json({
      success: false,
      message: 'Study goal not found'
    });
  }

  await goal.destroy();

  res.json({
    success: true,
    message: 'Study goal deleted successfully'
  });
});

/**
 * @route   GET /api/study/analytics
 * @desc    Get study analytics
 * @access  Private
 */
export const getStudyAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { period = 'week' } = req.query;

  // Calculate date range based on period
  const now = new Date();
  let startDate;
  
  switch (period) {
    case 'day':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  // Get completed sessions in the period
  const sessions = await StudySession.findAll({
    where: {
      userId,
      startTime: { [Op.gte]: startDate },
      isCompleted: true
    }
  });

  // Get goals
  const goals = await StudyGoal.findAll({
    where: { userId }
  });

  // Calculate analytics
  const totalHours = sessions.reduce((sum, session) => sum + (session.duration || 0) / 60, 0);
  const totalSessions = sessions.length;
  const averageFocusScore = sessions.length > 0 
    ? Math.round(sessions.reduce((sum, session) => sum + (session.focusScore || 0), 0) / sessions.length)
    : 0;

  // Calculate study streak (simplified - consecutive days with study sessions)
  const studyDays = new Set(sessions.map(s => s.startTime.toDateString()));
  const studyStreak = studyDays.size; // Simplified calculation

  const activeGoals = goals.filter(g => !g.isCompleted).length;
  const completedGoals = goals.filter(g => g.isCompleted).length;

  // Calculate subject breakdown from sessions and goals
  const subjectBreakdown = {};
  
  // Add session hours by subject
  sessions.forEach(session => {
    const subject = session.subject || 'General';
    const hours = (session.duration || 0) / 60; // Convert minutes to hours
    subjectBreakdown[subject] = (subjectBreakdown[subject] || 0) + hours;
  });
  
  // Add goal target hours by subject
  goals.forEach(goal => {
    const subject = goal.subject || 'General';
    const targetHours = goal.targetHours || 0;
    if (!subjectBreakdown[subject]) {
      subjectBreakdown[subject] = 0;
    }
  });

  res.json({
    success: true,
    data: {
      totalHours: Math.round(totalHours * 100) / 100,
      totalSessions,
      averageFocusScore,
      studyStreak,
      activeGoals,
      completedGoals,
      subjectBreakdown,
      period
    }
  });
});
