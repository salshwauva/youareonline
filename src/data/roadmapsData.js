/**
 * Goal-Oriented Learning Roadmaps Data Registry
 * Links structured milestone learning paths to specific interactive lesson IDs across courses.
 */

export const ROADMAPS = [
  {
    id: 'fullstack-web-architect',
    title: 'Full-Stack Web Architect',
    goal: 'Build and deploy complete end-to-end web applications, from responsive UI layouts to backend REST APIs and relational database query layers.',
    icon: '🚀',
    targetRole: 'Full-Stack Software Engineer',
    difficulty: 'Beginner to Advanced',
    estimatedHours: '40 Hours',
    badgeReward: {
      title: 'Full-Stack Master',
      icon: '🏆',
      desc: 'Completed the Full-Stack Web Architect Career Roadmap!'
    },
    colorTag: 'pink',
    milestones: [
      {
        id: 'fs-step-1',
        title: 'Phase 1: Web Structure & Layouts',
        description: 'Understand HTML semantic document trees and modern CSS Flexbox responsive card layouts.',
        lessons: [
          { id: 'html-first-page', title: '1.1 HTML Document Fundamentals', courseTitle: 'HTML & CSS', courseId: 'html-css-course' },
          { id: 'web-flexbox-card', title: '1.2 CSS Flexbox Alignment', courseTitle: 'HTML & CSS', courseId: 'html-css-course' },
          { id: 'web-boss-ch2', title: '1.3 👑 BOSS: Y2K Anime Card UI', courseTitle: 'HTML & CSS', courseId: 'html-css-course', isBoss: true }
        ]
      },
      {
        id: 'fs-step-2',
        title: 'Phase 2: Modern JavaScript Logic',
        description: 'Master core variable scope, array transformations, and functional logic primitives.',
        lessons: [
          { id: 'js-hello-world', title: '2.1 JavaScript Execution & Log', courseTitle: 'JavaScript', courseId: 'javascript-course' },
          { id: 'js-array-methods', title: '2.2 Array map(), filter(), & reduce()', courseTitle: 'JavaScript', courseId: 'javascript-course' },
          { id: 'js-boss-ch2', title: '2.3 👑 BOSS: E-Commerce Shopping Cart', courseTitle: 'JavaScript', courseId: 'javascript-course', isBoss: true }
        ]
      },
      {
        id: 'fs-step-3',
        title: 'Phase 3: Component Architecture & Styling',
        description: 'Build modular reactive interfaces using JSX props, hooks, and utility CSS.',
        lessons: [
          { id: 'react-first-component', title: '3.1 React Component State & Props', courseTitle: 'React', courseId: 'react-course' },
          { id: 'tailwind-course-1-1-intro', title: '3.2 Tailwind Utility-First Styling', courseTitle: 'TailwindCSS', courseId: 'tailwind-course' },
          { id: 'typescript-course-1-1-intro', title: '3.3 TypeScript Static Type Safety', courseTitle: 'TypeScript', courseId: 'typescript-course' }
        ]
      },
      {
        id: 'fs-step-4',
        title: 'Phase 4: Backend API & Relational Storage',
        description: 'Construct Node/Express web API routes and query relational database records with SQL.',
        lessons: [
          { id: 'express-course-1-1-intro', title: '4.1 Express API Routing & Middleware', courseTitle: 'Express.js', courseId: 'express-course' },
          { id: 'sql-aggregations-course', title: '4.2 SQL GROUP BY & Table JOINs', courseTitle: 'SQL Databases', courseId: 'sql-course' }
        ]
      },
      {
        id: 'fs-step-5',
        title: 'Phase 5: Full-Stack SSR Capstone',
        description: 'Deploy full-stack React applications using Next.js App Router and Server Actions.',
        lessons: [
          { id: 'nextjs-course-1-1-intro', title: '5.1 Next.js App Router & Server Components', courseTitle: 'Next.js', courseId: 'nextjs-course' },
          { id: 'nextjs-course-2-2-boss', title: '5.2 👑 BOSS: Production Next.js SaaS', courseTitle: 'Next.js', courseId: 'nextjs-course', isBoss: true }
        ]
      }
    ]
  },
  {
    id: 'data-ai-engineer',
    title: 'Data Science & AI Engineer',
    goal: 'Master data extraction, SQL aggregations, DataFrame manipulations with Pandas, and deep learning model training using PyTorch.',
    icon: '🤖',
    targetRole: 'AI / Data Science Specialist',
    difficulty: 'Intermediate',
    estimatedHours: '35 Hours',
    badgeReward: {
      title: 'AI Pipeline Architect',
      icon: '🧠',
      desc: 'Completed the Data Science & AI Engineer Career Roadmap!'
    },
    colorTag: 'blue',
    milestones: [
      {
        id: 'ai-step-1',
        title: 'Phase 1: Python Data Primitives',
        description: 'Write clean Python scripts, understand dynamic typing, and master list comprehensions.',
        lessons: [
          { id: 'py-first-code', title: '1.1 Python Syntax & Variables', courseTitle: 'Python Core', courseId: 'python-course' },
          { id: 'py-list-comprehension', title: '1.2 Single-Line List Comprehensions', courseTitle: 'Python Core', courseId: 'python-course' },
          { id: 'py-boss-ch2', title: '1.3 👑 BOSS: Automated Data Log Cleaner', courseTitle: 'Python Core', courseId: 'python-course', isBoss: true }
        ]
      },
      {
        id: 'ai-step-2',
        title: 'Phase 2: Relational Analytics & SQL',
        description: 'Filter, aggregate, and join complex relational tables to extract key metrics.',
        lessons: [
          { id: 'sql-aggregations-course', title: '2.1 SQL Aggregations & Analytical Joins', courseTitle: 'SQL Databases', courseId: 'sql-course' }
        ]
      },
      {
        id: 'ai-step-3',
        title: 'Phase 3: Pandas Data Wrangling',
        description: 'Perform synthetic data cleaning, grouping, matrix merges, and CSV transformations.',
        lessons: [
          { id: 'pandas-course-1-1-intro', title: '3.1 Pandas DataFrames & Ingestion', courseTitle: 'Pandas', courseId: 'pandas-course' },
          { id: 'pandas-course-2-2-boss', title: '3.2 👑 BOSS: Production Data Analytics Pipeline', courseTitle: 'Pandas', courseId: 'pandas-course', isBoss: true }
        ]
      },
      {
        id: 'ai-step-4',
        title: 'Phase 4: Neural Networks & Deep Learning',
        description: 'Understand Tensor operations, autograd automatic differentiation, and loss optimizers in PyTorch.',
        lessons: [
          { id: 'pytorch-course-1-1-intro', title: '4.1 PyTorch Tensors & Autograd', courseTitle: 'PyTorch', courseId: 'pytorch-course' },
          { id: 'pytorch-course-2-2-boss', title: '4.2 👑 BOSS: Deep Learning Classifier Capstone', courseTitle: 'PyTorch', courseId: 'pytorch-course', isBoss: true }
        ]
      }
    ]
  },
  {
    id: 'systems-developer',
    title: 'Systems & High-Performance Developer',
    goal: 'Understand low-level memory allocation, direct pointer arithmetic, command line terminal navigation, and memory-safe Rust system programming.',
    icon: '⚙️',
    targetRole: 'Systems & Embedded Engineer',
    difficulty: 'Intermediate to Advanced',
    estimatedHours: '45 Hours',
    badgeReward: {
      title: 'Systems Overlord',
      icon: '⚡',
      desc: 'Completed the Systems & High-Performance Developer Career Roadmap!'
    },
    colorTag: 'yellow',
    milestones: [
      {
        id: 'sys-step-1',
        title: 'Phase 1: Command Line & Terminal Navigation',
        description: 'Master UNIX terminal commands, file directory manipulation, and shell pipes.',
        lessons: [
          { id: 'cli-navigation', title: '1.1 Terminal Directory & Shell Navigation', courseTitle: 'Terminal & Git', courseId: 'git-cli-course' }
        ]
      },
      {
        id: 'sys-step-2',
        title: 'Phase 2: C++ Pointers & Memory Allocation',
        description: 'Understand heap vs stack memory allocation, raw dereferencing, and std::unique_ptr RAII safety.',
        lessons: [
          { id: 'cpp-pointers-course', title: '2.1 C++ Pointer Operations & Dereferencing', courseTitle: 'C++ Systems', courseId: 'cpp-course' },
          { id: 'cpp-smart-pointers-course', title: '2.2 C++ RAII & Smart Pointers', courseTitle: 'C++ Systems', courseId: 'cpp-course' }
        ]
      },
      {
        id: 'sys-step-3',
        title: 'Phase 3: Rust Borrow Checker & Safety',
        description: 'Master zero-cost abstractions, move semantics, borrow checker rules, and Option/Result pattern matching.',
        lessons: [
          { id: 'rust-ownership', title: '3.1 Rust Ownership & Move Semantics', courseTitle: 'Rust', courseId: 'rust-course' },
          { id: 'rust-pattern-matching', title: '3.2 Pattern Matching & Enum Handling', courseTitle: 'Rust', courseId: 'rust-course' },
          { id: 'rust-course-2-2-boss', title: '3.3 👑 BOSS: Production Memory-Safe Engine', courseTitle: 'Rust', courseId: 'rust-course', isBoss: true }
        ]
      }
    ]
  },
  {
    id: 'cloud-backend-engineer',
    title: 'Cloud API & Microservices Engineer',
    goal: 'Design scalable asynchronous APIs, typed Pydantic data schemas, containerized REST endpoints, and relational database layers.',
    icon: '⚡',
    targetRole: 'Backend / Infrastructure Engineer',
    difficulty: 'Intermediate',
    estimatedHours: '30 Hours',
    badgeReward: {
      title: 'Cloud Architect',
      icon: '🌐',
      desc: 'Completed the Cloud API & Microservices Engineer Career Roadmap!'
    },
    colorTag: 'green',
    milestones: [
      {
        id: 'cloud-step-1',
        title: 'Phase 1: Shell & Environment Workflows',
        description: 'Execute shell commands, set environment variables, and manage local dev instances.',
        lessons: [
          { id: 'cli-navigation', title: '1.1 UNIX Shell & Workflows', courseTitle: 'Terminal & Git', courseId: 'git-cli-course' }
        ]
      },
      {
        id: 'cloud-step-2',
        title: 'Phase 2: Python Async Microservices',
        description: 'Build lightning-fast async Python APIs using FastAPI and Pydantic request validation.',
        lessons: [
          { id: 'fastapi-course-1-1-intro', title: '2.1 FastAPI Dependency Injection & Routes', courseTitle: 'FastAPI', courseId: 'fastapi-course' },
          { id: 'fastapi-course-2-2-boss', title: '2.2 👑 BOSS: Microservice API Cluster', courseTitle: 'FastAPI', courseId: 'fastapi-course', isBoss: true }
        ]
      },
      {
        id: 'cloud-step-3',
        title: 'Phase 3: Database & Node Middleware',
        description: 'Execute analytical SQL queries and build Express authentication middleware pipelines.',
        lessons: [
          { id: 'sql-aggregations-course', title: '3.1 Relational Database Querying', courseTitle: 'SQL Databases', courseId: 'sql-course' },
          { id: 'express-course-1-1-intro', title: '3.2 Express JWT Middleware & APIs', courseTitle: 'Express.js', courseId: 'express-course' }
        ]
      }
    ]
  },
  {
    id: 'frontend-specialist',
    title: 'Modern Frontend Specialist',
    goal: 'Craft pixel-perfect, highly responsive client UIs using HTML5, CSS Flexbox, Tailwind, React, Vue, Svelte, and Next.js.',
    icon: '🎨',
    targetRole: 'Frontend Developer / UI Architect',
    difficulty: 'Beginner to Intermediate',
    estimatedHours: '30 Hours',
    badgeReward: {
      title: 'UI Wizard',
      icon: '✨',
      desc: 'Completed the Modern Frontend Specialist Career Roadmap!'
    },
    colorTag: 'purple',
    milestones: [
      {
        id: 'fe-step-1',
        title: 'Phase 1: Core Web Styling & Layouts',
        description: 'Master HTML elements, Flexbox centering, and Tailwind utility classes.',
        lessons: [
          { id: 'html-first-page', title: '1.1 HTML Structure', courseTitle: 'HTML & CSS', courseId: 'html-css-course' },
          { id: 'web-flexbox-card', title: '1.2 Flexbox Layouts', courseTitle: 'HTML & CSS', courseId: 'html-css-course' },
          { id: 'tailwind-course-1-1-intro', title: '1.3 TailwindCSS Utility Design', courseTitle: 'TailwindCSS', courseId: 'tailwind-course' }
        ]
      },
      {
        id: 'fe-step-2',
        title: 'Phase 2: React Component State',
        description: 'Construct stateful UI components with JSX and hooks.',
        lessons: [
          { id: 'react-first-component', title: '2.1 React Component State & Props', courseTitle: 'React', courseId: 'react-course' }
        ]
      },
      {
        id: 'fe-step-3',
        title: 'Phase 3: Reactive Framework Ecosystem',
        description: 'Explore reactive primitives in Vue 3 composition API and Svelte 5 runes.',
        lessons: [
          { id: 'vue-course-1-1-intro', title: '3.1 Vue 3 Composition API & Refs', courseTitle: 'Vue', courseId: 'vue-course' },
          { id: 'svelte-course-1-1-intro', title: '3.2 Svelte 5 Runes Reactivity', courseTitle: 'Svelte', courseId: 'svelte-course' }
        ]
      }
    ]
  }
];

export function getRoadmapById(id) {
  return ROADMAPS.find(r => r.id === id) || ROADMAPS[0];
}
