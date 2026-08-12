import { createFrameworkCourse } from '../../utils/lessonFactory';

export const nextjsCourse = createFrameworkCourse({
  id: 'nextjs-course',
  title: 'Next.js 14 & App Router',
  icon: '▲',
  color: 'slate',
  domain: 'Frontend Frameworks',
  language: 'Next.js',
  libraryName: 'Next.js',
  description: 'Master Server Components, Server Actions, App Router filesystem navigation, and SSR/SSG caching.'
});

export const vueCourse = createFrameworkCourse({
  id: 'vue-course',
  title: 'Vue 3 & Composition API',
  icon: '🟢',
  color: 'green',
  domain: 'Frontend Frameworks',
  language: 'Vue',
  libraryName: 'Vue 3',
  description: 'Master Vue 3 reactive refs, computed properties, Pinia store state management, and SFC templates.'
});

export const svelteCourse = createFrameworkCourse({
  id: 'svelte-course',
  title: 'Svelte 5 & Runes Reactivity',
  icon: '🟠',
  color: 'orange',
  domain: 'Frontend Frameworks',
  language: 'Svelte',
  libraryName: 'Svelte',
  description: 'Build ultra-fast web apps with compiler-driven reactivity, $state runes, stores, and transitions.'
});

export const expressCourse = createFrameworkCourse({
  id: 'express-course',
  title: 'Express.js & Node Backend APIs',
  icon: '🟢',
  color: 'green',
  domain: 'Backend & APIs',
  language: 'Node/Express',
  libraryName: 'Express.js',
  description: 'Build REST APIs, middleware pipelines, JWT auth, database connections, and error handling in Node.'
});

export const fastapiCourse = createFrameworkCourse({
  id: 'fastapi-course',
  title: 'FastAPI & Pydantic Microservices',
  icon: '⚡',
  color: 'cyan',
  domain: 'Backend & APIs',
  language: 'Python/FastAPI',
  libraryName: 'FastAPI',
  description: 'Build lightning-fast async Python APIs with Pydantic type validation, OpenAPI docs, and Dependency Injection.'
});

export const pandasCourse = createFrameworkCourse({
  id: 'pandas-course',
  title: 'Pandas & Data Science Pipelines',
  icon: '🐼',
  color: 'blue',
  domain: 'Data & AI Libraries',
  language: 'Python/Pandas',
  libraryName: 'Pandas',
  description: 'Manipulate DataFrames, clean synthetic data, group aggregations, merge datasets, and export CSV/JSON.'
});

export const tailwindCourse = createFrameworkCourse({
  id: 'tailwind-course',
  title: 'TailwindCSS Modern Styling',
  icon: '🎨',
  color: 'cyan',
  domain: 'Frontend Frameworks',
  language: 'CSS/Tailwind',
  libraryName: 'TailwindCSS',
  description: 'Build responsive glassmorphism UIs with utility classes, grid systems, dark mode, and arbitrary values.'
});

export const typescriptCourse = createFrameworkCourse({
  id: 'typescript-course',
  title: 'TypeScript Type Systems',
  icon: '🔷',
  color: 'blue',
  domain: 'Developer Tools',
  language: 'TypeScript',
  libraryName: 'TypeScript',
  description: 'Master static typing, interfaces, generics, union types, conditional types, and utility types.'
});

export const pytorchCourse = createFrameworkCourse({
  id: 'pytorch-course',
  title: 'PyTorch Deep Learning Foundations',
  icon: '🔥',
  color: 'orange',
  domain: 'Data & AI Libraries',
  language: 'Python/PyTorch',
  libraryName: 'PyTorch',
  description: 'Understand Tensors, Autograd automatic differentiation, Neural Network modules, loss functions, and optimizers.'
});

export const FRAMEWORK_COURSES = [
  nextjsCourse,
  vueCourse,
  svelteCourse,
  expressCourse,
  fastapiCourse,
  pandasCourse,
  tailwindCourse,
  typescriptCourse,
  pytorchCourse
];
