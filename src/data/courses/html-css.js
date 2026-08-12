export const htmlCssCourse = {
  id: 'html-css-course',
  title: 'Web Dev: HTML5 & CSS3',
  icon: '🎨',
  mascotImg: '/assets/web_mascot.jpg',
  color: 'pink',
  domain: 'Web Development',
  language: 'HTML/CSS',
  difficulty: 'Beginner',
  badgeClass: 'badge-pink',
  description: 'Design pixel-perfect, responsive web interfaces with modern HTML5 semantic markup, CSS Flexbox, and CSS Grid.',
  chapters: [
    {
      id: 'web-ch1-html',
      title: 'Chapter 1: HTML5 Structure & Semantic Tags',
      description: 'Headings, paragraphs, images, links, forms, and semantic layout tags.',
      lessons: [
        {
          id: 'html-first-page',
          title: '1.1 HTML Card Structure',
          type: 'web-preview',
          xp: 60,
          badge: { id: 'web_builder', title: 'HTML Architect', desc: 'Built first HTML card layout!', icon: '🌐' },
          theory: `HTML (HyperText Markup Language) structures web content using elements enclosed in tags:

\`\`\`html
<div class="card">
  <h2>Title</h2>
  <p>Description text</p>
</div>
\`\`\``,
          instructions: 'Build a profile card with an `<h1>` heading containing `"Sophia Dev"` and a `<p>` paragraph with your bio.',
          starterCode: `<div style="padding: 20px; border: 2px solid #ff69b4; border-radius: 8px; background: #fff5f8;">
  <h1>Sophia Dev</h1>
  <p>Passionate frontend engineer & retro gamer ✨</p>
</div>`,
          solutionCode: `<h1>Sophia Dev</h1>`,
          testCases: [
            { name: 'Contains <h1> tag', check: (code) => code.includes('<h1>') && code.includes('</h1>') },
            { name: 'Contains <p> tag', check: (code) => code.includes('<p>') && code.includes('</p>') }
          ]
        },
        {
          id: 'web-quiz-semantics',
          title: '1.2 Quiz: Semantic HTML5 Layout',
          type: 'quiz',
          xp: 40,
          quizData: {
            question: 'Which semantic HTML tag should be used for standalone, self-contained blog posts or card items?',
            options: [
              '<div>',
              '<section>',
              '<article>',
              '<aside>'
            ],
            correctOptionIndex: 2,
            explanation: 'The `<article>` tag represents a self-contained composition in a document (e.g. blog posts, cards, news items).'
          }
        }
      ]
    },
    {
      id: 'web-ch2-flexbox',
      title: 'Chapter 2: CSS Flexbox & Layout Engine',
      description: 'Flex containers, flex direction, justify-content, align-items, and responsive layouts.',
      lessons: [
        {
          id: 'web-flexbox-card',
          title: '2.1 Center Elements with CSS Flexbox',
          type: 'web-preview',
          xp: 80,
          badge: { id: 'flexbox_pro', title: 'Flexbox Wizard', desc: 'Mastered centering and alignment with Flexbox!', icon: '🎨' },
          theory: `CSS Flexbox makes aligning elements simple:

\`\`\`css
display: flex;
justify-content: center; /* Horizontally center */
align-items: center;     /* Vertically center */
\`\`\``,
          instructions: 'Add `display: flex`, `justify-content: space-between`, and `align-items: center` to the `.navbar` CSS style.',
          starterCode: `<nav style="display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; background: #7c8cc6; color: white; border-radius: 4px;">
  <div style="font-weight: bold;">🌸 YOU ARE ONLINE</div>
  <button style="padding: 6px 12px; background: #ff69b4; border: none; color: white; font-weight: bold; border-radius: 4px;">Start Quest</button>
</nav>`,
          solutionCode: `display: flex; justify-content: space-between`,
          testCases: [
            { name: 'Uses display: flex', check: (code) => code.includes('display: flex') || code.includes('display:flex') },
            { name: 'Uses justify-content: space-between', check: (code) => code.includes('justify-content: space-between') || code.includes('justify-content:space-between') }
          ]
        },
        {
          id: 'web-boss-ch2',
          title: '2.2 🏆 BOSS PROJECT: Anime Retro UI Badge Card',
          type: 'web-preview',
          isBoss: true,
          xp: 140,
          badge: { id: 'web_boss_1', title: 'UI Mastermind', desc: 'Built a retro Y2K Anime UI card with CSS!', icon: '👑' },
          theory: `**BOSS CAPSTONE**: Construct a complete retro Y2K OS window card using inline CSS border shadows and flex alignment!`,
          instructions: 'Ensure the window has a titlebar, action button, and content body with `box-shadow` offset.',
          starterCode: `<div style="border: 2px solid #222638; box-shadow: 4px 4px 0px #222638; border-radius: 4px; overflow: hidden; background: white;">
  <div style="background: #7c8cc6; color: white; padding: 8px 12px; font-weight: bold; display: flex; justify-content: space-between;">
    <span>System Status</span>
    <span>✕</span>
  </div>
  <div style="padding: 16px;">
    <h3 style="margin-top: 0; color: #222638;">Status: ALL SYSTEMS ONLINE ✨</h3>
    <button style="padding: 6px 14px; background: #f7a3c3; border: 2px solid #222638; box-shadow: 2px 2px 0px #222638; font-weight: bold; cursor: pointer;">
      Launch Sandbox
    </button>
  </div>
</div>`,
          solutionCode: `box-shadow: 4px 4px 0px #222638`,
          testCases: [
            { name: 'Contains box-shadow border style', check: (code) => code.includes('box-shadow') },
            { name: 'Contains titlebar header', check: (code) => code.includes('System Status') }
          ]
        }
      ]
    }
  ]
};
