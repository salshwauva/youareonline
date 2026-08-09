export const TRACKS_DATA = [
  {
    id: 'rust-track',
    title: 'Rust Systems Mastery',
    icon: '🦀',
    color: 'orange',
    badgeClass: 'badge-pink',
    description: 'Master Rust memory safety, ownership, borrow checker rules, traits, and zero-cost abstractions.',
    languages: ['Rust'],
    quests: [
      {
        id: 'rust-ownership',
        title: 'Ownership & Move Semantics',
        xp: 100,
        simulatorType: 'rust-memory',
        difficulty: 'Intermediate',
        badge: { id: 'rust_borrower', title: 'Borrow Checker Champion', desc: 'Mastered Rust ownership and references!', icon: '🦀' },
        theory: `Rust's defining feature is **Ownership**. Manage memory with strict rules enforced at compile time without a garbage collector!

- Every value in Rust has an owner.
- There can only be one owner at a time.
- When the owner goes out of scope, the value is dropped.`,
        instructions: `Inspect the interactive Rust Memory Sandbox! Transfer ownership from s1 to s2 and test borrowing.`,
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
        title: 'Pattern Matching & Option/Result',
        xp: 110,
        simulatorType: 'code-only',
        difficulty: 'Intermediate',
        badge: { id: 'rust_matcher', title: 'Pattern Master', desc: 'Handled Option and Result enums safely!', icon: '🎯' },
        theory: `Rust handles missing values with \`Option<T>\` and error handling with \`Result<T, E>\` using \`match\` expressions instead of null values.`,
        instructions: `Write a Rust function that uses \`match\` to safely handle an \`Option<i32>\`.`,
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
  },
  {
    id: 'python-track',
    title: 'Python Data & Automation',
    icon: '🐍',
    color: 'green',
    badgeClass: 'badge-green',
    description: 'Master idiomatic Python, list comprehensions, decorators, data classes, and synthetic data pipelines.',
    languages: ['Python'],
    quests: [
      {
        id: 'python-comprehensions',
        title: 'List Comprehensions & Generator Functions',
        xp: 90,
        simulatorType: 'synthetic-data',
        difficulty: 'Beginner',
        badge: { id: 'python_pro', title: 'Pythonic Coder', desc: 'Wrote clean single-line list comprehensions!', icon: '🐍' },
        theory: `List comprehensions provide a concise syntax to create lists based on existing lists or iterables in Python.`,
        instructions: `Write a Python list comprehension that filters even numbers and squares them.`,
        starterCode: `def square_evens(numbers):
    return [n ** 2 for n in numbers if n % 2 == 0]

print(square_evens([1, 2, 3, 4, 5, 6])) # Expected [4, 16, 36]`,
        solutionCode: `return [n ** 2 for n in numbers if n % 2 == 0]`,
        testCases: [
          { name: 'List comprehension bracket syntax used', check: (code) => code.includes('[') && code.includes('for') && code.includes('if') }
        ]
      },
      {
        id: 'python-decorators',
        title: 'Decorators & Metaprogramming',
        xp: 120,
        simulatorType: 'code-only',
        difficulty: 'Intermediate',
        badge: { id: 'decorator_wizard', title: 'Decorator Wizard', desc: 'Built custom function timing decorators!', icon: '⏳' },
        theory: `Decorators dynamically extend or modify the behavior of a function without directly modifying its source code.`,
        instructions: `Create a timing decorator \`@timer\` in Python that prints execution duration.`,
        starterCode: `import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        res = func(*args, **kwargs)
        print(f"Executed in {time.time() - start:.4f}s")
        return res
    return wrapper

@timer
def heavy_calc():
    return sum(range(1000000))

heavy_calc()`,
        solutionCode: `def wrapper(*args, **kwargs):`,
        testCases: [
          { name: 'Wrapper function defined', check: (code) => code.includes('def wrapper') }
        ]
      }
    ]
  },
  {
    id: 'sql-track',
    title: 'SQL Database Engineering',
    icon: '💾',
    color: 'blue',
    badgeClass: 'badge-blue',
    description: 'Execute relational database queries, table joins, window functions, and query performance tuning.',
    languages: ['SQL'],
    quests: [
      {
        id: 'sql-aggregations-course',
        title: 'SQL GROUP BY & Aggregations',
        xp: 100,
        simulatorType: 'sql-playground',
        difficulty: 'Beginner',
        badge: { id: 'sql_sage', title: 'Query Master', desc: 'Executed complex SQL joins and GROUP BY queries!', icon: '💾' },
        theory: `Relational databases rely on SQL queries to filter, join, and aggregate datasets across multiple tables.`,
        instructions: `Run SQL queries against our auto-seeded SQLite database! Find the top spent customers.`,
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
  },
  {
    id: 'java-track',
    title: 'Java Core & Enterprise',
    icon: '☕',
    color: 'yellow',
    badgeClass: 'badge-gold',
    description: 'Master Java object-oriented architecture, Streams API, multi-threading, and JVM memory management.',
    languages: ['Java'],
    quests: [
      {
        id: 'java-streams',
        title: 'Functional Streams API & Lambdas',
        xp: 100,
        simulatorType: 'code-only',
        difficulty: 'Intermediate',
        badge: { id: 'java_streamer', title: 'Stream Master', desc: 'Filtered and mapped collections with Java Streams!', icon: '☕' },
        theory: `Java 8 introduced Streams to perform functional operations on collections of objects like map, filter, and reduce.`,
        instructions: `Filter a list of names starting with 'A' and convert to uppercase using Java Streams.`,
        starterCode: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alex", "Sophia", "Aria", "Marcus");
        List<String> result = names.stream()
            .filter(n -> n.startsWith("A"))
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println(result);
    }
}`,
        solutionCode: `names.stream().filter`,
        testCases: [
          { name: 'Stream filter and map applied', check: (code) => code.includes('.stream()') && code.includes('.filter(') }
        ]
      }
    ]
  },
  {
    id: 'cpp-track',
    title: 'C++ Systems Performance',
    icon: '⚡',
    color: 'cyan',
    badgeClass: 'badge-purple',
    description: 'Master RAII, pointers, smart pointers, template metaprogramming, and raw memory control in C++.',
    languages: ['C++'],
    quests: [
      {
        id: 'cpp-pointers-course',
        title: 'Pointers & Memory Addresses',
        xp: 90,
        simulatorType: 'rust-memory',
        difficulty: 'Intermediate',
        badge: { id: 'cpp_master', title: 'Pointer Wizard', desc: 'Dereferenced memory addresses like a pro!', icon: '🎯' },
        theory: `Pointers in C++ store memory addresses of variables, allowing direct heap manipulation.`,
        instructions: `Write a C++ function that swaps two integers using raw pointers \`int*\`.`,
        starterCode: `#include <iostream>

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
        solutionCode: `void swap(int* a, int* b)`,
        testCases: [
          { name: 'Dereference operator used (*a)', check: (code) => code.includes('*a') && code.includes('*b') }
        ]
      },
      {
        id: 'cpp-smart-pointers-course',
        title: 'Smart Pointers & RAII (unique_ptr)',
        xp: 110,
        simulatorType: 'rust-memory',
        difficulty: 'Advanced',
        badge: { id: 'cpp_raii', title: 'RAII Guardian', desc: 'Eliminated memory leaks using std::unique_ptr!', icon: '🛡️' },
        theory: `Modern C++ avoids manual \`delete\` by wrapping resources in smart pointers like \`std::unique_ptr<T>\`.`,
        instructions: `Transfer ownership of a \`unique_ptr\` using \`std::move\`.`,
        starterCode: `#include <iostream>
#include <memory>

int main() {
    std::unique_ptr<int> p1 = std::make_unique<int>(42);
    std::unique_ptr<int> p2 = std::move(p1);
    if (!p1) {
        std::cout << "p1 is null, moved to p2: " << *p2 << std::endl;
    }
    return 0;
}`,
        solutionCode: `std::move(p1)`,
        testCases: [
          { name: 'std::move ownership transfer', check: (code) => code.includes('std::move') }
        ]
      }
    ]
  },
  {
    id: 'csharp-track',
    title: 'C# & .NET Architecture',
    icon: '🎯',
    color: 'purple',
    badgeClass: 'badge-purple',
    description: 'Master C# language features, LINQ expressions, async/await tasks, and delegates.',
    languages: ['C#'],
    quests: [
      {
        id: 'csharp-linq-course',
        title: 'LINQ Queries & Deferred Execution',
        xp: 100,
        simulatorType: 'code-only',
        difficulty: 'Intermediate',
        badge: { id: 'csharp_linq', title: 'LINQ Legend', desc: 'Queried in-memory collections with LINQ!', icon: '🎯' },
        theory: `Language Integrated Query (LINQ) in C# provides pattern-based querying over object collections.`,
        instructions: `Filter numbers greater than 10 and sort descending using LINQ syntax.`,
        starterCode: `using System;
using System.Linq;

class Program {
    static void Main() {
        int[] nums = { 5, 12, 3, 20, 8, 15 };
        var filtered = nums.Where(n => n > 10).OrderByDescending(n => n);
        foreach (var n in filtered) {
            Console.WriteLine(n);
        }
    }
}`,
        solutionCode: `nums.Where(n => n > 10)`,
        testCases: [
          { name: 'LINQ Where and OrderBy used', check: (code) => code.includes('.Where') || code.includes('.OrderBy') }
        ]
      }
    ]
  },
  {
    id: 'c-track',
    title: 'C Low-Level Systems',
    icon: '⚙️',
    color: 'slate',
    badgeClass: 'badge-cyan',
    description: 'Master manual memory allocation (malloc/free), structs, bit manipulation, and C system pointers.',
    languages: ['C'],
    quests: [
      {
        id: 'c-malloc-free',
        title: 'Manual Dynamic Memory (malloc & free)',
        xp: 120,
        simulatorType: 'rust-memory',
        difficulty: 'Advanced',
        badge: { id: 'c_allocator', title: 'Memory Allocator', desc: 'Allocated dynamic heap memory safely in C!', icon: '⚙️' },
        theory: `C requires explicit dynamic memory management on the heap using \`malloc()\` and freeing memory with \`free()\`.`,
        instructions: `Allocate an array of 5 integers dynamically using \`malloc\` and free it.`,
        starterCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int* arr = (int*) malloc(5 * sizeof(int));
    if (arr == NULL) return 1;
    
    for(int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 10;
    }
    
    printf("First elem: %d\\n", arr[0]);
    free(arr);
    return 0;
}`,
        solutionCode: `malloc(5 * sizeof(int))`,
        testCases: [
          { name: 'malloc and free used', check: (code) => code.includes('malloc') && code.includes('free(') }
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
