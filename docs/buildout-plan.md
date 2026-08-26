# Course build-out plan: Rust, Python, Java, C, C++

Scope: full course content for five languages in You Are Online. Rust and C++ start at beginner level for a programmer who already knows another language. Python, Java, and C start at intermediate level. Syntax reminders move into the UI. This document plans the work. It ships no course content and no code.

Grounded against the repository at commit-time state on 2026-08-20.

---

## 1. Current state

### What the engine already supports

**Course schema.** A course is a plain object in `src/data/courses/*.js`:

```
{ id, title, icon, mascotImg?, color, domain, language, difficulty, badgeClass, description,
  chapters: [ { id, title, description, lessons: [...] } ] }
```

A lesson is:

```
{ id, title, type, xp, isBoss?, badge?, theory, instructions?, starterCode?, solutionCode?,
  testCases?, simulatorType?, quizData?, fillData? }
```

**Lesson types.** `src/components/LessonView.jsx` dispatches on `lesson.type` with three explicit branches: `web-preview`, `quiz`, `fill-blank`. Every other value falls through to the code editor branch. `code` and `simulator` both land there. `simulator` differs only because `simulatorType` adds a second tab. `src/components/CourseJourneyView.jsx` renders a type badge for `web-preview`, `quiz`, `fill-blank`, `simulator`, and a default badge for everything else.

**Evaluators.** `src/utils/evaluator.js` holds three functions. `evaluateQuiz` compares an index. `evaluateFillBlank` compares trimmed token strings. `evaluateCodeExercise` runs each `testCase.check` predicate against the source string.

**Simulators.** `src/components/simulators/` holds six components. `RustMemoryVisualizer` and `CpuThreadsSimulator` and `TerminalSimulator` and `SyntheticDataGenerator` take no props. `AlgorithmicTestBench` takes `userCode`. `SqlPlayground` takes `defaultQuery`.

**XP system.** `src/context/GameContext.jsx` stores `xp`, `streak`, `completedQuests`, `unlockedBadges` in localStorage under `you_are_online_progress`. `completeQuest(id, xp, badge)` awards XP once at full value and 20 percent on replay. Level is `Math.floor(xp / 100) + 1`.

**Stack.** React 18, Vite 6. Runtime dependencies are `react`, `react-dom`, `lucide-react`, `canvas-confetti`. No editor library, no markdown library, no WASM runtime.

### What is missing

The gaps below block the build-out. Each one appears again in section 5 as a work item.

1. **No code runs.** `evaluateCodeExercise` never executes the learner's code. It matches strings and then prints a fabricated success log built from a hardcoded template. The log says "Output compiled successfully" and "EXIT CODE 0" whenever the source contains `print(`, `println!`, `std::cout`, `console.log`, or `SELECT`. The message appears even when tests fail. This is a correctness problem for every language, JavaScript included.

2. **Test checks are ad hoc.** Existing `testCases` use `code.includes('...')`. A check that looks for `'.filter('` passes on a comment. Intermediate lessons need stronger structural checks.

3. **Theory renders as plain text.** `LessonView` prints `lesson.theory` inside a div with `whiteSpace: 'pre-line'`. Markdown emphasis and fenced code blocks render as literal characters. Every existing lesson writes markdown into that field.

4. **The hint button is a stub.** `LessonView` renders one hardcoded sentence for every lesson. It never reads a per-lesson hint field.

5. **No syntax reference surface.** Nothing in the data model or the UI holds reusable syntax reminders.

6. **Navigation leaves the course.** `getAdjacentLessons` in `src/data/courseRegistry.js` flattens every lesson of every course into one array. "Next Lesson" at the end of a course jumps into an unrelated course. A 50 lesson course makes this obvious.

7. **Search throws on quiz lessons.** `searchLessons` calls `lesson.theory.toLowerCase()` without a guard. Quiz lessons carry no `theory` field, so any search over the current data set raises a TypeError.

8. **No java.js and no c.js.** Both courses are new files.

9. **Existing courses are thin.** `rust.js` holds 2 lessons, `cpp.js` holds 2, `python.js` holds 4, `javascript.js` holds 5. All start at beginner level.

10. **The level curve does not scale.** The five courses total 228 lessons and roughly 18000 XP. At 100 XP per level that reaches level 180.

---

## 2. Syntax-reminder UI

Beginner syntax leaves the lesson list. It becomes reference material available while the learner solves. Three placements are possible.

### Option A: docked cheat-sheet panel in LessonView

A collapsible panel beside the code editor. It holds the full syntax reference for the course language, grouped by category, with a filter box. State persists per language in localStorage.

Pros:
- One surface covers every lesson in the course.
- The learner finds constructs the lesson author did not anticipate.
- Authoring cost is per language, not per lesson.

Cons:
- The lesson screen is already a 40/60 split with a stepper above it. A third region costs horizontal space.
- A full reference invites scrolling and reading instead of solving.
- Needs search, categories, and collapse state, so it is the largest of the three to build.

### Option B: per-lesson "syntax you need" card

A compact card in the left pane, above the instructions. It lists only the constructs the lesson uses, three to six entries, each collapsed to a signature line that expands to a short example. The lesson declares them by id in a new `syntaxRefs` field.

Pros:
- Fits the existing left pane with no layout change.
- The card is scoped, so it reminds without teaching a whole language.
- It doubles as a lesson index. A lesson that needs nine entries is scoped too wide.
- Reuses one shared data module, so authoring cost is one array of ids per lesson.

Cons:
- The learner cannot reach a construct the author left out.
- Every lesson needs its `syntaxRefs` list maintained.

### Option C: hover hints on tokens

Tokens in `theory` and `starterCode` carry hover tooltips with the signature.

Pros:
- Zero extra layout.
- The reminder appears at the point of confusion.

Cons:
- The editor is a bare `textarea`. Token-level hover needs a real editor component or an overlay that mirrors the text. That is a large change.
- Hover fails on touch devices.
- Discovery is poor. Nothing shows which tokens carry a hint.

### Lean

Build Option B in phase 1. It is the smallest change, it fits the existing layout, and it forces per-lesson scope discipline. Add Option A in phase 3 as a second view over the same data, opened from a button on the card. Reject Option C. The cost of a token-aware editor outweighs the benefit.

### Data shape

One module per language at `src/data/syntax/<language>.js`:

```
export const rustSyntax = {
  language: 'Rust',
  entries: [
    {
      id: 'rust.match',
      label: 'match expression',
      category: 'Control flow',
      signature: 'match value { Pattern => expr, _ => expr }',
      example: 'match opt {\n    Some(x) => x * 2,\n    None => 0,\n}',
      note: 'Arms must cover every case. The wildcard arm is _.'
    }
  ]
};
```

Field rules:
- `id` is `<language>.<slug>` and is stable. Lessons reference it.
- `signature` is one line. It is the collapsed view.
- `example` is at most five lines.
- `note` is at most two sentences and states a rule, not advice.
- `category` groups entries in the Option A panel.

A registry at `src/data/syntaxRegistry.js` exposes `getSyntaxEntries(language, ids)` and `getAllSyntax(language)`. It returns entries in the order the ids were given and skips unknown ids.

### Component hook

`SyntaxCard` mounts in `src/components/LessonView.jsx` in the left pane, between the theory block and the instructions block. It reads `lesson.syntaxRefs` and `course.language`. It renders nothing when `syntaxRefs` is absent, so existing lessons are unaffected.

---

## 3. Execution and evaluation strategy per language

The platform runs in the browser with no server. Today no language executes, JavaScript included. The strategy below states what replaces execution per language.

Three evaluation modes appear across the five courses:

- **Static check.** A predicate set runs against the source text. Used by `code` lessons. Section 5 adds a helper module so checks test structure instead of substrings.
- **Answer check.** The learner picks or types an answer. Used by `quiz`, `fill-blank`, `predict-output`, `spot-bug`.
- **Real execution.** The source runs and output is compared. Available only where a browser runtime exists.

### Rust

No in-browser Rust compiler exists. The two candidates are static checking and a network call to the public Rust Playground execute endpoint.

Option A, static check plus simulators. Checks run against the source. Ownership, borrowing, and threading lessons anchor on `rust-memory` and `cpu-threads` simulators. Borrow checker behavior is taught through `predict-output` and `spot-bug` lessons, where the expected answer is a compiler error rather than a value. The entry module leans on the same pair, because a mistaken expectation carried over from Java is itself a prediction the learner can be asked to correct.

Option B, Rust Playground proxy. Lessons post source to the public playground endpoint and show real compiler output.

Pros of B: real rustc diagnostics, which is most of the value of learning Rust. Cons of B: the platform stops being offline, the endpoint is a third-party service with unverified CORS headers and unpublished rate limits, and a broken endpoint breaks the course.

Lean: Option A. The borrow checker is a static analyzer, so predicting its verdict is a legitimate exercise. Option B stays an open question in section 7.

### Python

Pyodide compiles CPython to WebAssembly and runs in the browser. It is the one language of the five with a mature browser runtime.

Option A, Pyodide. Code lessons execute for real. Tests compare stdout and inspect the resulting namespace. Pyodide loads lazily on first entry to a Python code lesson.

Option B, static check plus prediction. Same treatment as the other four languages.

Pros of A: real tracebacks, real output, and tests that check behavior instead of text. It also makes the testing module of the course honest. Cons of A: the runtime download is several megabytes, first load takes seconds, and the app gains an external asset.

Lean: Option A, lazy loaded, with a static-check fallback when the runtime fails to load. Confirmed as an open question in section 7 because of the download size.

### Java

No practical browser JVM exists for this project. CheerpJ is commercial and heavy. A network compile service carries the same objections as the Rust playground.

Strategy: static check plus answer check. `code` lessons verify structure, such as the presence of an `equals` override paired with a `hashCode` override. Concurrency lessons use the `cpu-threads` simulator. Streams laziness, type erasure, and race conditions become `predict-output` lessons.

Lean: no runtime. No open question.

### C

Compiling C in the browser needs a WASM toolchain, which is a project of its own.

Strategy: static check, answer check, and a new `memory-lab` simulator. Pointer arithmetic, stack frames, and heap allocation lessons run on the simulator, which is driven by lesson-supplied steps. Undefined behavior lessons run as `predict-output` where one valid answer is "unspecified".

Lean: no runtime.

### C++

Same constraint as C, plus a larger language surface.

Strategy: static check, answer check, and `memory-lab`. Stack lifetime, destruction order, move semantics, and smart pointer ownership all run on the simulator, which makes it the busiest surface in the course. Copy and move counting is a good fit for `predict-output`, since the answer is a count rather than a program output.

Lean: no runtime.

### Summary table

| Language | Real execution | Primary modes | Simulators used |
| --- | --- | --- | --- |
| Rust | No | static check, predict-output, spot-bug | rust-memory, cpu-threads |
| Python | Yes, via Pyodide, pending approval | real execution, predict-output | none |
| Java | No | static check, predict-output, spot-bug | cpu-threads |
| C | No | static check, predict-output, spot-bug | memory-lab |
| C++ | No | static check, predict-output, spot-bug | memory-lab |

Two items need Sophia's call: Pyodide for Python, and the Rust Playground for Rust. Both appear in section 7.

---

## 4. Per-course outlines

Lesson types used below: `code`, `quiz`, `fill-blank`, `simulator` (all four exist today), plus `predict-output` and `spot-bug` (defined in section 5). `boss` marks a capstone. It is the existing `isBoss` flag on a `code` lesson, not a separate type.

No lesson covers printing, variable declaration, basic arithmetic, if/else, or introductory loops as its subject. Those constructs appear in the syntax reference instead.

Two entry levels apply. Rust and C++ start at beginner level for a programmer who already knows another language. Their first modules cover the toolchain and the entry material of the language, framed against what a Java or Python programmer expects. Python, Java, and C start at intermediate level and assume working knowledge of the language.

### 4.1 Rust (50 lessons)

Course id `rust-course`, file `src/data/courses/rust.js`, rewritten in place. Difficulty reads `Beginner to Advanced, assumes another language`.

**Module 1: Rust for a Java or Python programmer.** The toolchain, and the rules that have no equivalent elsewhere.

| # | Lesson | Type |
| --- | --- | --- |
| 1 | Cargo, crates, and the module system | quiz |
| 2 | Ownership and moves from the first line | simulator (rust-memory) |
| 3 | Borrowing: shared and exclusive references | code |
| 4 | Copy types, and what a move does not touch | predict-output |
| 5 | Mutability and shadowing against Java final | spot-bug |
| 6 | Ownership drill: repair the moved value errors | spot-bug |
| 7 | Unit tests and cargo test | code |

**Module 2: Types, structs, enums, and match.** The data modeling core.

| # | Lesson | Type |
| --- | --- | --- |
| 8 | Structs, impl blocks, and associated functions | code |
| 9 | Enums that carry data, against Java enums | code |
| 10 | match as an expression, and exhaustiveness | code |
| 11 | Destructuring nested enums and structs | code |
| 12 | match guards, bindings, and let else | fill-blank |
| 13 | Option in place of null | code |
| 14 | String and &str, and why the language has two | predict-output |
| 15 | Implement Display and Debug for a custom type | code |

**Module 3: Ownership in practice.** Move semantics on real data, not toy strings.

| # | Lesson | Type |
| --- | --- | --- |
| 16 | Moves through function boundaries and struct fields | simulator (rust-memory) |
| 17 | Shared and exclusive borrows in conflict | spot-bug |
| 18 | Borrow drill: restructure code the borrow checker rejects | code |
| 19 | Slices and partial borrows of a struct | code |
| 20 | The cost of clone and when it is the right answer | quiz |
| 21 | Vec and HashMap with the entry API | code |

**Module 4: Traits, generics, and closures.** Abstraction without runtime cost.

| # | Lesson | Type |
| --- | --- | --- |
| 22 | Define a trait and implement it for two types | code |
| 23 | Generic functions with trait bounds | code |
| 24 | where clauses and multiple bounds | fill-blank |
| 25 | Trait objects against generics, and dispatch cost | quiz |
| 26 | Deriving traits, and when a derive fails | predict-output |
| 27 | Orphan rule and blanket impl conflicts | spot-bug |
| 28 | Closures and the Fn, FnMut, FnOnce traits | code |

**Module 5: Error handling.** Result, Option, and the failure path.

| # | Lesson | Type |
| --- | --- | --- |
| 29 | Result and the ? operator across call layers | code |
| 30 | Option combinators: map, and_then, unwrap_or | code |
| 31 | Custom error types and the From conversion | code |
| 32 | Error drill: convert a panicking function to Result | code |
| 33 | panic against Result as an API decision | quiz |
| 34 | Boss: a config parser with custom error types | code (boss) |

**Module 6: Lifetimes.** Why annotations exist and how to write them.

| # | Lesson | Type |
| --- | --- | --- |
| 35 | Dangling reference cases the compiler rejects | predict-output |
| 36 | Annotating a function that returns a reference | fill-blank |
| 37 | Structs that hold references | code |
| 38 | Lifetime elision rules | quiz |

**Module 7: Collections and iterators.** Idiomatic data handling.

| # | Lesson | Type |
| --- | --- | --- |
| 39 | Iterator adapters and lazy evaluation order | predict-output |
| 40 | Iterator drill: rewrite a manual traversal with adapters | code |
| 41 | collect into Vec, HashMap, and Result | fill-blank |
| 42 | Implement the Iterator trait for a custom type | code |
| 43 | Sorting, dedup, and the borrow rules on a Vec | code |

**Module 8: Smart pointers and concurrency.** Shared ownership and threads.

| # | Lesson | Type |
| --- | --- | --- |
| 44 | Box, Rc, and RefCell compared | simulator (memory-lab) |
| 45 | Interior mutability and the runtime borrow panic | predict-output |
| 46 | Threads, move closures, and join | simulator (cpu-threads) |
| 47 | Send and Sync at a working level | quiz |
| 48 | Arc and Mutex across threads | code |
| 49 | Channels and message passing | code |
| 50 | Boss: a borrow-safe cache with Rc and RefCell | code (boss) |

### 4.2 Python (44 lessons)

Course id `python-course`, file `src/data/courses/python.js`, rewritten in place. Difficulty changes from `Beginner` to `Intermediate to Advanced`.

**Module 1: Iteration protocols.** Comprehensions, iterators, and generators.

| # | Lesson | Type |
| --- | --- | --- |
| 1 | Nested and conditional comprehensions | code |
| 2 | Comprehension drill: rewrite nested transformations | code |
| 3 | The iterator protocol: iter and next | code |
| 4 | Generator functions and evaluation order | predict-output |
| 5 | Generator expressions and memory cost | code |
| 6 | yield from and delegation | code |

**Module 2: Functions in depth.** Closures and decorators.

| # | Lesson | Type |
| --- | --- | --- |
| 7 | Closures and late binding | predict-output |
| 8 | Argument unpacking and keyword-only parameters | fill-blank |
| 9 | Write a timing decorator | code |
| 10 | Decorators with arguments and functools.wraps | code |
| 11 | Decorator drill: add caching and logging to one function | code |

**Module 3: Objects and protocols.** The dunder surface.

| # | Lesson | Type |
| --- | --- | --- |
| 12 | eq and hash together, and what breaks apart | code |
| 13 | repr against str | quiz |
| 14 | Sequence protocol: len, getitem, and contains | code |
| 15 | Inheritance, super, and the method resolution order | predict-output |
| 16 | Properties and descriptors misused | spot-bug |
| 17 | A context manager with enter and exit | code |
| 18 | contextlib.contextmanager and cleanup on error | code |

**Module 4: Exceptions.** Failure handled on purpose.

| # | Lesson | Type |
| --- | --- | --- |
| 19 | Custom exception hierarchies | code |
| 20 | try, except, else, and finally in one flow | predict-output |
| 21 | Exception chaining with raise from | code |
| 22 | Bare except and the swallowed traceback | spot-bug |

**Module 5: Typing and data modeling.** Type hints that carry weight.

| # | Lesson | Type |
| --- | --- | --- |
| 23 | Hints for containers, callables, and optionals | fill-blank |
| 24 | Generics with TypeVar | code |
| 25 | dataclasses, field defaults, and frozen | code |
| 26 | The mutable default argument trap | spot-bug |
| 27 | Enum and IntEnum for closed value sets | code |
| 28 | Protocols and structural typing | quiz |
| 29 | Boss: a typed record store with dataclasses and protocols | code (boss) |

**Module 6: Standard library and modules.** The batteries, and how imports resolve.

| # | Lesson | Type |
| --- | --- | --- |
| 30 | itertools: chain, groupby, islice, product | code |
| 31 | functools: lru_cache, partial, reduce | code |
| 32 | collections: defaultdict, Counter, deque | code |
| 33 | Sort keys and stable sort behavior | predict-output |
| 34 | pathlib and file handling with context managers | code |
| 35 | Modules, packages, and import resolution | quiz |
| 36 | Circular imports and how to break them | spot-bug |

**Module 7: Async and testing.** Concurrency basics and a test suite.

| # | Lesson | Type |
| --- | --- | --- |
| 37 | Coroutines and the event loop | quiz |
| 38 | A blocking call inside an async function | spot-bug |
| 39 | asyncio.gather and concurrent tasks | code |
| 40 | Async context managers and async iterators | code |
| 41 | pytest style tests and fixtures | code |
| 42 | Parametrized tests and exception assertions | code |
| 43 | Test doubles with monkeypatch | code |
| 44 | Boss: a cached async fetch pipeline with tests | code (boss) |

### 4.3 Java (43 lessons)

Course id `java-course`, new file `src/data/courses/java.js`. Domain `Systems Engineering`.

**Module 1: Collections and generics.** Choosing and parameterizing containers.

| # | Lesson | Type |
| --- | --- | --- |
| 1 | List, Set, and Map chosen by access cost | quiz |
| 2 | Generic methods and bounded type parameters | code |
| 3 | Wildcards and the PECS rule | fill-blank |
| 4 | Type erasure and what it removes | predict-output |
| 5 | Modifying a collection during iteration | spot-bug |
| 6 | Autoboxing, the Integer cache, and == against equals | predict-output |
| 7 | Implement Iterable for a custom collection | code |

**Module 2: Contracts and object design.** The rules objects must keep.

| # | Lesson | Type |
| --- | --- | --- |
| 8 | The equals and hashCode contract | code |
| 9 | equals broken across a subclass | spot-bug |
| 10 | Comparable and Comparator | code |
| 11 | Immutable types and defensive copies | code |
| 12 | Static and instance initialization order | predict-output |
| 13 | Boss: a value type that behaves in every collection | code (boss) |

**Module 3: Interfaces, enums, and abstraction.** Design decisions, not keywords.

| # | Lesson | Type |
| --- | --- | --- |
| 14 | Default methods on interfaces | code |
| 15 | Abstract class against interface in a design | quiz |
| 16 | Enums with state and behavior | code |
| 17 | Records and sealed hierarchies | code |
| 18 | Nested, inner, and anonymous classes against lambdas | predict-output |
| 19 | Refactor inheritance into composition | code |

**Module 4: Lambdas and streams.** Functional pipelines on collections.

| # | Lesson | Type |
| --- | --- | --- |
| 20 | Lambdas and functional interfaces | fill-blank |
| 21 | Method references and their four forms | fill-blank |
| 22 | map, filter, and collect on a stream | code |
| 23 | flatMap over nested collections | code |
| 24 | Collectors: groupingBy, joining, toMap | code |
| 25 | Stream laziness and short circuit order | predict-output |
| 26 | Stream drill: replace nested iteration with a pipeline | code |
| 27 | When a hand-written traversal beats a stream | quiz |

**Module 5: Optional and exceptions.** Absent values and failure.

| # | Lesson | Type |
| --- | --- | --- |
| 28 | Optional as a return type, and how it is misused | code |
| 29 | Checked and unchecked exceptions in an API | quiz |
| 30 | try-with-resources and AutoCloseable | code |
| 31 | finally and return in the same method | predict-output |
| 32 | Swallowed exceptions and lost stack traces | spot-bug |
| 33 | Custom exceptions that carry context | code |

**Module 6: Concurrency and the memory model.** Threads and visibility.

| # | Lesson | Type |
| --- | --- | --- |
| 34 | Threads, Runnable, and ExecutorService | simulator (cpu-threads) |
| 35 | synchronized, visibility, and volatile | simulator (cpu-threads) |
| 36 | A race on a shared counter | predict-output |
| 37 | Deadlock from lock ordering | spot-bug |
| 38 | Concurrent collections and atomic types | code |
| 39 | CompletableFuture composition | code |
| 40 | Boss: a thread safe in-memory store | code (boss) |

**Module 7: Testing.** Verification with JUnit.

| # | Lesson | Type |
| --- | --- | --- |
| 41 | JUnit tests and assertions | code |
| 42 | Parameterized tests and exception assertions | code |
| 43 | Test doubles and dependency seams | code |

### 4.4 C (43 lessons)

Course id `c-course`, new file `src/data/courses/c.js`. Domain `Systems Engineering`.

**Module 1: Pointers in practice.** Addresses, arithmetic, and decay.

| # | Lesson | Type |
| --- | --- | --- |
| 1 | Pointer arithmetic across an array | simulator (memory-lab) |
| 2 | Pointer drill: walk a buffer without an index | code |
| 3 | Pointers to pointers and out parameters | code |
| 4 | Array decay at a function boundary | predict-output |
| 5 | const placement in a pointer declaration | fill-blank |
| 6 | sizeof on an array against sizeof on a pointer | predict-output |
| 7 | Two dimensional arrays and pointer to array | predict-output |

**Module 2: Memory management.** The stack and heap model.

| # | Lesson | Type |
| --- | --- | --- |
| 8 | Stack frames, scope, and object lifetime | simulator (memory-lab) |
| 9 | malloc, calloc, realloc, and free | code |
| 10 | Allocation drill: grow and shrink a buffer safely | code |
| 11 | A returned pointer to a local | spot-bug |
| 12 | Double free and use after free | spot-bug |
| 13 | Find and close the leaks in a small program | code |
| 14 | void pointers and safe casting | code |

**Module 3: Types, structs, and bits.** Composite data and representation.

| # | Lesson | Type |
| --- | --- | --- |
| 15 | Struct layout, padding, and alignment | predict-output |
| 16 | Struct pointers and the arrow operator | code |
| 17 | Unions and tagged unions | code |
| 18 | Enums and bit flags | fill-blank |
| 19 | Bit masks, shifts, and field packing | code |
| 20 | Integer conversion, promotion, and overflow | predict-output |

**Module 4: Strings and buffers.** Null terminated data.

| # | Lesson | Type |
| --- | --- | --- |
| 21 | String length, capacity, and the terminator | code |
| 22 | strcpy against strncpy and buffer overflow | spot-bug |
| 23 | Build a bounded copy helper | code |
| 24 | Tokenizing input without the strtok traps | code |
| 25 | scanf return values and input failure | quiz |
| 26 | Boss: a growable string type | code (boss) |

**Module 5: Functions, modules, and the build.** Indirection and translation units.

| # | Lesson | Type |
| --- | --- | --- |
| 27 | Function pointers and callbacks | code |
| 28 | qsort with a custom comparator | code |
| 29 | Dispatch tables from function pointers | code |
| 30 | Headers, translation units, and static linkage | quiz |
| 31 | From source to executable: the four stages | quiz |
| 32 | Macro expansion traps | spot-bug |
| 33 | Variadic functions with stdarg | code |

**Module 6: Files and error reporting.** The standard library contract.

| # | Lesson | Type |
| --- | --- | --- |
| 34 | fopen, fread, fwrite, and fclose | code |
| 35 | errno and the C error reporting convention | code |
| 36 | Unchecked return values from the standard library | spot-bug |

**Module 7: Data structures by hand.** Building the containers other languages ship.

| # | Lesson | Type |
| --- | --- | --- |
| 37 | Singly linked list: insert and delete | code |
| 38 | Doubly linked list and pointer surgery | code |
| 39 | A dynamic array with growth policy | code |
| 40 | A hash table with separate chaining | code |
| 41 | A binary search tree with recursive insert | code |
| 42 | Undefined behavior catalogue | quiz |
| 43 | Boss: an arena allocator | code (boss) |

### 4.5 C++ (48 lessons)

Course id `cpp-course`, file `src/data/courses/cpp.js`, rewritten in place. Difficulty reads `Beginner to Advanced, assumes another language`.

**Module 1: C++ for a Java or Python programmer.** The build model, and the semantics that differ from a managed language.

| # | Lesson | Type |
| --- | --- | --- |
| 1 | Translation units, headers, and the build | quiz |
| 2 | Namespaces and name lookup | code |
| 3 | Value semantics against Java reference semantics | predict-output |
| 4 | Objects on the stack, and lifetime tied to scope | simulator (memory-lab) |
| 5 | References and pointers in an API signature | code |
| 6 | const correctness on parameters and members | fill-blank |
| 7 | const member functions and mutable | code |
| 8 | auto, and the const and reference it drops | spot-bug |

**Module 2: Classes and construction.** Object creation and copying.

| # | Lesson | Type |
| --- | --- | --- |
| 9 | Classes, constructors, and member initializer lists | code |
| 10 | Destructors and deterministic cleanup | simulator (memory-lab) |
| 11 | Copy constructor and copy assignment | code |
| 12 | The rule of three | code |
| 13 | The rule of zero and compiler defaults | quiz |
| 14 | Deleted and defaulted special members | code |
| 15 | Operator overloading and its conventions | code |
| 16 | Boss: a value type with correct copy semantics | code (boss) |

**Module 3: Inheritance and polymorphism.** Dynamic dispatch and its traps.

| # | Lesson | Type |
| --- | --- | --- |
| 17 | Virtual functions and dynamic dispatch | code |
| 18 | The missing virtual destructor | spot-bug |
| 19 | Object slicing on assignment | predict-output |
| 20 | Abstract classes and interface design | code |
| 21 | override, final, and the silent signature mismatch | spot-bug |
| 22 | Multiple inheritance and virtual bases | quiz |

**Module 4: RAII and resources.** Resources owned by objects.

| # | Lesson | Type |
| --- | --- | --- |
| 23 | An RAII wrapper around a raw handle | code |
| 24 | new and delete left in modern code | spot-bug |
| 25 | unique_ptr and ownership transfer | simulator (memory-lab) |
| 26 | shared_ptr, weak_ptr, and reference cycles | simulator (memory-lab) |
| 27 | Smart pointer drill: convert a raw pointer class | code |
| 28 | Destruction order and exceptions | predict-output |

**Module 5: Move semantics.** Transfer instead of copy.

| # | Lesson | Type |
| --- | --- | --- |
| 29 | lvalues, rvalues, and std::move | simulator (memory-lab) |
| 30 | The rule of five with move constructor and move assignment | code |
| 31 | Copy elision and when a copy disappears | predict-output |
| 32 | The accidental copy in a range for loop | spot-bug |
| 33 | Forwarding references and std::forward | fill-blank |

**Module 6: Templates.** Generic code and its error surface.

| # | Lesson | Type |
| --- | --- | --- |
| 34 | Function templates and argument deduction | code |
| 35 | Class templates and specialization | code |
| 36 | Variadic templates and fold expressions | code |
| 37 | constexpr and compile time evaluation | code |
| 38 | Reading a template error and constraining it | quiz |
| 39 | Template drill: write a generic container | code |

**Module 7: The standard library.** Containers, algorithms, and vocabulary types.

| # | Lesson | Type |
| --- | --- | --- |
| 40 | Container choice by complexity guarantee | quiz |
| 41 | Iterator invalidation on insert and erase | spot-bug |
| 42 | sort, find_if, transform, accumulate | code |
| 43 | Lambda captures by value and by reference | spot-bug |
| 44 | Custom comparators and projections | code |
| 45 | string_view and span over owning types | code |
| 46 | optional and variant as return types | code |
| 47 | Exception safety guarantees | quiz |
| 48 | Boss: a move-only resource pool | code (boss) |

### Lesson counts

Counts follow from the material each language needs. Rust and C++ carry the largest counts because they start at beginner level for a programmer and still reach concurrency and templates. C is large because its data structure module builds by hand what the other four languages import.

| Course | Lessons | Modules | Capstones | Entry level |
| --- | --- | --- | --- | --- |
| Rust | 50 | 8 | 2 | Beginner for a programmer |
| Python | 44 | 7 | 2 | Intermediate |
| Java | 43 | 7 | 2 | Intermediate |
| C | 43 | 7 | 2 | Intermediate |
| C++ | 48 | 7 | 2 | Beginner for a programmer |
| Total | 228 | 36 | 10 | |

---

## 5. Engine work items

Sizes are S (under half a day), M (half a day to two days), L (more than two days).

### New lesson types

**`predict-output`** (M). The lesson shows a fixed snippet and asks what it produces. The answer set includes real output values, compiler errors, and "undefined behavior" where that applies. It reuses the quiz option model with a code block above the options and a per-option explanation.

Data shape:

```
predictData: {
  snippet: '...',
  question: 'What does this program print?',
  options: ['...'],
  correctOptionIndex: 0,
  explanation: '...'
}
```

**`spot-bug`** (M). The lesson shows a numbered snippet. The learner clicks the defective line, then picks the defect category from a short list. Passing needs both.

Data shape:

```
bugData: {
  snippet: '...',
  buggyLine: 7,
  categories: ['use after free', 'off by one', 'leak', 'type error'],
  correctCategoryIndex: 0,
  explanation: '...'
}
```

Both types keep the existing `onPass` contract, so XP and badges need no change.

### New files

| Path | Purpose | Size |
| --- | --- | --- |
| `src/data/courses/java.js` | Java course, 43 lessons | L |
| `src/data/courses/c.js` | C course, 43 lessons | L |
| `src/data/syntax/rust.js` | Rust syntax entries, about 60 | M |
| `src/data/syntax/python.js` | Python syntax entries, about 50 | M |
| `src/data/syntax/java.js` | Java syntax entries, about 50 | M |
| `src/data/syntax/c.js` | C syntax entries, about 45 | M |
| `src/data/syntax/cpp.js` | C++ syntax entries, about 65 | M |
| `src/data/syntaxRegistry.js` | `getSyntaxEntries`, `getAllSyntax` | S |
| `src/components/SyntaxCard.jsx` | Per-lesson syntax card, Option B | M |
| `src/components/SyntaxPanel.jsx` | Docked full reference, Option A | M |
| `src/components/evaluators/PredictOutputRunner.jsx` | Runner for `predict-output` | M |
| `src/components/evaluators/SpotBugRunner.jsx` | Runner for `spot-bug` | M |
| `src/components/simulators/MemoryLabSimulator.jsx` | Data-driven stack and heap visualizer | L |
| `src/utils/checks.js` | Reusable structural check builders | M |
| `src/utils/pyodideRunner.js` | Lazy Pyodide load and run, pending approval | M |

### Rewritten files

| Path | Change | Size |
| --- | --- | --- |
| `src/data/courses/rust.js` | Replace 2 lessons with 50, reset difficulty to beginner for a programmer | L |
| `src/data/courses/python.js` | Replace 4 lessons with 44, raise difficulty | L |
| `src/data/courses/cpp.js` | Replace 2 lessons with 48, reset difficulty to beginner for a programmer | L |
| `src/utils/evaluator.js` | Remove fabricated stdout, add `evaluatePredictOutput` and `evaluateSpotBug` | M |

### Touched files

| Path | Change | Size |
| --- | --- | --- |
| `src/data/courseRegistry.js` | Import `javaCourse` and `cCourse`, add both to `CORE_COURSES`, guard `lesson.theory` in `searchLessons`, scope `getAdjacentLessons` to the current course | S |
| `src/components/LessonView.jsx` | Dispatch `predict-output` and `spot-bug`, mount `SyntaxCard`, read `lesson.hint`, add `memory-lab` to `renderSimulator` | M |
| `src/components/CourseJourneyView.jsx` | Type badges for `predict-output` and `spot-bug` | S |
| `src/components/ConsoleOutput.jsx` | Label static-check results as checks, not execution | S |
| `src/context/GameContext.jsx` | Level curve that scales past 228 lessons | S |
| `package.json` | Add `pyodide`, pending approval | S |

### Evaluator honesty

`evaluateCodeExercise` currently prints a fabricated compile log. The replacement returns a check report with no invented runtime output. `ConsoleOutput` shows "5 of 6 checks passed" and lists the failures. Where Pyodide runs, real stdout and real tracebacks appear under a separate heading.

### Check helpers

`src/utils/checks.js` exports builders so lesson authors stop writing `code.includes(...)`:

- `hasCall(name)` matches a call site and ignores comment lines.
- `definesFunction(name)` matches a definition in the target language.
- `usesConstruct(kind)` covers `match`, `for`, `try`, and similar, per language.
- `absent(pattern)` fails when a banned construct appears, for example `clone()` in a borrow lesson.
- `matchesShape(regex, label)` wraps a named regex with a readable failure label.

Each builder returns `{ name, check, hint }`, which the existing `testCases` array already accepts.

### New simulator

`MemoryLabSimulator` generalizes `RustMemoryVisualizer`. It takes a `steps` prop from the lesson instead of hardcoding one String demo. Each step declares stack frames, heap blocks, pointer edges, and a log line. The learner steps forward and backward. Rust, C, and C++ lessons all drive it.

`RustMemoryVisualizer` stays as is until the Rust lessons that use it move over. It is deleted after that, per the standing rule on obsolete files.

---

## 6. Build order

Phase 1 delivers one complete playable course. Later phases repeat the pattern per language.

### Phase 0: engine prep (M)

Work: `checks.js`, evaluator honesty rewrite, `ConsoleOutput` labels, `searchLessons` guard, `getAdjacentLessons` scoping, level curve.

Ships: the existing courses behave correctly. Search stops throwing. Navigation stays inside a course. No new content.

### Phase 1: Rust end to end (L)

Work: `PredictOutputRunner`, `SpotBugRunner`, `SyntaxCard`, `syntaxRegistry.js`, `src/data/syntax/rust.js`, `MemoryLabSimulator`, and all 50 Rust lessons. `LessonView` and `CourseJourneyView` updates for the new types. Lesson authoring dominates this phase. Modules 1 to 3 plus the first capstone make a shippable first cut if the phase needs splitting.

Ships: the Rust course is playable start to finish at the new standard, from the toolchain module through concurrency, with syntax cards on every lesson and two new lesson types working. This is the vertical slice that proves the format.

### Phase 2: Python (L)

Work: Pyodide decision applied, `pyodideRunner.js` if approved, `src/data/syntax/python.js`, all 44 Python lessons.

Ships: the Python course, with real execution if Pyodide is approved.

### Phase 3: C++ and the docked panel (L)

Work: `SyntaxPanel`, `src/data/syntax/cpp.js`, all 48 C++ lessons, `memory-lab` step sets for stack lifetime, destruction, move semantics, and smart pointers.

Ships: the C++ course, plus the full syntax reference reachable from every lesson in every language.

### Phase 4: C (L)

Work: `src/data/courses/c.js` with all 43 C lessons, `src/data/syntax/c.js`, `memory-lab` step sets for pointer arithmetic and stack frames.

Ships: the C course, and the memory lab covers its full intended range.

### Phase 5: Java (L)

Work: `src/data/courses/java.js` with all 43 Java lessons, `src/data/syntax/java.js`, `cpu-threads` step sets for the concurrency module.

Ships: the Java course. All five languages are complete.

### Phase 6: polish (M)

Work: catalog cleanup, lesson gating if wanted, badge audit across 228 lessons and 10 capstones, `RustMemoryVisualizer` removal.

Ships: a coherent catalog and a badge set that does not repeat itself.

### Order rationale

Rust leads because the borrow checker needs no runtime, the memory simulator already exists in an early form, and Rust is the language Sophia is actively learning. Rust and C++ also carry the two beginner entry modules, so phase 1 proves that format before four more courses depend on it. Python follows because it carries the one real runtime decision, and settling it early stops it from blocking later work. C++ precedes C so the `memory-lab` simulator is built against the harder case first. Java is last because it needs no new engine capability.

---

## 7. Open questions

**1. Pyodide for Python.** Adding Pyodide gives real execution for one of the five courses and costs a multi-megabyte lazy download plus an external asset in the build. Lean: approve it, load it only when a Python `code` lesson opens, and fall back to static checks when it fails to load.

**2. Rust Playground for Rust.** Real rustc diagnostics would carry the ownership and lifetime modules better than any prediction lesson. The beginner entry module raises the stakes, because a learner meeting the borrow checker for the first time gains most from reading its real output. The cost is a hard dependency on a third-party endpoint with unverified CORS support and unpublished rate limits. Lean: decline for now. Revisit after phase 1 shows how far prediction lessons get.

**3. Fabricated compile output.** `evaluateCodeExercise` prints "compiled successfully" for code that never ran, including code whose checks failed. Removing it makes the console honest and makes the platform visibly a checker rather than a compiler. Lean: remove it in phase 0.

**4. Progress reset on the rewritten courses.** `rust.js`, `python.js`, and `cpp.js` get new lesson ids. Completed lesson ids in localStorage stop matching, so those courses show as incomplete. The alternative is keeping the old lessons alongside the new ones. Lean: accept the reset. The old lesson set is 8 lessons of beginner content, and keeping it leaves a confusing catalog.

**5. Level curve.** 228 lessons at current XP values reach roughly level 180. Options are a rising curve, such as level N needing 100 * N XP, or higher XP thresholds per level. Lean: rising curve, so early levels stay fast and later ones slow down.

**6. JavaScript course.** `javascript.js` holds 5 beginner lessons and sits outside this build-out. Its beginner material teaches variables and printing, which the five rebuilt courses drop. Once those five ship, it reads as unfinished. Lean: leave it for now and decide after phase 5.

**7. Framework stub courses.** `FRAMEWORK_COURSES` are generated from `lessonFactory.js` with placeholder content. They inflate the catalog next to five real courses. Lean: hide them from the catalog in phase 6 and delete the factory if nothing else uses it.
