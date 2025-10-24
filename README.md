# LLM Log Analysis API

A simple API that sends text prompts to Qwen AI model and returns AI responses.

## Setup

### Windows
1. Install Node.js from [nodejs.org](https://nodejs.org)
2. Open Command Prompt or PowerShell
3. Navigate to project folder:
```cmd
cd C:\path\to\llmloganalyze
```
4. Install dependencies:
```cmd
npm install
```
5. Create `.env` file in project root:
```env
PORT=3000
LLM_API_KEY=your_groq_api_key_here
LLM_API_URL=https://api.groq.com/openai/v1/chat/completions
```
6. Get Groq API key from [console.groq.com](https://console.groq.com)
7. Run server:
```cmd
npm run dev
```

### Linux
1. Install Node.js:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# CentOS/RHEL
sudo yum install nodejs npm
```
2. Navigate to project folder:
```bash
cd /path/to/llmloganalyze
```
3. Install dependencies:
```bash
npm install
```
4. Create `.env` file:
```bash
nano .env
```
Add:
```env
PORT=3000
LLM_API_KEY=your_groq_api_key_here
LLM_API_URL=https://api.groq.com/openai/v1/chat/completions
```
5. Get Groq API key from [console.groq.com](https://console.groq.com)
6. Run server:
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## Project Structure

```
llmloganalyze/
├── src/                          # Source code directory
│   ├── config/                   # Configuration files
│   │   └── env.ts               # Environment variables configuration
│   ├── routes/                   # API route handlers
│   │   ├── llmRoutes.ts         # LLM API endpoints (/api/test, /api/analyze)
│   │   └── pdfRoutes.ts         # PDF processing endpoints
│   ├── services/                 # Business logic services
│   │   ├── llmService.ts        # Qwen AI integration service
│   │   └── pdfService.ts        # PDF processing service
│   └── index.ts                 # Application entry point
├── node_modules/                 # Dependencies (auto-generated)
├── package.json                 # Project configuration and dependencies
├── package-lock.json           # Dependency lock file
├── tsconfig.json               # TypeScript configuration
├── README.md                   # This file
└── .env                        # Environment variables (create this)
```

### File Descriptions

| File | Purpose |
|------|---------|
| `src/index.ts` | Main application entry point, starts Express server |
| `src/config/env.ts` | Loads and exports environment variables |
| `src/routes/llmRoutes.ts` | Handles LLM API endpoints (test, analyze) |
| `src/routes/pdfRoutes.ts` | Handles PDF processing endpoints |
| `src/services/llmService.ts` | Integrates with Qwen AI via Groq API |
| `src/services/pdfService.ts` | Processes PDF files |
| `package.json` | Project metadata and npm scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `.env` | Environment variables (API keys, URLs) |

## API Endpoints

### Test
**GET** `/api/test`
```bash
curl http://localhost:3000/api/test
```

### Analyze Text
**POST** `/api/analyze`
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What is AI?"}'
```

## Example Response
```json
{
  "response": "AI is artificial intelligence..."
}
```

That's it! Send any text prompt and get AI responses.
