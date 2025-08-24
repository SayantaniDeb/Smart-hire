# Hiring Dashboard

A simple React app to help you pick the best team from job candidates. It automatically finds diverse teams that work well together.

## What it does

### 👥 Manage Candidates
- **Filter candidates**: Search by job type, experience, location, skills, and scores
- **Smart scoring**: Candidates get scores based on what you're looking for
- **Different views**: See all candidates, your favorites, or your final team

### 📱 Works on phones and computers
Built to work great on any device - phone, tablet, or computer.

## Dashboard Views

Compare how the app adapts across devices:

| Desktop / Normal View | Mobile / Dashboard View |
|----------------------|------------------------|
| ![Desktop 1](https://github.com/user-attachments/assets/5c54161c-0393-4507-8ac1-65f54d06ffff) <br> ![Desktop 2](https://github.com/user-attachments/assets/7c3555ef-a0c8-4ce0-bc49-d735bedf0b6d) <br> *Multi-column layout showing filters, candidates, and team overview with live scoring and notifications.* | ![Mobile 1](https://github.com/user-attachments/assets/32243a4f-b5e9-46c1-b6ff-05f2c2cdecb7) <br> ![Mobile 2](https://github.com/user-attachments/assets/a56d0b25-62a8-4df1-8db9-a49acf2dcb3f) <br> *Single-column responsive layout with sticky filters, action buttons, and auto-select team feature fully functional on mobile.* |

### Notes

- **Desktop / Normal View**:  
  - Multi-column layout allows simultaneous access to filters, candidate cards, and selected team.  
  - Detailed scoring, hover interactions, and diversity notifications.  
  - Optimized for large screens with full visibility of all elements.  

- **Mobile / Dashboard View**:  
  - Single-column layout to fit small screens.  
  - Sticky filters and action buttons remain accessible at all times.  
  - Auto-select team and candidate scoring fully functional.  
  - Designed for tap-friendly interactions and minimal scrolling.  

- **Feature parity**: Both views support the **auto-select diverse team feature**, live diversity scoring, and data export.



*Mobile version that's easy to use*

### 🤖 Smart Team Builder
The app can build teams for you automatically:
- Follows your search filters (like "only senior developers")
- Picks people from different backgrounds and locations
- Shows you how diverse your team is
- Tells you when you get a great mix of people

### 📊 Team Diversity Score
- **Live updates**: See your diversity score change as you pick people
- **Three main areas**: Different job roles (40%), different locations (35%), different experience levels (25%)
- **Notifications**: Get alerts when your team gets more diverse

### 💾 Save Your Work
Download your team info including:
- Who you picked and their details
- How diverse your team is
- What filters you used
- Salary information
- When you made your choices

## How to get started

### What you need
- Node.js (version 18 or newer)
- npm or yarn

### Setup

```bash
# Download the code
git clone https://github.com/yourusername/Smart-hire.git

# Go to the folder
cd Smart-hire

# Install what you need
npm install

# Start the app
npm run dev
```

Open your browser and go to `http://localhost:3000`



### Basic steps

1. **Look at candidates**: See everyone available with their scores
2. **Use filters**: Narrow down who you see based on what you need
3. **Pick manually**: Click on people to add them to your favorites or team
4. **Use auto-pick**: Let the app build a diverse team for you
5. **Save your team**: Download information about who you chose

### Smart team building

The auto-pick feature respects your filters:

- **No filters**: Picks from everyone to get the most diverse team
- **Experience filter** (like "Entry Level"): Only picks beginners but makes sure they're from different places and job types
- **Job filter** (like "Backend"): Only picks backend developers but gets different experience levels and locations
- **Multiple filters**: Combines all your requirements while making the most diverse team possible

### How diversity scoring works

The app looks at three things to measure diversity:

- **Job types**: Frontend, Backend, Design, etc. (counts for 40%)
- **Locations**: Where people are from (counts for 35%)
- **Experience**: Junior, Mid-level, Senior (counts for 25%)

You get 100% diversity when you have:
- 5 different job types
- 5 different locations  
- 4 different experience levels

## Technical stuff

### How it manages data
Uses React Context to keep track of:
- Filtering and scoring candidates
- Your team picks and favorites
- Which view you're looking at
- Pop-up notifications

### Mobile-friendly design
- Built mobile-first with Tailwind CSS
- Layout changes based on screen size
- Easy to tap and use on phones
- Text and buttons sized right for each device

### Performance
- Smart calculations that don't slow things down
- Efficient searching and filtering
- Only updates what needs to change
- Stops calculating when it finds the best result


## License

MIT License - see the [LICENSE](LICENSE) file for details.

