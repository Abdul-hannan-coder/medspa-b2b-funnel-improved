import { mkdir } from "node:fs/promises";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

/**
 * @param {string} id
 * @param {import("./intake").Intake} clinic
 */
export async function saveIntake(id, clinic) {
  const directory =
    process.env.MEDSPA_INTAKE_DIR || path.join(process.cwd(), ".medspa-intake");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(path.join(directory, "territory.sqlite"));
  try {
    db.exec(`PRAGMA busy_timeout = 3000;
      CREATE TABLE IF NOT EXISTS territory_requests (
        id TEXT PRIMARY KEY,
        submitted_at TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending_review',
        clinic_json TEXT NOT NULL
      )`);
    const details = JSON.stringify(clinic);
    const created = db
      .prepare(
        "INSERT INTO territory_requests (id, submitted_at, clinic_json) VALUES (?, ?, ?) ON CONFLICT(id) DO NOTHING",
      )
      .run(id, new Date().toISOString(), details);
    if (created.changes) return true;
    const existing = db
      .prepare("SELECT clinic_json FROM territory_requests WHERE id = ?")
      .get(id);
    return existing?.clinic_json === details;
  } finally {
    db.close();
  }
}
