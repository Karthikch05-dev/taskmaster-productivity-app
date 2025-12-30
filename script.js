// Language translations
//let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC7gJx76Q56t-Cct0A6gL0TqDtjjjVV9Ws",
  authDomain: "taskmaster-78abb.firebaseapp.com",
  projectId: "taskmaster-78abb",
  storageBucket: "taskmaster-78abb.firebasestorage.app",
  messagingSenderId: "888153206728",
  appId: "1:888153206728:web:b2144b25caf89773f49afd"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/* 👇 PASTE STEP 4 HERE 👇 */
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        };
        updateUserUI();
    }
});

const translations = {
    en: {
        tasks: 'Tasks',
        'add-task': 'Add a new task',
        add: 'Add',
        'ai-recommendations': 'AI Recommendations',
        'get-recommendations': 'Get Recommendations',
        profile: 'Profile',
        save: 'Save'
    },
    hi: {
        tasks: 'कार्य',
        'add-task': 'एक नया कार्य जोड़ें',
        add: 'जोड़ें',
        'ai-recommendations': 'AI सिफारिशें',
        'get-recommendations': 'सिफारिशें प्राप्त करें',
        profile: 'प्रोफाइल',
        save: 'सेव करें'
    },
    te: {
        tasks: 'పనులు',
        'add-task': 'కొత్త పనిని జోడించండి',
        add: 'జోడించండి',
        'ai-recommendations': 'AI సిఫారసులు',
        'get-recommendations': 'సిఫారసులను పొందండి',
        profile: 'ప్రోఫైల్',
        save: 'సేవ్ చేయండి'
    }
};

let currentLanguage = 'en';
let tasks = [];
let currentUser = null;
let currentFilter = 'all';

function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}


// Language management
function setLanguage(lang) {
    currentLanguage = lang;
    updateLanguageUI();
    localStorage.setItem('language', lang);
}

function updateLanguageUI() {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.dataset.lang;
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[currentLanguage][key];
            } else if (element.tagName === 'BUTTON') {
                element.textContent = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('language');
    if (saved) {
        currentLanguage = saved;
    }
    updateLanguageUI();
    loadTasks();
    attachEventListeners();
    loadUserProfile();
});

// Event listeners
function attachEventListeners() {
    console.log("attachEventListeners called");

    const loginBtn = document.getElementById('login-btn');
    console.log("loginBtn =", loginBtn);

    if (loginBtn) {
        loginBtn.addEventListener('click', loginWithGoogle);
        console.log("login button listener attached");
    } else {
        console.log("login button NOT FOUND");
    }

    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const getAiBtn = document.getElementById('get-ai-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const profileBtn = document.getElementById('profile-btn');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    const themeSelector = document.getElementById('theme-selector');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const clearTasksBtn = document.getElementById('clear-tasks-btn');

    if (clearTasksBtn) {
        clearTasksBtn.addEventListener('click', clearAllTasks);
    }

    if (addTaskBtn) addTaskBtn.addEventListener('click', addTask);
    if (taskInput) taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    if (getAiBtn) getAiBtn.addEventListener('click', getAIRecommendations);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (profileBtn) profileBtn.addEventListener('click', openProfile);
    if (saveProfileBtn) saveProfileBtn.addEventListener('click', saveProfile);
    if (themeSelector) themeSelector.addEventListener('change', changeTheme);
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);

    // Language buttons
    const langEn = document.getElementById('lang-en');
    const langHi = document.getElementById('lang-hi');
    const langTe = document.getElementById('lang-te');

    if (langEn) langEn.addEventListener('click', () => setLanguage('en'));
    if (langHi) langHi.addEventListener('click', () => setLanguage('hi'));
    if (langTe) langTe.addEventListener('click', () => setLanguage('te'));
}

// Task management
function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    input.value = '';
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}
function clearAllTasks() {
    if (tasks.length === 0) {
        alert('No tasks to clear');
        return;
    }

    const confirmClear = confirm('Are you sure you want to delete all tasks?');
    if (!confirmClear) return;

    tasks = [];
    saveTasks();
    renderTasks();
}
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}
function renderTasks() {
    const taskList = document.getElementById('task-list');
    if (!taskList) return;

    taskList.innerHTML = '';

    tasks
        .filter(task => {
            if (currentFilter === 'completed') return task.completed;
            if (currentFilter === 'pending') return !task.completed;
            return true;
        })
        .forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTask(${task.id})">
                <span class="task-text">${task.text}</span>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;

            taskList.appendChild(li);
        });
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem('tasks');
    tasks = stored ? JSON.parse(stored) : [];
    renderTasks();
}

// Profile management
function loadUserProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        try {
            const profile = JSON.parse(saved);
            const profileName = document.getElementById('profile-name');
            const userAvatar = document.getElementById('user-avatar');
            const themeSelector = document.getElementById('theme-selector');
            
            if (profileName) profileName.value = profile.name || '';
            if (userAvatar && profile.avatar) userAvatar.src = profile.avatar;
            if (themeSelector) themeSelector.value = profile.theme || 'light';
            applyTheme(profile.theme || 'light');
        } catch (e) {
            console.error('Error loading profile:', e);
        }
    }
}

function saveProfile() {
    const profileName = document.getElementById('profile-name');
    const profileAvatar = document.getElementById('profile-avatar');
    const themeSelector = document.getElementById('theme-selector');
    
    const profile = {
        name: profileName ? profileName.value : '',
        theme: themeSelector ? themeSelector.value : 'light'
    };
    
    if (profileAvatar && profileAvatar.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profile.avatar = e.target.result;
            localStorage.setItem('userProfile', JSON.stringify(profile));
            loadUserProfile();
            closeProfile();
        };
        reader.readAsDataURL(profileAvatar.files[0]);
    } else {
        localStorage.setItem('userProfile', JSON.stringify(profile));
        loadUserProfile();
        closeProfile();
    }
}

function changeTheme(e) {
    applyTheme(e.target.value);
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    profile.theme = e.target.value;
    localStorage.setItem('userProfile', JSON.stringify(profile));
}

function applyTheme(theme) {
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (theme === 'dark') {
        body.classList.add('dark');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Light Mode';
    } else {
        body.classList.remove('dark');
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Dark Mode';
    }
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    profile.theme = newTheme;
    localStorage.setItem('userProfile', JSON.stringify(profile));
}

// Profile modal
function openProfile() {
    const modal = document.getElementById('profile-modal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

function closeProfile() {
    const modal = document.getElementById('profile-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 400);
    }
}

// Authentication
function loginWithGoogle() {
    console.log("Login function called");
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    auth.signInWithPopup(provider).then((result) => {
        console.log("Login successful:", result.user);
    }).catch((error) => {
        console.error("Login error:", error);
        alert("Login failed: " + error.message);
    });
}

function logout() {
    auth.signOut().then(() => {
        currentUser = null;
        updateUserUI();
    });
}
function updateUserUI() {
    const loginBtn = document.getElementById('login-btn');
    const userProfile = document.getElementById('user-profile');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    
    if (currentUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
        if (userName) userName.textContent = currentUser.name;
        if (userAvatar) userAvatar.src = currentUser.photoURL;
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
    }
}

// AI Recommendations (mock)
function getAIRecommendations() {
    const aiText = document.getElementById('ai-text');
    if (!aiText) return;
    
    aiText.textContent = 'Loading recommendations...';
    
    const recommendations = [
        'Break down your tasks into smaller, manageable subtasks.',
        'Focus on the most important task first (80/20 rule).',
        'Take short breaks every 25 minutes (Pomodoro technique).',
        'Prioritize tasks by deadline and importance.',
        'Review your completed tasks daily for motivation.'
    ];
    
    setTimeout(() => {
        const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];
        if (aiText) aiText.textContent = randomRec;
    }, 1000);
}
