export const javascriptCourse = {
  id: 'javascript-course',
  title: 'JavaScript Web Mastery',
  icon: '⚡',
  color: 'yellow',
  domain: 'Web Development',
  language: 'JavaScript',
  difficulty: 'Beginner to Intermediate',
  badgeClass: 'badge-gold',
  description: 'Master modern JavaScript, ES6+ syntax, functions, arrays, DOM manipulation, async Promises, and Web APIs.',
  chapters: [
    {
      id: 'js-ch1-basics',
      title: 'Chapter 1: JS Fundamentals & Variables',
      description: 'Learn variables (let, const), data types, console logging, and string interpolation.',
      lessons: [
        {
          id: 'js-hello-world',
          title: '1.1 Hello World & Console Output',
          type: 'code',
          xp: 50,
          badge: { id: 'js_starter', title: 'JS Spark', desc: 'Printed first output in JS!', icon: '⚡' },
          theory: `Welcome to **JavaScript**! JS powers interactivity on the web.

Use \`console.log()\` to print values to the output console.

\`\`\`javascript
console.log("Hello, World!");
\`\`\``,
          instructions: 'Write a `console.log()` statement to print `"You Are Online!"` to the console.',
          starterCode: `// Print You Are Online! below
console.log("Hello, World!");`,
          solutionCode: `console.log("You Are Online!");`,
          testCases: [
            { name: 'console.log statement present', check: (code) => code.includes('console.log') },
            { name: 'Prints You Are Online!', check: (code) => code.includes('You Are Online!') }
          ]
        },
        {
          id: 'js-quiz-variables',
          title: '1.2 Quiz: Let vs Const vs Var',
          type: 'quiz',
          xp: 40,
          quizData: {
            question: 'Which keyword should you use in modern JS for variables that will NOT be re-assigned?',
            options: [
              'var',
              'const',
              'let',
              'static'
            ],
            correctOptionIndex: 1,
            explanation: '`const` creates a read-only reference to a value. Use `const` by default and `let` only when you need to re-assign a variable.'
          }
        },
        {
          id: 'js-variables-math',
          title: '1.3 Variables & Arithmetic Operations',
          type: 'code',
          xp: 60,
          theory: `In JavaScript, declare variables using \`let\` or \`const\`:

\`\`\`javascript
const price = 25;
let quantity = 4;
const total = price * quantity;
\`\`\``,
          instructions: 'Calculate the total price of 3 items priced at $19.99 each and store it in a constant named `total`.',
          starterCode: `const itemPrice = 19.99;
const quantity = 3;

// Calculate total below
const total = 0;

console.log("Total cost:", total);`,
          solutionCode: `const total = itemPrice * quantity;`,
          testCases: [
            { name: 'const total declared', check: (code) => code.includes('const total') },
            { name: 'Multiplies price by quantity', check: (code) => code.includes('itemPrice * quantity') || code.includes('19.99 * 3') }
          ]
        }
      ]
    },
    {
      id: 'js-ch2-control-arrays',
      title: 'Chapter 2: Arrays & Control Flow',
      description: 'Master arrays, array methods (.map, .filter, .reduce), loops, and conditional branching.',
      lessons: [
        {
          id: 'js-array-methods',
          title: '2.1 Array Methods (.map & .filter)',
          type: 'code',
          xp: 75,
          badge: { id: 'js_array_wiz', title: 'Array Transformer', desc: 'Mastered higher-order array methods!', icon: '🎯' },
          theory: `Modern JS heavily uses functional array methods like \`.map()\` to transform elements and \`.filter()\` to extract specific items.

\`\`\`javascript
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8]
const evens = nums.filter(n => n % 2 === 0); // [2, 4]
\`\`\``,
          instructions: 'Filter scores greater than or equal to 80 and map them to their percentage string (e.g., `"80%"`).',
          starterCode: `const scores = [65, 82, 95, 40, 88];

// Filter scores >= 80 and map to "X%"
const passingScores = scores
  .filter(s => s >= 80)
  .map(s => s + "%");

console.log(passingScores);`,
          solutionCode: `scores.filter(s => s >= 80).map(s => s + "%")`,
          testCases: [
            { name: 'Uses .filter()', check: (code) => code.includes('.filter(') },
            { name: 'Uses .map()', check: (code) => code.includes('.map(') }
          ]
        },
        {
          id: 'js-fill-puzzle',
          title: '2.2 Code Puzzle: Arrow Functions & Destructuring',
          type: 'fill-blank',
          xp: 50,
          fillData: {
            instructions: 'Complete the ES6 destructuring and arrow function syntax:',
            templateParts: [
              'const user = { name: "Aria", level: 42 };\nconst { ',
              ', level } = user;\nconst greet = (',
              ') => `Welcome back, ${',
              '}!`;'
            ],
            blanks: [
              { hint: 'key' },
              { hint: 'param' },
              { hint: 'var' }
            ],
            correctTokens: ['name', 'name', 'name']
          }
        },
        {
          id: 'js-boss-ch2',
          title: '2.3 🏆 BOSS PROJECT: Mini Shopping Cart Calculator',
          type: 'code',
          isBoss: true,
          xp: 120,
          badge: { id: 'js_boss_1', title: 'Cart Architect', desc: 'Completed the JavaScript Chapter 2 Capstone!', icon: '👑' },
          theory: `**BOSS CAPSTONE CHALLENGE**: Combine arrays, \`.reduce()\`, and object methods to calculate cart grand totals with tax!`,
          instructions: 'Use \`cart.reduce()\` to sum item prices multiplied by quantity, then add 10% tax.',
          starterCode: `const cart = [
  { item: 'Laptop', price: 999, qty: 1 },
  { item: 'Mouse', price: 49, qty: 2 },
  { item: 'Keyboard', price: 89, qty: 1 }
];

function calculateGrandTotal(cartItems) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.10;
  return subtotal + tax;
}

console.log("Grand total:", calculateGrandTotal(cart));`,
          solutionCode: `cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)`,
          testCases: [
            { name: 'Uses reduce method', check: (code) => code.includes('.reduce(') },
            { name: 'Calculates price times qty', check: (code) => code.includes('price *') || code.includes('qty') }
          ]
        }
      ]
    }
  ]
};
