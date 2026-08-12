export const cppCourse = {
  id: 'cpp-course',
  title: 'C++ Systems Performance',
  icon: '⚡',
  color: 'cyan',
  domain: 'Systems Engineering',
  language: 'C++',
  difficulty: 'Intermediate to Advanced',
  badgeClass: 'badge-purple',
  description: 'Master RAII, pointers, smart pointers (unique_ptr, shared_ptr), templates, and low-level memory control.',
  chapters: [
    {
      id: 'cpp-ch1-pointers',
      title: 'Chapter 1: Pointers & Smart Pointers',
      description: 'Raw pointers, memory dereferencing, std::unique_ptr, and RAII resource management.',
      lessons: [
        {
          id: 'cpp-pointers-course',
          title: '1.1 Pointers & Memory Addresses',
          type: 'simulator',
          simulatorType: 'rust-memory',
          xp: 90,
          badge: { id: 'cpp_master', title: 'Pointer Wizard', desc: 'Dereferenced memory addresses like a pro!', icon: '🎯' },
          theory: `Pointers in C++ store memory addresses of variables, allowing direct heap manipulation.`,
          instructions: 'Write a C++ function that swaps two integers using raw pointers `int*`.',
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
          title: '1.2 Smart Pointers & RAII (std::unique_ptr)',
          type: 'simulator',
          simulatorType: 'rust-memory',
          xp: 110,
          badge: { id: 'cpp_raii', title: 'RAII Guardian', desc: 'Eliminated memory leaks using std::unique_ptr!', icon: '🛡️' },
          theory: `Modern C++ avoids manual \`delete\` by wrapping resources in smart pointers like \`std::unique_ptr<T>\`.`,
          instructions: 'Transfer ownership of a `unique_ptr` using `std::move`.',
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
    }
  ]
};
