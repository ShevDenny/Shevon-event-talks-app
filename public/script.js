// State management
let allTalks = [];
let currentSearch = '';

const CONFIG = {
    startTime: "10:00",
    talkDuration: 60, // minutes
    transitionDuration: 10, // minutes
    lunchDuration: 60, // minutes
    lunchAfterTalk: 3
};

// DOM Elements
const scheduleTimeline = document.getElementById('schedule-timeline');
const categorySearch = document.getElementById('category-search');
const themeToggle = document.getElementById('theme-toggle');

// Initialize
async function init() {
    setupTheme();
    await fetchTalks();
    renderSchedule();
    
    // Event Listeners
    categorySearch.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderSchedule();
    });

    themeToggle.addEventListener('click', toggleTheme);
}

// Fetch data from backend
async function fetchTalks() {
    try {
        const response = await fetch('/api/talks');
        allTalks = await response.json();
    } catch (error) {
        console.error('Error fetching talks:', error);
        scheduleTimeline.innerHTML = '<div class="error">Failed to load schedule. Please try again later.</div>';
    }
}

// Time Calculation Utilities
function addMinutes(timeString, minutes) {
    const [hours, mins] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins, 0);
    date.setMinutes(date.getMinutes() + minutes);
    
    let h = date.getHours();
    let m = date.getMinutes();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // 0 should be 12
    m = m < 10 ? '0' + m : m;
    
    return `${h}:${m} ${ampm}`;
}

function getRawTime(timeString, minutes) {
    const [hours, mins] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins, 0);
    date.setMinutes(date.getMinutes() + minutes);
    return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
}

// Render logic
function renderSchedule() {
    scheduleTimeline.innerHTML = '';
    
    let currentTime = CONFIG.startTime;
    let talkCount = 0;

    // Filter talks based on search
    const filteredTalks = allTalks.filter(talk => {
        if (!currentSearch) return true;
        return talk.categories.some(cat => cat.toLowerCase().includes(currentSearch));
    });

    if (filteredTalks.length === 0 && currentSearch) {
        scheduleTimeline.innerHTML = `<div class="loading">No talks found for "${currentSearch}"</div>`;
        return;
    }

    allTalks.forEach((talk, index) => {
        const isVisible = !currentSearch || talk.categories.some(cat => cat.toLowerCase().includes(currentSearch));
        
        const displayTime = addMinutes(currentTime, 0);
        
        // Add Lunch Break if it's time
        if (index === CONFIG.lunchAfterTalk) {
            const lunchHtml = `
                <div class="schedule-item lunch-item">
                    <div class="time-slot">${addMinutes(currentTime, 0)}</div>
                    <div class="talk-card lunch">
                        <div class="talk-title">🍱 Lunch Break</div>
                        <div class="talk-description">Networking and lunch in the main hall.</div>
                    </div>
                </div>
            `;
            scheduleTimeline.insertAdjacentHTML('beforeend', lunchHtml);
            currentTime = getRawTime(currentTime, CONFIG.lunchDuration);
        }

        if (isVisible) {
            const talkHtml = `
                <div class="schedule-item">
                    <div class="time-slot">${displayTime}</div>
                    <div class="talk-card">
                        <div class="talk-title">${talk.title}</div>
                        <div class="talk-speakers">By ${talk.speakers.join(' & ')}</div>
                        <div class="talk-description">${talk.description}</div>
                        <div class="category-tags">
                            ${talk.categories.map(cat => `<span class="tag" onclick="filterByTag('${cat}')">${cat}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            scheduleTimeline.insertAdjacentHTML('beforeend', talkHtml);
        }

        // Increment time for next talk
        currentTime = getRawTime(currentTime, talk.duration + CONFIG.transitionDuration);
    });
}

function filterByTag(tag) {
    categorySearch.value = tag;
    currentSearch = tag.toLowerCase();
    renderSchedule();
}

// Theme Logic
function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
}

function toggleTheme() {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
}

// Run app
init();
