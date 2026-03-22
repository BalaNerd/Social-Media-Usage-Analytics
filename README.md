# 📚 Education Analytics & Study Management Platform

A comprehensive full-stack web application designed to help students track study sessions, manage goals, analyze learning patterns, and optimize their study habits with AI-powered insights.

## 🎯 Features

### 📊 Study Analytics & Tracking
- **Session Management**: Start, pause, and track study sessions with real-time timers
- **Goal Setting**: Create and monitor study goals with deadlines and priorities
- **Progress Analytics**: Visual charts showing study hours, focus scores, and consistency
- **Subject Distribution**: Track time spent across different subjects
- **Study Streaks**: Motivational streak tracking for consistent study habits

### 🍅 Pomodoro Timer Integration
- **25-Minute Focus Sessions**: Classic Pomodoro technique implementation
- **Smart Breaks**: Automatic 5-minute short breaks and 15-minute long breaks
- **Visual Progress**: Beautiful circular progress indicators
- **Session Counting**: Automatic tracking of completed Pomodoro cycles
- **Audio Notifications**: Completion alerts and break reminders

### 🧠 AI-Powered Insights
- **Personal Learning Analytics**: Individual learning pattern analysis
- **Cognitive Metrics**: Focus score tracking and optimization suggestions
- **Productivity Insights**: Peak performance time identification
- **Personalized Recommendations**: AI-generated study tips based on user data
- **Mirror Mode**: Behavioral analysis comparing intentions vs actual study patterns

### 📈 Advanced Analytics
- **Real-time Data**: Live updates of study sessions and progress
- **Comprehensive Dashboards**: Multi-view analytics with interactive charts
- **Trend Analysis**: Weekly, monthly, and custom period analytics
- **Performance Metrics**: Focus scores, completion rates, and efficiency tracking

### 🎨 User Experience
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Dark Mode**: Full dark mode support for comfortable studying
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Notifications**: In-app notifications for session completion and goals

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI with hooks and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Recharts** - Beautiful, interactive data visualization
- **React Router** - Client-side routing and navigation
- **Axios** - HTTP client with request/response interceptors

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **MySQL** - Relational database for data persistence
- **Sequelize ORM** - Database abstraction layer
- **JWT Authentication** - Secure token-based authentication
- **bcrypt** - Password hashing and security

### Development Tools
- **ESLint** - Code quality and style enforcement
- **Prettier** - Code formatting and consistency
- **Git Hooks** - Pre-commit code quality checks

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/education-analytics-platform.git
cd education-analytics-platform
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Database Setup**
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE education_analytics;

# Configure environment variables
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

4. **Run the application**
```bash
# Start backend (port 5000)
cd backend
npm start

# Start frontend (port 5173)
cd ../frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📱 Usage Guide

### 1. Create Account & Login
- Register with email, username, and password
- Secure JWT-based authentication

### 2. Start Study Session
- Click "Start Study Session" in Study Hub
- Optionally enable Pomodoro timer for focused sessions
- Track real-time study duration

### 3. Manage Study Goals
- Set subject-specific goals with target hours
- Add deadlines and priorities
- Monitor progress with visual indicators

### 4. View Analytics
- Access comprehensive study analytics
- Track subject distribution and focus scores
- View AI-powered learning insights

### 5. Pomodoro Timer
- Enable Pomodoro mode for structured study sessions
- Automatic break scheduling after focus sessions
- Track completed Pomodoro cycles

## 🔧 Configuration

### Environment Variables
Create `.env` file in backend directory:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=education_analytics
DB_USER=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key

# Server
PORT=5000
NODE_ENV=development
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Study Session Endpoints
- `POST /api/study/sessions/start` - Start study session
- `POST /api/study/sessions/:id/end` - End study session
- `GET /api/study/sessions` - Get user sessions
- `GET /api/study/analytics` - Get study analytics

### Goal Management Endpoints
- `POST /api/study/goals` - Create study goal
- `GET /api/study/goals` - Get user goals
- `PUT /api/study/goals/:id` - Update goal
- `DELETE /api/study/goals/:id` - Delete goal

## 🎯 Key Features Explained

### Pomodoro Timer
- **Focus Sessions**: 25-minute concentrated study periods
- **Short Breaks**: 5-minute breaks between focus sessions
- **Long Breaks**: 15-minute breaks after 4 focus sessions
- **Automatic Switching**: Seamless transition between modes
- **Progress Tracking**: Visual circular progress indicators

### Study Analytics
- **Real-time Tracking**: Live session duration and progress
- **Subject Breakdown**: Time distribution across study subjects
- **Focus Metrics**: Average focus scores and improvement trends
- **Goal Progress**: Visual goal completion tracking
- **Study Streaks**: Consistency motivation through streak tracking

### AI Insights
- **Learning Patterns**: Analysis of optimal study times and durations
- **Productivity Tips**: Personalized recommendations based on data
- **Mirror Mode**: Behavioral analysis and habit insights
- **Performance Optimization**: Suggestions for study efficiency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for the beautiful charting library
- All contributors and users of this platform

---

**Built with ❤️ for students who want to optimize their learning experience**

Updated for PR

Updated by BalaNerd