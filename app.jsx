import { useState } from 'react';
const NOTIFICATIONS = [
  { ID: "d146095a", Type: "Result",    Message: "mid-sem",                        Timestamp: "2026-04-22 17:51:30" },
  { ID: "b283218f", Type: "Placement", Message: "CSX Corporation hiring",         Timestamp: "2026-04-22 17:51:18" },
  { ID: "81589ada", Type: "Event",     Message: "farewell",                       Timestamp: "2026-04-22 17:51:06" },
  { ID: "0005513a", Type: "Result",    Message: "mid-sem",                        Timestamp: "2026-04-22 17:50:54" },
  { ID: "ea836726", Type: "Result",    Message: "project-review",                 Timestamp: "2026-04-22 17:50:42" },
  { ID: "003cb427", Type: "Result",    Message: "external",                       Timestamp: "2026-04-22 17:50:30" },
  { ID: "e5c4ff20", Type: "Result",    Message: "project-review",                 Timestamp: "2026-04-22 17:50:18" },
  { ID: "1cfce5ee", Type: "Event",     Message: "tech-fest",                      Timestamp: "2026-04-22 17:50:06" },
  { ID: "cf2885a6", Type: "Result",    Message: "project-review",                 Timestamp: "2026-04-22 17:49:54" },
  { ID: "8a7412bd", Type: "Placement", Message: "Advanced Micro Devices hiring",  Timestamp: "2026-04-22 17:49:42" },
];
const TYPE_WEIGHT = { Placement: 3, Result: 2, Event: 1 };
function computeScore(notif) {
  const weight = TYPE_WEIGHT[notif.Type] || 0;
  const ts = new Date(notif.Timestamp.replace(' ', 'T')).getTime() / 1000;
  return weight * 1e10 + ts;
}
function getTopN(list, n) {
  return [...list]
    .sort((a, b) => computeScore(b) - computeScore(a))
    .slice(0, n);
}
const pillStyle = {
  Placement: { background: '#E1F5EE', color: '#0F6E56' },
  Result:    { background: '#FAEEDA', color: '#854F0B' },
  Event:     { background: '#EEEDFE', color: '#534AB7' },
};
function App() {
  const [users, setUsers]   = useState([]);
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const topNotifications = getTopN(NOTIFICATIONS, 10);
  const addUser = () => {
    if (!name || !email.includes('@')) {
      alert('Invalid input');
      return;
    }
    setUsers([...users, { id: Date.now(), name, email }]);
    setName('');
    setEmail('');
  };
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' }}>
      {/* ── User Management ── */}
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>User Management</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14 }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14 }}
        />
        <button
          onClick={addUser}
          style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          Add User
        </button>
      </div>
      {users.map(user => (
        <div key={user.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee', fontSize: 14 }}>
          {user.name} — {user.email}
        </div>
      ))}
      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #eee' }} />
      {/* ── Priority Inbox ── */}
      <h2 style={{ fontSize: 18, marginBottom: 12 }}>Priority Inbox</h2>
      {topNotifications.map((notif, index) => (
        <div
          key={notif.ID}
          style={{
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: 8,
            padding: '12px 14px',
            marginBottom: 8,
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: 13, color: '#999', minWidth: 24, marginTop: 2 }}>
            #{index + 1}
          </span>
          <div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 20,
                ...pillStyle[notif.Type],
              }}
            >
              {notif.Type}
            </span>
            <div style={{ fontSize: 14, fontWeight: 600, margin: '4px 0 2px' }}>
              {notif.Message}
            </div>
            <div style={{ fontSize: 12, color: '#999' }}>
              {notif.Timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default App;