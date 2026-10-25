import { readFile, writeFile } from 'node:fs/promises';

const baseUrl = 'https://znvwtwkvisyqlxkoifki.supabase.co/rest/v1';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const apiKey = html.match(/'https:\/\/znvwtwkvisyqlxkoifki\.supabase\.co',\s*'([^']+)'/)?.[1];
if (!apiKey) throw new Error('The dashboard public API key was not found in index.html.');

async function getRows(table, query) {
  const response = await fetch(`${baseUrl}/${table}?${query}`, {
    headers: { apikey: apiKey },
    signal: AbortSignal.timeout(20_000)
  });
  if (!response.ok) throw new Error(`${table}: HTTP ${response.status}`);
  const rows = await response.json();
  if (!Array.isArray(rows)) throw new Error(`${table}: expected an array`);
  return rows;
}

const [statuses, documents, customApplications] = await Promise.all([
  getRows('application_statuses', 'select=application_id,status'),
  getRows('application_documents', 'select=application_id,document_type,storage_path'),
  getRows('custom_applications', 'select=id,submitted_date,company,role,application_url,resume_path,status&order=submitted_date.asc')
]);

if (statuses.length === 0 || customApplications.length === 0) {
  throw new Error('The public API returned no application data; the published snapshot was left unchanged.');
}

const snapshot = { statuses, documents, customApplications };
const output = `window.PUBLIC_DASHBOARD_SNAPSHOT = ${JSON.stringify(snapshot)};\n`;
await writeFile(new URL('../data/public-dashboard-snapshot.js', import.meta.url), output);
console.log(`Snapshot refreshed: ${customApplications.length} applications, ${statuses.length} statuses, ${documents.length} documents.`);
