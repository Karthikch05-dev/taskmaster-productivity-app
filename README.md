# 🚀 TaskMaster – Student Productivity App

TaskMaster is a modern, lightweight productivity web application built for students to manage daily tasks efficiently with a smooth, professional UI/UX experience.

The app focuses on **simplicity, performance, clean design, and secure authentication**, making it suitable for real-world usage and portfolio demonstration.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [UI/UX Principles](#uiux-principles)
- [Authentication Flow](#authentication-flow)
- [Dark Mode System](#dark-mode-system)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Installation & Setup](#installation--setup)
- [Firebase Configuration](#firebase-configuration)
- [Usage Guide](#usage-guide)
- [Performance & UX Optimizations](#performance--ux-optimizations)
- [Security Considerations](#security-considerations)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)
- [Author](#author)
- [License](#license)
- [Support](#support)

---

## 📖 About the Project

TaskMaster is a **student-focused productivity tool** that helps users organize tasks, stay focused, and improve daily productivity.

It uses **Firebase Authentication** for secure login, **LocalStorage** for fast data persistence, and a **clean UI/UX system** designed to feel smooth and modern.

This project is built using **Vanilla JavaScript**, without any frameworks, to demonstrate strong fundamentals and clean architecture.

---

## 🌐 Live Demo

🔗 Live URL: *(Add your deployed link here — Vercel / GitHub Pages)*

---

## ✨ Features

### 🔐 Authentication
- Dedicated login screen
- Google Sign-In using Firebase Authentication
- Authentication guard (protected routes)
- Persistent login across sessions
- Secure logout

### 📝 Task Management
- Add, complete, and delete tasks
- Filter tasks:
  - All
  - Pending
  - Completed
- Clear all tasks with confirmation
- Local storage persistence

### 🤖 AI Productivity Recommendations
- AI-generated productivity tips
- Encourages better task planning and focus

### 🌙 Dark Mode
- Light / Dark theme support
- Theme persistence using LocalStorage
- Smooth transitions without flicker
- Consistent styling across all components

### 🌍 Multi-Language Support
- English
- Hindi
- Telugu
- Language preference saved locally

### 🎨 Smooth UI/UX
- Modern and clean design
- Smooth animations and transitions
- Responsive layout
- No UI flashing or layout shifting
- Consistent spacing and visual hierarchy

---

## 🛠 Tech Stack

| Category | Technology |
|--------|------------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Authentication | Firebase Authentication |
| Storage | LocalStorage |
| Styling | Custom CSS, animations |
| Deployment | GitHub Pages / Vercel |
| Tools | VS Code, GitHub |

---

## 🎨 UI/UX Principles

- Minimal and distraction-free layout
- Smooth transitions and animations
- Clear feedback for user actions
- No abrupt UI changes
- Consistent color and spacing system
- Accessibility-aware contrast and sizing

---

## 🔐 Authentication Flow

1. User opens the app
2. Login screen is displayed
3. User signs in with Google
4. Firebase verifies authentication
5. App checks auth state before rendering UI
6. Authenticated users access full features
7. Unauthorized users are redirected to login

---

## 🌙 Dark Mode System

- Controlled using class-based styling
- Stored and retrieved from LocalStorage
- Synced across:
  - Toggle button
  - Profile preferences
- Applied before UI render to prevent flashing

---
