// server.js
// Express + daily email (Nodemailer) + simple submission storage
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const TZ = 'Asia/Kolkata';

// --- Basic storage for submissions
const DATA_DIR = path.join(__dirname, 'data');
const SUB_PATH = path.join(DATA_DIR, 'submissions.json');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(SUB_PATH)) fs.writeFileSync(SUB_PATH, JSON.stringify([]));

// --- Serve static frontend
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// --- Load roadmap (same list used in frontend)
const ROADMAP = require('./public/roadmap.json'); // we’ll create this below

// --- Endpoints ---
app.get('/api/today', (req, res) => {
  // Day index = days since a fixed start date
  const start = new Date(process.env.START_DATE || '2025-08-21'); // yyyy-mm-dd
  const now = new Date();
  const diffDays = Math.floor((now - start) / (1000*60*60*24));
  const idx = Math.max(0, Math.min(ROADMAP.length - 1, diffDays));
  res.json({ index: idx, total: ROADMAP.length, task: ROADMAP[idx] });
});

app.post('/api/submit', (req, res) => {
  const { name, email, dayIndex, notes, links } = req.body || {};
  if (typeof dayIndex !== 'number') return res.status(400).json({ ok:false, msg:'dayIndex required' });

  const submissions = JSON.parse(fs.readFileSync(SUB_PATH, 'utf8'));
  const entry = {
    ts: new Date().toISOString(),
    name: (name||'').trim(),
    email: (email||'').trim(),
    dayIndex,
    task: ROADMAP[dayIndex] || null,
    notes: notes || '',
    links: links || ''
  };
  submissions.push(entry);
  fs.writeFileSync(SUB_PATH, JSON.stringify(submissions, null, 2));
  res.json({ ok:true, saved: entry });
});

app.get('/api/submissions', (req, res) => {
  res.json(JSON.parse(fs.readFileSync(SUB_PATH, 'utf8')));
});

// --- Mail transport (Gmail recommended with App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});

// --- Daily email @ 08:00 IST
cron.schedule('0 8 * * *', async () => {
  try {
    // compute today's task like /api/today
    const start = new Date(process.env.START_DATE || '2025-08-21');
    const now = new Date();
    const diffDays = Math.floor((now - start) / (1000*60*60*24));
    const idx = Math.max(0, Math.min(ROADMAP.length - 1, diffDays));
    const t = ROADMAP[idx];

    const html = `
      <div style="font-family:Segoe UI,Arial,sans-serif">
        <h2>Today’s Cybersecurity Task (Day ${idx+1}/${ROADMAP.length})</h2>
        <p><strong>Topic:</strong> ${t.title}</p>
        <p>${t.details}</p>
        <hr>
        <p>Deliverable idea: ${t.deliverable || 'Notes + screenshots in your web page submission form.'}</p>
        <p>Submit here: <a href="${process.env.PUBLIC_URL || 'http://localhost:'+PORT}">${process.env.PUBLIC_URL || 'http://localhost:'+PORT}</a></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Cyber Roadmap" <${process.env.MAIL_USER}>`,
      to: process.env.TASK_MAIL_TO || 'sushillovanshi8@gmail.com',
      subject: `Day ${idx+1}: ${t.title} — Cybersecurity Roadmap`,
      html
    });

    console.log(`[MAIL] Sent Day ${idx+1} to ${process.env.TASK_MAIL_TO || 'sushillovanshi8@gmail.com'}`);
  } catch (e) {
    console.error('[MAIL ERROR]', e.message);
  }
}, { timezone: TZ });

// --- Start server
app.listen(PORT, () => {
  console.log(` Cyber Roadmap up on http://0.0.0.0:${PORT}`);
});
