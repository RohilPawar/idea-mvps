/* ---------- DATA ---------- */
const SIGNALS = [
  { id:'c01', company:'Cadence Health', founder:'Dr. Priya Natarajan', location:'Boston, MA', state:'MA', sector:'Healthtech', score:94, isNew:true,
    what:'Ex-Mass General clinician shipped an AI triage tool now live in 3 ER departments.',
    reasons:[
      {label:'Founder-market fit', pts:28, desc:'12 years as an ER physician; built the tool for her own department first.'},
      {label:'Early traction', pts:26, desc:'3 paying hospital pilots signed in 6 weeks, 92% retention.'},
      {label:'Team density', pts:22, desc:'Co-founder was ML lead at a top imaging startup (acquired 2023).'},
      {label:'Market timing', pts:18, desc:'ER staffing crisis driving urgent budget for triage automation.'} ] },
  { id:'c02', company:'Ledgerloop', founder:'Marcus Bell', location:'Austin, TX', state:'TX', sector:'Fintech', score:91, isNew:true,
    what:'Launched embedded payouts API; 40 fintechs on the waitlist in 10 days.',
    reasons:[
      {label:'Distribution edge', pts:27, desc:'Founder ran partnerships at Stripe; warm intros to first 15 customers.'},
      {label:'Waitlist velocity', pts:25, desc:'40 qualified fintechs in 10 days with zero paid marketing.'},
      {label:'Technical moat', pts:21, desc:'Sub-second reconciliation engine, patent pending.'},
      {label:'Capital efficiency', pts:18, desc:'Built to MVP on $40k of personal savings.'} ] },
  { id:'c03', company:'Terra Grid', founder:'Nadia Okonkwo', location:'Denver, CO', state:'CO', sector:'Climate', score:89, isNew:false,
    what:'Grid-balancing software signed an LOI with a regional utility.',
    reasons:[
      {label:'Enterprise LOI', pts:26, desc:'Non-binding LOI with a 400k-meter utility, pilot scoped.'},
      {label:'Founder-market fit', pts:24, desc:'Former grid operations engineer at Xcel Energy.'},
      {label:'Regulatory tailwind', pts:22, desc:'New state mandate requires dynamic load management by 2027.'},
      {label:'Team', pts:17, desc:'Two power-systems PhDs on founding team.'} ] },
  { id:'c04', company:'Quill', founder:'Sam Rivera', location:'Brooklyn, NY', state:'NY', sector:'AI/Dev Tools', score:93, isNew:true,
    what:'Open-source agent framework hit 8k GitHub stars in three weeks.',
    reasons:[
      {label:'Community pull', pts:29, desc:'8k stars, 600 forks, active Discord of 2,300 devs.'},
      {label:'Founder credibility', pts:24, desc:'Maintainer of a widely-used Python library (10M downloads/mo).'},
      {label:'Adoption signal', pts:22, desc:'3 YC companies already in production with the framework.'},
      {label:'Timing', pts:18, desc:'Agent tooling category expanding rapidly.'} ] },
  { id:'c05', company:'Mealprint', founder:'Hana Lee', location:'San Francisco, CA', state:'CA', sector:'Consumer', score:82, isNew:false,
    what:'Personalized nutrition app crossed 50k organic downloads.',
    reasons:[
      {label:'Organic growth', pts:24, desc:'50k downloads, 0 ad spend, 35% W1 retention.'},
      {label:'Founder story', pts:22, desc:'Built after her own recovery; strong personal narrative.'},
      {label:'Monetization', pts:20, desc:'8% free-to-paid conversion on a $9/mo plan.'},
      {label:'Virality', pts:16, desc:'Shareable meal cards driving 1.4 referral coefficient.'} ] },
  { id:'c06', company:'Boltyard', founder:'Diego Fuentes', location:'Miami, FL', state:'FL', sector:'Fintech', score:78, isNew:false,
    what:'SMB lending marketplace processed $2M in originations in month one.',
    reasons:[
      {label:'Revenue traction', pts:23, desc:'$2M originated, ~$60k net revenue in first month.'},
      {label:'Founder network', pts:20, desc:'Prior exit in LatAm payments; deep lender relationships.'},
      {label:'Unit economics', pts:19, desc:'3.1% take rate, default rate under 2%.'},
      {label:'Market', pts:16, desc:'Underserved SMB segment in the Southeast.'} ] },
  { id:'c07', company:'Synapse Labs', founder:'Dr. Wei Zhang', location:'Seattle, WA', state:'WA', sector:'Healthtech', score:86, isNew:false,
    what:'Protein-folding startup published in Nature; two pharma inbound.',
    reasons:[
      {label:'Scientific proof', pts:26, desc:'Peer-reviewed result in Nature with reproducible benchmarks.'},
      {label:'Inbound demand', pts:22, desc:'Two top-20 pharma companies requested data-room access.'},
      {label:'Team pedigree', pts:22, desc:'Founder ran a lab at UW; 3 postdocs joined full-time.'},
      {label:'IP position', pts:16, desc:'Two provisional patents filed.'} ] },
  { id:'c08', company:'Rove', founder:'Amara Johnson', location:'Chicago, IL', state:'IL', sector:'Consumer', score:74, isNew:true,
    what:'Group-travel planning app featured in App Store Travel section.',
    reasons:[
      {label:'Editorial feature', pts:22, desc:'App Store "Apps We Love" placement drove 20k installs.'},
      {label:'Engagement', pts:20, desc:'Average 4.2 collaborators per trip plan.'},
      {label:'Founder fit', pts:17, desc:'Ex-product lead at a travel unicorn.'},
      {label:'Retention', pts:15, desc:'28% of trips convert to a second planned trip.'} ] },
  { id:'c09', company:'Forgeframe', founder:'Kenji Tanaka', location:'Portland, OR', state:'OR', sector:'AI/Dev Tools', score:80, isNew:false,
    what:'No-code ML pipeline tool onboarded 12 design partners.',
    reasons:[
      {label:'Design partners', pts:23, desc:'12 companies actively building; 4 converted to paid.'},
      {label:'Founder background', pts:21, desc:'Built internal ML platform at a Fortune 100.'},
      {label:'Product velocity', pts:19, desc:'Shipped 30+ integrations in first quarter.'},
      {label:'Category', pts:17, desc:'Growing demand for accessible ML tooling.'} ] },
  { id:'c10', company:'Verdant', founder:'Lucia Romano', location:'Boulder, CO', state:'CO', sector:'Climate', score:83, isNew:true,
    what:'Carbon-accounting SaaS closed 5 mid-market logos this month.',
    reasons:[
      {label:'Sales momentum', pts:24, desc:'5 paying mid-market customers at ~$18k ACV.'},
      {label:'Compliance driver', pts:22, desc:'New disclosure rules forcing buyer urgency.'},
      {label:'Founder fit', pts:20, desc:'Former sustainability consultant to Fortune 500s.'},
      {label:'Expansion', pts:17, desc:'2 accounts already expanded to additional modules.'} ] },
  { id:'c11', company:'Stackhaus', founder:'Omar Haddad', location:'New York, NY', state:'NY', sector:'Fintech', score:76, isNew:false,
    what:'Treasury automation for startups; $30k MRR in four months.',
    reasons:[
      {label:'MRR growth', pts:22, desc:'$30k MRR, growing 22% MoM.'},
      {label:'Founder credibility', pts:20, desc:'Ex-CFO at a Series B startup.'},
      {label:'Low churn', pts:19, desc:'Logo churn under 2% monthly.'},
      {label:'Wedge', pts:15, desc:'Clear wedge into broader finance stack.'} ] },
  { id:'c12', company:'Playloop', founder:'Grace Kim', location:'Los Angeles, CA', state:'CA', sector:'Consumer', score:71, isNew:false,
    what:'Social gaming app hit #12 in Casual category.',
    reasons:[
      {label:'Chart ranking', pts:20, desc:'Peaked at #12 in a competitive category.'},
      {label:'DAU growth', pts:19, desc:'110k DAU, up 3x this quarter.'},
      {label:'Founder', pts:17, desc:'Shipped two prior mobile games.'},
      {label:'Monetization', pts:15, desc:'Early ad revenue covering server costs.'} ] },
  { id:'c13', company:'Aegis Cyber', founder:'Tomás Herrera', location:'Washington, DC', state:'DC', sector:'Security', score:88, isNew:true,
    what:'Runtime API-security tool landed a Fortune 500 paid pilot.',
    reasons:[
      {label:'Enterprise pilot', pts:26, desc:'Paid pilot with a Fortune 500 financial institution.'},
      {label:'Founder pedigree', pts:23, desc:'Former NSA offensive-security researcher.'},
      {label:'Threat timing', pts:21, desc:'API breaches up sharply year over year.'},
      {label:'Team', pts:18, desc:'Two ex-CrowdStrike engineers on board.'} ] },
  { id:'c14', company:'Bindery', founder:'Ella Novak', location:'Minneapolis, MN', state:'MN', sector:'AI/Dev Tools', score:79, isNew:false,
    what:'AI code-review bot adopted by 200 repos in beta.',
    reasons:[
      {label:'Adoption', pts:23, desc:'200 repos in beta, 18 paying teams.'},
      {label:'Founder fit', pts:20, desc:'Ex-staff engineer at a major DevTools company.'},
      {label:'Retention', pts:19, desc:'Teams that install keep it at 90%+.'},
      {label:'Market', pts:17, desc:'Code review a clear budget line for eng orgs.'} ] },
  { id:'c15', company:'Solace', founder:'Fatima Al-Sayed', location:'Houston, TX', state:'TX', sector:'Healthtech', score:77, isNew:false,
    what:'Mental-health platform for clinics signed 8 practices.',
    reasons:[
      {label:'B2B traction', pts:22, desc:'8 clinics live, serving 1,200 patients.'},
      {label:'Reimbursement', pts:20, desc:'Codes support recurring billed revenue.'},
      {label:'Founder', pts:19, desc:'Licensed therapist turned operator.'},
      {label:'Outcomes', pts:16, desc:'Early data shows improved appointment adherence.'} ] },
  { id:'c16', company:'Gridwise Robotics', founder:'Henry Osei', location:'Pittsburgh, PA', state:'PA', sector:'Climate', score:81, isNew:true,
    what:'Warehouse energy-optimization robots cut client power bills 18%.',
    reasons:[
      {label:'Proven ROI', pts:24, desc:'18% energy reduction documented at first site.'},
      {label:'Founder fit', pts:21, desc:'CMU robotics PhD; deep hardware chops.'},
      {label:'Pipeline', pts:19, desc:'6 warehouses in procurement discussions.'},
      {label:'Payback', pts:17, desc:'Under 14-month hardware payback for customers.'} ] },
  { id:'c17', company:'Thread', founder:'Maya Patel', location:'San Francisco, CA', state:'CA', sector:'AI/Dev Tools', score:90, isNew:true,
    what:'AI customer-support copilot hit $50k MRR in 8 weeks.',
    reasons:[
      {label:'Rapid revenue', pts:27, desc:'$50k MRR in 8 weeks from a standing start.'},
      {label:'Founder-market fit', pts:24, desc:'Led support tooling at a 2,000-person SaaS co.'},
      {label:'Efficiency', pts:21, desc:'Resolves 40% of tickets fully autonomously.'},
      {label:'Expansion', pts:18, desc:'Net revenue retention tracking above 130%.'} ] },
  { id:'c18', company:'Northstar Learning', founder:'Isabel Cruz', location:'Phoenix, AZ', state:'AZ', sector:'Consumer', score:69, isNew:false,
    what:'AI tutoring app for K-12 piloting in 15 schools.',
    reasons:[
      {label:'School pilots', pts:20, desc:'15 schools piloting; 2 district conversations open.'},
      {label:'Founder', pts:18, desc:'Former teacher and curriculum designer.'},
      {label:'Engagement', pts:17, desc:'Students average 3 sessions per week.'},
      {label:'Outcomes', pts:14, desc:'Early improvement on formative assessments.'} ] },
  { id:'c19', company:'Vaultline', founder:'Ryan O\'Connor', location:'Atlanta, GA', state:'GA', sector:'Security', score:75, isNew:false,
    what:'Secrets-management tool for startups reached 300 sign-ups.',
    reasons:[
      {label:'Self-serve growth', pts:21, desc:'300 sign-ups, 40 active workspaces.'},
      {label:'Founder', pts:19, desc:'Ex-security engineer at a fintech unicorn.'},
      {label:'Wedge', pts:18, desc:'Free tier driving bottoms-up adoption.'},
      {label:'Category', pts:17, desc:'Security tooling budgets expanding.'} ] },
  { id:'c20', company:'Harvest OS', founder:'Bianca Silva', location:'Sacramento, CA', state:'CA', sector:'Climate', score:72, isNew:false,
    what:'Farm-management platform onboarded 90 growers.',
    reasons:[
      {label:'Adoption', pts:20, desc:'90 growers across 2 states, 15 paying.'},
      {label:'Founder fit', pts:19, desc:'Grew up on a family farm; ag-tech background.'},
      {label:'Retention', pts:18, desc:'Seasonal usage strong; low off-season churn.'},
      {label:'Expansion', pts:15, desc:'Upsell into input procurement module.'} ] },
  { id:'c21', company:'Coax', founder:'Julian Wright', location:'Nashville, TN', state:'TN', sector:'Fintech', score:73, isNew:true,
    what:'Creator-payments platform moved $500k in first month.',
    reasons:[
      {label:'Volume', pts:21, desc:'$500k processed, 1,200 creators onboarded.'},
      {label:'Founder', pts:19, desc:'Prior creator-economy operator with audience.'},
      {label:'Take rate', pts:18, desc:'2.5% blended take rate.'},
      {label:'Growth loop', pts:15, desc:'Creators invite collaborators, driving virality.'} ] },
  { id:'c22', company:'Mendwell', founder:'Sofia Andersson', location:'San Diego, CA', state:'CA', sector:'Healthtech', score:84, isNew:true,
    what:'At-home PT platform signed a payer partnership.',
    reasons:[
      {label:'Payer deal', pts:25, desc:'Signed with a regional payer covering 300k lives.'},
      {label:'Founder fit', pts:22, desc:'Licensed physical therapist and researcher.'},
      {label:'Outcomes', pts:21, desc:'30% faster recovery vs. control in pilot.'},
      {label:'Reimbursement', pts:16, desc:'Clear billing pathway established.'} ] },
  { id:'c23', company:'Onyx Analytics', founder:'Raj Mehta', location:'New York, NY', state:'NY', sector:'AI/Dev Tools', score:85, isNew:false,
    what:'Data-observability platform closed 3 enterprise contracts.',
    reasons:[
      {label:'Enterprise revenue', pts:25, desc:'3 contracts at ~$90k ACV each.'},
      {label:'Founder', pts:22, desc:'Ex-data platform lead at a public tech company.'},
      {label:'Retention', pts:20, desc:'Zero churn to date; strong NPS.'},
      {label:'Market', pts:18, desc:'Data reliability now a board-level concern.'} ] },
  { id:'c24', company:'Loophole', founder:'Chloe Bennett', location:'Salt Lake City, UT', state:'UT', sector:'Security', score:70, isNew:false,
    what:'Phishing-simulation tool for SMBs hit 150 customers.',
    reasons:[
      {label:'SMB traction', pts:20, desc:'150 paying SMBs at $99/mo.'},
      {label:'Founder', pts:18, desc:'Security awareness trainer turned founder.'},
      {label:'Churn', pts:17, desc:'Monthly churn under 3%.'},
      {label:'Compliance', pts:15, desc:'Ties to cyber-insurance requirements.'} ] },
  { id:'c25', company:'Cirrus Freight', founder:'Daniel Kim', location:'Long Beach, CA', state:'CA', sector:'Climate', score:68, isNew:false,
    what:'Electric drayage logistics startup ran 500 zero-emission hauls.',
    reasons:[
      {label:'Operational proof', pts:19, desc:'500 completed EV hauls at a major port.'},
      {label:'Founder fit', pts:18, desc:'Former logistics ops manager at a 3PL.'},
      {label:'Incentives', pts:17, desc:'State grants subsidizing EV fleet expansion.'},
      {label:'Demand', pts:14, desc:'Shippers seeking scope-3 reductions.'} ] },
  { id:'c26', company:'Parcelle', founder:'Yuki Watanabe', location:'Cambridge, MA', state:'MA', sector:'Consumer', score:66, isNew:true,
    what:'Sustainable packaging marketplace onboarded 60 brands.',
    reasons:[
      {label:'Marketplace supply', pts:19, desc:'60 brands, 25 suppliers listed.'},
      {label:'Founder', pts:17, desc:'Ex-supply-chain lead at a DTC brand.'},
      {label:'GMV', pts:16, desc:'$120k GMV in first two months.'},
      {label:'Trend', pts:14, desc:'Brands under pressure to cut packaging waste.'} ] }
];

const STAGES = ['Reviewing','Contacted','Replied','Meeting'];
const LS_KEY = 'founderFeedPipeline_v1';

/* ---------- STATE ---------- */
let pipeline = loadPipeline();

function loadPipeline(){
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e){}
  const init = {};
  SIGNALS.forEach(s => { init[s.id] = 'Reviewing'; });
  return init;
}
function savePipeline(){
  try { localStorage.setItem(LS_KEY, JSON.stringify(pipeline)); } catch(e){}
}

/* ---------- HELPERS ---------- */
function scoreClass(n){ return n >= 85 ? 'score-good' : n >= 75 ? 'score-mid' : 'score-low'; }
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function firstName(full){ return full.replace(/^Dr\.\s+/, '').split(' ')[0]; }

function buildEmail(s){
  return `Subject: ${s.company} — quick note from a pre-seed investor

Hi ${firstName(s.founder)},

I came across ${s.company} this week — ${s.what.charAt(0).toLowerCase() + s.what.slice(1)} That caught my attention.

We back pre-seed founders in ${s.sector.toLowerCase()} and I'd love to hear how you're thinking about the next 12 months. Your background stood out to us, and the early signal here is exactly the kind of momentum we look for.

Would you be open to a 20-minute call next week? Happy to work around your schedule.

Best,
A Partner
Pre-Seed Partners`;
}

/* ---------- FILTER POPULATION ---------- */
const sectors = [...new Set(SIGNALS.map(s => s.sector))].sort();
const states = [...new Set(SIGNALS.map(s => s.state))].sort();
const secSel = document.getElementById('f-sector');
const stSel = document.getElementById('f-state');
sectors.forEach(x => secSel.insertAdjacentHTML('beforeend', `<option value="${x}">${x}</option>`));
states.forEach(x => stSel.insertAdjacentHTML('beforeend', `<option value="${x}">${x}</option>`));

/* ---------- FILTER STATE ---------- */
const filters = { sector:'', state:'', minScore:0, newOnly:false };
let expandedId = null;
let openMemoId = null;

/* ---------- RENDER FEED ---------- */
function getFiltered(){
  return SIGNALS
    .filter(s => (!filters.sector || s.sector === filters.sector))
    .filter(s => (!filters.state || s.state === filters.state))
    .filter(s => s.score >= filters.minScore)
    .filter(s => (!filters.newOnly || s.isNew))
    .sort((a,b) => b.score - a.score);
}

function renderFeed(){
  const body = document.getElementById('feed-body');
  const list = getFiltered();
  document.getElementById('no-results').style.display = list.length ? 'none' : 'block';
  body.innerHTML = '';
  list.forEach((s, i) => {
    const tr = document.createElement('tr');
    tr.className = 'row-main';
    tr.dataset.id = s.id;
    tr.innerHTML = `
      <td class="rank-cell">${i+1}</td>
      <td>
        <div class="co-name">${esc(s.company)}${s.isNew ? '<span class="tag newbadge">New</span>' : ''}</div>
        <div class="co-what">${esc(s.what)}</div>
        <div class="meta-line">${esc(s.founder)} · ${esc(s.location)} · <span class="tag">${esc(s.sector)}</span></div>
      </td>
      <td class="score-cell">
        <span class="score-num ${scoreClass(s.score)}">${s.score}</span>
        <div class="caret">${expandedId === s.id ? '▲ close' : '▼ details'}</div>
      </td>`;
    tr.addEventListener('click', () => toggleRow(s.id));
    body.appendChild(tr);

    if (expandedId === s.id){
      const dr = document.createElement('tr');
      dr.className = 'row-detail';
      dr.innerHTML = `<td colspan="3">${detailHTML(s)}</td>`;
      body.appendChild(dr);
      wireDetail(dr, s);
    }
  });
}

function detailHTML(s){
  const reasons = s.reasons.map(r => `
    <div class="reason">
      <div class="reason-top">
        <span class="reason-label">${esc(r.label)}</span>
        <span class="reason-pts">+${r.pts}</span>
      </div>
      <div class="reason-desc">${esc(r.desc)}</div>
      <div class="bar"><span style="width:${Math.min(100, r.pts*3.3)}%"></span></div>
    </div>`).join('');
  return `
  <div class="detail-inner">
    <div class="detail-grid">
      <div>
        <p class="panel-h">Why it scored ${s.score}</p>
        ${reasons}
      </div>
      <div>
        <p class="panel-h">Actions</p>
        <p style="font-size:13px;color:var(--ink-soft);">Generate a one-page memo with a ready-to-send first-contact email.</p>
        <button class="btn" data-action="memo">Generate Memo</button>
        <div class="memo ${openMemoId === s.id ? 'show' : ''}" data-memo>
          <h3>${esc(s.company)}</h3>
          <div class="memo-sub">${esc(s.sector)} · ${esc(s.location)} · Score ${s.score}/100</div>
          <div class="label">Founder</div>
          <p>${esc(s.founder)}</p>
          <div class="label">Signal</div>
          <p>${esc(s.what)}</p>
          <div class="label">Thesis in one line</div>
          <p>Strong ${esc(s.sector.toLowerCase())} founder showing early, verifiable momentum — worth a first conversation before the round forms.</p>
          <div class="label">First-contact email</div>
          <div class="email-box" data-email>${esc(buildEmail(s))}</div>
          <div class="memo-actions">
            <button class="btn" data-action="copy">Copy Email</button>
            <button class="btn ghost" data-action="contacted">Move to Contacted</button>
            <span class="copied-note" data-copied>Copied to clipboard ✓</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function wireDetail(dr, s){
  dr.querySelector('[data-action=memo]').addEventListener('click', e => {
    e.stopPropagation();
    openMemoId = openMemoId === s.id ? null : s.id;
    renderFeed();
  });
  const copyBtn = dr.querySelector('[data-action=copy]');
  if (copyBtn){
    copyBtn.addEventListener('click', e => {
      e.stopPropagation();
      const text = buildEmail(s);
      const note = dr.querySelector('[data-copied]');
      const done = () => { note.classList.add('show'); setTimeout(()=>note.classList.remove('show'), 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done).catch(()=>fallbackCopy(text, done));
      } else { fallbackCopy(text, done); }
    });
  }
  const contactedBtn = dr.querySelector('[data-action=contacted]');
  if (contactedBtn){
    contactedBtn.addEventListener('click', e => {
      e.stopPropagation();
      pipeline[s.id] = 'Contacted';
      savePipeline();
      renderBoard();
      renderStats();
    });
  }
  // prevent memo clicks from collapsing row
  dr.querySelectorAll('[data-memo]').forEach(m => m.addEventListener('click', e => e.stopPropagation()));
}

function fallbackCopy(text, cb){
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); } catch(e){}
  document.body.removeChild(ta);
  cb && cb();
}

function toggleRow(id){
  expandedId = expandedId === id ? null : id;
  if (expandedId !== id) openMemoId = null;
  if (expandedId === null) openMemoId = null;
  renderFeed();
}

/* ---------- STATS ---------- */
function renderStats(){
  const newCount = SIGNALS.filter(s => s.isNew).length;
  const contacted = Object.values(pipeline).filter(v => v === 'Contacted' || v === 'Replied' || v === 'Meeting').length;
  const replied = Object.values(pipeline).filter(v => v === 'Replied' || v === 'Meeting').length;
  const rate = contacted ? Math.round((replied / contacted) * 100) : 0;
  const el = document.getElementById('stats');
  el.innerHTML = `
    <div class="stat"><span class="num">${SIGNALS.length}</span><span class="lbl">Signals Tracked</span></div>
    <div class="stat"><span class="num">${newCount}</span><span class="lbl">New This Week</span></div>
    <div class="stat"><span class="num">${contacted}</span><span class="lbl">Contacted</span></div>
    <div class="stat"><span class="num">${rate}%</span><span class="lbl">Reply Rate</span></div>`;
}

/* ---------- KANBAN ---------- */
function renderBoard(){
  const board = document.getElementById('board');
  board.innerHTML = '';
  STAGES.forEach(stage => {
    const inStage = SIGNALS.filter(s => (pipeline[s.id] || 'Reviewing') === stage);
    const col = document.createElement('div');
    col.className = 'col';
    col.dataset.stage = stage;
    col.innerHTML = `<div class="col-title"><span>${stage}</span><span class="col-count">${inStage.length}</span></div>`;
    if (inStage.length === 0){
      col.insertAdjacentHTML('beforeend', `<div class="empty-hint">Drop founders here</div>`);
    }
    inStage.sort((a,b)=>b.score-a.score).forEach(s => {
      const card = document.createElement('div');
      card.className = 'card';
      card.draggable = true;
      card.dataset.id = s.id;
      card.innerHTML = `<span class="c-score">${s.score}</span>
        <div class="c-name">${esc(s.company)}</div>
        <div class="c-meta">${esc(firstName(s.founder))} · ${esc(s.sector)}</div>`;
      card.addEventListener('dragstart', e => {
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', s.id);
        e.dataTransfer.effectAllowed = 'move';
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      col.appendChild(card);
    });
    col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', e => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const id = e.dataTransfer.getData('text/plain');
      if (id){
        pipeline[id] = stage;
        savePipeline();
        renderBoard();
        renderStats();
      }
    });
    board.appendChild(col);
  });
}

/* ---------- FILTER WIRING ---------- */
secSel.addEventListener('change', e => { filters.sector = e.target.value; renderFeed(); });
stSel.addEventListener('change', e => { filters.state = e.target.value; renderFeed(); });
const scoreIn = document.getElementById('f-score');
const scoreOut = document.getElementById('f-score-out');
scoreIn.addEventListener('input', e => {
  filters.minScore = +e.target.value;
  scoreOut.textContent = e.target.value;
  renderFeed();
});
document.getElementById('f-new').addEventListener('change', e => { filters.newOnly = e.target.checked; renderFeed(); });
document.getElementById('reset').addEventListener('click', () => {
  filters.sector=''; filters.state=''; filters.minScore=0; filters.newOnly=false;
  secSel.value=''; stSel.value=''; scoreIn.value=0; scoreOut.textContent='0';
  document.getElementById('f-new').checked=false;
  renderFeed();
});

/* ---------- INIT ---------- */
renderStats();
renderFeed();
renderBoard();
