import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const StudySession = sequelize.define('StudySession', {
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
    allowNull: false,
    defaultValue: 'General Study'
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER, // Duration in minutes
    allowNull: true
  },
  focusScore: {
    type: DataTypes.INTEGER, // 0-100
    allowNull: true
  },
  productivity: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  breaksTaken: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  interruptions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'study_sessions',
  timestamps: true,
  underscored: true
});

export default StudySession;
