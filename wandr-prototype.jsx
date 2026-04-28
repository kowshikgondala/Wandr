
import { useState, useRef } from "react";

const destinations = [
  {
    id: 1,
    name: "Tbilisi, Georgia",
    country: "🇬🇪",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80",
    tags: ["Hidden Gem", "Foodie", "Historic"],
    score: 94,
    trend: "rising",
    budget: "$",
    temp: "18°C",
    desc: "Ancient city meets modern art. Sulfur baths, wine caves, and rooftop bars.",
    votes: { over: 12, under: 341 },
  },
  {
    id: 2,
    name: "Chefchaouen, Morocco",
    country: "🇲🇦",
    image: "https://images.unsplash.com/photo-1548801650-8b5b3e3e3e3e?w=600&q=80",
    tags: ["Underrated", "Scenic", "Cultural"],
    score: 88,
    trend: "rising",
    budget: "$",
    temp: "22°C",
    desc: "The Blue Pearl of Morocco. Every alley is a photograph waiting to happen.",
    votes: { over: 45, under: 892 },
  },
  {
    id: 3,
    name: "Kyoto, Japan",
    country: "🇯🇵",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    tags: ["Iconic", "Spiritual", "Foodie"],
    score: 71,
    trend: "falling",
    budget: "$$$",
    temp: "15°C",
    desc: "Timeless temples and bamboo groves. Crowds growing but magic remains.",
    votes: { over: 1240, under: 320 },
  },
  {
    id: 4,
    name: "Kotor, Montenegro",
    country: "🇲🇪",
    image: "https://images.unsplash.com/photo-1555990793-da11153b6c8b?w=600&q=80",
    tags: ["Hidden Gem", "Coastal", "Adventure"],
    score: 97,
    trend: "rising",
    budget: "$$",
    temp: "24°C",
    desc: "Medieval walled city tucked in a dramatic Adriatic bay. Europe's best kept secret.",
    votes: { over: 8, under: 567 },
  },
  {
    id: 5,
    name: "Medellín, Colombia",
    country: "🇨🇴",
    image: "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce5?w=600&q=80",
    tags: ["Rising", "Vibrant", "Foodie"],
    score: 91,
    trend: "rising",
    budget: "$",
    temp: "22°C",
    desc: "City of eternal spring. From transformation to innovation — the world's most inspiring comeback.",
    votes: { over: 89, under: 1203 },
  },
];

const socialPosts = [
  {
    id: 1,
    user: "Maya R.",
    avatar: "https://i.pravatar.cc/40?img=47",
    verified: true,
    local: false,
    location: "Tbilisi, Georgia",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&q=80",
    caption: "The sulfur baths at Abanotubani are genuinely life-changing. Go at 7am before the crowds. 🌿",
    likes: 847,
    time: "2h ago",
    tag: "Hidden Tip",
  },
  {
    id: 2,
    user: "Carlos M.",
    avatar: "https://i.pravatar.cc/40?img=12",
    verified: false,
    local: true,
    location: "Medellín, Colombia",
    image: "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce5?w=400&q=80",
    caption: "Born and raised here. Ask me anything about El Poblado vs Laureles — totally different vibes 🏙️",
    likes: 1203,
    time: "5h ago",
    tag: "Local Insight",
  },
  {
    id: 3,
    user: "Priya S.",
    avatar: "https://i.pravatar.cc/40?img=32",
    verified: true,
    local: false,
    location: "Kotor, Montenegro",
    image: "https://images.unsplash.com/photo-1555990793-da11153b6c8b?w=400&q=80",
    caption: "Climbed the fortress walls at sunrise. 1,355 steps. Worth every single one. 🌅",
    likes: 2341,
    time: "1d ago",
    tag: "Adventure",
  },
];

const locals = [
  {
    id: 1,
    name: "Nino K.",
    avatar: "https://i.pravatar.cc/60?img=47",
    location: "Tbilisi, Georgia",
    expertise: ["Food", "Nightlife", "Hidden Spots"],
    rating: 4.9,
    reviews: 142,
    online: true,
    responseTime: "< 5 min",
    premium: true,
  },
  {
    id: 2,
    name: "Ahmad R.",
    avatar: "https://i.pravatar.cc/60?img=15",
    location: "Chefchaouen, Morocco",
    expertise: ["Culture", "Food", "Stays"],
    rating: 4.8,
    reviews: 98,
    online: false,
    responseTime: "< 1 hr",
    premium: true,
  },
  {
    id: 3,
    name: "Sofia V.",
    avatar: "https://i.pravatar.cc/60?img=23",
    location: "Kotor, Montenegro",
    expertise: ["Transport", "Tours", "Food"],
    rating: 5.0,
    reviews: 67,
    online: true,
    responseTime: "< 10 min",
    premium: false,
  },
];

const chatMessages = [
  { from: "local", text: "Hey! Welcome to Tbilisi 🍷 What do you need help with?" },
  { from: "user", text: "Hi! Looking for the best khinkali spot that's not touristy" },
  { from: "local", text: "Oh easy — go to Machakhela on Galaktion street. Locals only, cash only, no English menu 😄 Order the pork ones, minimum 10." },
  { from: "user", text: "Perfect! What about wine bars?" },
  { from: "local", text: "Vino Underground in the old town. Go after 9pm. Natural wines, underground cave, incredible vibe. I'll send you the exact pin 📍" },
];

export default function WandrApp() {
  const [activeTab, setActiveTab] = useState("discover");
  const [cardIndex, setCardIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [savedTrips, setSavedTrips] = useState([]);
  const [passed, setPassed] = useState([]);
  const [activeChatLocal, setActiveChatLocal] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [likedPosts, setLikedPosts] = useState({});
  const [votes, setVotes] = useState({});
  const cardRef = useRef(null);

  const currentCard = destinations[cardIndex];

  function swipe(dir) {
    setSwipeDir(dir);
    setTimeout(() => {
      if (dir === "right") setSavedTrips((p) => [...p, destinations[cardIndex]]);
      else setPassed((p) => [...p, destinations[cardIndex]]);
      setCardIndex((i) => Math.min(i + 1, destinations.length));
      setSwipeDir(null);
    }, 350);
  }

  function sendMessage() {
    if (!chatInput.trim()) return;
    setMessages((m) => [...m, { from: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "local", text: "Great choice! I'll send you more tips shortly 🌟" }]);
    }, 1000);
  }

  function vote(destId, type) {
    setVotes((v) => ({ ...v, [destId]: type }));
  }

  const tabs = [
    { id: "discover", icon: "✦", label: "Discover" },
    { id: "feed", icon: "◈", label: "Feed" },
    { id: "locals", icon: "◉", label: "Locals" },
    { id: "trips", icon: "◎", label: "My Trips" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: "#f0ede8",
      maxWidth: 430,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Playfair+Display:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        .tab-btn { background: none; border: none; cursor: pointer; padding: 8px 0; transition: all 0.2s; }
        .tab-btn:hover { opacity: 0.8; }
        .swipe-card { transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s; }
        .swipe-left { transform: translateX(-120%) rotate(-15deg); opacity: 0; }
        .swipe-right { transform: translateX(120%) rotate(15deg); opacity: 0; }
        .action-btn { border: none; cursor: pointer; transition: all 0.18s; }
        .action-btn:active { transform: scale(0.93); }
        .send-btn { border: none; cursor: pointer; transition: all 0.18s; }
        .send-btn:active { transform: scale(0.93); }
        .like-btn { border: none; background: none; cursor: pointer; transition: all 0.18s; }
        .like-btn:active { transform: scale(1.3); }
        .vote-btn { border: none; cursor: pointer; transition: all 0.2s; font-size: 12px; padding: 5px 12px; border-radius: 20px; font-family: 'DM Sans', sans-serif; }
        .vote-btn:active { transform: scale(0.95); }
        .chat-bubble-enter { animation: bubbleIn 0.25s ease forwards; }
        @keyframes bubbleIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .rising-badge { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        .gradient-text { background: linear-gradient(135deg, #f5c842, #ff7b54); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "20px 24px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px" }}>
            <span className="gradient-text">wandr</span>
          </div>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginTop: 1 }}>discover differently</div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ background: "#1a1a24", borderRadius: 12, padding: "6px 12px", fontSize: 12, color: "#f5c842", fontWeight: 600 }}>
            ✦ Premium
          </div>
          <img src="https://i.pravatar.cc/36?img=5" alt="avatar" style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #f5c842" }} />
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ height: "calc(100vh - 140px)", overflowY: "auto", padding: "0 0 20px" }}>

        {/* DISCOVER TAB */}
        {activeTab === "discover" && (
          <div style={{ padding: "0 20px" }}>
            {cardIndex < destinations.length ? (
              <>
                {/* Card */}
                <div
                  ref={cardRef}
                  className={`swipe-card ${swipeDir === "left" ? "swipe-left" : swipeDir === "right" ? "swipe-right" : ""}`}
                  style={{ position: "relative", borderRadius: 24, overflow: "hidden", height: 460, marginBottom: 20 }}
                >
                  <img
                    src={currentCard.image}
                    alt={currentCard.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { e.target.src = `https://picsum.photos/seed/${currentCard.id}/600/460`; }}
                  />
                  {/* Gradient overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)" }} />

                  {/* Top badges */}
                  <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {currentCard.trend === "rising" && (
                        <div className="rising-badge" style={{ background: "linear-gradient(135deg, #f5c842, #ff7b54)", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#0a0a0f" }}>
                          ↑ Rising Gem
                        </div>
                      )}
                      <div style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "#fff", fontWeight: 500 }}>
                        {currentCard.budget} · {currentCard.temp}
                      </div>
                    </div>
                    {/* Wandr Score */}
                    <div style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "6px 10px", textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: currentCard.score > 85 ? "#5dde8f" : currentCard.score > 70 ? "#f5c842" : "#ff6b6b" }}>{currentCard.score}</div>
                      <div style={{ fontSize: 9, color: "#aaa", letterSpacing: 1 }}>SCORE</div>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{currentCard.name}</div>
                      <div style={{ fontSize: 22 }}>{currentCard.country}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "#ccc", marginBottom: 12, lineHeight: 1.5 }}>{currentCard.desc}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                      {currentCard.tags.map(t => (
                        <div key={t} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#ddd" }}>{t}</div>
                      ))}
                    </div>

                    {/* Vote row */}
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        className="vote-btn"
                        onClick={() => vote(currentCard.id, "over")}
                        style={{
                          background: votes[currentCard.id] === "over" ? "#ff6b6b" : "rgba(255,107,107,0.15)",
                          color: votes[currentCard.id] === "over" ? "#fff" : "#ff6b6b",
                          border: "1px solid rgba(255,107,107,0.4)",
                        }}
                      >
                        🙄 Overrated
                      </button>
                      <button
                        className="vote-btn"
                        onClick={() => vote(currentCard.id, "under")}
                        style={{
                          background: votes[currentCard.id] === "under" ? "#5dde8f" : "rgba(93,222,143,0.12)",
                          color: votes[currentCard.id] === "under" ? "#0a0a0f" : "#5dde8f",
                          border: "1px solid rgba(93,222,143,0.3)",
                        }}
                      >
                        💎 Underrated
                      </button>
                      <div style={{ marginLeft: "auto", fontSize: 11, color: "#888" }}>
                        {currentCard.votes.under} gems found
                      </div>
                    </div>
                  </div>
                </div>

                {/* Swipe buttons */}
                <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center" }}>
                  <button className="action-btn" onClick={() => swipe("left")} style={{
                    width: 60, height: 60, borderRadius: "50%",
                    background: "rgba(255,107,107,0.12)",
                    border: "1.5px solid rgba(255,107,107,0.4)",
                    fontSize: 22, color: "#ff6b6b",
                  }}>✕</button>
                  <button className="action-btn" onClick={() => swipe("right")} style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg, #f5c842, #ff7b54)",
                    border: "none",
                    fontSize: 26, color: "#0a0a0f",
                    boxShadow: "0 8px 24px rgba(245,200,66,0.35)",
                  }}>♡</button>
                  <button className="action-btn" onClick={() => setActiveTab("locals")} style={{
                    width: 60, height: 60, borderRadius: "50%",
                    background: "rgba(93,222,143,0.1)",
                    border: "1.5px solid rgba(93,222,143,0.35)",
                    fontSize: 20, color: "#5dde8f",
                  }}>◉</button>
                </div>

                {/* Progress */}
                <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 16 }}>
                  {destinations.map((_, i) => (
                    <div key={i} style={{
                      width: i === cardIndex ? 20 : 6,
                      height: 6, borderRadius: 3,
                      background: i === cardIndex ? "#f5c842" : i < cardIndex ? "#5dde8f" : "#2a2a38",
                      transition: "all 0.3s",
                    }} />
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 8 }}>You've seen it all</div>
                <div style={{ color: "#888", marginBottom: 24 }}>You saved {savedTrips.length} destinations</div>
                <button onClick={() => { setCardIndex(0); setSavedTrips([]); setPassed([]); }} style={{
                  background: "linear-gradient(135deg, #f5c842, #ff7b54)",
                  border: "none", borderRadius: 20, padding: "12px 28px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                  color: "#0a0a0f", cursor: "pointer",
                }}>Start Over</button>
              </div>
            )}
          </div>
        )}

        {/* FEED TAB */}
        {activeTab === "feed" && (
          <div style={{ padding: "0 20px" }}>
            <div style={{ marginBottom: 16, fontSize: 13, color: "#888" }}>
              Trending from your saved destinations
            </div>
            {socialPosts.map(post => (
              <div key={post.id} style={{ background: "#12121a", borderRadius: 20, marginBottom: 16, overflow: "hidden" }}>
                {/* Post header */}
                <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={post.avatar} alt={post.user} style={{ width: 38, height: 38, borderRadius: "50%", border: post.local ? "2px solid #f5c842" : "2px solid #2a2a38" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{post.user}</span>
                      {post.verified && <span style={{ fontSize: 11, color: "#5dde8f" }}>✓ Visited</span>}
                      {post.local && <span style={{ fontSize: 10, background: "rgba(245,200,66,0.15)", color: "#f5c842", borderRadius: 10, padding: "2px 7px" }}>Local</span>}
                    </div>
                    <div style={{ fontSize: 11, color: "#888" }}>📍 {post.location} · {post.time}</div>
                  </div>
                  <div style={{ fontSize: 10, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "3px 8px", color: "#aaa" }}>{post.tag}</div>
                </div>
                {/* Image */}
                <img
                  src={post.image}
                  alt=""
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                  onError={(e) => { e.target.src = `https://picsum.photos/seed/${post.id + 10}/400/200`; }}
                />
                {/* Caption & actions */}
                <div style={{ padding: "12px 16px" }}>
                  <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 10, color: "#ddd" }}>{post.caption}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <button className="like-btn" onClick={() => setLikedPosts(l => ({ ...l, [post.id]: !l[post.id] }))} style={{ fontSize: 18, color: likedPosts[post.id] ? "#ff6b6b" : "#666", padding: 0 }}>
                      {likedPosts[post.id] ? "♥" : "♡"}
                    </button>
                    <span style={{ fontSize: 12, color: "#888" }}>{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
                    <span style={{ fontSize: 16, color: "#666" }}>💬</span>
                    <span style={{ fontSize: 12, color: "#888" }}>Reply</span>
                    <span style={{ marginLeft: "auto", fontSize: 14, color: "#666" }}>⤴</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LOCALS TAB */}
        {activeTab === "locals" && !activeChatLocal && (
          <div style={{ padding: "0 20px" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(245,200,66,0.1), rgba(255,123,84,0.08))", border: "1px solid rgba(245,200,66,0.2)", borderRadius: 16, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f5c842", marginBottom: 4 }}>✦ Premium Feature</div>
              <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>Chat with verified locals in your destination. Get real insider tips on food, stays, and hidden spots.</div>
            </div>
            {locals.map(local => (
              <div key={local.id} style={{ background: "#12121a", borderRadius: 20, padding: "16px", marginBottom: 14, display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ position: "relative" }}>
                  <img src={local.avatar} alt={local.name} style={{ width: 54, height: 54, borderRadius: "50%", border: "2px solid #f5c842" }} />
                  {local.online && <div style={{ position: "absolute", bottom: 2, right: 2, width: 12, height: 12, borderRadius: "50%", background: "#5dde8f", border: "2px solid #12121a" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{local.name}</span>
                    <span style={{ fontSize: 10, color: "#f5c842" }}>★ {local.rating}</span>
                    <span style={{ fontSize: 10, color: "#666" }}>({local.reviews})</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>📍 {local.location} · {local.responseTime}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {local.expertise.map(e => (
                      <span key={e} style={{ fontSize: 10, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "2px 7px", color: "#bbb" }}>{e}</span>
                    ))}
                  </div>
                </div>
                <button
                  className="action-btn"
                  onClick={() => setActiveChatLocal(local)}
                  style={{
                    background: local.premium ? "linear-gradient(135deg, #f5c842, #ff7b54)" : "#1e1e2e",
                    border: local.premium ? "none" : "1px solid #2a2a38",
                    borderRadius: 14, padding: "8px 14px",
                    fontSize: 12, fontWeight: 600,
                    color: local.premium ? "#0a0a0f" : "#888",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {local.premium ? "Chat ✦" : "Chat"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CHAT VIEW */}
        {activeTab === "locals" && activeChatLocal && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
            {/* Chat header */}
            <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #1e1e2e", background: "#0a0a0f" }}>
              <button onClick={() => setActiveChatLocal(null)} style={{ background: "none", border: "none", color: "#888", fontSize: 20, cursor: "pointer", padding: "0 4px 0 0" }}>←</button>
              <img src={activeChatLocal.avatar} alt={activeChatLocal.name} style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid #f5c842" }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{activeChatLocal.name}</div>
                <div style={{ fontSize: 11, color: "#5dde8f" }}>● Online · Local Expert</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 11, color: "#888" }}>📍 {activeChatLocal.location}</div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((msg, i) => (
                <div key={i} className="chat-bubble-enter" style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                  {msg.from === "local" && (
                    <img src={activeChatLocal.avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%", marginRight: 8, alignSelf: "flex-end" }} />
                  )}
                  <div style={{
                    maxWidth: "75%",
                    background: msg.from === "user" ? "linear-gradient(135deg, #f5c842, #ff7b54)" : "#1a1a24",
                    color: msg.from === "user" ? "#0a0a0f" : "#f0ede8",
                    borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    padding: "10px 14px",
                    fontSize: 13,
                    lineHeight: 1.5,
                    fontWeight: msg.from === "user" ? 500 : 400,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "12px 20px 16px", display: "flex", gap: 10, background: "#0a0a0f", borderTop: "1px solid #1e1e2e" }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about food, stays, tips..."
                style={{
                  flex: 1, background: "#12121a", border: "1px solid #2a2a38",
                  borderRadius: 20, padding: "10px 16px",
                  color: "#f0ede8", fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                }}
              />
              <button className="send-btn" onClick={sendMessage} style={{
                width: 42, height: 42, borderRadius: "50%",
                background: "linear-gradient(135deg, #f5c842, #ff7b54)",
                border: "none", fontSize: 16, cursor: "pointer",
              }}>→</button>
            </div>
          </div>
        )}

        {/* MY TRIPS TAB */}
        {activeTab === "trips" && (
          <div style={{ padding: "0 20px" }}>
            {savedTrips.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>◎</div>
                <div style={{ color: "#888", fontSize: 14 }}>Swipe right on destinations to save them here</div>
                <button onClick={() => setActiveTab("discover")} style={{
                  marginTop: 20, background: "linear-gradient(135deg, #f5c842, #ff7b54)",
                  border: "none", borderRadius: 20, padding: "10px 24px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                  color: "#0a0a0f", cursor: "pointer",
                }}>Start Discovering</button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>{savedTrips.length} destination{savedTrips.length > 1 ? "s" : ""} saved</div>
                {savedTrips.map(dest => (
                  <div key={dest.id} style={{ background: "#12121a", borderRadius: 20, overflow: "hidden", marginBottom: 14, display: "flex", height: 100 }}>
                    <img src={dest.image} alt={dest.name} style={{ width: 110, objectFit: "cover" }} onError={(e) => { e.target.src = `https://picsum.photos/seed/${dest.id + 20}/110/100`; }} />
                    <div style={{ padding: "14px 14px", flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{dest.name} {dest.country}</div>
                      <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>{dest.budget} · {dest.temp} · Score {dest.score}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ background: "linear-gradient(135deg, #f5c842, #ff7b54)", border: "none", borderRadius: 10, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: "#0a0a0f", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                          Plan Trip ✦
                        </button>
                        <button style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #2a2a38", borderRadius: 10, padding: "4px 10px", fontSize: 11, color: "#888", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "rgba(10,10,15,0.95)", backdropFilter: "blur(20px)",
        borderTop: "1px solid #1e1e2e",
        display: "flex", justifyContent: "space-around", padding: "10px 0 16px",
        zIndex: 100,
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className="tab-btn"
            onClick={() => { setActiveTab(tab.id); setActiveChatLocal(null); }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 60 }}
          >
            <div style={{
              fontSize: 20,
              color: activeTab === tab.id ? "#f5c842" : "#444",
              transition: "all 0.2s",
              transform: activeTab === tab.id ? "scale(1.2)" : "scale(1)",
            }}>{tab.icon}</div>
            <div style={{
              fontSize: 10, fontWeight: 500,
              color: activeTab === tab.id ? "#f5c842" : "#444",
              letterSpacing: 0.5,
            }}>{tab.label}</div>
            {activeTab === tab.id && (
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#f5c842", marginTop: -2 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
