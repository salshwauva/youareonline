import { javascriptCourse } from './courses/javascript';
import { pythonCourse } from './courses/python';
import { htmlCssCourse } from './courses/html-css';
import { rustCourse } from './courses/rust';
import { sqlCourse } from './courses/sql';
import { cppCourse } from './courses/cpp';
import { gitCliCourse } from './courses/git-cli';
import { reactCourse } from './courses/react';
import { apiCourse, mcpCourse, networkingCourse } from './courses/api-mcp-networking';
import { FRAMEWORK_COURSES } from './courses/frameworks';

export const CORE_COURSES = [
  javascriptCourse,
  pythonCourse,
  htmlCssCourse,
  rustCourse,
  sqlCourse,
  cppCourse,
  gitCliCourse,
  reactCourse,
  apiCourse,
  mcpCourse,
  networkingCourse
];

export const ALL_COURSES = [
  ...CORE_COURSES,
  ...FRAMEWORK_COURSES
];

export const DOMAINS = [
  'ALL DOMAINS',
  'Frontend Frameworks',
  'Backend & APIs',
  'Data & AI Libraries',
  'Web Development',
  'Systems Engineering',
  'Data & Databases',
  'Developer Tools'
];

export function getAllCourses() {
  return ALL_COURSES;
}

export function getCourseById(courseId) {
  return ALL_COURSES.find(c => c.id === courseId) || ALL_COURSES[0];
}

export function getLessonById(lessonId) {
  for (const course of ALL_COURSES) {
    for (const chapter of course.chapters) {
      const lesson = chapter.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return { lesson, chapter, course };
      }
    }
  }
  // Default fallback
  const firstCourse = ALL_COURSES[0];
  const firstChapter = firstCourse.chapters[0];
  const firstLesson = firstChapter.lessons[0];
  return { lesson: firstLesson, chapter: firstChapter, course: firstCourse };
}

export function getAdjacentLessons(lessonId) {
  const allLessonsFlat = [];
  ALL_COURSES.forEach(course => {
    course.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        allLessonsFlat.push({ lesson, chapter, course });
      });
    });
  });

  const currentIndex = allLessonsFlat.findIndex(item => item.lesson.id === lessonId);
  const prevItem = currentIndex > 0 ? allLessonsFlat[currentIndex - 1] : null;
  const nextItem = currentIndex < allLessonsFlat.length - 1 ? allLessonsFlat[currentIndex + 1] : null;

  return { prevItem, nextItem, totalCount: allLessonsFlat.length, currentIndex: currentIndex + 1 };
}

export function searchLessons(query) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  const results = [];

  ALL_COURSES.forEach(course => {
    course.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        if (
          lesson.title.toLowerCase().includes(q) ||
          lesson.theory.toLowerCase().includes(q) ||
          course.title.toLowerCase().includes(q) ||
          course.language.toLowerCase().includes(q) ||
          (course.domain && course.domain.toLowerCase().includes(q))
        ) {
          results.push({ lesson, chapter, course });
        }
      });
    });
  });

  return results;
}
