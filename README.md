# SupportGenie - AI Customer Support Automation

## 📌 Overview
AI-powered automation for e-commerce customer support teams. Handles:
- Ticket categorization
- Instant responses
- Follow-up scheduling

## 🛠️ Technologies
- **Backend**: Node.js/Express
- **AI**: Google Gemini API
- **APIs**: Zendesk, SendGrid
- **Cloud**: GCP Cloud Run

## 🚀 Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/mariatesfaye/ai-support-agent
cd support-genie
```

### 2. Set up environment
```bash
cp .env.example .env
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run locally
```bash
npm start
```
Server runs at `http://localhost:3000`

## 🔧 Configuration
Edit `.env` with your credentials:
```ini
GEMINI_API_KEY=your_key_here
ZENDESK_API_URL=https://yoursubdomain.zendesk.com/api/v2
# ... other keys
```

## 🌐 API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/webhook/zendesk` | POST | Zendesk webhook handler |
| `/api/followup/:id` | POST | Process follow-ups |

## 📂 Project Structure
```
support-genie/
├── src/
│   ├── controllers/    # Route handlers
│   ├── services/       # API integrations
│   └── ...            # Other components
├── test/              # Test cases
└── .env.example       # Environment template
```

## 📄 License
MIT