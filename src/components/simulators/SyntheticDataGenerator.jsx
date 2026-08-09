import React, { useState } from 'react';
import { Sparkles, Copy, Download, RefreshCw } from 'lucide-react';

const FIRST_NAMES = ['Sophia 🌸', 'Alex 🎀', 'Marcus 🍡', 'Elena 👑', 'Kenji 🍵', 'Devon 💖', 'Zoe ✨', 'Aria 🌸'];
const LAST_NAMES = ['Chen', 'Rivera', 'Vance', 'Rostova', 'Sato', 'Miller', 'Zhang', 'Kim'];
const DOMAINS = ['dev.io', 'tech.org', 'code.net', 'cyber.de', 'online.jp'];
const ROLES = ['Frontend Dev', 'Systems Engineer', 'Data Scientist', 'DevOps Specialist', 'UI Designer'];

export default function SyntheticDataGenerator() {
  const [recordCount, setRecordCount] = useState(10);
  const [format, setFormat] = useState('json');
  const [generatedData, setGeneratedData] = useState('');
  const [copied, setCopied] = useState(false);

  const generateData = () => {
    const items = [];
    for (let i = 1; i <= recordCount; i++) {
      const fn = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const ln = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
      const role = ROLES[Math.floor(Math.random() * ROLES.length)];
      const xp = Math.floor(Math.random() * 4500) + 500;
      const score = parseFloat((Math.random() * 95 + 5).toFixed(2));

      items.push({
        id: i,
        name: `${fn} ${ln}`,
        email: `${fn.toLowerCase().replace(/[^a-z]/g, '')}.${ln.toLowerCase()}@${domain}`,
        role: role,
        xp: xp,
        performance_score: score
      });
    }

    if (format === 'csv') {
      const headers = ['id', 'name', 'email', 'role', 'xp', 'performance_score'];
      const csvRows = [headers.join(',')];
      items.forEach(item => {
        csvRows.push(`${item.id},"${item.name}",${item.email},"${item.role}",${item.xp},${item.performance_score}`);
      });
      setGeneratedData(csvRows.join('\n'));
    } else {
      setGeneratedData(JSON.stringify(items, null, 2));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedData], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synthetic_dataset.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', background: '#fff0f6', borderRadius: '12px', border: '2px solid #fbcfe8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#be185d', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
          <Sparkles size={18} /> AUTOMATED SYNTHETIC DATA GENERATOR 🌸
        </h4>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <label style={{ fontSize: '0.75rem', color: '#9d4b6e', fontWeight: 600 }}>Records:</label>
          <select 
            value={recordCount} 
            onChange={(e) => setRecordCount(Number(e.target.value))}
            style={{ background: '#ffffff', color: '#4a0e2e', border: '1.5px solid #fbcfe8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem' }}
          >
            <option value={5}>5 records</option>
            <option value={10}>10 records</option>
            <option value={50}>50 records</option>
            <option value={100}>100 records</option>
          </select>

          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value)}
            style={{ background: '#ffffff', color: '#4a0e2e', border: '1.5px solid #fbcfe8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem' }}
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>

          <button onClick={generateData} className="pixel-btn pixel-btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            <RefreshCw size={12} /> Generate ✨
          </button>
        </div>
      </div>

      {!generatedData ? (
        <div style={{ padding: '24px', textAlign: 'center', background: '#ffffff', borderRadius: '8px', border: '1.5px solid #fbcfe8', color: '#9d4b6e', fontSize: '0.85rem' }}>
          Click <strong>Generate</strong> to produce synthetic JSON/CSV mock datasets for Pandas, SQL, or Data Science quests 💕
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#9d4b6e', fontFamily: 'var(--font-code)', fontWeight: 600 }}>
              Output Payload ({format.toUpperCase()}) 🎀
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleCopy} className="pixel-btn pixel-btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>
                <Copy size={12} /> {copied ? 'Copied 🌸' : 'Copy'}
              </button>
              <button onClick={handleDownload} className="pixel-btn pixel-btn-primary" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>
                <Download size={12} /> Download .{format}
              </button>
            </div>
          </div>

          <pre style={{
            background: '#ffffff',
            color: '#831843',
            fontFamily: 'var(--font-code)',
            fontSize: '0.8rem',
            fontWeight: 500,
            padding: '12px',
            borderRadius: '8px',
            border: '1.5px solid #fbcfe8',
            maxHeight: '220px',
            overflowY: 'auto'
          }}>
            {generatedData}
          </pre>
        </div>
      )}
    </div>
  );
}
