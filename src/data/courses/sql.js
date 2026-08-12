export const sqlCourse = {
  id: 'sql-course',
  title: 'SQL & Database Engineering',
  icon: '💾',
  mascotImg: '/assets/sql_mascot.jpg',
  color: 'blue',
  domain: 'Data & Databases',
  language: 'SQL',
  difficulty: 'Beginner to Intermediate',
  badgeClass: 'badge-blue',
  description: 'Execute relational queries, JOINs, GROUP BY aggregations, window functions, and query optimization.',
  chapters: [
    {
      id: 'sql-ch1-queries',
      title: 'Chapter 1: Querying & Aggregations',
      description: 'SELECT, WHERE, JOINs, GROUP BY, and aggregate functions.',
      lessons: [
        {
          id: 'sql-aggregations-course',
          title: '1.1 SQL GROUP BY & Table Joins',
          type: 'simulator',
          simulatorType: 'sql-playground',
          xp: 100,
          badge: { id: 'sql_sage', title: 'Query Master', desc: 'Executed complex SQL joins and GROUP BY queries!', icon: '💾' },
          theory: `Relational databases rely on SQL queries to filter, join, and aggregate datasets across multiple tables.`,
          instructions: 'Run SQL queries against our auto-seeded SQLite database! Find the top spent customers.',
          starterCode: `SELECT u.name, SUM(o.amount) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id
ORDER BY total_spent DESC;`,
          solutionCode: `SELECT u.name, SUM(o.amount) AS total_spent`,
          testCases: [
            { name: 'SUM aggregation applied', check: (code) => code.toUpperCase().includes('SUM(') },
            { name: 'JOIN clause present', check: (code) => code.toUpperCase().includes('JOIN') }
          ]
        }
      ]
    }
  ]
};
