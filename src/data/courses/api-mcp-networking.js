export const apiCourse = {
  id: 'api-course',
  title: 'APIs & Web Protocols',
  icon: '🔌',
  color: 'cyan',
  domain: 'Backend & APIs',
  language: 'REST / Web APIs',
  difficulty: 'Beginner to Intermediate',
  badgeClass: 'badge-blue',
  description: 'Master RESTful API design, HTTP verbs (GET, POST, PUT, DELETE), status codes, JSON payloads, WebSockets, and Webhooks.',
  chapters: [
    {
      id: 'api-ch1-rest',
      title: 'Chapter 1: RESTful API Principles & HTTP Verbs',
      description: 'Understanding endpoints, request methods, headers, query params, and HTTP status codes.',
      lessons: [
        {
          id: 'api-http-verbs',
          title: '1.1 HTTP Verbs & Endpoints (GET vs POST)',
          type: 'code',
          xp: 60,
          badge: { id: 'api_master', title: 'API Dispatcher', desc: 'Mastered REST API endpoints and HTTP methods!', icon: '🔌' },
          theory: `**Representational State Transfer (REST)** uses HTTP verbs to perform CRUD operations on resources:

- \`GET /api/users\` ➔ Retrieve list of users
- \`POST /api/users\` ➔ Create a new user resource
- \`PUT /api/users/:id\` ➔ Update existing user
- \`DELETE /api/users/:id\` ➔ Remove user`,
          instructions: 'Write a JavaScript `fetch()` request sending a `POST` request with JSON body `{ "name": "Aria", "role": "engineer" }`.',
          starterCode: `async function createUser() {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'Aria', role: 'engineer' })
  });
  return response.json();
}`,
          solutionCode: `method: 'POST'`,
          testCases: [
            { name: 'Uses POST method', check: (code) => code.includes("method: 'POST'") || code.includes('method: "POST"') },
            { name: 'Sets Content-Type header to application/json', check: (code) => code.includes('application/json') }
          ]
        },
        {
          id: 'api-status-codes-quiz',
          title: '1.2 Quiz: HTTP Status Codes',
          type: 'quiz',
          xp: 40,
          quizData: {
            question: 'Which HTTP status code signifies that a resource was successfully CREATED on the server?',
            options: [
              '200 OK',
              '201 Created',
              '400 Bad Request',
              '404 Not Found'
            ],
            correctOptionIndex: 1,
            explanation: '`201 Created` indicates that the HTTP POST request succeeded and a new resource was successfully created on the server.'
          }
        }
      ]
    }
  ]
};

export const mcpCourse = {
  id: 'mcp-course',
  title: 'Model Context Protocol (MCP) & AI Agents',
  icon: '🤖',
  color: 'purple',
  domain: 'Backend & APIs',
  language: 'MCP / Agentic AI',
  difficulty: 'Intermediate to Advanced',
  badgeClass: 'badge-purple',
  description: 'Understand MCP Architecture (Hosts, Clients, Servers), Tool Calling, Prompts, Resources, Subagents, and how APIs relate to LLM context.',
  chapters: [
    {
      id: 'mcp-ch1-architecture',
      title: 'Chapter 1: MCP Core Architecture & Tool Calling',
      description: 'How Model Context Protocol connects LLM hosts to local/remote tools and databases.',
      lessons: [
        {
          id: 'mcp-concepts-intro',
          title: '1.1 What is MCP & How Does It Work?',
          type: 'code',
          xp: 75,
          badge: { id: 'mcp_pioneer', title: 'MCP Protocol Expert', desc: 'Understood Model Context Protocol architecture!', icon: '🤖' },
          theory: `**Model Context Protocol (MCP)** is an open standard that allows AI models (in Host apps) to safely connect to external data sources and tools.

### Key MCP Roles:
1. **MCP Host**: The application (e.g. Claude Desktop, Antigravity) running the LLM.
2. **MCP Client**: The client inside the Host that maintains 1:1 connections with MCP Servers.
3. **MCP Server**: Lightweight server exposing:
   - **Tools**: Functions the LLM can call (e.g., query database, fetch URL).
   - **Resources**: Readable files/data streams attached into LLM context.
   - **Prompts**: Reusable prompt templates.`,
          instructions: 'Define an MCP Tool declaration schema in JSON format with `name`, `description`, and `inputSchema`.',
          starterCode: `const mcpToolDeclaration = {
  name: "search_database",
  description: "Queries relational SQL tables for records",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "SQL query string" }
    },
    required: ["query"]
  }
};`,
          solutionCode: `name: "search_database"`,
          testCases: [
            { name: 'Includes name and description', check: (code) => code.includes('name:') && code.includes('description:') },
            { name: 'Includes inputSchema with properties', check: (code) => code.includes('inputSchema') && code.includes('properties') }
          ]
        },
        {
          id: 'mcp-api-relational-quiz',
          title: '1.2 Quiz: How APIs, MCP, and Subagents Relate',
          type: 'quiz',
          xp: 50,
          quizData: {
            question: 'How do Traditional APIs, MCP Servers, and LLM Subagents relate to each other?',
            options: [
              'APIs provide raw endpoints; MCP wraps APIs into standardized LLM tool declarations; Subagents invoke MCP tools to accomplish tasks.',
              'MCP replaces all databases and internet routers.',
              'Subagents compile C code into WebAssembly without APIs.',
              'APIs only work with HTTP GET while MCP only works with raw binary bytes.'
            ],
            correctOptionIndex: 0,
            explanation: 'Traditional APIs provide HTTP endpoints. MCP servers expose those capabilities as standardized tools/resources that LLMs and autonomous Subagents can discover, inspect, and invoke.'
          }
        }
      ]
    }
  ]
};

export const networkingCourse = {
  id: 'networking-course',
  title: 'Computer Networking & Protocols',
  icon: '🌐',
  color: 'blue',
  domain: 'Systems Engineering',
  language: 'Networking / TCP/IP',
  difficulty: 'Intermediate',
  badgeClass: 'badge-blue',
  description: 'Understand the OSI Model, TCP/IP stack, IP Routing, DNS Lookup resolution, HTTP/1.1 vs HTTP/3 (QUIC), and TLS encryption.',
  chapters: [
    {
      id: 'net-ch1-osi',
      title: 'Chapter 1: The OSI Model & TCP/IP Stack',
      description: 'Understanding Physical, Data Link, Network, Transport, and Application layers.',
      lessons: [
        {
          id: 'net-osi-layers',
          title: '1.1 The 7-Layer OSI Model',
          type: 'code',
          xp: 70,
          badge: { id: 'network_architect', title: 'Network Navigator', desc: 'Mastered the OSI 7-Layer Model!', icon: '🌐' },
          theory: `The **OSI Model** organizes computer networking into 7 abstract layers:

7. **Application**: HTTP, DNS, SSH, WebSocket
6. **Presentation**: SSL/TLS Encryption, Data formatting
5. **Session**: Session control & socket connections
4. **Transport**: TCP (reliable), UDP (fast datagrams)
3. **Network**: IP Routing, ICMP (ping)
2. **Data Link**: MAC Addresses, Ethernet frames
1. **Physical**: Fiber optics, copper wires, radio signals`,
          instructions: 'Write a JavaScript helper function that maps protocol names (e.g. `"HTTP"`, `"TCP"`, `"IP"`) to their OSI layer number.',
          starterCode: `function getOsiLayer(protocol) {
  const map = {
    'HTTP': 7,
    'DNS': 7,
    'TLS': 6,
    'TCP': 4,
    'UDP': 4,
    'IP': 3
  };
  return map[protocol.toUpperCase()] || 0;
}`,
          solutionCode: `map[protocol.toUpperCase()]`,
          testCases: [
            { name: 'Maps HTTP to layer 7', check: (code) => code.includes("'HTTP': 7") || code.includes('"HTTP": 7') },
            { name: 'Maps TCP to layer 4', check: (code) => code.includes("'TCP': 4") || code.includes('"TCP": 4') }
          ]
        }
      ]
    }
  ]
};
