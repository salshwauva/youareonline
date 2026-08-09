export const TRACKS_DATA = [
  {
    id: 'systems',
    title: 'Systems & Core',
    icon: '⚙️',
    color: 'purple',
    badgeClass: 'badge-purple',
    description: 'Master low-level memory management, pointers, Rust ownership, smart pointers, and RAII under the hood.',
    languages: ['Rust', 'C++', 'Java', 'C#'],
    quests: [
      {
        id: 'rust-memory',
        title: 'Ownership & Borrowing in Rust',
        xp: 100,
        simulatorType: 'rust-memory',
        difficulty: 'Intermediate',
        badge: { id: 'rust_borrower', title: 'Borrow Checker Champion', desc: 'Mastered Rust ownership and references!', icon: '🦀' },
        theory: `Rust's defining feature is **Ownership**. Unlike languages with garbage collectors (Java/Python) or manual memory management (C/C++), Rust manages memory through a system of ownership with rules that the compiler checks at compile time.

### The 3 Golden Rules of Rust Ownership:
1. Each value in Rust has an **owner**.
2. There can only be **one owner** at a time.
3. When the owner goes out of scope, the value is dropped.

### References & Borrowing:
Instead of taking ownership, you can **borrow** references:
- **Immutable Reference (\`&T\`)**: Any number of immutable references allowed.
- **Mutable Reference (\`&mut T\`)**: Only **one** mutable reference allowed at a time to prevent data races.

### Recommended Resources:
- 📖 [Official Rust Book: What is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- 📺 [Fireship - Rust in 100 Seconds](https://www.youtube.com/watch?v=5C_HPTJg5ek)
- 🐙 [GitHub: rust-lang/rustlings](https://github.com/rust-lang/rustlings)`,
        instructions: `Inspect the interactive Rust Memory Sandbox below!
1. Test moving ownership from \`s1\` to \`s2\`. Notice how \`s1\` becomes invalidated on the Stack.
2. Create an immutable borrow \`&s2\`.
3. Try creating a mutable reference \`&mut s2\` while an immutable borrow exists to observe how the Rust borrow checker prevents data races!`,
        starterCode: `fn main() {
    let s1 = String::from("hello_online");
    // Move ownership from s1 to s2
    let s2 = s1; 
    
    // Borrow s2 immutably
    let len = calculate_length(&s2);
    
    println!("String '{}' has length {}", s2, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}`,
        solutionCode: `fn main() {
    let s1 = String::from("hello_online");
    let s2 = s1;
    let len = calculate_length(&s2);
    println!("String '{}' has length {}", s2, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}`,
        testCases: [
          { name: 'Ownership transferred without cloning', check: (code) => code.includes('let s2 = s1') },
          { name: 'Immutable reference used correctly', check: (code) => code.includes('&s2') }
        ]
      },
      {
        id: 'cpp-pointers',
        title: 'C++ Pointers & References',
        xp: 90,
        simulatorType: 'rust-memory',
        difficulty: 'Intermediate',
        badge: { id: 'cpp_master', title: 'Pointer Wizard', desc: 'Dereferenced memory addresses like a pro!', icon: '🎯' },
        theory: `Pointers store the memory address of another variable. Understanding stack vs heap allocation is critical for high-performance C++ applications.

### Key Concepts:
- **Address-of Operator (\`&\`)**: Gets the memory address of a variable.
- **Dereference Operator (\`*\`)**: Accesses the value stored at a memory address.

### Recommended Resources:
- 📺 [TheCherno - Pointers in C++](https://www.youtube.com/watch?v=DTxHyVn0ODg)
- 💬 [Reddit r/cpp - Memory Management Discussion](https://www.reddit.com/r/cpp/)`,
        instructions: `Write a C++ function that swaps two integers using raw pointers \`int*\`.`,
        starterCode: `#include <iostream>

void swap(int* a, int* b) {
    // TODO: Dereference pointers and swap values
}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    std::cout << "x: " << x << ", y: " << y << std::endl;
    return 0;
}`,
        solutionCode: `#include <iostream>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    std::cout << "x: " << x << ", y: " << y << std::endl;
    return 0;
}`,
        testCases: [
          { name: 'Dereference operator used (*a)', check: (code) => code.includes('*a') && code.includes('*b') }
        ]
      },
      {
        id: 'cpp-smart-pointers',
        title: 'C++ Smart Pointers & RAII',
        xp: 110,
        simulatorType: 'rust-memory',
        difficulty: 'Advanced',
        badge: { id: 'cpp_raii', title: 'RAII Guardian', desc: 'Eliminated memory leaks using std::unique_ptr!', icon: '🛡️' },
        theory: `Modern C++ (C++11 and beyond) avoids raw \`new\` and \`delete\` by leveraging **RAII** (Resource Acquisition Is Initialization) and Smart Pointers:

- **\`std::unique_ptr<T>\`**: Exclusive ownership of heap resource. Cannot be copied, only moved.
- **\`std::shared_ptr<T>\`**: Reference-counted shared ownership. Resource deleted when count hits 0.

### Recommended Resources:
- 📖 [cppreference.com - std::unique_ptr](https://en.cppreference.com/w/cpp/memory/unique_ptr)
- 📺 [ThePrimeagen - C++ Memory & RAII Explained](https://www.youtube.com/c/ThePrimeagen)`,
        instructions: `Create a \`std::unique_ptr<int>\` using \`std::make_unique\` and transfer ownership using \`std::move\`.`,
        starterCode: `#include <iostream>
#include <memory>

int main() {
    // TODO: Allocate smart pointer using std::make_unique
    std::unique_ptr<int> p1 = std::make_unique<int>(42);
    
    // Transfer ownership to p2
    std::unique_ptr<int> p2 = std::move(p1);
    
    if (!p1) {
        std::cout << "p1 is null, value moved to p2: " << *p2 << std::endl;
    }
    return 0;
}`,
        solutionCode: `std::unique_ptr<int> p2 = std::move(p1);`,
        testCases: [
          { name: 'std::make_unique used', check: (code) => code.includes('std::make_unique') },
          { name: 'std::move ownership transfer', check: (code) => code.includes('std::move') }
        ]
      },
      {
        id: 'java-gc',
        title: 'Java JVM Memory & Garbage Collection',
        xp: 100,
        simulatorType: 'rust-memory',
        difficulty: 'Intermediate',
        badge: { id: 'java_gc_master', title: 'JVM Tuning Master', desc: 'Understood Generational Garbage Collection in Java!', icon: '☕' },
        theory: `Java manages heap memory automatically using a **Garbage Collector (GC)**.

### Heap Generations:
1. **Young Generation (Eden Space & Survivor Spaces S0/S1)**: Where short-lived objects are allocated.
2. **Old / Tenured Generation**: Where long-surviving objects are promoted after surviving multiple GC cycles.

### Recommended Resources:
- 📖 [Oracle JVM Garbage Collection Basics](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/)
- 📺 [Java Brains - How JVM Memory Management Works](https://www.youtube.com/watch?v=ZBJ0u9MaKtM)`,
        instructions: `Analyze how short-lived objects in Java are garbage collected from Eden space while persistent objects are promoted.`,
        starterCode: `public class MemoryTest {
    public static void main(String[] args) {
        // Create 100,000 short-lived objects
        for (int i = 0; i < 100000; i++) {
            String temp = new String("Temp object " + i);
        }
        System.out.println("Objects created and eligible for Young Gen Minor GC.");
    }
}`,
        solutionCode: `new String("Temp object " + i);`,
        testCases: [
          { name: 'Loop allocation created', check: (code) => code.includes('for') && code.includes('new String') }
        ]
      }
    ]
  },
  {
    id: 'data-algo',
    title: 'Data & Algorithms',
    icon: '📊',
    color: 'cyan',
    badgeClass: 'badge-cyan',
    description: 'Solve LeetCode algorithm challenges, benchmark Big-O performance, and query SQL databases with synthetic data.',
    languages: ['Python', 'SQL', 'NumPy', 'Pandas'],
    quests: [
      {
        id: 'algo-bench',
        title: 'Array Deduplication & Two Pointers',
        xp: 120,
        simulatorType: 'algo-bench',
        difficulty: 'Intermediate',
        badge: { id: 'algo_master', title: 'Big-O Ninja', desc: 'Optimized deduplication to O(N) linear time!', icon: '🚀' },
        theory: `Evaluating algorithm efficiency requires testing against edge-cases (empty arrays, duplicate elements, reverse sorted lists) and analyzing scale behavior.

- **O(N²)**: Nested loops (e.g. Bubble Sort).
- **O(N log N)**: Divide & conquer (e.g. Merge Sort, Quick Sort).
- **O(N)**: Single pass traversal.

### Recommended Resources:
- 🧩 [LeetCode #26 - Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
- 📺 [NeetCode - Remove Duplicates Two Pointers Explained](https://www.youtube.com/watch?v=DEJAZBq0FDA)
- 🐙 [GitHub: TheAlgorithms/Python](https://github.com/TheAlgorithms/Python)`,
        instructions: `Implement an efficient array deduplication algorithm in Python. Then run it against our **Algorithmic Test Bench** to stress test it against 10,000 generated elements and view the empirical time curve!`,
        starterCode: `def remove_duplicates(nums):
    # TODO: Deduplicate list while preserving order in O(N) time
    seen = set()
    result = []
    for num in nums:
        if num not in seen:
            seen.add(num)
            result.append(num)
    return result

# Test run
print(remove_duplicates([1, 2, 2, 3, 4, 4, 5]))`,
        solutionCode: `def remove_duplicates(nums):
    seen = set()
    result = []
    for num in nums:
        if num not in seen:
            seen.add(num)
            result.append(num)
    return result`,
        testCases: [
          { name: 'O(N) Set lookup used', check: (code) => code.includes('set()') },
          { name: 'Single loop traversal', check: (code) => code.includes('for ') }
        ]
      },
      {
        id: 'valid-parentheses',
        title: 'Valid Parentheses Stack Challenge',
        xp: 110,
        simulatorType: 'algo-bench',
        difficulty: 'Beginner',
        badge: { id: 'stack_master', title: 'Stack Master', desc: 'Solved LeetCode #20 using a LIFO Stack!', icon: '🥞' },
        theory: `The **Stack** data structure follows the **LIFO** (Last In, First Out) principle. It is ideal for syntax parsing, balancing parentheses, and managing call stacks.

### Recommended Resources:
- 🧩 [LeetCode #20 - Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- 📺 [NeetCode - Valid Parentheses Stack Walkthrough](https://www.youtube.com/watch?v=WTzjTskXMg5)`,
        instructions: `Write a Python function to check if a string of brackets \`()\`, \`{}\`, \`[]\` is valid using a Stack.`,
        starterCode: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack

print(is_valid("()[]{}"))`,
        solutionCode: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack`,
        testCases: [
          { name: 'Stack append and pop used', check: (code) => code.includes('.pop()') && code.includes('.append(') }
        ]
      },
      {
        id: 'sql-queries',
        title: 'SQL Database Seeding & Aggregations',
        xp: 100,
        simulatorType: 'sql-playground',
        difficulty: 'Beginner',
        badge: { id: 'sql_sage', title: 'Query Master', desc: 'Executed complex SQL joins and GROUP BY queries!', icon: '💾' },
        theory: `Relational databases rely on structured queries (SQL) to filter, join, and aggregate massive datasets.

Common SQL Clauses:
- **WHERE**: Filter rows before grouping.
- **GROUP BY**: Aggregate rows sharing common column values.
- **HAVING**: Filter aggregated groups.

### Recommended Resources:
- 📖 [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/)
- 💬 [Reddit r/SQL - Query Optimization Tips](https://www.reddit.com/r/SQL/)`,
        instructions: `Run SQL queries against our auto-seeded SQLite database! Find the top 3 customers who spent the most money across all orders.`,
        starterCode: `-- Query our auto-seeded e-commerce tables: users, orders
SELECT u.name, SUM(o.amount) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id
ORDER BY total_spent DESC
LIMIT 3;`,
        solutionCode: `SELECT u.name, SUM(o.amount) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id
ORDER BY total_spent DESC
LIMIT 3;`,
        testCases: [
          { name: 'SUM aggregation used', check: (code) => code.toUpperCase().includes('SUM(') },
          { name: 'JOIN clause applied', check: (code) => code.toUpperCase().includes('JOIN') }
        ]
      },
      {
        id: 'synthetic-data',
        title: 'Automated Data Sourcing & Pandas',
        xp: 90,
        simulatorType: 'synthetic-data',
        difficulty: 'Beginner',
        badge: { id: 'data_wizard', title: 'Data Alchemist', desc: 'Generated synthetic datasets on-the-fly!', icon: '✨' },
        theory: `Synthetic data generators allow software engineers and data scientists to generate realistic mock datasets without exposing privacy-sensitive user data.

### Recommended Resources:
- 📖 [Pandas Official Documentation](https://pandas.pydata.org/docs/)
- 📺 [Kaggle - Data Science & EDA Tutorials](https://www.youtube.com/c/Kaggle)`,
        instructions: `Use our built-in Synthetic Data Generator to configure a mock dataset schema and preview generated JSON/CSV payloads.`,
        starterCode: `# Synthetic Data Configurator
import random

def generate_user_data(n=10):
    domains = ["gmail.com", "dev.io", "tech.org"]
    data = []
    for i in range(1, n + 1):
        data.append({
            "id": i,
            "username": f"user_{i}",
            "email": f"user_{i}@{random.choice(domains)}",
            "xp": random.randint(100, 5000)
        })
    return data

print(generate_user_data(5))`,
        solutionCode: `import random
def generate_user_data(n=10):
    return [{"id": i, "xp": random.randint(100, 5000)} for i in range(1, n+1)]`,
        testCases: [
          { name: 'Data list generated', check: (code) => code.includes('generate_user_data') }
        ]
      }
    ]
  },
  {
    id: 'arch',
    title: 'Software Architecture',
    icon: '🏗️',
    color: 'pink',
    badgeClass: 'badge-pink',
    description: 'Design scalable object-oriented systems, master SOLID principles, LRU caches, and refactor design patterns.',
    languages: ['JavaScript', 'TypeScript', 'Node.js'],
    quests: [
      {
        id: 'solid-principles',
        title: 'SOLID Principles in TypeScript',
        xp: 110,
        simulatorType: 'code-only',
        difficulty: 'Intermediate',
        badge: { id: 'architect', title: 'System Architect', desc: 'Applied Single Responsibility and Open/Closed principles!', icon: '🏛️' },
        theory: `The **SOLID** principles guide clean object-oriented code:

1. **S**ingle Responsibility Principle: A class should have only one reason to change.
2. **O**pen/Closed Principle: Open for extension, closed for modification.
3. **L**iskov Substitution Principle: Subtypes must be substitutable for base types.
4. **I**nterface Segregation Principle: Client-specific interfaces.
5. **D**ependency Inversion Principle: Depend on abstractions, not implementations.

### Recommended Resources:
- 🐙 [GitHub: donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)
- 📺 [Fireship - 10 Architecture Patterns Explained](https://www.youtube.com/watch?v=rAqa_sO9JjE)`,
        instructions: `Refactor the tightly coupled notification class to adhere to the Open/Closed Principle using TypeScript interfaces.`,
        starterCode: `// Violates Open/Closed Principle
interface NotificationService {
    send(message: string, recipient: string): void;
}

class EmailNotification implements NotificationService {
    send(message: string, recipient: string) {
        console.log(\`Email sent to \${recipient}: \${message}\`);
    }
}

class SMSNotification implements NotificationService {
    send(message: string, recipient: string) {
        console.log(\`SMS sent to \${recipient}: \${message}\`);
    }
}

class NotificationManager {
    constructor(private service: NotificationService) {}
    
    notify(msg: string, target: string) {
        this.service.send(msg, target);
    }
}

const manager = new NotificationManager(new EmailNotification());
manager.notify("Welcome Online!", "alex@dev.io");`,
        solutionCode: `interface NotificationService {
    send(message: string, recipient: string): void;
}`,
        testCases: [
          { name: 'Interface declaration present', check: (code) => code.includes('interface NotificationService') },
          { name: 'Dependency injection used', check: (code) => code.includes('constructor') }
        ]
      },
      {
        id: 'lru-cache',
        title: 'LRU Cache Design Challenge',
        xp: 130,
        simulatorType: 'algo-bench',
        difficulty: 'Advanced',
        badge: { id: 'cache_king', title: 'LRU Cache Architect', desc: 'Implemented O(1) LRU Cache using Map/Doubly Linked List!', icon: '⚡' },
        theory: `An **LRU (Least Recently Used) Cache** organizes items in order of use. When the cache hits capacity, it evicts the least recently accessed item in O(1) constant time.

### Recommended Resources:
- 🧩 [LeetCode #146 - LRU Cache](https://leetcode.com/problems/lru-cache/)
- 📺 [NeetCode - LRU Cache Data Structure Walkthrough](https://www.youtube.com/watch?v=7ABLJiCg38U)`,
        instructions: `Implement an LRU Cache in JavaScript using \`Map\` to achieve O(1) get and put operations.`,
        starterCode: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // returns 1`,
        solutionCode: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
}`,
        testCases: [
          { name: 'Map data structure used', check: (code) => code.includes('new Map()') },
          { name: 'Eviction logic present', check: (code) => code.includes('this.cache.delete') }
        ]
      }
    ]
  },
  {
    id: 'under-hood',
    title: 'Under-the-Hood',
    icon: '⚡',
    color: 'gold',
    badgeClass: 'badge-gold',
    description: 'Explore Unix CLI shells, Git tree internals, CPU cores, multi-threading, and networking.',
    languages: ['Command Line', 'Git', 'OS Concurrency'],
    quests: [
      {
        id: 'cli-git',
        title: 'Command Line & Git Internals',
        xp: 90,
        simulatorType: 'terminal',
        difficulty: 'Beginner',
        badge: { id: 'terminal_ace', title: 'Terminal Ace', desc: 'Mastered shell navigation and Git commits!', icon: '🖥️' },
        theory: `The Command Line Interface (CLI) allows developer control over filesystems and process signals. Git tracks project history using a directed acyclic graph (DAG) of commit objects.

### Recommended Resources:
- 📖 [Pro Git Book - Git Architecture](https://git-scm.com/book/en/v2)
- 🐙 [GitHub: codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x)`,
        instructions: `Open the interactive **Terminal Simulator** tab. Run \`ls\`, create a folder with \`mkdir my_project\`, switch to it with \`cd my_project\`, and run \`git init\`.`,
        starterCode: `# Interactive Terminal Commands
ls -la
mkdir my_project
cd my_project
git init
git status`,
        solutionCode: `git init`,
        testCases: [
          { name: 'Git commands used', check: (code) => code.includes('git') }
        ]
      },
      {
        id: 'cpu-threads',
        title: 'CPU Mechanics & Thread Concurrency',
        xp: 110,
        simulatorType: 'cpu-threads',
        difficulty: 'Advanced',
        badge: { id: 'thread_master', title: 'Concurrency Master', desc: 'Resolved mutex lock deadlocks in multi-threaded code!', icon: '⚡' },
        theory: `Multi-core CPUs execute threads in parallel. Without proper synchronization primitives (mutexes, atomic operations), concurrent threads can cause race conditions or deadlocks.

### Recommended Resources:
- 💬 [Reddit r/cscareerquestions - Operating System Concurrency](https://www.reddit.com/r/cscareerquestions/)
- 📺 [ThePrimeagen - Multi-Threading & Locks](https://www.youtube.com/c/ThePrimeagen)`,
        instructions: `Launch the **CPU Threads Simulator** tab to observe how 4 CPU Cores process parallel tasks and resolve mutex contention.`,
        starterCode: `// Mutex Synchronization Simulation
let mutexLocked = false;

function acquireLock(threadId) {
    if (mutexLocked) {
        console.log(\`Thread \${threadId} BLOCKED waiting for lock\`);
        return false;
    }
    mutexLocked = true;
    console.log(\`Thread \${threadId} ACQUIRED lock\`);
    return true;
}`,
        solutionCode: `let mutexLocked = false;`,
        testCases: [
          { name: 'Mutex lock logic defined', check: (code) => code.includes('mutexLocked') }
        ]
      }
    ]
  },
  {
    id: 'web-dev',
    title: 'Web Dev & UI/UX',
    icon: '🎨',
    color: 'green',
    badgeClass: 'badge-purple',
    description: 'Build modern responsive UI components, CSS layouts, and interactive React applications.',
    languages: ['HTML', 'CSS', 'React'],
    quests: [
      {
        id: 'flexbox-grid',
        title: 'Pixel-Perfect CSS Grid & Flexbox',
        xp: 80,
        simulatorType: 'code-only',
        difficulty: 'Beginner',
        badge: { id: 'pixel_designer', title: 'UI Pixel Artist', desc: 'Crafted responsive pixel-perfect layouts!', icon: '🖼️' },
        theory: `CSS Grid handles 2D layouts (rows & columns simultaneously), while Flexbox is designed for 1D content alignment. Combining both yields modern responsive user interfaces.

### Recommended Resources:
- 📖 [MDN Web Docs - CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- 📺 [Kevin Powell - CSS Grid vs Flexbox](https://www.youtube.com/watch?v=3elGSZSWTbM)`,
        instructions: `Write CSS Grid styles to position card components in a responsive 3-column layout.`,
        starterCode: `.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 16px;
}`,
        solutionCode: `display: grid;`,
        testCases: [
          { name: 'display: grid used', check: (code) => code.includes('display: grid') }
        ]
      },
      {
        id: 'react-event-loop',
        title: 'Browser Event Loop & Microtasks',
        xp: 100,
        simulatorType: 'code-only',
        difficulty: 'Intermediate',
        badge: { id: 'event_loop_guru', title: 'Event Loop Guru', desc: 'Mastered Macro vs Microtask queue execution order!', icon: '🌀' },
        theory: `The JavaScript runtime is single-threaded and relies on an **Event Loop** to execute non-blocking code.

### Queue Priority:
1. **Call Stack**: Executes synchronous functions.
2. **Microtask Queue**: Promises (\`.then\`), \`queueMicrotask\`. High priority!
3. **Macrotask Queue**: \`setTimeout\`, \`setInterval\`, I/O events.

### Recommended Resources:
- 📖 [MDN - In-depth guide to the Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- 📺 [Jake Archibald - In The Loop (JSConf)](https://www.youtube.com/watch?v=cCOL7MC4Pl0)`,
        instructions: `Predict the console output order for synchronous code, Promises (Microtasks), and \`setTimeout\` (Macrotasks).`,
        starterCode: `console.log("1: Sync Start");

setTimeout(() => {
    console.log("4: Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
    console.log("3: Microtask (Promise)");
});

console.log("2: Sync End");`,
        solutionCode: `Promise.resolve().then`,
        testCases: [
          { name: 'Promise microtask present', check: (code) => code.includes('Promise.resolve()') },
          { name: 'setTimeout macrotask present', check: (code) => code.includes('setTimeout') }
        ]
      }
    ]
  }
];

export function getQuestById(questId) {
  for (const track of TRACKS_DATA) {
    const found = track.quests.find(q => q.id === questId);
    if (found) return { quest: found, track };
  }
  return { quest: TRACKS_DATA[0].quests[0], track: TRACKS_DATA[0] };
}
