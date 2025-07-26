# AI Support Agent

A modern customer support application with AI-guided ticket creation, built with Next.js, TypeScript, TailwindCSS, and Langchain.

## 🚀 Features

- **AI-Guided Ticket Creation**: Interactive chat interface that guides users through ticket creation
- **Smart Suggestions**: AI-powered suggestions for titles, categories, and descriptions
- **Real-time Preview**: Dynamic ticket preview that updates as you chat
- **Modern UI**: Beautiful interface built with ShadcnUI and TailwindCSS
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, ShadcnUI
- **Backend**: Python, FastAPI, Langchain, OpenAI GPT-4
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI GPT-4 for intelligent conversations

## 📦 Installation

1. **Clone the repository**
```bash
   git clone https://github.com/se7enXstar/ai-agent.git
   cd ai-agent
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:8000
   DATABASE_URL="postgresql://username:password@localhost:5432/ai_agent_db"
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
```bash
   npm run dev
   ```

## 🌐 Default URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **AI Assistant**: http://localhost:3000/assistant

## 📁 Project Structure

```
ai-agent/
├── app/                    # Next.js App Router
│   ├── assistant/         # AI Assistant interface
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # ShadcnUI components
│   ├── ChatInterface.tsx # Main chat component
│   ├── TicketPreview.tsx # Ticket preview sidebar
│   └── Header.tsx        # Header component
├── backend/              # Python backend (to be implemented)
├── prisma/              # Database schema
└── styles/              # Global styles
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Frontend application URL | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `OPENAI_API_KEY` | OpenAI API key for AI features | - |

## 🎯 Usage

1. **Visit the homepage**: Navigate to http://localhost:3000
2. **Access AI Assistant**: Click "AI Assistant" or go to http://localhost:3000/assistant
3. **Create a ticket**: Follow the AI-guided conversation to create support tickets
4. **View preview**: See real-time updates in the left sidebar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Repository**: https://github.com/se7enXstar/ai-agent
- **Issues**: https://github.com/se7enXstar/ai-agent/issues
