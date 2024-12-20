import { Database } from 'better-sqlite3';

const db = new Database('thirdeye.db');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    skills TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending',
    message TEXT,
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    path TEXT NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications (id)
  );
`);

export interface UserData {
  id: number;
  name: string;
  email: string;
  skills: string;
  status: string;
  submissionDate: string;
  documents: Array<{
    id: number;
    name: string;
    type: string;
  }>;
}

export async function getUserData(): Promise<UserData> {
  const stmt = db.prepare(`
    SELECT 
      u.id, u.name, u.email, u.skills,
      a.status, a.submission_date,
      d.id as doc_id, d.name as doc_name, d.type as doc_type
    FROM users u
    LEFT JOIN applications a ON a.user_id = u.id
    LEFT JOIN documents d ON d.application_id = a.id
    WHERE u.id = ?
  `);

  const rows = stmt.all(getCurrentUserId());
  
  if (rows.length === 0) {
    throw new Error('User not found');
  }

  // Group documents
  const documents = rows
    .filter(row => row.doc_id)
    .map(row => ({
      id: row.doc_id,
      name: row.doc_name,
      type: row.doc_type
    }));

  return {
    id: rows[0].id,
    name: rows[0].name,
    email: rows[0].email,
    skills: rows[0].skills,
    status: rows[0].status || 'Pending',
    submissionDate: new Date(rows[0].submission_date).toLocaleDateString(),
    documents
  };
}

export async function saveApplication(data: any): Promise<void> {
  const { name, email, skills, message, documents } = data;

  db.transaction(() => {
    // Create or update user
    const user = db.prepare(`
      INSERT INTO users (name, email, skills)
      VALUES (?, ?, ?)
      ON CONFLICT(email) DO UPDATE SET
        name = excluded.name,
        skills = excluded.skills
      RETURNING id
    `).get(name, email, skills);

    // Create application
    const application = db.prepare(`
      INSERT INTO applications (user_id, message)
      VALUES (?, ?)
      RETURNING id
    `).get(user.id, message);

    // Save documents
    const insertDoc = db.prepare(`
      INSERT INTO documents (application_id, name, type, path)
      VALUES (?, ?, ?, ?)
    `);

    for (const doc of documents) {
      insertDoc.run(application.id, doc.name, doc.type, doc.path);
    }
  })();
}

function getCurrentUserId(): number {
  // Get user ID from session/token
  return 1; // Replace with actual user ID from auth system
}