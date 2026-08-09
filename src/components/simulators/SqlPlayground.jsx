import React, { useState } from 'react';
import { Database, Play, Table, Terminal } from 'lucide-react';

const SEEDED_TABLES = {
  users: [
    { id: 1, name: 'Sophia Chen', email: 'sophia@dev.io', xp: 1250, country: 'USA' },
    { id: 2, name: 'Alex Rivera', email: 'alex@code.org', xp: 2100, country: 'Canada' },
    { id: 3, name: 'Marcus Vance', email: 'marcus@online.net', xp: 850, country: 'UK' },
    { id: 4, name: 'Elena Rostova', email: 'elena@cyber.de', xp: 3400, country: 'Germany' },
    { id: 5, name: 'Kenji Sato', email: 'kenji@tokyo.jp', xp: 1900, country: 'Japan' }
  ],
  orders: [
    { id: 101, user_id: 1, amount: 89.99, status: 'COMPLETED', created_at: '2026-08-01' },
    { id: 102, user_id: 2, amount: 249.50, status: 'COMPLETED', created_at: '2026-08-03' },
    { id: 103, user_id: 1, amount: 120.00, status: 'COMPLETED', created_at: '2026-08-05' },
    { id: 104, user_id: 4, amount: 499.00, status: 'COMPLETED', created_at: '2026-08-06' },
    { id: 105, user_id: 3, amount: 35.00, status: 'PENDING', created_at: '2026-08-07' }
  ],
  products: [
    { id: 501, title: 'Mechanical Keyboard (Pastel)', price: 129.99, category: 'Hardware' },
    { id: 502, title: 'Rust Systems Mastery Book', price: 49.99, category: 'Books' },
    { id: 503, title: 'Desktop Monitor Lamp', price: 79.99, category: 'Hardware' }
  ]
};

export default function SqlPlayground({ defaultQuery }) {
  const [query, setQuery] = useState(defaultQuery || `SELECT u.name, SUM(o.amount) AS total_spent\nFROM users u\nJOIN orders o ON u.id = o.user_id\nGROUP BY u.id\nORDER BY total_spent DESC;`);
  const [activeTab, setActiveTab] = useState('query');
  const [queryResult, setQueryResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const executeSql = () => {
    setErrorMsg(null);
    const trimmed = query.trim().toUpperCase();

    try {
      if (trimmed.includes('USERS') && trimmed.includes('ORDERS')) {
        const rows = SEEDED_TABLES.users.map(u => {
          const userOrders = SEEDED_TABLES.orders.filter(o => o.user_id === u.id);
          const totalSpent = userOrders.reduce((sum, o) => sum + o.amount, 0);
          return { name: u.name, total_spent: `$${totalSpent.toFixed(2)}` };
        }).filter(r => r.total_spent !== '$0.00').sort((a, b) => parseFloat(b.total_spent.slice(1)) - parseFloat(a.total_spent.slice(1)));

        setQueryResult({
          columns: ['name', 'total_spent'],
          data: rows,
          rowCount: rows.length,
          executionTimeMs: 1.2
        });
      } else if (trimmed.includes('FROM PRODUCTS')) {
        setQueryResult({
          columns: ['id', 'title', 'price', 'category'],
          data: SEEDED_TABLES.products,
          rowCount: SEEDED_TABLES.products.length,
          executionTimeMs: 0.8
        });
      } else {
        setQueryResult({
          columns: ['id', 'name', 'email', 'xp', 'country'],
          data: SEEDED_TABLES.users,
          rowCount: SEEDED_TABLES.users.length,
          executionTimeMs: 0.9
        });
      }
    } catch (err) {
      setErrorMsg('System error :(\nSyntax Error near line 1: Invalid identifier or unexpected token.');
    }
  };

  return (
    <div className="retro-window" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#222638', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
          <Database size={18} color="#7c8cc6" /> SQLite Database Playground
        </h4>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('query')} 
            className={`retro-btn ${activeTab === 'query' ? 'retro-btn-pink' : ''}`}
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            <Terminal size={12} /> SQL Editor
          </button>
          <button 
            onClick={() => setActiveTab('schema')} 
            className={`retro-btn ${activeTab === 'schema' ? 'retro-btn-blue' : ''}`}
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            <Table size={12} /> Schema Viewer
          </button>
        </div>
      </div>

      {activeTab === 'schema' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {Object.entries(SEEDED_TABLES).map(([tableName, rows]) => (
            <div key={tableName} style={{ background: '#eef3fc', padding: '12px', borderRadius: '4px', border: '2px solid #222638' }}>
              <div style={{ fontSize: '0.85rem', color: '#222638', marginBottom: '8px', fontWeight: 'bold' }}>
                📁 {tableName} ({rows.length} rows)
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-code)', color: '#4b5563' }}>
                {Object.keys(rows[0]).map(col => (
                  <div key={col} style={{ padding: '3px 0', borderBottom: '1px solid #cbd5e1' }}>
                    🔹 {col} ({typeof rows[0][col] === 'number' ? 'INTEGER' : 'VARCHAR'})
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Query Input */}
          <div style={{ position: 'relative' }}>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                background: '#ffffff',
                color: '#222638',
                fontFamily: 'var(--font-code)',
                fontSize: '0.85rem',
                padding: '12px',
                borderRadius: '4px',
                border: '2px solid #222638',
                outline: 'none',
                resize: 'vertical'
              }}
            />
            <button 
              onClick={executeSql}
              className="retro-btn retro-btn-blue"
              style={{ position: 'absolute', right: '12px', bottom: '14px', fontSize: '0.75rem', padding: '6px 12px' }}
            >
              <Play size={12} /> Execute Query
            </button>
          </div>

          {/* Results Table */}
          {errorMsg && (
            <div style={{ color: '#ef4444', background: '#fef2f2', padding: '10px', borderRadius: '4px', border: '2px solid #222638', fontSize: '0.8rem' }}>
              {errorMsg}
            </div>
          )}

          {queryResult && (
            <div style={{ background: '#ffffff', padding: '12px', borderRadius: '4px', border: '2px solid #222638' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginBottom: '8px', fontWeight: 'bold' }}>
                <span>Returned {queryResult.rowCount} rows</span>
                <span>Execution Time: {queryResult.executionTimeMs}ms</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#7c8cc6', color: '#ffffff', borderBottom: '2px solid #222638' }}>
                      {queryResult.columns.map(col => (
                        <th key={col} style={{ padding: '8px 12px' }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResult.data.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? 'transparent' : '#f8fafc' }}>
                        {queryResult.columns.map(col => (
                          <td key={col} style={{ padding: '8px 12px', color: '#222638' }}>{row[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
