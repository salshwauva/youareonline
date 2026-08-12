export const reactCourse = {
  id: 'react-course',
  title: 'React & UI Architecture',
  icon: '⚛️',
  color: 'cyan',
  domain: 'Web Development',
  language: 'React',
  difficulty: 'Intermediate',
  badgeClass: 'badge-blue',
  description: 'Build modern user interfaces with JSX, component props, useState hooks, useEffect, and custom hooks.',
  chapters: [
    {
      id: 'react-ch1-components',
      title: 'Chapter 1: JSX & Component State',
      description: 'JSX syntax rules, functional components, props, and useState hooks.',
      lessons: [
        {
          id: 'react-first-component',
          title: '1.1 JSX Components & Props',
          type: 'code',
          xp: 75,
          badge: { id: 'react_dev', title: 'React Builder', desc: 'Created first React functional component!', icon: '⚛️' },
          theory: `React components are JavaScript functions that return JSX markup:

\`\`\`jsx
function Badge({ title, level }) {
  return <div className="badge">{title} (Lvl {level})</div>;
}
\`\`\``,
          instructions: 'Create a React functional component `StatusBadge` that accepts a `status` prop and returns a `<span>` element.',
          starterCode: `function StatusBadge({ status }) {
  return (
    <span className="status-pill">
      Status: {status}
    </span>
  );
}

// Example usage: <StatusBadge status="ONLINE" />`,
          solutionCode: `<span className="status-pill">`,
          testCases: [
            { name: 'Function StatusBadge declared', check: (code) => code.includes('StatusBadge') },
            { name: 'Renders status prop in JSX', check: (code) => code.includes('{status}') || code.includes('status') }
          ]
        }
      ]
    }
  ]
};
