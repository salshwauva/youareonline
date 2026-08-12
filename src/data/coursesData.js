import { ALL_COURSES, getLessonById, getCourseById } from './courseRegistry';

// Backwards compatibility layer mapping ALL_COURSES to legacy TRACKS_DATA shape
export const TRACKS_DATA = ALL_COURSES.map(course => ({
  id: course.id,
  title: course.title,
  icon: course.icon,
  color: course.color,
  badgeClass: course.badgeClass,
  description: course.description,
  languages: [course.language],
  quests: course.chapters.flatMap(ch => ch.lessons.map(l => ({
    ...l,
    instructions: l.instructions || 'Complete the lesson objectives outlined in the theory panel.',
    starterCode: l.starterCode || '// Write your code here',
    solutionCode: l.solutionCode || '',
    testCases: l.testCases || [],
    simulatorType: l.simulatorType || (l.type === 'simulator' ? 'rust-memory' : 'code-only')
  })))
}));

export function getQuestById(questId) {
  const { lesson, course } = getLessonById(questId);
  const track = TRACKS_DATA.find(t => t.id === course.id) || TRACKS_DATA[0];
  const quest = {
    ...lesson,
    instructions: lesson.instructions || 'Complete the lesson objectives outlined in the theory panel.',
    starterCode: lesson.starterCode || '// Write your code here',
    solutionCode: lesson.solutionCode || '',
    testCases: lesson.testCases || [],
    simulatorType: lesson.simulatorType || (lesson.type === 'simulator' ? 'rust-memory' : 'code-only')
  };
  return { quest, track };
}

