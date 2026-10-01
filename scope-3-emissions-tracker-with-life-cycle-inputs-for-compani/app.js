/* Scope 3 Value-Chain Tracker — static prototype, all state in localStorage. */

const KEY = 'scope3-tracker-v1';

const INDUSTRIES = {
  chemicals:   { label:'Chemicals',   stages:['Feedstocks & Suppliers','Plant Operations','Bulk Distribution','Downstream Use & Disposal'] },
  apparel:     { label:'Apparel',     stages:['Fibre & Mills','Cut & Sew Operations','Retail Distribution','Wear, Wash & End-of-Life'] },
  food:        { label:'Food',        stages:['Farming & Ingredients','Processing Operations','Cold Chain & Marketing','Consumption & Food Waste'] },
  electronics: { label:'Electronics', stages:['Components & Minerals','Assembly Operations','Channel & Distribution','Device Use & Recycling'] },
  software:    { label:'Software',    stages:['Cloud & Hardware Purchases','Engineering Operations','Sales & Marketing','Customer Device Use'] },
  retail:      { label:'Retail',      stages:['Supplier Goods','Store & DC Operations','Last-Mile Delivery','Customer Use & Returns'] },
  logistics:   { label:'Logistics',   stages:['Fleet & Fuel Purchases','Terminal Operations','Line-Haul & Delivery','Packaging End-of-Life'] },
  custom:      { label:'Custom',      stages:['Supply Chain','Operations','Distribution & Marketing','Consumer Use & End-of-Life'] }
};

const BASE_STAGES = ['Supply Chain','Operations','Distribution & Marketing','Consumer Use & End-of-Life'];

const CATEGORIES = [
  { key:'cat1',  label:'1 · Purchased goods' },
  { key:'cat4',  label:'4 · Upstream transport' },
  { key:'cat5',  label:'5 · Waste in ops' },
  { key:'cat6',  label:'6 · Business travel' },
  { key:'cat11', label:'11 · Use of sold products' },
  { key:'cat12', label:'12 · End-of-life' }
];

const SAMPLE = {
  company: 'Brightleaf Naturals',
  industry: 'food',
  customIndustry: '',
  product: { name:'Herbal Tea Blends', units: 250000 },
  stages: INDUSTRIES.food.stages.map((name, i) => ({ name, owned: i === 1 })),
  entries: [
    { activity: 86000, unit:'kg', factor: 2.4, kg: 206400 }
  ],
  seeded: { cat1: 0, cat4: 41200, cat5: 9800, cat6: 15600, cat11: 72400, cat12: 28900 }
};

const EMPTY_SEED = { cat1:0, cat4:0, cat5:0, cat6:0, cat11:0, cat12:0 };

let state = null;
let wizard = { step: 1, industry: null };
let chart = null;

/* ───────────────── persistence ───────────────── */
function save(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e){} }
function load(){
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; }
  catch(e){ return null; }
}

/* ───────────────── wizard ───────────────── */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function renderIndustries(){
  const box = $('#industries');
  box.innerHTML = '';
  Object.entries(INDUSTRIES).forEach(([key, def]) => {
    const el = document.createElement('div');
    el.className = 'ind' + (wizard.industry === key ? ' on' : '');
    el.textContent = def.label;
    el.onclick = () => {
      wizard.industry = key;
      $('#customWrap').classList.toggle('hidden', key !== 'custom');
      renderIndustries();
    };
    box.appendChild(el);
  });
}

function showStep(n){
  wizard.step = n;
  $$('.pane').forEach(p => p.classList.toggle('hidden', +p.dataset.pane !== n));
  $$('.steps div').forEach(d => d.classList.toggle('on', +d.dataset.step === n));
  $('#btnBack').style.visibility = n === 1 ? 'hidden' : 'visible';
  $('#btnNext').textContent = n === 3 ? 'Build value chain' : 'Next';
}

function nextStep(){
  if (wizard.step === 1){
    if (!$('#coName').value.trim()) return flash('#coName');
    return showStep(2);
  }
  if (wizard.step === 2){
    if (!wizard.industry) return;
    if (wizard.industry === 'custom' && !$('#customInd').value.trim()) return flash('#customInd');
    return showStep(3);
  }
  if (!$('#prodName').value.trim()) return flash('#prodName');
  buildFromWizard();
}

function flash(sel){
  const el = $(sel);
  el.style.borderColor = '#d96b6b';
  el.focus();
  setTimeout(() => { el.style.borderColor = ''; }, 900);
}

function buildFromWizard(){
  const key = wizard.industry;
  state = {
    company: $('#coName').value.trim(),
    industry: key,
    customIndustry: key === 'custom' ? $('#customInd').value.trim() : '',
    product: { name: $('#prodName').value.trim(), units: Number($('#prodUnits').value) || 0 },
    // Start from the four canonical stages so the diagram is always recognisable;
    // the industry preset is offered as the hint line underneath each box.
    stages: BASE_STAGES.map((name, i) => ({ name, owned: i === 1, preset: INDUSTRIES[key].stages[i] })),
    entries: [],
    seeded: Object.assign({}, EMPTY_SEED)
  };
  save();
  renderApp();
}

/* ───────────────── app render ───────────────── */
function industryLabel(){
  return state.industry === 'custom' && state.customIndustry
    ? state.customIndustry
    : INDUSTRIES[state.industry].label;
}

function renderApp(){
  $('#wizard').classList.add('hidden');
  $('#app').classList.remove('hidden');
  $('#coTitle').textContent = state.company + ' — value chain';
  const units = state.product.units ? ` · ${state.product.units.toLocaleString()} units/yr` : '';
  $('#coMeta').textContent = `${industryLabel()} · ${state.product.name}${units}`;
  renderChain();
  renderEntries();
  renderChart();
  updatePreview();
}

function renderChain(){
  const box = $('#chain');
  box.innerHTML = '';
  state.stages.forEach((st, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'stagewrap';

    const card = document.createElement('div');
    card.className = 'stage';

    const name = document.createElement('div');
    name.className = 'name';
    name.contentEditable = 'true';
    name.spellcheck = false;
    name.textContent = st.name;
    name.title = 'Click to rename';
    name.addEventListener('blur', () => {
      const v = name.textContent.trim() || BASE_STAGES[i];
      name.textContent = v;
      state.stages[i].name = v;
      save();
    });
    name.addEventListener('keydown', e => {
      if (e.key === 'Enter'){ e.preventDefault(); name.blur(); }
    });
    card.appendChild(name);

    if (st.preset && st.preset !== st.name){
      const hint = document.createElement('div');
      hint.className = 'hint';
      hint.textContent = industryLabel() + ': ' + st.preset;
      card.appendChild(hint);
    }

    const own = document.createElement('label');
    own.className = 'own';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = st.owned;
    cb.onchange = () => { state.stages[i].owned = cb.checked; save(); renderChain(); };
    own.appendChild(cb);
    own.appendChild(document.createTextNode('We own / control this'));
    card.appendChild(own);

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = st.owned ? 'var(--s1)' : 'var(--s3)';
    bar.textContent = st.owned ? 'SCOPE 1 & 2' : 'SCOPE 3';
    card.appendChild(bar);

    wrap.appendChild(card);
    if (i < state.stages.length - 1){
      const a = document.createElement('div');
      a.className = 'arrow';
      a.textContent = '→';
      wrap.appendChild(a);
    }
    box.appendChild(wrap);
  });
}

/* ───────────────── metric entry ───────────────── */
function computed(){
  const a = Number($('#mActivity').value) || 0;
  const f = Number($('#mFactor').value) || 0;
  const mult = $('#mUnit').value === 't' ? 1000 : 1;
  return a * mult * f;
}

function fmt(n){ return Math.round(n).toLocaleString(); }

function updatePreview(){ $('#mPreview').textContent = fmt(computed()); }

function addMetric(){
  const a = Number($('#mActivity').value);
  if (!a || a <= 0) return flash('#mActivity');
  state.entries.push({
    activity: a,
    unit: $('#mUnit').value,
    factor: Number($('#mFactor').value) || 0,
    kg: computed()
  });
  save();
  $('#mActivity').value = '';
  updatePreview();
  renderEntries();
  renderChart();
}

function renderEntries(){
  const body = $('#entriesBody');
  body.innerHTML = '';
  $('#entriesTable').classList.toggle('hidden', state.entries.length === 0);
  state.entries.forEach((e, i) => {
    const tr = document.createElement('tr');
    const unitLabel = e.unit === 't' ? 't' : (e.unit === 'kg' ? 'kg' : 'units');
    tr.innerHTML = `<td>${e.activity.toLocaleString()} ${unitLabel}</td>
                    <td>${e.factor} kg/${unitLabel === 't' ? 'kg' : unitLabel}</td>
                    <td class="num">${fmt(e.kg)}</td>`;
    const td = document.createElement('td');
    const del = document.createElement('button');
    del.className = 'ghost';
    del.textContent = 'Remove';
    del.style.padding = '2px 8px';
    del.onclick = () => { state.entries.splice(i,1); save(); renderEntries(); renderChart(); };
    td.appendChild(del);
    tr.appendChild(td);
    body.appendChild(tr);
  });
}

/* ───────────────── chart ───────────────── */
function totals(){
  const entrySum = state.entries.reduce((s,e) => s + e.kg, 0);
  return CATEGORIES.map(c => (state.seeded[c.key] || 0) + (c.key === 'cat1' ? entrySum : 0));
}

function renderChart(){
  const data = totals();
  const grand = data.reduce((a,b) => a+b, 0);
  $('#grandTotal').textContent = 'Total Scope 3: ' + fmt(grand) + ' kg CO2e  (' + (grand/1000).toFixed(1) + ' t)';

  const canvas = $('#chart');
  if (typeof Chart === 'undefined'){ return fallbackChart(canvas, data); }

  if (chart){
    chart.data.datasets[0].data = data;
    chart.update();
    return;
  }
  chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: CATEGORIES.map(c => c.label),
      datasets: [{
        label: 'kg CO2e',
        data,
        backgroundColor: CATEGORIES.map(c => c.key === 'cat1' ? '#5fd39a' : '#2f8f63'),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display:false } },
      scales: {
        x: { ticks:{ color:'#8fa89a', font:{size:10} }, grid:{ display:false } },
        y: { ticks:{ color:'#8fa89a' }, grid:{ color:'#2a3b31' }, beginAtZero:true }
      }
    }
  });
}

/* Minimal canvas bar chart used only if the Chart.js CDN is unreachable (offline file://). */
function fallbackChart(canvas, data){
  const w = canvas.width = canvas.clientWidth || 480;
  const h = canvas.height = 260;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,w,h);
  const max = Math.max(1, ...data);
  const pad = 30, bw = (w - pad*2) / data.length;
  data.forEach((v,i) => {
    const bh = (h - 60) * (v / max);
    ctx.fillStyle = CATEGORIES[i].key === 'cat1' ? '#5fd39a' : '#2f8f63';
    ctx.fillRect(pad + i*bw + 6, h - 40 - bh, bw - 12, bh);
    ctx.fillStyle = '#8fa89a';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(CATEGORIES[i].label.split(' · ')[0], pad + i*bw + bw/2, h - 24);
  });
}

/* ───────────────── boot ───────────────── */
function loadSample(){
  state = JSON.parse(JSON.stringify(SAMPLE));
  state.stages = state.stages.map((s,i) => ({ ...s, preset: INDUSTRIES.food.stages[i] }));
  save();
  if (chart){ chart.destroy(); chart = null; }
  renderApp();
}

function reset(){
  localStorage.removeItem(KEY);
  state = null;
  if (chart){ chart.destroy(); chart = null; }
  wizard = { step:1, industry:null };
  ['#coName','#customInd','#prodName','#prodUnits','#mActivity'].forEach(s => $(s).value = '');
  $('#mFactor').value = '2.4';
  $('#customWrap').classList.add('hidden');
  renderIndustries();
  $('#app').classList.add('hidden');
  $('#wizard').classList.remove('hidden');
  showStep(1);
}

$('#btnNext').onclick = nextStep;
$('#btnBack').onclick = () => showStep(Math.max(1, wizard.step - 1));
$('#btnSample').onclick = loadSample;
$('#btnReset').onclick = reset;
$('#btnAddMetric').onclick = addMetric;
['#mActivity','#mFactor','#mUnit'].forEach(s => $(s).addEventListener('input', updatePreview));
$('#coName').addEventListener('keydown', e => { if (e.key === 'Enter') nextStep(); });
$('#prodName').addEventListener('keydown', e => { if (e.key === 'Enter') nextStep(); });
window.addEventListener('resize', () => { if (typeof Chart === 'undefined' && state) renderChart(); });

renderIndustries();
showStep(1);
state = load();
if (state){
  if (!state.seeded) state.seeded = Object.assign({}, EMPTY_SEED);
  renderApp();
}
