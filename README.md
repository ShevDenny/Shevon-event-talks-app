# TechSummit 2026 | Event Schedule App

A modern, responsive, and dynamic conference schedule application. This project features a Node.js/Express backend providing a data API and a Vanilla JavaScript frontend with real-time filtering and theme support.

## 🚀 Features

- **Dynamic Timeline:** Automatically calculates session times starting from 10:00 AM based on talk durations and transition periods.
- **Smart Scheduling:** Automatically injects a lunch break into the schedule after a set number of talks.
- **Real-time Search:** Filter talks instantly by category tags (e.g., AI, Architecture, UX) using the search bar.
- **Dark Mode Support:** Toggle between light and dark themes with persistent settings saved to `localStorage`.
- **Responsive Design:** Optimized for all screen sizes, from mobile devices to desktop monitors.
- **RESTful API:** Decoupled architecture with a clean API endpoint for retrieving talk data.

## 🛠️ Technical Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Data Storage:** JSON-based flat file system
- **Design:** Inter font family, CSS Variables for easy theming

## 📁 Project Structure

```text
tech-event-website/
├── data/
│   └── talks.json      # Central data source for all conference sessions
├── public/
│   ├── index.html      # Main entry point
│   ├── script.js       # Frontend logic, time calculations, and rendering
│   └── style.css       # Custom styling and theme definitions
├── server.js           # Express server and API implementation
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShevDenny/Shevon-event-talks-app.git
   cd Shevon-event-talks-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:3000`

## 📊 API Endpoints

### `GET /api/talks`
Returns a JSON array containing all scheduled talks. Each talk object includes:
- `id`: Unique identifier
- `title`: Title of the presentation
- `speakers`: Array of speaker names
- `categories`: Array of tags for filtering
- `duration`: Length of the talk in minutes
- `description`: Detailed abstract of the session

## 📝 License
This project is licensed under the ISC License.
