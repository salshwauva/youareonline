export const pythonCourse = {
  id: 'python-course',
  title: 'Python 101: Code & Automation',
  icon: '🐍',
  mascotImg: '/assets/python_mascot.jpg',
  color: 'green',
  domain: 'Data & Automation',
  language: 'Python',
  difficulty: 'Beginner',
  badgeClass: 'badge-green',
  description: 'Master idiomatic Python syntax, data structures, control flow, functions, list comprehensions, and data pipelines.',
  chapters: [
    {
      id: 'py-ch1-basics',
      title: 'Chapter 1: Hello Python & Variables',
      description: 'First steps with Python, printing, variables, f-strings, and data types.',
      lessons: [
        {
          id: 'py-first-code',
          title: '1.1 First Python Code & f-Strings',
          type: 'code',
          xp: 50,
          badge: { id: 'python_starter', title: 'Python Novice', desc: 'Wrote first Python script!', icon: '🐍' },
          theory: `Python is famous for clean, readable syntax! Use \`print()\` to output text, and f-strings for string interpolation:

\`\`\`python
name = "Sophia"
print(f"Hello, {name}!")
\`\`\``,
          instructions: 'Create a variable `player = "Aria"` and print `"Level up, Aria!"` using an f-string.',
          starterCode: `# Write your Python code below
player = "Aria"
print(f"Level up, {player}!")`,
          solutionCode: `print(f"Level up, {player}!")`,
          testCases: [
            { name: 'player variable assigned', check: (code) => code.includes('player =') },
            { name: 'Uses f-string print', check: (code) => code.includes('f"Level up') || code.includes("f'Level up") }
          ]
        },
        {
          id: 'py-quiz-types',
          title: '1.2 Quiz: Python Data Types & Immutability',
          type: 'quiz',
          xp: 40,
          quizData: {
            question: 'Which of the following Python data structures is IMMUTABLE (cannot be modified after creation)?',
            options: [
              'List [1, 2, 3]',
              'Dictionary {"a": 1}',
              'Tuple (1, 2, 3)',
              'Set {1, 2, 3}'
            ],
            correctOptionIndex: 2,
            explanation: 'Tuples in Python are enclosed in parentheses `()` and are immutable sequences, unlike mutable lists and dicts.'
          }
        }
      ]
    },
    {
      id: 'py-ch2-comprehensions',
      title: 'Chapter 2: Comprehensions & Data Processing',
      description: 'Master list comprehensions, dictionary comprehensions, decorators, and data filtering.',
      lessons: [
        {
          id: 'py-list-comprehension',
          title: '2.1 List Comprehensions & Filtering',
          type: 'code',
          xp: 80,
          badge: { id: 'py_comp_master', title: 'Comprehension Master', desc: 'Wrote clean single-line Python comprehensions!', icon: '⚡' },
          theory: `List comprehensions provide a concise way to create lists in Python:

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers if x % 2 == 0]
# Result: [4, 16]
\`\`\``,
          instructions: 'Filter numbers greater than 10 and square them using a list comprehension.',
          starterCode: `numbers = [4, 12, 7, 15, 3, 20]

# Write list comprehension below
squared_large = [n ** 2 for n in numbers if n > 10]

print(squared_large)`,
          solutionCode: `[n ** 2 for n in numbers if n > 10]`,
          testCases: [
            { name: 'List comprehension syntax used', check: (code) => code.includes('[') && code.includes('for') && code.includes('if') }
          ]
        },
        {
          id: 'py-boss-ch2',
          title: '2.2 🏆 BOSS PROJECT: Synthetic Data Processing Pipeline',
          type: 'code',
          isBoss: true,
          xp: 130,
          badge: { id: 'py_boss_1', title: 'Pipeline Architect', desc: 'Built a Python synthetic data pipeline!', icon: '👑' },
          theory: `**BOSS CAPSTONE**: Process synthetic sensor records to compute average temperature readings!`,
          instructions: 'Write a function `avg_temp(records)` that filters out invalid negative readings and returns the float average.',
          starterCode: `records = [22.5, 23.0, -99.0, 24.1, -99.0, 21.8]

def avg_temp(data):
    valid = [t for t in data if t > 0]
    return sum(valid) / len(valid)

print("Average temperature:", avg_temp(records))`,
          solutionCode: `sum(valid) / len(valid)`,
          testCases: [
            { name: 'Filters out negative readings', check: (code) => code.includes('> 0') || code.includes('>= 0') },
            { name: 'Computes sum divided by length', check: (code) => code.includes('sum(') && code.includes('len(') }
          ]
        }
      ]
    }
  ]
};
