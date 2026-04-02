import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#f5f7fa;
  --bg2:#edf0f5;
  --bg3:#e4e8f0;
  --bg4:#d8dde8;
  --surface:#ffffff;
  --border:rgba(0,0,0,.09);
  --border2:rgba(0,0,0,.16);
  --text:#111827;
  --text2:#374151;
  --text3:#9ca3af;
  --accent:#2563eb;
  --accent2:#1d4ed8;
  --accent-glow:rgba(37,99,235,.12);
  --red:#dc2626;
  --red-dim:rgba(220,38,38,.08);
  --amber:#d97706;
  --amber-dim:rgba(217,119,6,.08);
  --green:#16a34a;
  --green-dim:rgba(22,163,74,.08);
  --blue:#2563eb;
  --blue-dim:rgba(37,99,235,.08);
  --pink:#db2777;
  --pink-dim:rgba(219,39,119,.08);
  --teal:#0d9488;
  --teal-dim:rgba(13,148,136,.08);
  --r:16px;
  --r-sm:10px;
  --shadow:0 1px 3px rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.06);
  --shadow-lg:0 8px 32px rgba(0,0,0,.1);
}
body{background:var(--bg);font-family:'Plus Jakarta Sans',sans-serif;color:var(--text);-webkit-font-smoothing:antialiased;overflow-y:auto;overflow-x:hidden;}
button{font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;}

/* ── LAYOUT ── */
.shell{display:flex;flex-direction:column;min-height:100vh;max-width:430px;margin:0 auto;background:var(--bg);position:relative;}
.screen{flex:1;overflow-y:visible;overflow-x:hidden;padding:0 0 120px;}
.screen::-webkit-scrollbar{display:none;}
.pad{padding:0 18px;}

/* ── TOP BAR ── */
.topbar{display:flex;flex-direction:column;padding:0;background:#ffffff;border-bottom:1px solid var(--border);box-shadow:0 1px 6px rgba(0,0,0,.05);}
.topbar-row1{display:flex;align-items:center;justify-content:space-between;padding:14px 20px 10px;}
.topbar-row2{display:flex;align-items:center;justify-content:center;padding:0 20px 12px;gap:6px;}
.logo{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.3rem;font-weight:800;letter-spacing:-.5px;}
.logo span{color:var(--accent);}
.topbar-logo{display:flex;align-items:center;gap:10px;}
.role-pill{display:flex;background:var(--bg2);border-radius:12px;padding:4px;gap:3px;border:1px solid var(--border);width:100%;}
.rp-btn{flex:1;padding:8px 6px;border-radius:8px;border:none;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .2s;background:transparent;color:var(--text3);font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:.2px;text-align:center;}
.rp-btn.on{background:var(--accent);color:white;}

/* ── TAB BAR ── */
.tabbar{position:sticky;bottom:0;left:0;right:0;z-index:50;display:flex;background:rgba(245,247,250,.97);backdrop-filter:blur(20px);border-top:1px solid var(--border);padding:10px 8px 16px;}
.tb{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 4px;border-radius:10px;border:none;background:transparent;cursor:pointer;transition:all .2s;}
.tb-icon{font-size:1.15rem;transition:transform .2s;}
.tb-label{font-size:.62rem;font-weight:600;color:var(--text3);transition:color .2s;letter-spacing:.3px;text-transform:uppercase;}
.tb.on .tb-icon{transform:scale(1.18);}
.tb.on .tb-label{color:var(--accent2);}

/* ── SECTION HEADER ── */
.page-header{padding:20px 18px 4px;}
.page-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.5rem;font-weight:700;letter-spacing:-.3px;}
.page-sub{font-size:.8rem;color:var(--text2);margin-top:3px;}

/* ── CARDS ── */
.card{background:var(--surface);border-radius:var(--r);border:1px solid var(--border);padding:18px;margin:0 18px 12px;}
.card-hd{font-family:'Plus Jakarta Sans',sans-serif;font-size:.95rem;font-weight:700;margin-bottom:3px;}
.card-sub{font-size:.75rem;color:var(--text2);margin-bottom:14px;}

/* ── GLOW CARD ── */
.glow-card{background:linear-gradient(135deg,#eff6ff,#e0effe);border-radius:var(--r);border:1px solid rgba(37,99,235,.2);padding:20px;margin:0 18px 12px;position:relative;overflow:hidden;}
.glow-card::before{content:'';position:absolute;top:-60px;right:-60px;width:160px;height:160px;background:radial-gradient(circle,rgba(37,99,235,.08),transparent 70%);pointer-events:none;}

/* ── AI BOX ── */
.ai-box{background:linear-gradient(135deg,#eff6ff,#f0f9ff);border-radius:var(--r);border:1px solid rgba(37,99,235,.2);padding:18px;margin:0 18px 12px;position:relative;overflow:hidden;}
.ai-box::after{content:'';position:absolute;bottom:-40px;left:-40px;width:120px;height:120px;background:radial-gradient(circle,rgba(37,99,235,.08),transparent 70%);pointer-events:none;}
.ai-chip{display:inline-flex;align-items:center;gap:6px;background:rgba(124,106,247,.2);border:1px solid rgba(37,99,235,.2);padding:3px 10px;border-radius:20px;font-size:.68rem;font-weight:600;color:var(--accent2);margin-bottom:10px;letter-spacing:.3px;}
.ai-text{font-size:.83rem;line-height:1.65;color:var(--text2);}
.ai-bullets{list-style:none;margin-top:10px;display:flex;flex-direction:column;gap:7px;}
.ai-bullets li{font-size:.78rem;color:var(--text2);padding-left:16px;position:relative;line-height:1.5;}
.ai-bullets li::before{content:'→';position:absolute;left:0;color:var(--accent);}

/* ── STATS ── */
.stats-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:0 18px 12px;}
.stat-box{background:var(--bg3);border-radius:var(--r-sm);border:1px solid var(--border);padding:14px;}
.stat-num{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.9rem;font-weight:700;line-height:1;}
.stat-lbl{font-size:.7rem;color:var(--text3);margin-top:3px;letter-spacing:.3px;text-transform:uppercase;}
.stat-change{font-size:.72rem;margin-top:6px;font-weight:500;}

/* ── TAGS ── */
.tags{display:flex;flex-wrap:wrap;gap:7px;}
.tag{padding:7px 13px;border-radius:20px;font-size:.78rem;font-weight:500;cursor:pointer;border:1px solid var(--border);background:var(--bg3);color:var(--text2);transition:all .15s;user-select:none;}
.tag:hover:not(.sel){border-color:var(--border2);color:var(--text);}
.tag.sel{background:var(--accent);color:white;border-color:var(--accent);}
.tag.sel-r{background:var(--red-dim);color:var(--red);border-color:rgba(240,82,82,.35);}

/* ── SEVERITY RING ── */
.sev-ring{display:flex;flex-direction:column;align-items:center;gap:6px;margin:4px 0 16px;}
.ring-wrap{position:relative;width:100px;height:100px;}
.ring-svg{transform:rotate(-90deg);}
.ring-num{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.ring-val{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.9rem;font-weight:800;line-height:1;}
.ring-lbl{font-size:.62rem;color:var(--text2);text-transform:uppercase;letter-spacing:.5px;}
.slider-track{width:100%;height:6px;border-radius:3px;outline:none;cursor:pointer;-webkit-appearance:none;background:linear-gradient(to right,var(--green),var(--amber),var(--red));}
.slider-track::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:var(--text);border:3px solid var(--bg);cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.5);}
.slider-ends{display:flex;justify-content:space-between;font-size:.68rem;color:var(--text3);margin-top:4px;}

/* ── CONDITION CATEGORIES ── */
.cat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 18px 12px;}
.cat-card{border-radius:var(--r-sm);border:1px solid var(--border);padding:14px 12px;cursor:pointer;transition:all .2s;background:var(--bg3);}
.cat-card:hover{border-color:var(--border2);}
.cat-card.sel{border-width:1.5px;}
.cat-icon{font-size:1.4rem;margin-bottom:6px;}
.cat-name{font-size:.82rem;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;}
.cat-desc{font-size:.7rem;color:var(--text3);margin-top:2px;}

/* ── SYMPTOM SEARCH ── */
.search-input{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:var(--r-sm);padding:11px 14px;color:var(--text);font-size:.875rem;font-family:'Instrument Sans',sans-serif;outline:none;transition:border-color .2s;}
.search-input:focus{border-color:var(--accent);}
.search-input::placeholder{color:var(--text3);}

/* ── BODY MAP ── */
.bm-wrap{display:flex;justify-content:center;position:relative;}
.bp{fill:var(--bg4);stroke:var(--border2);stroke-width:1;transition:fill .15s,stroke .15s;cursor:pointer;}
.bp:hover{fill:var(--bg3);}
.bp.hit{fill:rgba(240,82,82,.35);stroke:var(--red);}

/* ── INPUTS ── */
.textarea{width:100%;padding:12px 14px;border-radius:var(--r-sm);border:1px solid var(--border);background:var(--bg3);font-family:'Instrument Sans',sans-serif;font-size:.83rem;color:var(--text);resize:none;min-height:76px;transition:border-color .2s;outline:none;}
.textarea:focus{border-color:var(--accent);}
.textarea::placeholder{color:var(--text3);}
.select{width:100%;padding:10px 12px;border-radius:var(--r-sm);border:1px solid var(--border);background:var(--bg3);font-family:'Instrument Sans',sans-serif;font-size:.83rem;color:var(--text);outline:none;cursor:pointer;}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:13px 18px;border-radius:var(--r-sm);font-size:.83rem;font-weight:600;cursor:pointer;transition:all .2s;border:none;font-family:'Instrument Sans',sans-serif;letter-spacing:.2px;width:100%;}
.btn-accent{background:var(--accent);color:white;}
.btn-accent:hover{background:#6b59e6;transform:translateY(-1px);box-shadow:0 6px 20px var(--accent-glow);}
.btn-ghost{background:var(--bg3);color:var(--text2);border:1px solid var(--border);}
.btn-ghost:hover{border-color:var(--border2);color:var(--text);}
.btn-red{background:var(--red-dim);color:var(--red);border:1px solid rgba(240,82,82,.3);}
.btn-sm{padding:8px 14px;font-size:.75rem;width:auto;}
.btn-row{display:flex;gap:8px;margin:0 18px 12px;}

/* ── BADGE ── */
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:.68rem;font-weight:600;letter-spacing:.3px;}
.badge-r{background:var(--red-dim);color:var(--red);}
.badge-a{background:var(--amber-dim);color:var(--amber);}
.badge-g{background:var(--green-dim);color:var(--green);}
.badge-b{background:var(--blue-dim);color:var(--blue);}
.badge-p{background:rgba(124,106,247,.2);color:var(--accent2);}
.badge-pk{background:var(--pink-dim);color:var(--pink);}

/* ── ALERT ── */
.alert{display:flex;gap:11px;padding:13px 14px;border-radius:var(--r-sm);margin-bottom:9px;align-items:flex-start;}
.al-u{background:var(--red-dim);border:1px solid rgba(240,82,82,.25);}
.al-w{background:var(--amber-dim);border:1px solid rgba(245,158,11,.25);}
.al-g{background:var(--green-dim);border:1px solid rgba(52,211,153,.25);}
.al-b{background:var(--blue-dim);border:1px solid rgba(96,165,250,.25);}
.al-p{background:rgba(124,106,247,.1);border:1px solid rgba(124,106,247,.2);}
.al-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:4px;}
.al-body{}
.al-name{font-weight:600;font-size:.82rem;}
.al-msg{font-size:.76rem;color:var(--text2);margin-top:2px;line-height:1.5;}

/* ── TIMELINE ── */
.tl{display:flex;flex-direction:column;}
.tl-row{display:flex;gap:12px;}
.tl-spine{display:flex;flex-direction:column;align-items:center;}
.tl-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:4px;}
.tl-line{width:1px;background:var(--border);flex:1;min-height:20px;}
.tl-body{flex:1;padding-bottom:16px;}
.tl-time{font-size:.7rem;color:var(--text3);}
.tl-title{font-size:.83rem;font-weight:600;margin:2px 0;}
.tl-desc{font-size:.75rem;color:var(--text2);line-height:1.55;}

/* ── CHART ── */
.bar-chart{display:flex;align-items:flex-end;gap:5px;height:60px;}
.bar{border-radius:3px 3px 0 0;flex:1;min-width:0;transition:height .3s;}
.bar-labels{display:flex;gap:5px;margin-top:4px;}
.bar-lbl{flex:1;text-align:center;font-size:.62rem;color:var(--text3);}

/* ── MED ── */
.med-row{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border);}
.med-row:last-child{border-bottom:none;}
.med-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
.med-info{flex:1;}
.med-name{font-weight:600;font-size:.85rem;}
.med-dose{font-size:.72rem;color:var(--text3);margin-top:2px;}

/* ── TOGGLE ── */
.tog{position:relative;width:42px;height:23px;flex-shrink:0;}
.tog input{opacity:0;width:0;height:0;}
.tog-sl{position:absolute;inset:0;background:var(--bg4);border-radius:12px;cursor:pointer;transition:.2s;border:1px solid var(--border);}
.tog-sl::before{content:'';position:absolute;width:17px;height:17px;left:2px;bottom:2px;background:var(--text2);border-radius:50%;transition:.2s;}
.tog input:checked+.tog-sl{background:var(--green);border-color:var(--green);}
.tog input:checked+.tog-sl::before{transform:translateX(19px);background:white;}

/* ── PROGRESS DOTS ── */
.prog-dots{display:flex;gap:5px;justify-content:center;margin:8px 0 16px;}
.pd{height:4px;border-radius:2px;background:var(--bg4);transition:all .3s;}
.pd.on{background:var(--accent);}

/* ── VOICE BTN ── */
.voice-btn{width:46px;height:46px;border-radius:50%;background:var(--bg4);border:1px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;transition:all .2s;flex-shrink:0;}
.voice-btn.rec{background:var(--red-dim);border-color:rgba(240,82,82,.5);animation:pulse-rec 1s infinite;}
@keyframes pulse-rec{0%,100%{box-shadow:0 0 0 0 rgba(240,82,82,.4);}50%{box-shadow:0 0 0 8px rgba(240,82,82,0);}}

/* ── WATCH ── */
.watch-band{display:flex;gap:14px;align-items:center;background:var(--bg2);border-radius:var(--r-sm);border:1px solid var(--border);padding:14px;}
.watch-face{width:48px;height:58px;background:var(--bg3);border-radius:9px;border:1.5px solid var(--border2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;flex-shrink:0;}
.wf-num{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.1rem;font-weight:800;color:var(--accent);}
.wf-lbl{font-size:.52rem;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;}

/* ── PATIENT CARD ── */
.patient-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);}
.patient-row:last-child{border-bottom:none;}
.avatar{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.82rem;flex-shrink:0;}

/* ── SUCCESS ── */
.success{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 24px;text-align:center;gap:12px;}
.success-icon{font-size:3.5rem;animation:pop .4s ease;}
@keyframes pop{0%{transform:scale(0);}80%{transform:scale(1.2);}100%{transform:scale(1);}}

/* ── MISC ── */
.row{display:flex;align-items:center;justify-content:space-between;}
.col{display:flex;flex-direction:column;gap:4px;}
.divider{height:1px;background:var(--border);margin:4px 0;}
.loading{display:flex;align-items:center;gap:9px;font-size:.78rem;color:var(--text3);padding:10px 0;}
.spinner{width:15px;height:15px;border:2px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0;}
@keyframes spin{to{transform:rotate(360deg);}}
.spacer{height:8px;}
.mt{margin-top:10px;}

/* ── CATEGORY COLORS ── */
.c-cardio{border-color:rgba(240,82,82,.35)!important;} .c-cardio .cat-icon::after{content:'';}
.c-mental{border-color:rgba(244,114,182,.35)!important;}
.c-chronic{border-color:rgba(245,158,11,.35)!important;}
.c-acute{border-color:rgba(96,165,250,.35)!important;}
.c-digest{border-color:rgba(52,211,153,.35)!important;}
.c-neuro{border-color:rgba(124,106,247,.35)!important;}
.c-musculo{border-color:rgba(45,212,191,.35)!important;}
.c-recovery{border-color:rgba(160,158,181,.35)!important;}
`;

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const CONDITION_CATS = [
  {id:"cardio",icon:"❤️",name:"Cardiovascular",desc:"Heart, BP, circulation",color:"var(--red)",cls:"c-cardio",symptoms:["Chest pain","Palpitations","Shortness of breath","Dizziness","Swollen ankles","Fatigue","Irregular heartbeat","High blood pressure"]},
  {id:"mental",icon:"🧠",name:"Mental Health",desc:"Mood, anxiety, sleep",color:"var(--pink)",cls:"c-mental",symptoms:["Anxiety","Low mood","Panic attacks","Insomnia","Fatigue","Irritability","Concentration issues","Hopelessness","Mood swings","Social withdrawal"]},
  {id:"chronic",icon:"⚕️",name:"Chronic Illness",desc:"Diabetes, asthma, arthritis",color:"var(--amber)",cls:"c-chronic",symptoms:["Joint pain","Stiffness","Blood sugar spike","Breathlessness","Wheezing","Inflammation","Chronic fatigue","Neuropathy"]},
  {id:"acute",icon:"🤒",name:"Acute / Infection",desc:"Cold, flu, fever",color:"var(--blue)",cls:"c-acute",symptoms:["Fever","Chills","Sore throat","Cough","Runny nose","Body aches","Headache","Nausea","Vomiting","Diarrhea"]},
  {id:"digest",icon:"🫁",name:"Digestive",desc:"Gut, bowel, stomach",color:"var(--green)",cls:"c-digest",symptoms:["Stomach pain","Bloating","Nausea","Acid reflux","Constipation","Diarrhea","Loss of appetite","Cramping","Gas"]},
  {id:"neuro",icon:"⚡",name:"Neurological",desc:"Headache, migraine, nerve",color:"var(--accent)",cls:"c-neuro",symptoms:["Headache","Migraine","Numbness","Tingling","Blurred vision","Memory issues","Balance problems","Tremors","Seizure aura"]},
  {id:"musculo",icon:"🦴",name:"Musculoskeletal",desc:"Pain, mobility, injury",color:"var(--teal)",cls:"c-musculo",symptoms:["Back pain","Neck pain","Knee pain","Muscle spasm","Weakness","Limited range","Tenderness","Swelling","Sports injury"]},
  {id:"recovery",icon:"🩹",name:"Recovery",desc:"Post-surgery, rehab",color:"var(--text2)",cls:"c-recovery",symptoms:["Wound pain","Swelling","Limited mobility","Fatigue","Medication side effect","Infection signs","Sleep disruption"]},
];

const ALL_SYMPTOMS = [...new Set(CONDITION_CATS.flatMap(c=>c.symptoms))].sort();

const BODY_PARTS_DEF = [
  {id:"head",label:"Head",shape:"circle",cx:100,cy:28,r:20},
  {id:"neck",label:"Neck",shape:"rect",x:91,y:49,w:18,h:13,rx:4},
  {id:"l-shoulder",label:"L. Shoulder",shape:"rect",x:42,y:66,w:24,h:30,rx:8},
  {id:"r-shoulder",label:"R. Shoulder",shape:"rect",x:134,y:66,w:24,h:30,rx:8},
  {id:"chest",label:"Chest",shape:"rect",x:67,y:64,w:66,h:38,rx:8},
  {id:"l-arm",label:"L. Arm",shape:"rect",x:40,y:98,w:22,h:42,rx:6},
  {id:"r-arm",label:"R. Arm",shape:"rect",x:138,y:98,w:22,h:42,rx:6},
  {id:"abdomen",label:"Abdomen",shape:"rect",x:69,y:104,w:62,h:32,rx:8},
  {id:"l-hand",label:"L. Hand",shape:"rect",x:38,y:142,w:22,h:18,rx:5},
  {id:"r-hand",label:"R. Hand",shape:"rect",x:140,y:142,w:22,h:18,rx:5},
  {id:"lower-back",label:"Lower Back",shape:"rect",x:71,y:138,w:58,h:24,rx:6},
  {id:"l-hip",label:"L. Hip",shape:"rect",x:67,y:163,w:28,h:24,rx:6},
  {id:"r-hip",label:"R. Hip",shape:"rect",x:105,y:163,w:28,h:24,rx:6},
  {id:"l-thigh",label:"L. Thigh",shape:"rect",x:67,y:188,w:26,h:36,rx:6},
  {id:"r-thigh",label:"R. Thigh",shape:"rect",x:107,y:188,w:26,h:36,rx:6},
  {id:"l-knee",label:"L. Knee",shape:"rect",x:66,y:226,w:26,h:22,rx:5},
  {id:"r-knee",label:"R. Knee",shape:"rect",x:108,y:226,w:26,h:22,rx:5},
  {id:"l-shin",label:"L. Shin",shape:"rect",x:67,y:250,w:24,h:34,rx:5},
  {id:"r-shin",label:"R. Shin",shape:"rect",x:109,y:250,w:24,h:34,rx:5},
  {id:"l-foot",label:"L. Foot",shape:"rect",x:60,y:285,w:30,h:16,rx:5},
  {id:"r-foot",label:"R. Foot",shape:"rect",x:109,y:285,w:30,h:16,rx:5},
];

const LANGS = ["English","Français","Español","हिन्दी","العربية","中文","Português","বাংলা","Русский","日本語"];
const WEEK_DATA = [{d:"M",v:6},{d:"T",v:8},{d:"W",v:9},{d:"T",v:7},{d:"F",v:5},{d:"S",v:4},{d:"S",v:3}];

const PATIENTS = [
  {init:"SM",name:"Sarah Mitchell",age:34,conditions:["Arthritis","Anxiety"],last:"1h ago",sev:7,color:"var(--red-dim)",tc:"var(--red)"},
  {init:"JP",name:"James Park",age:52,conditions:["Diabetes","Hypertension"],last:"3h ago",sev:5,color:"var(--amber-dim)",tc:"var(--amber)"},
  {init:"LC",name:"Lily Chen",age:28,conditions:["Migraine","IBS"],last:"6h ago",sev:3,color:"var(--green-dim)",tc:"var(--green)"},
  {init:"MO",name:"Marcus Osei",age:61,conditions:["Post-surgery","Heart failure"],last:"30m ago",sev:8,color:"var(--red-dim)",tc:"var(--red)"},
];

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
function sevColor(v){
  if(v<=3)return{c:"var(--green)",dim:"var(--green-dim)"};
  if(v<=6)return{c:"var(--amber)",dim:"var(--amber-dim)"};
  return{c:"var(--red)",dim:"var(--red-dim)"};
}
function sevLabel(v){
  if(v===0)return"None";if(v<=2)return"Mild";if(v<=4)return"Moderate";if(v<=6)return"Significant";if(v<=8)return"Severe";return"Critical";
}
function toggle(list,setList,item){
  setList(list.includes(item)?list.filter(x=>x!==item):[...list,item]);
}

/* ─── BODY MAP ─────────────────────────────────────────── */
function BodyMap({selected,onToggle}){
  return(
    <div className="bm-wrap">
      <svg viewBox="0 0 200 308" width="150" height="231" style={{overflow:"visible"}}>
        {BODY_PARTS_DEF.map(p=>{
          const hit=selected.includes(p.id);
          const props={className:`bp${hit?" hit":""}`,onClick:()=>onToggle(p.id),key:p.id};
          if(p.shape==="circle") return <circle {...props} cx={p.cx} cy={p.cy} r={p.r}/>;
          return <rect {...props} x={p.x} y={p.y} width={p.w} height={p.h} rx={p.rx}/>;
        })}
      </svg>
    </div>
  );
}

/* ─── SEVERITY RING ─────────────────────────────────────── */
function SevRing({value,onChange}){
  const {c}=sevColor(value);
  const circ=2*Math.PI*38;
  const offset=circ-(value/10)*circ;
  return(
    <div className="sev-ring">
      <div className="ring-wrap">
        <svg className="ring-svg" width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="none" stroke="var(--bg4)" strokeWidth="8"/>
          <circle cx="50" cy="50" r="38" fill="none" stroke={c} strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{transition:"stroke-dashoffset .3s,stroke .3s"}}/>
        </svg>
        <div className="ring-num">
          <span className="ring-val" style={{color:c}}>{value}</span>
          <span className="ring-lbl">{sevLabel(value)}</span>
        </div>
      </div>
      <input type="range" min="0" max="10" value={value} onChange={e=>onChange(+e.target.value)} className="slider-track" style={{width:200}}/>
      <div className="slider-ends" style={{width:200}}><span>0 — None</span><span>10 — Critical</span></div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PATIENT — HOME
═══════════════════════════════════════════════════════════ */
function PatientHome(){
  const hour=new Date().getHours();
  const greet=hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";
  return(
    <div className="screen">
      
      <div className="page-header">
        <p style={{fontSize:".75rem",color:"var(--text3)",letterSpacing:".5px",textTransform:"uppercase"}}>
          {new Date().toLocaleDateString("en-CA",{weekday:"long",month:"short",day:"numeric"})}
        </p>
        <h1 className="page-title">{greet}, Sarah 👋</h1>
      </div>
      <div className="spacer"/>

      {/* Snapshot */}
      <div className="glow-card">
        <div className="row" style={{marginBottom:12}}>
          <div>
            <p style={{fontSize:".72rem",color:"var(--text3)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:3}}>Today's health score</p>
            <p style={{fontFamily:"Syne,sans-serif",fontSize:"2rem",fontWeight:800,color:"var(--amber)"}}>6.2 <span style={{fontSize:"1rem",color:"var(--text3)"}}>/ 10</span></p>
          </div>
          <div style={{textAlign:"right",display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
            <span className="badge badge-a">↑ Above baseline</span>
            <span className="badge badge-b">3 active conditions</span>
            <span className="badge badge-p">AI monitoring on</span>
          </div>
        </div>
        <div className="bar-chart">
          {WEEK_DATA.map((w,i)=><div key={i} className="bar" style={{height:`${w.v/10*100}%`,background:w.v>=7?"var(--red)":w.v>=4?"var(--amber)":"var(--green)",opacity:.85}}/>)}
        </div>
        <div className="bar-labels">{WEEK_DATA.map((w,i)=><div key={i} className="bar-lbl">{w.d}</div>)}</div>
      </div>

      {/* AI alert */}
      <div className="ai-box">
        <div className="ai-chip">🧠 AI Pattern Detected</div>
        <p className="ai-text">Your knee pain has been consistently above baseline for <strong style={{color:"var(--text)"}}>7 days</strong>. Combined with fatigue and sleep disruption, this pattern may indicate a flare-up requiring attention.</p>
        <ul className="ai-bullets">
          <li>Pain peaks 6–9 PM, correlates with physical activity</li>
          <li>Anxiety score elevated on high-pain days (r=0.82)</li>
          <li>Dr. Okonkwo has been automatically notified</li>
        </ul>
      </div>

      {/* Active conditions */}
      <p className="pad" style={{fontSize:".72rem",color:"var(--text3)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:8}}>Active conditions</p>
      {[
        {name:"Arthritis",cat:"Musculoskeletal",badge:"badge-a",bl:"Flare-up",sev:7,icon:"🦴"},
        {name:"Anxiety Disorder",cat:"Mental Health",badge:"badge-pk",bl:"Elevated",sev:6,icon:"🧠"},
        {name:"Amoxicillin course",cat:"Acute Infection",badge:"badge-b",bl:"Day 4 of 7",sev:3,icon:"💊"},
      ].map((c,i)=>(
        <div key={i} className="card" style={{padding:"14px 16px"}}>
          <div className="row">
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:"1.2rem"}}>{c.icon}</span>
              <div>
                <p style={{fontWeight:600,fontSize:".85rem"}}>{c.name}</p>
                <p style={{fontSize:".72rem",color:"var(--text3)"}}>{c.cat}</p>
              </div>
            </div>
            <div style={{textAlign:"right",display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
              <span className={`badge ${c.badge}`}>{c.bl}</span>
              <span style={{fontSize:".75rem",color:sevColor(c.sev).c,fontWeight:600}}>{c.sev}/10</span>
            </div>
          </div>
        </div>
      ))}

      {/* Watch */}
      <div className="pad mt">
        <div className="watch-band">
          <div className="watch-face">
            <div className="wf-num">6.2</div>
            <div className="wf-lbl">Health</div>
          </div>
          <div>
            <p style={{fontSize:".68rem",color:"var(--text3)",marginBottom:3,letterSpacing:".3px",textTransform:"uppercase"}}>Apple Watch · Connected</p>
            <p style={{fontWeight:600,fontSize:".85rem"}}>Auto-syncing health data</p>
            <p style={{fontSize:".72rem",color:"var(--text3)",marginTop:4}}>HR · SpO₂ · Activity · Sleep · ECG</p>
          </div>
          <span className="badge badge-g" style={{alignSelf:"flex-start",flexShrink:0}}>Live</span>
        </div>
      </div>

      {/* Doctor note */}
      <div className="pad mt">
        <div className="alert al-b">
          <div className="al-dot" style={{background:"var(--blue)"}}/>
          <div className="al-body">
            <div className="al-name">Dr. Okonkwo's instructions</div>
            <div className="al-msg">Return if knee pain exceeds 7/10 for 3 consecutive days. Complete antibiotic course — log symptoms for 3 days after finishing.</div>
          </div>
        </div>
      </div>
      <div style={{height:8}}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PATIENT — LOG SYMPTOMS (universal, multi-step)
═══════════════════════════════════════════════════════════ */
function LogSymptoms(){
  const [step,setStep]=useState(0);
  const [selCats,setSelCats]=useState([]);
  const [severity,setSeverity]=useState(4);
  const [bodyParts,setBodyParts]=useState([]);
  const [symptoms,setSymptoms]=useState([]);
  const [baseline,setBaseline]=useState(null);
  const [lang,setLang]=useState("English");
  const [notes,setNotes]=useState("");
  const [recording,setRecording]=useState(false);
  const [medStatus,setMedStatus]=useState(null);
  const [saved,setSaved]=useState(false);
  const [symSearch,setSymSearch]=useState("");

  const STEPS=["Category","Severity","Location","Symptoms","Notes","Medication"];

  const filteredSymptoms=selCats.length>0
    ?[...new Set(selCats.flatMap(id=>CONDITION_CATS.find(c=>c.id===id)?.symptoms||[]))]
    :ALL_SYMPTOMS.filter(s=>s.toLowerCase().includes(symSearch.toLowerCase()));

  if(saved) return(
    <div className="screen">
      <div className="success">
        <div className="success-icon">✅</div>
        <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"1.3rem",fontWeight:700}}>Entry saved!</h2>
        <p style={{color:"var(--text2)",fontSize:".83rem",maxWidth:260,lineHeight:1.6}}>Your health data has been recorded. Your doctor will be notified automatically if your pattern requires attention.</p>
        <button className="btn btn-accent" style={{marginTop:8,maxWidth:220}} onClick={()=>{setSaved(false);setStep(0);setSelCats([]);setSeverity(4);setBodyParts([]);setSymptoms([]);setBaseline(null);setNotes("");setMedStatus(null);}}>
          + Log Another Entry
        </button>
      </div>
    </div>
  );

  const stepContent=[
    /* STEP 0 — CATEGORY */
    <div key="s0">
      <div className="page-header">
        <h1 className="page-title">What's happening?</h1>
        <p className="page-sub">Select one or more health categories</p>
      </div>
      <div className="cat-grid">
        {CONDITION_CATS.map(c=>(
          <div key={c.id} className={`cat-card ${c.cls}${selCats.includes(c.id)?" sel":""}`}
            style={selCats.includes(c.id)?{borderColor:c.color,background:`rgba(${c.color==="var(--red)"?"240,82,82":c.color==="var(--pink)"?"244,114,182":c.color==="var(--amber)"?"245,158,11":c.color==="var(--blue)"?"96,165,250":c.color==="var(--green)"?"52,211,153":c.color==="var(--accent)"?"124,106,247":c.color==="var(--teal)"?"45,212,191":"160,158,181"},.1)`}:{}}
            onClick={()=>toggle(selCats,setSelCats,c.id)}>
            <div className="cat-icon">{c.icon}</div>
            <div className="cat-name">{c.name}</div>
            <div className="cat-desc">{c.desc}</div>
            {selCats.includes(c.id)&&<div style={{marginTop:6,width:18,height:18,borderRadius:"50%",background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem",color:"white",fontWeight:700}}>✓</div>}
          </div>
        ))}
      </div>
      <div className="btn-row">
        <button className="btn btn-accent" onClick={()=>setStep(1)} disabled={selCats.length===0}>
          Continue — Severity →
        </button>
      </div>
    </div>,

    /* STEP 1 — SEVERITY */
    <div key="s1">
      <div className="page-header">
        <h1 className="page-title">Severity level</h1>
        <p className="page-sub">How bad are your symptoms right now?</p>
      </div>
      <div className="card">
        <SevRing value={severity} onChange={setSeverity}/>
        <div className="divider" style={{margin:"16px 0"}}/>
        <p style={{fontSize:".78rem",color:"var(--text3)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:8}}>Compared to your usual baseline</p>
        <div style={{display:"flex",gap:8}}>
          {[{v:"worse",e:"📈",l:"Worse"},{v:"same",e:"➡️",l:"Same"},{v:"better",e:"📉",l:"Better"}].map(o=>(
            <div key={o.v} onClick={()=>setBaseline(o.v)}
              style={{flex:1,padding:"10px 6px",borderRadius:"var(--r-sm)",border:`1px solid ${baseline===o.v?"var(--accent)":"var(--border)"}`,background:baseline===o.v?"rgba(124,106,247,.12)":"var(--bg3)",textAlign:"center",cursor:"pointer",transition:"all .2s"}}>
              <div style={{fontSize:"1.2rem"}}>{o.e}</div>
              <div style={{fontSize:".75rem",fontWeight:600,color:baseline===o.v?"var(--accent2)":"var(--text2)",marginTop:3}}>{o.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="btn-row">
        <button className="btn btn-ghost btn-sm" style={{flex:"0 0 70px"}} onClick={()=>setStep(0)}>← Back</button>
        <button className="btn btn-accent" onClick={()=>setStep(2)}>Body Location →</button>
      </div>
    </div>,

    /* STEP 2 — BODY MAP */
    <div key="s2">
      <div className="page-header">
        <h1 className="page-title">Where is it?</h1>
        <p className="page-sub">Tap all affected body locations</p>
      </div>
      <div className="card">
        <BodyMap selected={bodyParts} onToggle={p=>toggle(bodyParts,setBodyParts,p)}/>
        {bodyParts.length>0&&(
          <div className="tags" style={{marginTop:12,justifyContent:"center"}}>
            {bodyParts.map(id=>{
              const bp=BODY_PARTS_DEF.find(b=>b.id===id);
              return <span key={id} className="tag sel-r">{bp?.label||id}</span>;
            })}
          </div>
        )}
        {bodyParts.length===0&&<p style={{textAlign:"center",color:"var(--text3)",fontSize:".78rem",marginTop:10}}>Tap body parts above, or skip if not applicable</p>}
      </div>
      <div className="btn-row">
        <button className="btn btn-ghost btn-sm" style={{flex:"0 0 70px"}} onClick={()=>setStep(1)}>← Back</button>
        <button className="btn btn-accent" onClick={()=>setStep(3)}>Symptoms →</button>
      </div>
    </div>,

    /* STEP 3 — SYMPTOMS */
    <div key="s3">
      <div className="page-header">
        <h1 className="page-title">Symptoms</h1>
        <p className="page-sub">Select all symptoms you're experiencing</p>
      </div>
      <div className="card">
        <input className="search-input" placeholder="🔍  Search symptoms..." value={symSearch} onChange={e=>setSymSearch(e.target.value)} style={{marginBottom:12}}/>
        <div className="tags" style={{maxHeight:220,overflowY:"auto"}}>
          {filteredSymptoms.map(s=>(
            <span key={s} className={`tag${symptoms.includes(s)?" sel":""}`} onClick={()=>toggle(symptoms,setSymptoms,s)}>{s}</span>
          ))}
        </div>
        {selCats.length>0&&(
          <p style={{fontSize:".72rem",color:"var(--text3)",marginTop:10}}>Showing symptoms for: {selCats.map(id=>CONDITION_CATS.find(c=>c.id===id)?.name).join(", ")}</p>
        )}
      </div>
      <div className="btn-row">
        <button className="btn btn-ghost btn-sm" style={{flex:"0 0 70px"}} onClick={()=>setStep(2)}>← Back</button>
        <button className="btn btn-accent" onClick={()=>setStep(4)}>Add Notes →</button>
      </div>
    </div>,

    /* STEP 4 — NOTES */
    <div key="s4">
      <div className="page-header">
        <h1 className="page-title">Describe it</h1>
        <p className="page-sub">Write or speak in your language</p>
      </div>
      <div className="card">
        <div style={{marginBottom:12}}>
          <p style={{fontSize:".72rem",color:"var(--text3)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:6}}>Language</p>
          <select className="select" value={lang} onChange={e=>setLang(e.target.value)}>
            {LANGS.map(l=><option key={l}>{l}</option>)}
          </select>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
          <textarea className="textarea" style={{flex:1}} placeholder={`Describe your symptoms in ${lang}...`} value={notes} onChange={e=>setNotes(e.target.value)}/>
          <button className={`voice-btn${recording?" rec":""}`} onClick={()=>setRecording(!recording)} title="Voice note">
            {recording?"⏹":"🎙️"}
          </button>
        </div>
        {recording&&<p style={{fontSize:".72rem",color:"var(--red)",marginTop:6}}>● Recording — speak now…</p>}
      </div>
      <div className="btn-row">
        <button className="btn btn-ghost btn-sm" style={{flex:"0 0 70px"}} onClick={()=>setStep(3)}>← Back</button>
        <button className="btn btn-accent" onClick={()=>setStep(5)}>Medication →</button>
      </div>
    </div>,

    /* STEP 5 — MEDICATION */
    <div key="s5">
      <div className="page-header">
        <h1 className="page-title">Medication</h1>
        <p className="page-sub">Are you taking anything for this?</p>
      </div>
      <div className="card">
        <p style={{fontSize:".78rem",fontWeight:600,marginBottom:10}}>Current medication status</p>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
          {["Taking as prescribed","Took extra dose","Skipped dose","Self-medicating (OTC)","No medication","Starting new medication"].map(o=>(
            <div key={o} onClick={()=>setMedStatus(o)}
              style={{padding:"11px 14px",borderRadius:"var(--r-sm)",border:`1px solid ${medStatus===o?"var(--accent)":"var(--border)"}`,background:medStatus===o?"rgba(124,106,247,.1)":"var(--bg3)",cursor:"pointer",fontSize:".83rem",fontWeight:medStatus===o?600:400,color:medStatus===o?"var(--accent2)":"var(--text2)",transition:"all .15s"}}>
              {medStatus===o?"✓ ":""}{o}
            </div>
          ))}
        </div>
        <textarea className="textarea" placeholder="Optional: note side effects, dosage changes, or medication observations..." style={{minHeight:64}}/>
      </div>
      <div className="btn-row">
        <button className="btn btn-ghost btn-sm" style={{flex:"0 0 70px"}} onClick={()=>setStep(4)}>← Back</button>
        <button className="btn btn-accent" onClick={()=>setSaved(true)}>💾 Save Entry</button>
      </div>
    </div>,
  ];

  return(
    <div className="screen">
      {/* Progress bar */}
      <div style={{padding:"14px 18px 0",display:"flex",gap:5}}>
        {STEPS.map((_,i)=>(
          <div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=step?"var(--accent)":"var(--bg4)",transition:"background .3s"}}/>
        ))}
      </div>
      <div style={{padding:"6px 18px 0",display:"flex",gap:5}}>
        {STEPS.map((s,i)=>(
          <div key={i} style={{flex:1,fontSize:".6rem",color:i===step?"var(--accent2)":"var(--text3)",fontWeight:i===step?700:400,textAlign:"center",letterSpacing:".3px",textTransform:"uppercase"}}>{s}</div>
        ))}
      </div>
      {stepContent[step]}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PATIENT — HISTORY
═══════════════════════════════════════════════════════════ */
function PatientHistory(){
  const ENTRIES=[
    {time:"Today, 2:30 PM",sev:7,cats:["Musculoskeletal","Mental Health"],parts:["R. Knee","Chest"],syms:["Joint pain","Anxiety","Fatigue"],base:"worse",note:"Knee swelling after morning walk. Anxiety spiked in afternoon.",meds:"As prescribed"},
    {time:"Today, 9:00 AM",sev:4,cats:["Musculoskeletal"],parts:["R. Knee"],syms:["Stiffness"],base:"same",note:"Morning stiffness, resolved after 20 minutes.",meds:"Skipped"},
    {time:"Yesterday, 8:45 PM",sev:9,cats:["Musculoskeletal","Cardiovascular"],parts:["R. Knee","Chest","L. Hip"],syms:["Joint pain","Chest pain","Fatigue","Nausea"],base:"worse",note:"Worst episode this week. Chest tightness alarming — took extra ibuprofen.",meds:"Extra dose"},
    {time:"Mar 19, 7:00 PM",sev:5,cats:["Mental Health"],parts:["Head"],syms:["Headache","Anxiety","Insomnia"],base:"same",note:"Stress-induced headache. Couldn't sleep well.",meds:"None"},
    {time:"Mar 18, 12:00 PM",sev:3,cats:["Acute"],parts:["Chest"],syms:["Cough","Sore throat"],base:"better",note:"Cold symptoms improving.",meds:"As prescribed"},
  ];
  return(
    <div className="screen">
      <div className="page-header">
        <h1 className="page-title">Health History</h1>
        <p className="page-sub">All logged entries, conditions & patterns</p>
      </div>
      <div className="stats-row">
        {[
          {n:"6.1",l:"7-day avg severity",ch:"↑ +2.0 vs last week",bad:true},
          {n:"18",l:"Entries this month",ch:"Good consistency",bad:false},
          {n:"4",l:"Flare-ups detected",ch:"AI monitoring",bad:false},
          {n:"3",l:"Active conditions",ch:"Being tracked",bad:false},
        ].map((s,i)=>(
          <div key={i} className="stat-box">
            <div className="stat-num">{s.n}</div>
            <div className="stat-lbl">{s.l}</div>
            <div className="stat-change" style={{color:s.bad?"var(--red)":"var(--green)"}}>{s.ch}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-hd" style={{marginBottom:14}}>Entry timeline</div>
        <div className="tl">
          {ENTRIES.map((e,i)=>(
            <div key={i} className="tl-row">
              <div className="tl-spine">
                <div className="tl-dot" style={{background:sevColor(e.sev).c}}/>
                {i<ENTRIES.length-1&&<div className="tl-line"/>}
              </div>
              <div className="tl-body">
                <div className="tl-time">{e.time}</div>
                <div className="tl-title" style={{color:sevColor(e.sev).c}}>Severity {e.sev}/10 · {sevLabel(e.sev)}</div>
                <div className="tl-desc">
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,margin:"4px 0"}}>
                    {e.cats.map(c=><span key={c} className="badge badge-p">{c}</span>)}
                    {e.parts.map(p=><span key={p} className="badge badge-r">{p}</span>)}
                  </div>
                  {e.syms.join(" · ")}
                  {e.note&&<><br/><em style={{color:"var(--text3)",fontSize:".73rem"}}>{e.note}</em></>}
                  <div style={{marginTop:5,display:"flex",gap:5,alignItems:"center"}}>
                    <span className="badge badge-b">💊 {e.meds}</span>
                    <span className={`badge ${e.base==="worse"?"badge-r":e.base==="better"?"badge-g":"badge-a"}`}>
                      {e.base==="worse"?"↑ Worse":e.base==="better"?"↓ Better":"→ Same"} than baseline
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PATIENT — MEDICATIONS & REMINDERS
═══════════════════════════════════════════════════════════ */
function PatientMeds(){
  return(
    <div className="screen">
      <div className="page-header">
        <h1 className="page-title">Medications</h1>
        <p className="page-sub">Tracker, reminders & treatment plans</p>
      </div>
      <div className="card">
        <div className="card-hd">Current medications</div>
        <div className="card-sub">Today · {new Date().toLocaleDateString("en-CA",{month:"short",day:"numeric"})}</div>
        {[
          {icon:"💊",name:"Ibuprofen",dose:"400mg · Twice daily · For arthritis",status:"Taken ✓",ok:true,col:"var(--green)"},
          {icon:"💊",name:"Amoxicillin",dose:"500mg · Three times daily · Infection",status:"Due in 1h",ok:false,col:"var(--amber)"},
          {icon:"🫁",name:"Salbutamol inhaler",dose:"100mcg · As needed · Asthma",status:"Not needed today",ok:true,col:"var(--blue)"},
          {icon:"🧪",name:"Sertraline",dose:"50mg · Once daily · Anxiety",status:"Taken ✓",ok:true,col:"var(--green)"},
        ].map((m,i)=>(
          <div key={i} className="med-row">
            <div className="med-icon" style={{background:m.ok?"var(--green-dim)":"var(--amber-dim)"}}>{m.icon}</div>
            <div className="med-info">
              <div className="med-name">{m.name}</div>
              <div className="med-dose">{m.dose}</div>
              <div style={{fontSize:".72rem",color:m.col,fontWeight:600,marginTop:3}}>{m.status}</div>
            </div>
            <span className={`badge ${m.ok?"badge-g":"badge-a"}`}>{m.ok?"Done":"Pending"}</span>
          </div>
        ))}
      </div>

      {/* Antibiotic tracker */}
      <div className="card">
        <div className="card-hd">Antibiotic course</div>
        <div className="card-sub">Amoxicillin · 7-day course · Started Mar 18</div>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[1,2,3,4,5,6,7].map(d=>(
            <div key={d} style={{flex:1,height:34,borderRadius:6,background:d<=4?"var(--green-dim)":d===5?"var(--amber-dim)":"var(--bg4)",border:`1px solid ${d<=4?"rgba(52,211,153,.3)":d===5?"rgba(245,158,11,.3)":"var(--border)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".75rem",fontWeight:700,color:d<=4?"var(--green)":d===5?"var(--amber)":"var(--text3)"}}>
              {d<=4?"✓":d===5?"→":d}
            </div>
          ))}
        </div>
        <div className="alert al-b">
          <div className="al-dot" style={{background:"var(--blue)"}}/>
          <div className="al-body">
            <div className="al-name">Doctor's instruction</div>
            <div className="al-msg">After completing the course, log symptoms daily for 3 more days to confirm full recovery.</div>
          </div>
        </div>
      </div>

      {/* Reminders */}
      <div className="card">
        <div className="card-hd">Daily reminders</div>
        <div className="card-sub">Customise when you get notified</div>
        {[
          {name:"Morning symptom log",time:"9:00 AM",on:true},
          {name:"Midday medication",time:"12:00 PM",on:true},
          {name:"Evening symptom log",time:"8:00 PM",on:true},
          {name:"Bedtime mood check",time:"10:00 PM",on:false},
          {name:"Weekly doctor summary",time:"Mondays 9 AM",on:true},
          {name:"Apple Watch sync",time:"Every hour",on:true},
        ].map((r,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 0",borderBottom:i<5?"1px solid var(--border)":"none"}}>
            <div>
              <div style={{fontWeight:600,fontSize:".83rem"}}>{r.name}</div>
              <div style={{fontSize:".72rem",color:"var(--text3)",marginTop:2}}>{r.time}</div>
            </div>
            <label className="tog">
              <input type="checkbox" defaultChecked={r.on}/>
              <span className="tog-sl"/>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DOCTOR — DASHBOARD
═══════════════════════════════════════════════════════════ */
function DoctorDashboard(){
  const [loading,setLoading]=useState(false);
  const [insight,setInsight]=useState(null);
  const [selPatient,setSelPatient]=useState(null);

  const runAI=async(patient)=>{
    setSelPatient(patient.name);
    setLoading(true);setInsight(null);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:900,
          messages:[{role:"user",content:`You are a clinical AI assistant. Analyze this patient:

Patient: ${patient.name}, ${patient.age}
Conditions: ${patient.conditions.join(", ")}
Recent severity (7 days): varied between 3-9/10
Last entry: ${patient.last}

Provide a clinical assessment. Respond ONLY with valid JSON (no markdown, no code fences):
{"summary":"2-3 sentence clinical assessment","patterns":["pattern 1","pattern 2","pattern 3"],"urgency":"low|moderate|high","action":"recommended clinical action","followup":"specific patient follow-up instruction"}`}]
        })
      });
      const data=await res.json();
      const raw=data.content?.find(b=>b.type==="text")?.text||"{}";
      setInsight(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    }catch{
      setInsight({summary:"AI analysis unavailable. Please review manually.",patterns:["Check recent logs","Review medication adherence","Schedule follow-up"],urgency:"moderate",action:"Manual review required.",followup:"Contact patient within 24 hours."});
    }
    setLoading(false);
  };

  return(
    <div className="screen">
      <div className="page-header">
        <h1 className="page-title">Doctor Dashboard</h1>
        <p className="page-sub">Real-time patient health monitoring</p>
      </div>
      <div className="stats-row">
        {[
          {n:"4",l:"Active patients",ch:"All monitored"},
          {n:"3",l:"Alerts today",ch:"1 urgent"},
          {n:"2",l:"Reports ready",ch:"Review needed"},
          {n:"8",l:"Entries today",ch:"Across all patients"},
        ].map((s,i)=>(
          <div key={i} className="stat-box">
            <div className="stat-num">{s.n}</div>
            <div className="stat-lbl">{s.l}</div>
            <div className="stat-change" style={{color:"var(--text3)"}}>{s.ch}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="card" style={{padding:"16px 16px 8px"}}>
        <div className="card-hd" style={{marginBottom:12}}>Active alerts</div>
        {[
          {name:"Marcus Osei",msg:"Post-surgery vitals flagged — pain 8/10 for 2 days. Possible wound complication.",type:"u"},
          {name:"Sarah Mitchell",msg:"Arthritis flare-up detected — 7-day pattern above baseline. Review meds.",type:"u"},
          {name:"James Park",msg:"Diabetes — blood sugar logs irregular. Medication adherence dropped.",type:"w"},
          {name:"Lily Chen",msg:"Migraine frequency decreasing. Treatment responding well.",type:"g"},
        ].map((a,i)=>(
          <div key={i} className={`alert al-${a.type}`}>
            <div className="al-dot" style={{background:a.type==="u"?"var(--red)":a.type==="w"?"var(--amber)":"var(--green)"}}/>
            <div className="al-body">
              <div className="al-name">{a.name}</div>
              <div className="al-msg">{a.msg}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Patient list with AI */}
      <div className="card" style={{padding:"16px 16px 8px"}}>
        <div className="card-hd" style={{marginBottom:12}}>Patients · Click for AI analysis</div>
        {PATIENTS.map((p,i)=>(
          <div key={i} className="patient-row">
            <div className="avatar" style={{background:p.color,color:p.tc}}>{p.init}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:".85rem"}}>{p.name}</div>
              <div style={{fontSize:".72rem",color:"var(--text3)",marginTop:1}}>{p.conditions.join(" · ")} · {p.age}y</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
              <span style={{fontSize:".72rem",color:"var(--text3)"}}>{p.last}</span>
              <span style={{fontSize:".75rem",fontWeight:700,color:sevColor(p.sev).c}}>{p.sev}/10</span>
            </div>
            <button className="btn btn-ghost btn-sm" style={{width:"auto",marginLeft:6,padding:"6px 10px",fontSize:".72rem"}} onClick={()=>runAI(p)}>
              🧠
            </button>
          </div>
        ))}
      </div>

      {/* AI insight result */}
      {(loading||insight)&&(
        <div className="ai-box">
          <div className="ai-chip">🧠 AI · {selPatient}</div>
          {loading&&<div className="loading"><div className="spinner"/>Generating clinical AI assessment…</div>}
          {insight&&!loading&&(
            <>
              <p className="ai-text">{insight.summary}</p>
              {insight.patterns?.length>0&&(
                <ul className="ai-bullets">
                  {insight.patterns.map((p,i)=><li key={i}>{p}</li>)}
                </ul>
              )}
              <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
                {insight.action&&(
                  <div style={{padding:"10px 12px",background:"rgba(37,99,235,.05)",borderRadius:"var(--r-sm)",borderLeft:"3px solid var(--accent)"}}>
                    <p style={{fontSize:".68rem",color:"var(--text3)",marginBottom:3,textTransform:"uppercase",letterSpacing:".5px"}}>Recommended action</p>
                    <p style={{fontSize:".82rem",color:"var(--text)"}}>{insight.action}</p>
                  </div>
                )}
                {insight.followup&&(
                  <div style={{padding:"10px 12px",background:"rgba(220,38,38,.08)",borderRadius:"var(--r-sm)",borderLeft:"3px solid var(--red)"}}>
                    <p style={{fontSize:".68rem",color:"rgba(240,82,82,.7)",marginBottom:3,textTransform:"uppercase",letterSpacing:".5px"}}>Patient follow-up</p>
                    <p style={{fontSize:".82rem",color:"var(--text)"}}>{insight.followup}</p>
                  </div>
                )}
                <span className={`badge ${insight.urgency==="high"?"badge-r":insight.urgency==="moderate"?"badge-a":"badge-g"}`} style={{alignSelf:"flex-start"}}>
                  Urgency: {insight.urgency}
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Share */}
      <div className="card">
        <div className="card-hd">Share patient data</div>
        <div className="card-sub">Forward to another physician or specialist</div>
        <div className="tags" style={{marginBottom:12}}>
          {["Dr. Patel · Ortho","Dr. Kim · Rheum","Dr. Singh · GP","Dr. Chu · Psych"].map(d=>(
            <span key={d} className="tag">{d}</span>
          ))}
        </div>
        <button className="btn btn-ghost">📤 Share Full Patient Report</button>
      </div>
      <div style={{height:8}}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DOCTOR — NOTES
═══════════════════════════════════════════════════════════ */
function DoctorNotes(){
  const [note,setNote]=useState("");
  const [notes,setNotes]=useState([
    {date:"Mar 21",patient:"Sarah M.",text:"Arthritis flare — continue Ibuprofen. Return if pain >7 for 3+ days."},
    {date:"Mar 20",patient:"Marcus O.",text:"Post-op day 3 — wound healing normally. Monitor temp and mobility."},
    {date:"Mar 18",patient:"James P.",text:"Started insulin adjustment. Blood sugar targets: 5–8 mmol/L fasting."},
    {date:"Mar 17",patient:"Lily C.",text:"Migraine frequency improving with Topiramate. Review in 4 weeks."},
  ]);
  return(
    <div className="screen">
      <div className="page-header">
        <h1 className="page-title">Clinical Notes</h1>
        <p className="page-sub">Patient instructions & observations</p>
      </div>
      <div className="card">
        <div className="card-hd">Add note</div>
        <div className="card-sub">Instructions sync to patient's app immediately</div>
        <select className="select" style={{marginBottom:10}}>
          {PATIENTS.map(p=><option key={p.name}>{p.name}</option>)}
        </select>
        <textarea className="textarea" placeholder="Clinical note, follow-up instruction, or referral detail..." value={note} onChange={e=>setNote(e.target.value)}/>
        <div style={{display:"flex",gap:8,marginTop:10}}>
          <button className="btn btn-accent" onClick={()=>{if(note.trim()){setNotes([{date:"Today",patient:"Sarah M.",text:note},...notes]);setNote("");}}}>Save & Notify Patient</button>
          <button className="btn btn-ghost btn-sm" style={{width:"auto",flex:"0 0 auto"}}>📤</button>
        </div>
      </div>
      <div className="card" style={{padding:"16px 16px 8px"}}>
        <div className="card-hd" style={{marginBottom:12}}>Notes history</div>
        <div className="tl">
          {notes.map((n,i)=>(
            <div key={i} className="tl-row">
              <div className="tl-spine">
                <div className="tl-dot" style={{background:"var(--accent)"}}/>
                {i<notes.length-1&&<div className="tl-line"/>}
              </div>
              <div className="tl-body">
                <div className="tl-time">Dr. Okonkwo · {n.date} · <span style={{color:"var(--accent2)"}}>{n.patient}</span></div>
                <div className="tl-desc" style={{marginTop:4}}>{n.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{height:8}}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CAREGIVER
═══════════════════════════════════════════════════════════ */
function CaregiverView(){
  return(
    <div className="screen">
      <div className="page-header">
        <h1 className="page-title">Caregiver View</h1>
        <p className="page-sub">Monitoring Sarah Mitchell</p>
      </div>
      <div className="stats-row">
        {[
          {n:"6.2",l:"Avg severity (7d)",ch:"↑ Higher than last week",bad:true},
          {n:"5/7",l:"Days logged",ch:"Missed 2 days",bad:true},
          {n:"3",l:"Medications today",ch:"1 pending",bad:false},
          {n:"2",l:"Alerts this week",ch:"Doctor notified",bad:false},
        ].map((s,i)=>(
          <div key={i} className="stat-box">
            <div className="stat-num">{s.n}</div>
            <div className="stat-lbl">{s.l}</div>
            <div className="stat-change" style={{color:s.bad?"var(--red)":"var(--green)"}}>{s.ch}</div>
          </div>
        ))}
      </div>

      {/* Today snapshot */}
      <div className="glow-card">
        <div className="ai-chip">❤️ Caregiver dashboard</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[
            {l:"Last logged",v:"2 hours ago",ok:true},
            {l:"Current severity",v:"7/10 — Severe",ok:false},
            {l:"Active symptoms",v:"Joint pain · Fatigue · Anxiety",ok:false},
            {l:"Medications",v:"2 of 3 taken today",ok:false},
            {l:"Mood",v:"Low 😟",ok:false},
            {l:"Apple Watch",v:"Connected · Live sync active",ok:true},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
              <span style={{fontSize:".78rem",color:"var(--text3)"}}>{r.l}</span>
              <span style={{fontSize:".78rem",fontWeight:600,color:r.ok?"var(--green)":"var(--amber)"}}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly trend */}
      <div className="card">
        <div className="card-hd" style={{marginBottom:12}}>7-day trend</div>
        <div className="bar-chart">
          {WEEK_DATA.map((w,i)=><div key={i} className="bar" style={{height:`${w.v/10*100}%`,background:w.v>=7?"var(--red)":w.v>=4?"var(--amber)":"var(--green)",opacity:.85}}/>)}
        </div>
        <div className="bar-labels">{WEEK_DATA.map((w,i)=><div key={i} className="bar-lbl">{w.d}</div>)}</div>
      </div>

      {/* AI alert */}
      <div className="ai-box">
        <div className="ai-chip">🧠 Caregiver AI Alert</div>
        <p className="ai-text">Sarah's severity has been above 6/10 for 5 consecutive days. Her anxiety and sleep scores have worsened in parallel. Consider scheduling a doctor visit this week.</p>
        <ul className="ai-bullets">
          <li>Pain peaks in evenings — ensure she rests post-activity</li>
          <li>Missed 2 medication doses this week — set reminders</li>
          <li>Mood lowest on high-pain days — provide emotional support</li>
        </ul>
      </div>

      {/* Doctor notes for caregiver */}
      <div className="card" style={{padding:"16px 16px 8px"}}>
        <div className="card-hd" style={{marginBottom:12}}>Doctor's instructions for you</div>
        {[
          {text:"Ensure Sarah takes all 3 Amoxicillin doses daily — do not skip.",type:"u"},
          {text:"Monitor for signs of infection: increasing redness, fever >38°C, or unusual discharge.",type:"w"},
          {text:"Encourage gentle movement but avoid stairs and high-impact activity.",type:"b"},
          {text:"Return to clinic immediately if chest pain or shortness of breath occurs.",type:"u"},
        ].map((n,i)=>(
          <div key={i} className={`alert al-${n.type}`} style={{marginBottom:8}}>
            <div className="al-dot" style={{background:n.type==="u"?"var(--red)":n.type==="w"?"var(--amber)":"var(--blue)"}}/>
            <div className="al-body"><div className="al-msg" style={{fontSize:".8rem"}}>{n.text}</div></div>
          </div>
        ))}
      </div>

      {/* Emergency */}
      <div className="pad mt">
        <button className="btn btn-red" style={{borderRadius:"var(--r-sm)"}}>🚨 Alert Doctor Now</button>
      </div>
      <div style={{height:8}}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════ */
const NAV = {
  patient:[
    {id:"home",icon:"🏠",label:"Home"},
    {id:"log",icon:"✏️",label:"Log"},
    {id:"history",icon:"📊",label:"History"},
    {id:"meds",icon:"💊",label:"Meds"},
  ],
  doctor:[
    {id:"dashboard",icon:"🏥",label:"Dashboard"},
    {id:"notes",icon:"📋",label:"Notes"},
  ],
  caregiver:[
    {id:"caregiver",icon:"❤️",label:"Monitor"},
  ],
};

export default function App(){
  const [role,setRole]=useState("patient");
  const [tab,setTab]=useState("home");
  useEffect(()=>{
    const defaults={patient:"home",doctor:"dashboard",caregiver:"caregiver"};
    setTab(defaults[role]);
  },[role]);

  const renderPage=()=>{
    if(role==="patient"){
      if(tab==="home") return <PatientHome/>;
      if(tab==="log") return <LogSymptoms/>;
      if(tab==="history") return <PatientHistory/>;
      if(tab==="meds") return <PatientMeds/>;
    }
    if(role==="doctor"){
      if(tab==="dashboard") return <DoctorDashboard/>;
      if(tab==="notes") return <DoctorNotes/>;
    }
    if(role==="caregiver") return <CaregiverView/>;
    return null;
  };

  return(
    <>
      <style>{CSS}</style>
      <div className="shell">
        <div className="topbar">
          <div className="topbar-row1">
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <svg viewBox="0 0 44 44" width="40" height="40" style={{flexShrink:0}}>
                <circle cx="22" cy="22" r="21" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="1.5"/>
                <path d="M22 34 C22 34 7 25 7 15 C7 9 13 6 17 7.5 C19 8.3 21 10.5 22 13 C23 10.5 25 8.3 27 7.5 C31 6 37 9 37 15 C37 25 22 34 22 34Z" fill="#2563EB"/>
                <polyline points="9,18 13,18 17,11 20,25 22,11 24,20 27,14 29,20 32,16 35,16" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{display:"flex",flexDirection:"column",gap:2}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"1.25rem",fontWeight:800,letterSpacing:"-.5px",lineHeight:1,color:"#111827"}}>
                  Medi<span style={{color:"#2563EB"}}>Feel</span>
                </div>
                <div style={{fontSize:".7rem",color:"#9CA3AF",fontWeight:500,letterSpacing:".2px",lineHeight:1}}>
                  Because how you feel matters.
                </div>
              </div>
            </div>
            <div style={{width:36,height:36,borderRadius:"50%",background:"#EFF6FF",border:"1.5px solid #DBEAFE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".8rem",fontWeight:700,color:"#2563EB",flexShrink:0}}>S</div>
          </div>
          <div className="topbar-row2">
            <div className="role-pill">
              {["patient","doctor","caregiver"].map(r=>(
                <button key={r} className={`rp-btn${role===r?" on":""}`} onClick={()=>setRole(r)}>
                  {r==="patient"?"👤 Patient":r==="doctor"?"🏥 Doctor":"❤️ Caregiver"}
                </button>
              ))}
            </div>
          </div>
        </div>
        {renderPage()}
        <div className="tabbar">
          {NAV[role].map(t=>(
            <button key={t.id} className={`tb${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>
              <span className="tb-icon">{t.icon}</span>
              <span className="tb-label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}