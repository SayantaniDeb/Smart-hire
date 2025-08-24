# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


smart-hiring-dashboard/
├── package.json               # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
├── index.html                # Entry HTML
├── README.md                 # Comprehensive documentation
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Main app component
    ├── index.css             # Global styles + Tailwind
    ├── contexts/
    │   └── HiringContext.jsx # Global state management
    ├── data/
    │   └── candidates.js     # Candidate data & processing
    └── components/           # Modular React components
        ├── Dashboard.jsx     # Main dashboard layout
        ├── Header.jsx        # App header
        ├── StatsRow.jsx      # Statistics display
        ├── StatCard.jsx      # Individual stat cards
        ├── MainContent.jsx   # Main content layout
        ├── FiltersPanel.jsx  # Filtering sidebar
        ├── CandidatesSection.jsx # Candidates display
        ├── CandidateCard.jsx # Individual candidate cards
        ├── SelectedTeam.jsx  # Selected team display
        ├── TeamMemberCard.jsx # Team member cards
        ├── Analytics.jsx     # Charts and analytics
        ├── TeamInsights.jsx  # Team analysis insights
        └── ActionButtons.jsx # Action buttons
