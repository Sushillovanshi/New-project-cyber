// public/app.js

// --- Full 60-day task list from your specification ---
// Each item: { title, details, deliverable }
const ROADMAP = [
  { title:"Set up lab: VirtualBox/VMware + Kali & Windows 10/11 Eval", details:"Install VirtualBox or VMware. Create 2 VMs: Kali Linux & Windows 10/11 Evaluation. Snapshot after clean install.", deliverable:"Screenshot of both VMs + snapshot list" },
  { title:"Install core tools & note system", details:"Install nmap, Wireshark, Burp Suite, Metasploit, ffuf, gobuster, SecLists. Create a notes structure (Obsidian/Notion/Joplin).", deliverable:"Notes template + tool versions screenshot" },
  { title:"Networking basics: OSI model & encapsulation", details:"Understand 7 OSI layers with examples; map to TCP/IP.", deliverable:"One-pager OSI→TCP/IP mapping" },
  { title:"TCP/IP layers, IPv4, CIDR & subnetting practice", details:"Practice /24, /25, /26, /27 splits; gateway/DNS assignment.", deliverable:"Subnetting worksheet" },
  { title:"Ports & protocols (TCP/UDP); common service ports", details:"Memorize top ports. Build your own table.", deliverable:"Your port table (PDF/MD)" },
  { title:"DNS in depth; dig/nslookup; Wireshark DNS", details:"Query A/AAAA/CNAME/MX; capture DNS traffic in Wireshark.", deliverable:"pcap + commands used" },
  { title:"HTTP/HTTPS; TLS handshake at a glance", details:"View TLS handshake in Wireshark; note cert chain.", deliverable:"Screenshot + notes" },
  { title:"Routing, NAT, Firewalls; traceroute/mtr", details:"Trace paths; explain NAT vs PAT; local firewall basics.", deliverable:"Traceroute report" },
  { title:"VPNs, proxies; when/why they matter for security", details:"Compare VPN vs proxy vs split-tunneling.", deliverable:"Decision table" },
  { title:"Wireshark basics: capture & display filters", details:"Practice filters: http, dns, tcp.port==443", deliverable:"Filter cheat sheet" },
  { title:"nmap theory: scan types (SYN, UDP), host discovery", details:"When to use -sS, -sU, -sn; safe scanning.", deliverable:"Theory notes" },
  { title:"nmap practice: -sV, -O, timing, output formats", details:"Run scans in lab. Save -oA outputs.", deliverable:"nmap outputs + analysis" },
  { title:"nmap NSE basics; safe scripts; version→vuln mapping", details:"Use --script=safe,default,vuln carefully in lab.", deliverable:"Script results + mapping" },
  { title:"Mini-project: Map your lab network & write a short report", details:"Diagram subnets, hosts, services.", deliverable:"PDF network map" },

  { title:"Linux CLI essentials: navigation, pipes, redirection", details:"Practice ls, grep, awk, sed, tee, xargs.", deliverable:"Command cheatsheet" },
  { title:"Filesystem & permissions: chmod/chown/umask", details:"Set umask; demo rwx for users/groups.", deliverable:"Examples + screenshots" },
  { title:"Processes & services: ps, top, systemctl, journald", details:"Start/stop services; read logs.", deliverable:"Service report" },
  { title:"Networking on Linux: ip/ss/netstat/iptables", details:"Add routes; basic iptables rules.", deliverable:"Commands + outputs" },
  { title:"Bash scripting I: variables, conditions", details:"Write a small helper script.", deliverable:"Script on GitHub" },
  { title:"Bash scripting II: loops/awk/sed; write helper script", details:"Automate a repetitive task.", deliverable:"Script + README" },
  { title:"Windows internals overview; CMD basics", details:"Explore system info, services, drivers.", deliverable:"Notes" },
  { title:"PowerShell essentials: cmdlets, pipeline, Get-Help", details:"Write 3 small scripts.", deliverable:"PS1 scripts" },
  { title:"Users, groups, ACLs; UAC; runas", details:"Set permissions & test UAC.", deliverable:"ACL screenshots" },
  { title:"Services & scheduled tasks; registry basics", details:"Create a task; export a reg key (lab).", deliverable:"Task XML + reg export" },
  { title:"Windows networking: netsh, firewall rules", details:"Create allow/deny rules (lab).", deliverable:"Rule list + rationale" },
  { title:"Sysinternals intro: ProcMon, Autoruns, TCPView", details:"Trace a process; list autoruns.", deliverable:"Findings notes" },
  { title:"Active Directory fundamentals (theory)", details:"Understand DC, OU, GPO, LDAP.", deliverable:"AD concept sheet" },
  { title:"AD in practice (optional): join a VM to a domain", details:"Create a tiny domain (optional).", deliverable:"Screenshots" },

  { title:"Security principles: CIA, risk, threat, vulnerability", details:"Define with examples.", deliverable:"One-pager" },
  { title:"Crypto I: symmetric/asymmetric, hashing, salting", details:"openssl demo; hash passwords.", deliverable:"Commands + notes" },
  { title:"Crypto II: TLS/PKI, certificates, OCSP, HSTS", details:"Inspect certs in browser & openssl.", deliverable:"Cert chain notes" },
  { title:"AuthN vs AuthZ, sessions, MFA, SSO", details:"Compare flows.", deliverable:"Table" },
  { title:"Malware types & kill chain; ATT&CK overview", details:"TTPs mapping.", deliverable:"ATT&CK notes" },
  { title:"Network security controls: FW, IDS/IPS, NAC", details:"Lab demo if possible.", deliverable:"Summary" },
  { title:"Hardening & baselines (CIS, STIG intro)", details:"Harden a VM to CIS L1.", deliverable:"Checklist" },
  { title:"Logging & monitoring fundamentals", details:"What/where/how.", deliverable:"Log plan" },
  { title:"Secure SDLC & threat modeling (STRIDE)", details:"Model a simple app.", deliverable:"Diagram" },
  { title:"Mini‑project: Threat model a sample web app", details:"Use STRIDE.", deliverable:"Threat model doc" },

  { title:"nmap advanced scanning & evasion basics", details:"Decoys, fragment, timing care (lab only).", deliverable:"Notes" },
  { title:"Wireshark deep dive: display filters & TLS analysis", details:"Extract JA3/handshakes.", deliverable:"pcap + notes" },
  { title:"Metasploit I: modules, payloads, workspaces", details:"Lab-only exploitation.", deliverable:"Workspace export" },
  { title:"Metasploit II: exploitation workflow & post modules", details:"Post-mod basics.", deliverable:"Notes" },
  { title:"Burp Suite I: proxy, target, repeater, decoder", details:"Proxy browser; replay requests.", deliverable:"Burp project" },
  { title:"Burp Suite II: intruder, extender, logging", details:"Rate control & wordlists.", deliverable:"Findings" },
  { title:"OWASP ZAP: automate passive/active scans safely", details:"Baseline scan scripts.", deliverable:"Report" },
  { title:"Content discovery: ffuf/dirb/gobuster", details:"Tune rate & wordlists.", deliverable:"Findings table" },
  { title:"Wordlists: SecLists, CeWL, crunch", details:"Build a targeted list.", deliverable:"Wordlist output" },
  { title:"Password cracking I: hashcat basics & modes", details:"Practice in lab.", deliverable:"Notes" },
  { title:"Password cracking II: rules & masks; john", details:"Masks, rules, salts.", deliverable:"Commands" },
  { title:"Hydra for online auth testing (lab only)", details:"Lab target only.", deliverable:"Params used" },
  { title:"Netcat/socat/tmux: shells & pivoting helpers", details:"Reverse/bind in lab.", deliverable:"Cheatsheet" },
  { title:"Reporting: evidence collection & screenshots", details:"Clean, reproducible.", deliverable:"Template" },

  { title:"Recon & fingerprinting (headers, WhatWeb, robots.txt)", details:"Non-intrusive.", deliverable:"Recon notes" },
  { title:"Auth flaws, Access control (IDOR/BOLA)", details:"Demo in labs.", deliverable:"Examples" },
  { title:"SQLi I/II; XSS I/II; CSRF; SSRF; Command injection; File upload; Path traversal; XXE; Insecure deserialization; Security misconfiguration; Sensitive data exposure; HTTP request smuggling (adv)", details:"Use Juice Shop/DVWA only.", deliverable:"Per-vuln notes" },
  { title:"Business logic flaws; API Security I/II; GraphQL basics & vulns; Web fuzzing strategies", details:"Safe labs only.", deliverable:"Findings" },
  { title:"Mini‑pentest: DVWA/Juice Shop; Write a professional web test report", details:"Scope strictly.", deliverable:"Final report" },

  { title:"Linux/Windows privilege escalation (theory + practice)", details:"GTFOBins, winPEAS.", deliverable:"Write-ups" },
  { title:"AD enumeration; Kerberoasting/AS‑REP; Pass‑the‑Hash/Ticket; Lateral movement; Relay attacks (isolated lab only); AD defenses", details:"BloodHound, Mimikatz (lab).", deliverable:"Graph + notes" },

  { title:"Network attacks in lab; VPN/IPSec/WireGuard basics; Wi‑Fi (WPA2/WPA3), aircrack‑ng", details:"Isolated only.", deliverable:"Findings" },
  { title:"Containers 101 & Docker/Kubernetes security basics; RBAC; Zero Trust; Segmentation", details:"K8s learn.", deliverable:"Notes" },
  { title:"Vuln mgmt: OpenVAS/Greenbone; SAST/DAST & IaC scanning (Semgrep, tfsec)", details:"Scan your lab.", deliverable:"Reports" },
  { title:"Harden a Linux server to CIS; Write a hardening checklist & findings report", details:"Apply fixes.", deliverable:"Checklist + report" },
  { title:"SOC & SIEM: ELK/Wazuh; Ingest logs; dashboards; Windows Event IDs & Sysmon; basic Sigma rules; ATT&CK mapping", details:"Build detections.", deliverable:"Dash + rules" },
  { title:"IR: lifecycle/runbooks; Disk/Memory/Network forensics (Autopsy/Volatility/Zeek); Tabletop ransomware scenario; Detection engineering mini‑project", details:"Document steps.", deliverable:"Runbook + artifacts" },
  { title:"Cloud: AWS/Azure basics; IAM least privilege; S3 security; VPC/NSG; logging (CloudTrail/Defender); IaC with Terraform; Cloud mini‑assessment", details:"Fix misconfigs.", deliverable:"Assessment report" },
  { title:"Capstone: pick (web pentest / AD lab / SIEM detection); execute; full professional report; publish portfolio + apply to roles", details:"End-to-end.", deliverable:"Capstone + portfolio" }
];

// Expose to window for debugging
window.ROADMAP = ROADMAP;

// --- Render Today
const todayCard = document.getElementById('todayCard');
fetch('/api/today').then(r=>r.json()).then(({index,total,task})=>{
  todayCard.classList.remove('loading');
  todayCard.innerHTML = `
    <h3>Day ${index+1} / ${total} <span class="badge">Today</span></h3>
    <p><strong>${task.title}</strong></p>
    <p class="small">${task.details}</p>
    <p class="small"><em>Deliverable:</em> ${task.deliverable || 'Notes + screenshots'}</p>
  `;
  document.getElementById('dayIndex').value = index+1;
}).catch(()=> todayCard.textContent = 'Unable to load today’s task.');

// --- Render Grid
const grid = document.getElementById('grid');
ROADMAP.forEach((t, i)=>{
  const d = document.createElement('div');
  d.className = 'day card';
  d.innerHTML = `
    <h3>Day ${i+1}</h3>
    <div><strong>${t.title}</strong></div>
    <div class="small">${t.details}</div>
  `;
  grid.appendChild(d);
});

// --- Submissions
const form = document.getElementById('submitForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    dayIndex: Number(document.getElementById('dayIndex').value) - 1,
    notes: document.getElementById('notes').value,
    links: document.getElementById('links').value
  };
  const r = await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  const j = await r.json();
  if(j.ok){ msg.textContent = '✅ Submitted'; msg.style.color='#2ecc71'; loadSubs(); form.reset(); }
  else { msg.textContent = '❌ Error submitting'; msg.style.color='#ff6b6b'; }
});

async function loadSubs(){
  const box = document.getElementById('subsList');
  const r = await fetch('/api/submissions');
  const subs = await r.json();
  box.innerHTML = subs.slice(-20).reverse().map(s => `
    <div class="card small">
      <div><strong>Day ${s.dayIndex+1}</strong> — ${s.task?.title || ''}</div>
      <div>${new Date(s.ts).toLocaleString()}</div>
      <div>${s.name} (${s.email})</div>
      <div>${s.notes || ''}</div>
      <div><a href="${s.links}" target="_blank">${s.links || ''}</a></div>
    </div>
  `).join('');
}
loadSubs();
