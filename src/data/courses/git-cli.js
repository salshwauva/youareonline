export const gitCliCourse = {
  id: 'git-cli-course',
  title: 'Command Line & Git Version Control',
  icon: '🖥️',
  color: 'purple',
  domain: 'Developer Tools',
  language: 'Terminal & Git',
  difficulty: 'Beginner to Intermediate',
  badgeClass: 'badge-purple',
  description: 'Master Unix ZSH shell commands, file navigation, shell piping, Git DAG commits, branching, and merging.',
  chapters: [
    {
      id: 'cli-ch1-terminal',
      title: 'Chapter 1: Unix Shell Navigation & Operations',
      description: 'Directory navigation (cd, ls, pwd), file creation (touch, mkdir, cat), and piping.',
      lessons: [
        {
          id: 'cli-navigation',
          title: '1.1 Terminal Navigation & File Operations',
          type: 'simulator',
          simulatorType: 'terminal',
          xp: 80,
          badge: { id: 'cli_ninja', title: 'Terminal Ninja', desc: 'Navigated the command line shell!', icon: '🖥️' },
          theory: `The Command Line Interface (CLI) allows fast interaction with the operating system through terminal commands like \`ls\`, \`cd\`, \`pwd\`, and \`mkdir\`.`,
          instructions: 'Use the interactive ZSH Shell Sandbox to run `ls`, `mkdir projects`, and `cd projects`.',
          starterCode: `# Interactive Terminal Session
$ ls
$ mkdir projects
$ cd projects`,
          solutionCode: `mkdir projects`,
          testCases: [
            { name: 'Terminal interactive shell launched', check: (code) => true }
          ]
        }
      ]
    }
  ]
};
