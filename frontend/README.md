# BucksBunny AI Financial Coach - Next.js Frontend

This is the Next.js v15+ frontend for BucksBunny, an AI financial education coach designed specifically for teenagers in St. Kitts and Nevis. The application has been migrated from a React (Vite) codebase to Next.js with TypeScript and Tailwind CSS.

## Features

- 🐰 **BucksBunny AI Coach**: Chat with an AI that understands local Caribbean banking and financial culture
- 📚 **Learning Guides**: Structured financial education modules
- 📊 **Local Markets**: Eastern Caribbean Stock Exchange data and forex rates
- 🏦 **Banking Info**: Comprehensive info about local banks like SKNANB, BON, and credit unions
- 🎯 **Personalized Journeys**: Learning paths for different life stages (getting started, first job, college)
- 🌙 **Dark/Light Mode**: Beautiful glass-morphism UI with theme switching
- 📱 **Responsive Design**: Works great on mobile and desktop

## Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom glass-morphism effects
- **AI Integration**: Google Gemini 2.5 Flash
- **Maps**: React Leaflet for ATM/bank finder
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

1. **Install dependencies**:
```bash
npm install --legacy-peer-deps
```

2. **Set up environment variables**:
Create a `.env.local` file with:
```
API_KEY=your_google_gemini_api_key
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open the application**:
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── chat/               # AI chat interface
│   ├── journey/            # Learning journey paths
│   ├── learning-guides/    # Educational modules
│   ├── markets/            # Financial markets data
│   └── wiki/               # Financial terms wiki
├── components/             # Reusable UI components
├── constants/              # App constants and prompts
├── contexts/               # React contexts (theme, etc.)
├── data/                   # Static data (banks, ATMs)
├── hooks/                  # Custom React hooks
├── services/               # API services (Gemini)
└── types/                  # TypeScript type definitions
```

## Key Components

- **ThemeProvider**: Manages dark/light mode switching
- **Header/Footer**: Navigation and branding
- **Logo**: Custom BucksBunny SVG logo
- **Chat Interface**: Real-time AI conversation
- **Learning Modules**: Structured financial education content

## Migration Notes

This application was successfully migrated from a React (Vite) codebase to Next.js v15+ with the following key changes:

- ✅ Converted React Router to Next.js App Router
- ✅ Migrated all components to Next.js compatible format
- ✅ Updated styling to use Tailwind CSS v4
- ✅ Maintained all custom glass-morphism effects
- ✅ Preserved theme switching functionality
- ✅ Integrated Google Gemini AI service
- ✅ Set up proper TypeScript configuration
- ✅ Created responsive, mobile-first design

## Local Context

BucksBunny is designed specifically for St. Kitts & Nevis, featuring:

- **Local Banks**: SKNANB, Bank of Nevis, Republic Bank, CIBC FirstCaribbean
- **Government Programs**: ASPIRE Programme information
- **Currency**: Eastern Caribbean Dollar (XCD) context
- **Regulations**: ECCB and FSRC compliance information
- **Culture**: Caribbean English and Kittitian/Nevisian dialect

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

This application serves the financial education needs of teenagers in St. Kitts & Nevis. Contributions should maintain the local context and cultural sensitivity of the content.

## License

For educational purposes only. © 2024 BucksBunny AI Financial Coach.