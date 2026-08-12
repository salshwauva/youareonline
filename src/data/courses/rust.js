export const rustCourse = {
  id: 'rust-course',
  title: 'Rust Systems Mastery',
  icon: '🦀',
  mascotImg: '/assets/rust_mascot.jpg',
  color: 'orange',
  domain: 'Systems Engineering',
  language: 'Rust',
  difficulty: 'Intermediate to Advanced',
  badgeClass: 'badge-pink',
  description: 'Master Rust memory safety, ownership, borrow checker rules, traits, zero-cost abstractions, and lifetime annotations.',
  chapters: [
    {
      id: 'rust-ch1-ownership',
      title: 'Chapter 1: Ownership & Borrow Checker',
      description: 'Understand value movement, borrowing (&T vs &mut T), and Rust memory safety.',
      lessons: [
        {
          id: 'rust-ownership',
          title: '1.1 Ownership & Move Semantics',
          type: 'simulator',
          simulatorType: 'rust-memory',
          xp: 100,
          badge: { id: 'rust_borrower', title: 'Borrow Checker Champion', desc: 'Mastered Rust ownership and moves!', icon: '🦀' },
          theory: `Rust's defining feature is **Ownership**:

1. Every value in Rust has an owner.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value is dropped.`,
          instructions: 'Inspect the interactive Rust Memory Sandbox! Transfer ownership from `s1` to `s2` and observe heap pointers.',
          starterCode: `fn main() {
    let s1 = String::from("hello_online");
    let s2 = s1; // Ownership moves to s2
    println!("String '{}' owned by s2", s2);
}`,
          solutionCode: `let s2 = s1;`,
          testCases: [
            { name: 'Ownership move logic defined', check: (code) => code.includes('s2 = s1') }
          ]
        },
        {
          id: 'rust-pattern-matching',
          title: '1.2 Pattern Matching & Option/Result',
          type: 'code',
          xp: 110,
          badge: { id: 'rust_matcher', title: 'Pattern Master', desc: 'Handled Option and Result enums safely!', icon: '🎯' },
          theory: `Rust handles missing values with \`Option<T>\` and error handling with \`Result<T, E>\` using \`match\` expressions instead of null pointers.`,
          instructions: 'Write a Rust function that uses `match` to safely handle an `Option<i32>`.',
          starterCode: `fn double_if_some(val: Option<i32>) -> Option<i32> {
    match val {
        Some(x) => Some(x * 2),
        None => None,
    }
}

fn main() {
    println!("{:?}", double_if_some(Some(5)));
}`,
          solutionCode: `match val { Some(x) => Some(x * 2), None => None }`,
          testCases: [
            { name: 'Match expression used', check: (code) => code.includes('match') && code.includes('Some') }
          ]
        }
      ]
    }
  ]
};
