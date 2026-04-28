import { useState, useRef } from "react";

const destinations = [
  { id:1, name:"Tbilisi", country:"Georgia", flag:"🇬🇪", image:"https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=85", tags:["Hidden Gem","Foodie","Historic"], score:94, trend:"rising", budget:"$", temp:"18°C", desc:"Ancient city meets modern art. Sulfur baths, wine caves & rooftop bars that never sleep.", votes:{over:12,under:341}, accent:"#E8C547", vibe:"Bohemian" },
  { id:2, name:"Chefchaouen", country:"Morocco", flag:"🇲🇦", image:"https://images.unsplash.com/photo-1553603227-2358aabe821e?w=800&q=85", tags:["Underrated","Scenic","Cultural"], score:88, trend:"rising", budget:"$", temp:"22°C", desc:"The Blue Pearl of Morocco. Every alley is a photograph waiting to happen.", votes:{over:45,under:892}, accent:"#64D2FF", vibe:"Dreamy" },
  { id:3, name:"Kyoto", country:"Japan", flag:"🇯🇵", image:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=85", tags:["Iconic","Spiritual","Foodie"], score:71, trend:"falling", budget:"$$$", temp:"15°C", desc:"Timeless temples and bamboo groves. The crowds have grown but the magic persists.", votes:{over:1240,under:320}, accent:"#FF9EAA", vibe:"Spiritual" },
  { id:4, name:"Kotor", country:"Montenegro", flag:"🇲🇪", image:"https://images.unsplash.com/photo-1555990793-da11153b6c8b?w=800&q=85", tags:["Hidden Gem","Coastal","Adventure"], score:97, trend:"rising", budget:"$$", temp:"24°C", desc:"Medieval city tucked in a dramatic Adriatic bay. Europe's best kept secret, still.", votes:{over:8,under:567}, accent:"#7EE8A2", vibe:"Coastal" },
  { id:5, name:"Medellín", country:"Colombia", flag:"🇨🇴", image:"https://images.unsplash.com/photo-1583997052103-b4a1cb974ce5?w=800&q=85", tags:["Rising","Vibrant","Foodie"], score:91, trend:"rising", budget:"$", temp:"22°C", desc:"City of eternal spring. The world's most inspiring comeback — now a creative capital.", votes:{over:89,under:1203}, accent:"#FF8C42", vibe:"Electric" },
];

const posts = [
  { id:1, user:"Maya R.", handle:"@maya.roams", avatar:"https://i.pravatar.cc/40?img=47", verified:true, local:false, location:"Tbilisi, Georgia", image:"https://images.unsplash.com/photo-1565008576549-57569a49371d?w=500&q=80", caption:"The sulfur baths at Abanotubani are genuinely life-changing. Go at 7am before the crowds hit.", likes:847, time:"2h", tag:"Tip", tagColor:"#7EE8A2" },
  { id:2, user:"Carlos M.", handle:"@carlosmede", avatar:"https://i.pravatar.cc/40?img=12", verified:false, local:true, location:"Medellín, Colombia", image:"https://images.unsplash.com/photo-1583997052103-b4a1cb974ce5?w=500&q=80", caption:"Born and raised here. El Poblado vs Laureles — totally different energies. Ask me anything.", likes:1203, time:"5h", tag:"Local", tagColor:"#E8C547" },
  { id:3, user:"Priya S.", handle:"@priya.far", avatar:"https://i.pravatar.cc/40?img=32", verified:true, local:false, location:"Kotor, Montenegro", image:"https://images.unsplash.com/photo-1555990793-da11153b6c8b?w=500&q=80", caption:"Climbed the fortress walls at sunrise. 1,355 steps. Worth every single one of them.", likes:2341, time:"1d", tag:"Adventure", tagColor:"#64D2FF" },
];

const locals = [
  { id:1, name:"Nino K.", avatar:"https://i.pravatar.cc/60?img=47", location:"Tbilisi, Georgia", flag:"🇬🇪", expertise:["Food","Nightlife","Hidden Spots"], rating:4.9, reviews:142, online:true, accent:"#E8C547" },
  { id:2, name:"Ahmad R.", avatar:"https://i.pravatar.cc/60?img=15", location:"Chefchaouen, Morocco", flag:"🇲🇦", expertise:["Culture","Food","Stays"], rating:4.8, reviews:98, online:false, accent:"#64D2FF" },
  { id:3, name:"Sofia V.", avatar:"https://i.pravatar.cc/60?img=23", location:"Kotor, Montenegro", flag:"🇲🇪", expertise:["Transport","Tours","Food"], rating:5.0, reviews:67, online:true, accent:"#7EE8A2" },
];

const initMsgs = [
  { from:"local", text:"Hey! Welcome to Tbilisi 🍷 What can I help you with?" },
  { from:"user", text:"Looking for the best khinkali — not touristy" },
  { from:"local", text:"Machakhela on Galaktion St. Locals only, cash only, no English menu. Order the pork, minimum 10. 😄" },
  { from:"user", text:"Perfect. Wine bars?" },
  { from:"local", text:"Vino Underground in the old town. Go after 9pm — natural wines in a literal cave. I'll send the pin 📍" },
];

export default function Wandr() {
  const [tab, setTab] = useState("discover");
  const [idx, setIdx] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [saved, setSaved] = useState([]);
  const [chatLocal, setChatLocal] = useState(null);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(initMsgs);
  const [liked, setLiked] = useState({});
  const [votes, setVotes] = useState({});
  const [dragX, setDragX] = useState(0);
  const drag = useRef(null);
  const messagesEnd = useRef(null);

  const card = destinations[idx];

  function swipe(dir) {
    setSwipeDir(dir);
    setDragX(dir === "right" ? 500 : -500);
    setTimeout(() => {
      if (dir === "right") setSaved(p => [...p, destinations[idx]]);
      setIdx(i => Math.min(i + 1, destinations.length));
      setSwipeDir(null);
      setDragX(0);
    }, 400);
  }

  function endDrag() {
    if (dragX > 90) swipe("right");
    else if (dragX < -90) swipe("left");
    else setDragX(0);
    drag.current = null;
  }

  function send() {
    if (!input.trim()) return;
    setMsgs(m => [...m, { from:"user", text:input }]);
    setInput("");
    setTimeout(() => {
      setMsgs(m => [...m, { from:"local", text:"Great choice! I'll send more suggestions shortly ✨" }]);
    }, 800);
  }

  const rot = (dragX / 120) * 9;
  const likeO = Math.min(1, Math.max(0, dragX / 90));
  const nopeO = Math.min(1, Math.max(0, -dragX / 90));

  const TABS = [
    { id:"discover", label:"Discover", icon:"⊕" },
    { id:"feed",     label:"Feed",     icon:"⊞" },
    { id:"locals",   label:"Locals",   icon:"⊛" },
    { id:"saved",    label:"Saved",    icon:"⊘" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#0C0C0E", color:"#EEE8DC", fontFamily:"'Cormorant Garamond','Georgia',serif", maxWidth:430, margin:"0 auto", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{display:none;}
        body{background:#0C0C0E;}

        .card{transition:transform 0.4s cubic-bezier(0.25,1.4,0.5,1),opacity 0.4s;cursor:grab;touch-action:pan-y;}
        .card:active{cursor:grabbing;}
        .gone-l{transform:translateX(-120vw) rotate(-20deg)!important;opacity:0!important;}
        .gone-r{transform:translateX(120vw) rotate(20deg)!important;opacity:0!important;}

        .x{border:none;background:none;cursor:pointer;transition:transform 0.12s,opacity 0.12s;font-family:inherit;}
        .x:active{transform:scale(0.88)!important;}

        .tag{font-family:'Outfit',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:4px;}

        .vote{font-family:'Outfit',sans-serif;font-size:11px;font-weight:500;border:none;cursor:pointer;padding:7px 16px;border-radius:6px;transition:all 0.18s;letter-spacing:0.04em;}
        .vote:active{transform:scale(0.93);}

        .tabx{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 14px;transition:all 0.2s;font-family:'Outfit',sans-serif;}

        .local-row{background:#141418;border:1px solid #1E1E26;border-radius:16px;padding:14px 16px;margin-bottom:12px;display:flex;gap:14px;align-items:center;cursor:pointer;transition:all 0.16s;}
        .local-row:active{transform:scale(0.98);}

        .stamp{position:absolute;top:32px;padding:6px 14px;border-radius:6px;font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;border:3.5px solid;transition:opacity 0.12s;}

        .chat-bubble{animation:pop 0.22s cubic-bezier(0.34,1.56,0.64,1);}
        @keyframes pop{from{opacity:0;transform:scale(0.85) translateY(8px);}to{opacity:1;transform:scale(1) translateY(0);}}

        .glow-ring{box-shadow:0 0 0 3px rgba(var(--rc),0.18),0 0 18px rgba(var(--rc),0.1);}

        .shine::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 60%);border-radius:inherit;pointer-events:none;}

        .score-chip{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:50px;height:50px;border-radius:10px;border:1.5px solid;}
      `}</style>

      {/* ─── HEADER ─── */}
      <div style={{ padding:"20px 22px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #18181E" }}>
        <div>
          <div style={{ fontSize:30, fontWeight:300, letterSpacing:"-0.5px", lineHeight:1, fontStyle:"italic" }}>
            <span style={{ color:"#EEE8DC" }}>W</span><span style={{ color:"#EEE8DC" }}>andr</span>
            <span style={{ fontSize:12, fontStyle:"normal", fontFamily:"'Outfit',sans-serif", color:"#E8C547", fontWeight:600, marginLeft:4, letterSpacing:2, verticalAlign:"middle" }}>✦</span>
          </div>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:9, color:"#3A3A44", letterSpacing:3, textTransform:"uppercase", marginTop:3 }}>discover differently</div>
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          {/* Wandr score widget */}
          <div style={{ background:"#111116", border:"1px solid #1E1E26", borderRadius:12, padding:"6px 14px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:600, color:"#E8C547", lineHeight:1 }}>2.4k</div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:8, color:"#3A3A44", letterSpacing:2, textTransform:"uppercase", marginTop:2 }}>Wandr pts</div>
          </div>
          <div style={{ position:"relative" }}>
            <img src="https://i.pravatar.cc/36?img=5" alt="me" style={{ width:36, height:36, borderRadius:"50%", border:"1.5px solid #E8C547", display:"block" }} />
            <div style={{ position:"absolute", bottom:0, right:0, width:10, height:10, borderRadius:"50%", background:"#7EE8A2", border:"2px solid #0C0C0E" }} />
          </div>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{ height:"calc(100vh - 128px)", overflowY:"auto", padding:"0 0 12px" }}>

        {/* ══════ DISCOVER ══════ */}
        {tab === "discover" && (
          <div style={{ padding:"14px 18px 0" }}>
            {idx < destinations.length ? (<>

              {/* Progress dots */}
              <div style={{ display:"flex", gap:5, marginBottom:14, justifyContent:"center" }}>
                {destinations.map((_,i) => (
                  <div key={i} style={{ height:3, width: i===idx ? 22 : 6, borderRadius:2, background: i<idx ? "#7EE8A2" : i===idx ? "#E8C547" : "#1E1E26", transition:"all 0.35s" }} />
                ))}
              </div>

              {/* ── CARD ── */}
              <div
                className={`card${swipeDir==="left"?" gone-l":swipeDir==="right"?" gone-r":""}`}
                style={{ transform:`translateX(${dragX}px) rotate(${rot}deg)`, position:"relative", borderRadius:22, overflow:"hidden", height:472, marginBottom:20, border:"1px solid #1E1E26" }}
                onMouseDown={e=>{drag.current=e.clientX;}}
                onMouseMove={e=>{if(drag.current!==null)setDragX(e.clientX-drag.current);}}
                onMouseUp={endDrag} onMouseLeave={endDrag}
                onTouchStart={e=>{drag.current=e.touches[0].clientX;}}
                onTouchMove={e=>{if(drag.current!==null)setDragX(e.touches[0].clientX-drag.current);}}
                onTouchEnd={endDrag}
              >
                <img src={card.image} draggable={false} alt={card.name} style={{ width:"100%", height:"100%", objectFit:"cover", pointerEvents:"none", display:"block" }} onError={e=>e.target.src=`https://picsum.photos/seed/${card.id*11}/800/472`} />
                
                {/* Gradient layers */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(8,8,12,0.98) 0%, rgba(8,8,12,0.45) 45%, transparent 75%)" }} />
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(160deg, ${card.accent}0D 0%, transparent 50%)` }} />

                {/* Swipe stamps */}
                <div className="stamp" style={{ left:22, color:"#7EE8A2", borderColor:"#7EE8A2", opacity:likeO, transform:`rotate(-18deg)` }}>Save</div>
                <div className="stamp" style={{ right:22, color:"#FF6B8A", borderColor:"#FF6B8A", opacity:nopeO, transform:`rotate(18deg)` }}>Pass</div>

                {/* Top chips */}
                <div style={{ position:"absolute", top:16, left:16, right:16, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ display:"flex", gap:6 }}>
                    <span style={{ background:"rgba(10,10,14,0.65)", backdropFilter:"blur(12px)", borderRadius:6, padding:"5px 12px", fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:600, color:"#EEE8DC", border:"1px solid rgba(255,255,255,0.08)" }}>{card.budget}</span>
                    <span style={{ background:"rgba(10,10,14,0.65)", backdropFilter:"blur(12px)", borderRadius:6, padding:"5px 12px", fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#AAA49C", border:"1px solid rgba(255,255,255,0.06)" }}>{card.temp}</span>
                  </div>
                  {/* Score chip */}
                  <div className="score-chip" style={{ background:"rgba(10,10,14,0.7)", backdropFilter:"blur(12px)", borderColor: card.score>85 ? "#7EE8A280" : card.score>70 ? "#E8C54780" : "#FF6B8A80" }}>
                    <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:700, color: card.score>85 ? "#7EE8A2" : card.score>70 ? "#E8C547" : "#FF6B8A", lineHeight:1 }}>{card.score}</div>
                    <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:7, color:"#44444E", letterSpacing:1.5, marginTop:2, textTransform:"uppercase" }}>score</div>
                  </div>
                </div>

                {/* Bottom content */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 20px 16px" }}>
                  {card.trend === "rising" && (
                    <div style={{ marginBottom:10 }}>
                      <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, fontWeight:600, color:"#E8C547", letterSpacing:2, textTransform:"uppercase", borderBottom:"1px solid #E8C54740" }}>↑ Rising Gem</span>
                    </div>
                  )}

                  <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:6 }}>
                    <div>
                      <div style={{ fontSize:42, fontWeight:300, letterSpacing:"-1.5px", lineHeight:0.95, fontStyle:"italic" }}>{card.name}</div>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#66606A", marginTop:5, letterSpacing:0.5 }}>{card.flag} {card.country}</div>
                    </div>
                    <div style={{ background:"#111116", border:`1px solid ${card.accent}30`, borderRadius:10, padding:"7px 10px", textAlign:"center", flexShrink:0, marginLeft:12 }}>
                      <div style={{ fontSize:16, lineHeight:1 }}>
                        {card.vibe === "Bohemian" ? "🍷" : card.vibe === "Dreamy" ? "🎨" : card.vibe === "Spiritual" ? "🌸" : card.vibe === "Coastal" ? "⛵" : "⚡"}
                      </div>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:8, color:card.accent, letterSpacing:1.5, textTransform:"uppercase", marginTop:4 }}>{card.vibe}</div>
                    </div>
                  </div>

                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#88828C", marginBottom:12, lineHeight:1.65, fontWeight:300 }}>{card.desc}</div>

                  <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:13 }}>
                    {card.tags.map(t => (
                      <span key={t} className="tag" style={{ background:"rgba(255,255,255,0.04)", color:"#88828C", border:"1px solid rgba(255,255,255,0.07)" }}>{t}</span>
                    ))}
                  </div>

                  {/* Vote row */}
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <button className="vote" onClick={()=>setVotes(v=>({...v,[card.id]:"over"}))} style={{ background: votes[card.id]==="over" ? "#FF6B8A" : "rgba(255,107,138,0.08)", color: votes[card.id]==="over" ? "#fff" : "#FF6B8A", border:"1px solid rgba(255,107,138,0.25)" }}>
                      Overrated
                    </button>
                    <button className="vote" onClick={()=>setVotes(v=>({...v,[card.id]:"under"}))} style={{ background: votes[card.id]==="under" ? "#7EE8A2" : "rgba(126,232,162,0.07)", color: votes[card.id]==="under" ? "#0C0C0E" : "#7EE8A2", border:"1px solid rgba(126,232,162,0.22)" }}>
                      Hidden Gem
                    </button>
                    <span style={{ marginLeft:"auto", fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#3A3A44" }}>{card.votes.under} gems</span>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20 }}>
                <button className="x" onClick={()=>swipe("left")} style={{ width:56, height:56, borderRadius:"50%", background:"#111116", border:"1px solid #2A2A34", fontSize:16, color:"#FF6B8A", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
                <button className="x shine" onClick={()=>swipe("right")} style={{ position:"relative", width:72, height:72, borderRadius:"50%", background:"#E8C547", border:"none", fontSize:26, color:"#0C0C0E", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 0 8px rgba(232,197,71,0.1), 0 8px 28px rgba(232,197,71,0.2)" }}>♡</button>
                <button className="x" onClick={()=>setTab("locals")} style={{ width:56, height:56, borderRadius:"50%", background:"#111116", border:"1px solid #2A2A34", fontSize:14, color:"#7EE8A2", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif" }}>◉</button>
              </div>
              <div style={{ textAlign:"center", marginTop:10, fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#2A2A34", letterSpacing:2, textTransform:"uppercase" }}>drag · or tap · to explore</div>

            </>) : (
              <div style={{ textAlign:"center", padding:"64px 24px" }}>
                <div style={{ fontSize:14, fontFamily:"'Outfit',sans-serif", color:"#3A3A44", letterSpacing:3, textTransform:"uppercase", marginBottom:24 }}>You've seen them all</div>
                <div style={{ fontSize:48, fontWeight:300, letterSpacing:"-2px", fontStyle:"italic", marginBottom:8 }}>{saved.length} saved</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#3A3A44", marginBottom:32 }}>destinations waiting for you</div>
                <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                  <button className="x" onClick={()=>{setIdx(0);setSaved([]);}} style={{ background:"#E8C547", borderRadius:10, padding:"12px 24px", fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:600, color:"#0C0C0E" }}>Start Over</button>
                  <button className="x" onClick={()=>setTab("saved")} style={{ background:"#111116", border:"1px solid #2A2A34", borderRadius:10, padding:"12px 24px", fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#EEE8DC" }}>View Saved</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════ FEED ══════ */}
        {tab === "feed" && (
          <div style={{ padding:"14px 0 0" }}>
            {/* Stories strip */}
            <div style={{ display:"flex", gap:16, overflowX:"auto", padding:"0 18px 16px", borderBottom:"1px solid #16161C" }}>
              {[...locals,{id:99,name:"You",avatar:"https://i.pravatar.cc/50?img=5",accent:"#E8C547"}].map(l=>(
                <div key={l.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, minWidth:48 }}>
                  <div style={{ width:50, height:50, borderRadius:"50%", padding:2, background:`conic-gradient(${l.accent} 0%, ${l.accent} 65%, #1E1E26 65%)` }}>
                    <img src={l.avatar} alt="" style={{ width:"100%", height:"100%", borderRadius:"50%", border:"2.5px solid #0C0C0E", display:"block" }} />
                  </div>
                  <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#44444E", maxWidth:48, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>

            <div style={{ padding:"0 18px" }}>
              {posts.map(p=>(
                <div key={p.id} style={{ background:"#111116", borderRadius:18, marginTop:16, overflow:"hidden", border:"1px solid #1A1A22" }}>
                  {/* Post header */}
                  <div style={{ padding:"12px 14px", display:"flex", gap:10, alignItems:"center" }}>
                    <img src={p.avatar} alt="" style={{ width:36, height:36, borderRadius:"50%", border:`1.5px solid ${p.local?"#E8C547":"#1E1E26"}`, flexShrink:0 }} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <span style={{ fontWeight:500, fontSize:15 }}>{p.user}</span>
                        {p.verified && <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:9, color:"#7EE8A2", letterSpacing:1, textTransform:"uppercase" }}>✓ visited</span>}
                        {p.local && <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:9, background:"#E8C54718", color:"#E8C547", borderRadius:4, padding:"2px 7px", letterSpacing:1, textTransform:"uppercase" }}>local</span>}
                      </div>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#44444E", marginTop:1 }}>📍 {p.location} · {p.time} ago</div>
                    </div>
                    <span className="tag" style={{ background:`${p.tagColor}14`, color:p.tagColor, border:`1px solid ${p.tagColor}28`, flexShrink:0 }}>{p.tag}</span>
                  </div>
                  <img src={p.image} alt="" style={{ width:"100%", height:200, objectFit:"cover", display:"block" }} onError={e=>e.target.src=`https://picsum.photos/seed/${p.id+60}/500/200`} />
                  <div style={{ padding:"10px 14px 12px" }}>
                    <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#AAA49C", lineHeight:1.65, marginBottom:12, fontWeight:300 }}>{p.caption}</div>
                    <div style={{ display:"flex", gap:18, alignItems:"center" }}>
                      <button className="x" onClick={()=>setLiked(l=>({...l,[p.id]:!l[p.id]}))} style={{ display:"flex", alignItems:"center", gap:6, padding:0 }}>
                        <span style={{ fontSize:18, color:liked[p.id]?"#FF6B8A":"#2A2A34" }}>{liked[p.id]?"♥":"♡"}</span>
                        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#44444E" }}>{p.likes+(liked[p.id]?1:0)}</span>
                      </button>
                      <button className="x" style={{ display:"flex", alignItems:"center", gap:6, padding:0 }}>
                        <span style={{ fontSize:15, color:"#2A2A34" }}>💬</span>
                        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#44444E" }}>Reply</span>
                      </button>
                      <button className="x" style={{ marginLeft:"auto", padding:0 }}>
                        <span style={{ fontSize:16, color:"#2A2A34" }}>⤴</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ LOCALS ══════ */}
        {tab === "locals" && !chatLocal && (
          <div style={{ padding:"14px 18px 0" }}>
            {/* Premium banner */}
            <div style={{ background:"#111116", border:"1px solid #E8C54722", borderRadius:16, padding:"16px 18px", marginBottom:22, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, borderRadius:"50%", background:"#E8C54709" }} />
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#E8C547", letterSpacing:2.5, textTransform:"uppercase", marginBottom:6 }}>✦ Premium Feature</div>
              <div style={{ fontSize:20, fontWeight:400, letterSpacing:"-0.5px", marginBottom:4, fontStyle:"italic" }}>Chat with Locals</div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#44444E", lineHeight:1.6, fontWeight:300 }}>Real residents. Real tips. No algorithm, no filter.</div>
            </div>

            {/* Online indicator */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#7EE8A2" }} />
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#7EE8A2", letterSpacing:2, textTransform:"uppercase" }}>Online now</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#2A2A34" }}>· {locals.filter(l=>l.online).length} available</span>
            </div>

            {locals.map(l=>(
              <div key={l.id} className="local-row" onClick={()=>setChatLocal(l)}>
                <div style={{ position:"relative", flexShrink:0 }}>
                  <img src={l.avatar} alt={l.name} style={{ width:52, height:52, borderRadius:"50%", border:`2px solid ${l.accent}`, display:"block" }} />
                  {l.online && <div style={{ position:"absolute", bottom:1, right:1, width:12, height:12, borderRadius:"50%", background:"#7EE8A2", border:"2px solid #141418" }} />}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:3 }}>
                    <span style={{ fontSize:17, fontWeight:400, fontStyle:"italic" }}>{l.name}</span>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#E8C547" }}>★ {l.rating}</span>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#2A2A34" }}>({l.reviews})</span>
                  </div>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#44444E", marginBottom:8 }}>{l.flag} {l.location}</div>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    {l.expertise.map(e=>(
                      <span key={e} className="tag" style={{ background:`${l.accent}10`, color:l.accent, border:`1px solid ${l.accent}1E` }}>{e}</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize:18, color:"#2A2A34" }}>›</div>
              </div>
            ))}
          </div>
        )}

        {/* ══════ CHAT ══════ */}
        {tab === "locals" && chatLocal && (
          <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 128px)" }}>
            {/* Header */}
            <div style={{ padding:"12px 18px", display:"flex", gap:12, alignItems:"center", borderBottom:"1px solid #16161C", flexShrink:0 }}>
              <button className="x" onClick={()=>setChatLocal(null)} style={{ width:34, height:34, borderRadius:"50%", background:"#111116", border:"1px solid #1E1E26", fontSize:16, color:"#66606A", display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
              <img src={chatLocal.avatar} alt="" style={{ width:40, height:40, borderRadius:"50%", border:`2px solid ${chatLocal.accent}` }} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:18, fontStyle:"italic", fontWeight:400 }}>{chatLocal.name}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#7EE8A2", letterSpacing:1, display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#7EE8A2" }} />
                  Online · {chatLocal.flag} Local Expert
                </div>
              </div>
              <div style={{ background:"#E8C54712", borderRadius:8, padding:"4px 10px", fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#E8C547", fontWeight:500 }}>★ {chatLocal.rating}</div>
            </div>

            {/* Messages */}
            <div style={{ flex:1, overflowY:"auto", padding:"16px 18px", display:"flex", flexDirection:"column", gap:12 }}>
              {msgs.map((m,i)=>(
                <div key={i} className="chat-bubble" style={{ display:"flex", justifyContent:m.from==="user"?"flex-end":"flex-start", gap:8 }}>
                  {m.from==="local" && <img src={chatLocal.avatar} alt="" style={{ width:28, height:28, borderRadius:"50%", border:`1.5px solid ${chatLocal.accent}`, alignSelf:"flex-end", flexShrink:0 }} />}
                  <div style={{ maxWidth:"73%", background: m.from==="user" ? "#E8C547" : "#141418", color: m.from==="user" ? "#0C0C0E" : "#EEE8DC", borderRadius: m.from==="user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding:"10px 14px", fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:300, lineHeight:1.55, border: m.from==="local" ? "1px solid #1E1E26" : "none" }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding:"10px 18px 16px", display:"flex", gap:10, alignItems:"center", borderTop:"1px solid #16161C", flexShrink:0 }}>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about food, stays, tips…" style={{ flex:1, background:"#111116", border:"1px solid #1E1E26", borderRadius:100, padding:"10px 18px", color:"#EEE8DC", fontSize:13, fontFamily:"'Outfit',sans-serif", fontWeight:300, outline:"none" }} />
              <button className="x" onClick={send} style={{ width:42, height:42, borderRadius:"50%", background:"#E8C547", color:"#0C0C0E", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>→</button>
            </div>
          </div>
        )}

        {/* ══════ SAVED ══════ */}
        {tab === "saved" && (
          <div style={{ padding:"14px 18px 0" }}>
            {saved.length === 0 ? (
              <div style={{ textAlign:"center", padding:"72px 24px" }}>
                <div style={{ fontSize:44, fontWeight:300, fontStyle:"italic", letterSpacing:"-1.5px", marginBottom:10 }}>Nothing yet</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#3A3A44", marginBottom:28, lineHeight:1.7 }}>Swipe right on destinations<br/>to save them here</div>
                <button className="x" onClick={()=>setTab("discover")} style={{ background:"#E8C547", borderRadius:10, padding:"12px 28px", fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:600, color:"#0C0C0E" }}>Start Discovering</button>
              </div>
            ) : (<>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#3A3A44", letterSpacing:2.5, textTransform:"uppercase", marginBottom:18 }}>{saved.length} destination{saved.length>1?"s":""} saved</div>
              {saved.map(d=>(
                <div key={d.id} style={{ background:"#111116", borderRadius:18, overflow:"hidden", marginBottom:12, border:"1px solid #1A1A22", display:"flex", height:108 }}>
                  <div style={{ position:"relative", width:108, flexShrink:0 }}>
                    <img src={d.image} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.src=`https://picsum.photos/seed/${d.id+40}/108/108`} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent 40%,#111116)" }} />
                  </div>
                  <div style={{ padding:"12px 14px", flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontSize:20, fontStyle:"italic", fontWeight:300, letterSpacing:"-0.5px" }}>{d.name} {d.flag}</div>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#44444E", marginTop:2 }}>{d.country} · {d.budget} · Score {d.score}</div>
                    </div>
                    <div style={{ display:"flex", gap:7 }}>
                      <button className="x" style={{ background:"#E8C547", borderRadius:8, padding:"5px 14px", fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:600, color:"#0C0C0E" }}>Plan ✦</button>
                      <button className="x" style={{ background:"#111116", border:"1px solid #1E1E26", borderRadius:8, padding:"5px 12px", fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#44444E" }}>Book</button>
                      <button className="x" onClick={()=>{setChatLocal(locals[0]);setTab("locals");}} style={{ background:"#7EE8A210", border:"1px solid #7EE8A220", borderRadius:8, padding:"5px 12px", fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#7EE8A2" }}>Ask Local</button>
                    </div>
                  </div>
                </div>
              ))}
            </>)}
          </div>
        )}
      </div>

      {/* ─── BOTTOM NAV ─── */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"rgba(12,12,14,0.96)", backdropFilter:"blur(24px)", borderTop:"1px solid #16161C", display:"flex", justifyContent:"space-around", padding:"8px 0 16px", zIndex:100 }}>
        {TABS.map(t=>(
          <button key={t.id} className="tabx" onClick={()=>{setTab(t.id);setChatLocal(null);}}>
            <div style={{ position:"relative" }}>
              <span style={{ fontSize:20, color: tab===t.id ? "#E8C547" : "#2A2A34", transition:"all 0.2s", display:"block", transform: tab===t.id ? "scale(1.15)" : "scale(1)" }}>{t.icon}</span>
              {t.id==="saved" && saved.length>0 && (
                <span style={{ position:"absolute", top:-5, right:-8, background:"#E8C547", color:"#0C0C0E", borderRadius:"50%", width:15, height:15, fontSize:8, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif" }}>{saved.length}</span>
              )}
            </div>
            <span style={{ fontSize:9, fontWeight: tab===t.id ? 600 : 400, color: tab===t.id ? "#E8C547" : "#2A2A34", letterSpacing:1.5, textTransform:"uppercase" }}>{t.label}</span>
            {tab===t.id && <div style={{ width:16, height:2, borderRadius:1, background:"#E8C547" }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
