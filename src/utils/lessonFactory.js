/**
 * Lesson & Course Factory Infrastructure for Frameworks and Libraries
 * Provides dynamic course generation stubs, standardized exercise templates,
 * and automated test generators for web frameworks, data libraries, and backend tools.
 */

export function createFrameworkCourse({
  id,
  title,
  icon,
  color = 'blue',
  domain = 'Frontend Frameworks',
  language,
  libraryName,
  difficulty = 'Beginner to Intermediate',
  badgeClass = 'badge-blue',
  description,
  chapters = []
}) {
  return {
    id,
    title,
    icon,
    color,
    domain,
    language: language || libraryName,
    libraryName,
    difficulty,
    badgeClass,
    description: description || `Master building modern applications with ${libraryName}.`,
    chapters: chapters.length > 0 ? chapters : createDefaultFrameworkChapters(id, libraryName)
  };
}

/**
 * Generates structured chapter stubs for a framework or library course
 */
export function createDefaultFrameworkChapters(courseId, libraryName) {
  return [
    {
      id: `${courseId}-ch1-core`,
      title: `Chapter 1: ${libraryName} Fundamentals & Setup`,
      description: `Core primitives, initialization, and primary API patterns in ${libraryName}.`,
      lessons: [
        {
          id: `${courseId}-1-1-intro`,
          title: `1.1 Introduction to ${libraryName}`,
          type: 'code',
          xp: 50,
          badge: { id: `${courseId}_starter`, title: `${libraryName} Novice`, desc: `Started learning ${libraryName}!`, icon: '⚡' },
          theory: `Welcome to **${libraryName}**!\n\nThis lesson introduces core concepts and foundational syntax of ${libraryName}.`,
          instructions: `Complete the ${libraryName} initialization code sample in the editor.`,
          starterCode: `// ${libraryName} Initialization Example\nconsole.log("${libraryName} is ready!");`,
          solutionCode: `console.log("${libraryName} is ready!");`,
          testCases: [
            { name: `${libraryName} output verified`, check: (code) => code.includes(libraryName) }
          ]
        },
        {
          id: `${courseId}-1-2-quiz`,
          title: `1.2 Quiz: ${libraryName} Core Concepts`,
          type: 'quiz',
          xp: 40,
          quizData: {
            question: `What is the primary design purpose of ${libraryName}?`,
            options: [
              `To streamline component rendering and state flow in modern apps`,
              `To replace low-level OS drivers`,
              `To compile WebAssembly binaries only`,
              `To format SQL database tables`
            ],
            correctOptionIndex: 0,
            explanation: `${libraryName} is designed to simplify application development and modular architectural patterns.`
          }
        }
      ]
    },
    {
      id: `${courseId}-ch2-advanced`,
      title: `Chapter 2: Advanced ${libraryName} Patterns & State`,
      description: `Production patterns, performance optimization, and real-world architectures in ${libraryName}.`,
      lessons: [
        {
          id: `${courseId}-2-1-patterns`,
          title: `2.1 ${libraryName} Design Patterns`,
          type: 'code',
          xp: 75,
          badge: { id: `${courseId}_pro`, title: `${libraryName} Expert`, desc: `Mastered ${libraryName} patterns!`, icon: '🌟' },
          theory: `Master advanced state handling and composition patterns in **${libraryName}**.`,
          instructions: `Implement the pattern function according to ${libraryName} best practices.`,
          starterCode: `function handleData(input) {\n  // Implement ${libraryName} pattern\n  return input;\n}`,
          solutionCode: `function handleData(input) { return input; }`,
          testCases: [
            { name: 'Function handleData defined', check: (code) => code.includes('handleData') }
          ]
        },
        {
          id: `${courseId}-2-2-boss`,
          title: `2.2 🏆 BOSS PROJECT: Production ${libraryName} App`,
          type: 'code',
          isBoss: true,
          xp: 125,
          badge: { id: `${courseId}_boss`, title: `${libraryName} Mastermind`, desc: `Built a complete ${libraryName} production capstone!`, icon: '👑' },
          theory: `**CAPSTONE BOSS CHALLENGE**: Combine all ${libraryName} techniques learned into a unified application module!`,
          instructions: `Build a complete data management component using ${libraryName}.`,
          starterCode: `// Capstone ${libraryName} Component\nfunction CapstoneApp() {\n  return "App Running";\n}`,
          solutionCode: `function CapstoneApp() { return "App Running"; }`,
          testCases: [
            { name: 'CapstoneApp defined', check: (code) => code.includes('CapstoneApp') }
          ]
        }
      ]
    }
  ];
}
