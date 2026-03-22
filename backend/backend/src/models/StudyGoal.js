import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const StudyGoal = sequelize.define('StudyGoal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  subject: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  targetHours: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currentHours: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('active', 'in-progress', 'completed', 'snoozed', 'paused'),
    defaultValue: 'active'
  },
  color: {
    type: DataTypes.STRING(7), // Hex color
    defaultValue: '#3B82F6'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  milestones: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  reminderSettings: {
    type: DataTypes.JSON,
    defaultValue: {
      enabled: true,
      frequency: 'daily',
      time: '09:00'
    }
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'study_goals',
  timestamps: true,
  underscored: true,
  hooks: {
    beforeSave: (goal) => {
      // Update status based on progress
      if (goal.currentHours >= goal.targetHours) {
        goal.status = 'completed';
        goal.isCompleted = true;
      }
    }
  }
});

export default StudyGoal;
