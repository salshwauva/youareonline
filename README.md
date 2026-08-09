# 🌸 YOU ARE ONLINE 💕

> A curated, light-mode, anime-inspired gamified CS and programming platform inspired by **codedex.io**.

![You Are Online Header](https://img.shields.io/badge/YOU_ARE-ONLINE-ff69b4?style=for-the-badge&logo=react&logoColor=white)
![Build Status](https://img.shields.io/badge/Build-Passing-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-c084fc?style=for-the-badge)

---

## 🌟 Overview

**You Are Online** is an interactive, 8-bit retro-styled coding platform featuring automated synthetic data generators, interactive memory sandboxes, LeetCode-style algorithmic test benches, in-browser SQLite database engines, CLI shell emulators, multi-core CPU concurrency simulators, and Web Audio API synthesized sound effects.

---

## 🌸 Curriculum Tracks & Quests

| Category | Languages & Tools | Core Quests & Simulators |
| :--- | :--- | :--- |
| 🛡️ **Systems & Core** | Rust, C++, Java, C# | 🦀 Rust Ownership & Borrowing Sandbox (`&T` vs `&mut T`), C++ Pointers & Smart Pointers (`std::unique_ptr`), Java JVM Memory & GC |
| 📊 **Data & Algorithms** | Python, SQL, NumPy, Pandas | 🚀 Algorithmic Test Bench (N=10,000 empirical Big-O time curves), Valid Parentheses Stack, Synthetic EDA |
| 🏗️ **Software Architecture** | JavaScript, TypeScript, Node.js | 🏛️ SOLID Principles Refactoring, LRU Cache O(1) Design Challenge, Design Patterns |
| ⚡ **Under-the-Hood** | Command Line, Git, OS Architecture | 🖥️ Unix CLI Shell Simulator, Git DAG & Branching, OS Multi-Threaded CPU Concurrency & Mutex Locks |
| 🎨 **Web Dev & UI/UX** | HTML, CSS, React | 🖼️ Pixel-Perfect CSS Grid & Flexbox, Browser Event Loop & Microtask Queue |

---

## ✨ Features

- 🌸 **Cute Light Mode Anime Aesthetic**: Soft sakura pinks (`#fff5f8`), hot pink accents (`#ff69b4`), soft lavender, and retro pixel typography (*Silkscreen*, *Press Start 2P*, *Fira Code*).
- 🔊 **Synthesized 8-Bit Web Audio**: Pure Web Audio API retro sound generator for navigation blips, quest completion fanfares, level-ups, and badge unlock tunes.
- 🧪 **Interactive Simulators**:
  - **Rust Memory Visualizer**: Real-time stack vs heap allocation diagrams and borrow checker rule telemetry.
  - **Algorithmic Test Bench**: Evaluates user code against random edge cases and plots SVG time curves.
  - **In-Browser SQLite Engine**: Pre-seeded with synthetic e-commerce tables (`users`, `orders`, `products`).
  - **Kawaii Terminal Shell**: Interactive ZSH shell supporting `ls`, `cd`, `cat`, `mkdir`, `git init`, `git status`, `git commit`.
  - **CPU Threads Simulator**: Multi-core CPU scheduler with mutex lock contention and deadlock detection.
  - **Synthetic Data Generator**: Real-time customizable JSON & CSV mock dataset generator with copy and download options.
- 🎮 **RPG Progress System**: XP counters, level progression (`Math.floor(XP / 100) + 1`), daily streak flame, unlocked badges inventory, and `localStorage` persistence.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/salshwauva/youareonline.git

# Navigate into project directory
cd youareonline

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be live at `http://127.0.0.1:3000/`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, Vanilla CSS (Design Tokens & Pixel Utilities)
- **Icons & Animation**: Lucide React, Canvas Confetti
- **Sound**: Web Audio API Synthesizer
- **Build Tooling**: Vite, ESBuild

---

## 📄 License

Distributed under the MIT License.
