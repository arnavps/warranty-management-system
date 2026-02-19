import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { id: 1, name: "Samsung 65\" QLED TV", brand: "Samsung", category: "Electronics", model: "QN65Q80C", serial: "SN-4829XK01", purchaseDate: "2023-08-15", purchasePrice: 89999, warrantyYears: 2, store: "Croma", status: "active", daysLeft: 42, receipt: true },
  { id: 2, name: "LG Double Door Refrigerator", brand: "LG", category: "Appliances", model: "GL-T522FPZX", serial: "LG-7821KR44", purchaseDate: "2022-11-03", purchasePrice: 54500, warrantyYears: 2, store: "Vijay Sales", status: "expiring", daysLeft: 8, receipt: true },
  { id: 3, name: "Dell XPS 15 Laptop", brand: "Dell", category: "Electronics", model: "XPS-9530", serial: "DL-9823MX77", purchaseDate: "2024-01-20", purchasePrice: 149999, warrantyYears: 1, store: "Dell Online", status: "active", daysLeft: 234, receipt: true },
  { id: 4, name: "Dyson V15 Vacuum", brand: "Dyson", category: "Appliances", model: "V15 Detect", serial: "DY-7612SV22", purchaseDate: "2023-03-10", purchasePrice: 52900, warrantyYears: 2, store: "Dyson Store", status: "active", daysLeft: 98, receipt: true },
  { id: 5, name: "Sony WH-1000XM5", brand: "Sony", category: "Electronics", model: "WH-1000XM5", serial: "SO-3321HX09", purchaseDate: "2022-06-18", purchasePrice: 29990, warrantyYears: 1, store: "Amazon", status: "expired", daysLeft: -180, receipt: false },
];

const SERVICE_DIR = [
  { brand: "Samsung", phone: "1800-40-SAMSUNG", email: "support@samsung.in", website: "samsung.com/in", centers: ["Connaught Place, Delhi", "Andheri West, Mumbai", "Koramangala, Bengaluru"], hours: "Mon–Sat 9AM–6PM" },
  { brand: "LG", phone: "1800-315-9999", email: "lgcare@lgindia.com", website: "lg.com/in", centers: ["Karol Bagh, Delhi", "Bandra, Mumbai", "Indiranagar, Bengaluru"], hours: "Mon–Sat 9AM–7PM" },
  { brand: "Dell", phone: "1800-425-4051", email: "dell_india_support@dell.com", website: "dell.com/support", centers: ["Nehru Place, Delhi", "Powai, Mumbai", "MG Road, Bengaluru"], hours: "24/7 Phone Support" },
  { brand: "Dyson", phone: "1800-102-1011", email: "support@dyson.in", website: "dyson.in", centers: ["Khan Market, Delhi", "Juhu, Mumbai", "Whitefield, Bengaluru"], hours: "Mon–Fri 9AM–6PM" },
  { brand: "Sony", phone: "1800-103-7799", email: "sonyindia@sony.com", website: "sony.co.in", centers: ["Rajouri Garden, Delhi", "Dadar, Mumbai", "HSR Layout, Bengaluru"], hours: "Mon–Sat 10AM–6PM" },
  { brand: "Apple", phone: "000800-040-1966", email: "support@apple.com", website: "apple.com/in/support", centers: ["Select Citywalk, Delhi", "Phoenix Mills, Mumbai", "Orion Mall, Bengaluru"], hours: "Mon–Sun 10AM–8PM" },
  { brand: "Bosch", phone: "1800-266-1880", email: "bosch.care@in.bosch.com", website: "bosch-home.com/in", centers: ["South Extension, Delhi", "Worli, Mumbai", "Jayanagar, Bengaluru"], hours: "Mon–Sat 9AM–5PM" },
];

const AMC_PLANS = [
  { id: 1, provider: "Onsitego", logo: "🛡️", plan: "Comprehensive Cover", duration: "1 Year", price: 1299, features: ["Unlimited repairs", "Doorstep service", "Spare parts included", "24/7 support"], rating: 4.7, badge: "Most Popular" },
  { id: 2, provider: "Servify", logo: "⚡", plan: "Extended Warranty+", duration: "2 Years", price: 2199, features: ["All damage covered", "No repair limit", "Free pickup & drop", "Dedicated RM"], rating: 4.5, badge: "Best Value" },
  { id: 3, provider: "WarrantyBazaar", logo: "🔰", plan: "Basic Protection", duration: "1 Year", price: 799, features: ["Manufacturing defects", "Technical support", "Online claim filing"], rating: 4.2, badge: null },
];

const ISSUES = ["Won't turn on / No power", "Screen damage / Display issue", "Overheating", "Physical damage", "Performance issues", "Water damage", "Battery problem", "Other"];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    wrench: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.18 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    transfer: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    camera: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    chevronLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    fileText: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    package: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    alertTriangle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    store: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  };
  return icons[name] || null;
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const getStatusColor = (status) => ({ active: "#00C9B1", expiring: "#F5A623", expired: "#EF4444" }[status] || "#00C9B1");
const getStatusBg = (status) => ({ active: "#E6FBF8", expiring: "#FFF8EC", expired: "#FEF2F2" }[status] || "#E6FBF8");
const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const daysLabel = (d) => d < 0 ? `Expired ${Math.abs(d)}d ago` : d === 0 ? "Expires today!" : `${d} days left`;
const catIcon = (c) => ({ Electronics: "📱", Appliances: "🏠", Furniture: "🪑", Vehicles: "🚗" }[c] || "📦");

// ─── TOAST ───────────────────────────────────────────────────────────────────
const Toast = ({ msg, onClose }) => (
  <div style={{ position: "absolute", bottom: 90, left: 16, right: 16, background: "#0B1C3D", color: "#fff", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", animation: "slideUp 0.3s ease" }}>
    <span style={{ fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>{msg}</span>
    <button onClick={onClose} style={{ background: "none", border: "none", color: "#00C9B1", cursor: "pointer", padding: 0, marginLeft: 12 }}><Icon name="x" size={16} /></button>
  </div>
);

// ─── SCREEN: SPLASH ──────────────────────────────────────────────────────────
const SplashScreen = ({ onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, []);
  return (
    <div style={{ height: "100%", background: "linear-gradient(160deg, #0B1C3D 0%, #132952 60%, #0A2A1F 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, #00C9B1, #00A896)", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(0,201,177,0.4)", animation: "pulse 1.5s infinite" }}>
        <Icon name="shield" size={40} color="#fff" />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "DM Sans, sans-serif", letterSpacing: -1 }}>WarrantSafe</div>
        <div style={{ fontSize: 14, color: "#00C9B1", marginTop: 4, fontFamily: "DM Sans, sans-serif" }}>Your Warranty, Always Protected</div>
      </div>
      <div style={{ position: "absolute", bottom: 60, display: "flex", gap: 6 }}>
        {[0,1,2].map(i => <div key={i} style={{ width: i === 0 ? 20 : 6, height: 6, borderRadius: 3, background: i === 0 ? "#00C9B1" : "rgba(255,255,255,0.3)", transition: "all 0.3s" }} />)}
      </div>
    </div>
  );
};

// ─── SCREEN: DASHBOARD ───────────────────────────────────────────────────────
const Dashboard = ({ products, onProductClick, onAddProduct, onNav }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const active = products.filter(p => p.status === "active").length;
  const expiring = products.filter(p => p.status === "expiring").length;
  const expired = products.filter(p => p.status === "expired").length;

  const filtered = products.filter(p => {
    const matchFilter = filter === "all" || p.status === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0B1C3D 0%, #132952 100%)", padding: "52px 20px 24px", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ color: "#00C9B1", fontSize: 12, fontFamily: "DM Sans, sans-serif", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Good Morning</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>My Products 🛡️</div>
          </div>
          <button onClick={onAddProduct} style={{ width: 40, height: 40, borderRadius: 12, background: "#00C9B1", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="plus" size={20} color="#fff" />
          </button>
        </div>
        {/* Stats */}
        <div style={{ display: "flex", gap: 10 }}>
          {[{ label: "Active", val: active, color: "#00C9B1", f: "active" }, { label: "Expiring", val: expiring, color: "#F5A623", f: "expiring" }, { label: "Expired", val: expired, color: "#EF4444", f: "expired" }].map(s => (
            <div key={s.f} onClick={() => setFilter(filter === s.f ? "all" : s.f)} style={{ flex: 1, background: filter === s.f ? s.color : "rgba(255,255,255,0.1)", borderRadius: 14, padding: "10px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", border: `2px solid ${filter === s.f ? s.color : "transparent"}` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: filter === s.f ? "#fff" : s.color, fontFamily: "DM Sans, sans-serif" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: filter === s.f ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {/* Search */}
        <div style={{ marginTop: 14, background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="search" size={16} color="rgba(255,255,255,0.5)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{ background: "none", border: "none", outline: "none", color: "#fff", fontSize: 14, fontFamily: "DM Sans, sans-serif", flex: 1, "::placeholder": { color: "rgba(255,255,255,0.4)" } }} />
        </div>
      </div>

      {/* Product List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 20px" }}>
        {expiring > 0 && (
          <div onClick={() => onNav("alerts")} style={{ background: "linear-gradient(135deg, #F5A623, #E8960F)", borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 4px 12px rgba(245,166,35,0.3)" }}>
            <Icon name="alertTriangle" size={20} color="#fff" />
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "DM Sans, sans-serif" }}>{expiring} warranty expiring soon!</div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 11, fontFamily: "DM Sans, sans-serif" }}>Tap to view alerts & extend coverage</div>
            </div>
            <Icon name="chevronRight" size={16} color="#fff" />
          </div>
        )}
        <div style={{ fontSize: 13, fontWeight: 600, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{filtered.length} Products</div>
        {filtered.map(p => (
          <div key={p.id} onClick={() => onProductClick(p)} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", marginBottom: 12, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 14, transition: "transform 0.1s", border: p.status === "expiring" ? "2px solid #FEF3C7" : "2px solid transparent" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: getStatusBg(p.status), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{catIcon(p.category)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>{p.brand} · {p.model}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <div style={{ background: getStatusBg(p.status), borderRadius: 8, padding: "2px 8px" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: getStatusColor(p.status), fontFamily: "DM Sans, sans-serif" }}>{daysLabel(p.daysLeft)}</span>
                </div>
              </div>
            </div>
            <Icon name="chevronRight" size={18} color="#CBD5E1" />
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#94A3B8", fontFamily: "DM Sans, sans-serif" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>No products found</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Try a different search or filter</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: PRODUCT DETAIL ───────────────────────────────────────────────────
const ProductDetail = ({ product, onBack, onClaim, onTransfer, onAMC }) => {
  const expirDate = new Date(product.purchaseDate);
  expirDate.setFullYear(expirDate.getFullYear() + product.warrantyYears);
  const pct = Math.max(0, Math.min(100, (product.daysLeft / (product.warrantyYears * 365)) * 100));

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
      <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 28px" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
          <Icon name="chevronLeft" size={16} color="#fff" />
          <span style={{ color: "#fff", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>Back</span>
        </button>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{catIcon(product.category)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, fontFamily: "DM Sans, sans-serif", lineHeight: 1.2 }}>{product.name}</div>
            <div style={{ color: "#00C9B1", fontSize: 13, fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>{product.brand} · {product.model}</div>
            <div style={{ marginTop: 10, background: getStatusBg(product.status), borderRadius: 10, padding: "4px 12px", display: "inline-block" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: getStatusColor(product.status), fontFamily: "DM Sans, sans-serif" }}>{daysLabel(product.daysLeft)}</span>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "DM Sans, sans-serif" }}>Purchased {formatDate(product.purchaseDate)}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "DM Sans, sans-serif" }}>Expires {formatDate(expirDate)}</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${getStatusColor(product.status)}, ${getStatusColor(product.status)}AA)`, borderRadius: 3, transition: "width 1s ease" }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { label: "File Claim", icon: "wrench", color: "#0B1C3D", bg: "#0B1C3D", action: onClaim },
            { label: "Extend Warranty", icon: "shield", color: "#F5A623", bg: "#FFF8EC", action: onAMC },
            { label: "Transfer", icon: "transfer", color: "#7C3AED", bg: "#F5F3FF", action: onTransfer },
            { label: "Service Center", icon: "phone", color: "#00A896", bg: "#E6FBF8", action: () => {} },
          ].map(a => (
            <button key={a.label} onClick={a.action} style={{ background: a.label === "File Claim" ? "#0B1C3D" : a.bg, borderRadius: 14, padding: "14px 12px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, boxShadow: a.label === "File Claim" ? "0 4px 12px rgba(11,28,61,0.3)" : "none" }}>
              <Icon name={a.icon} size={22} color={a.label === "File Claim" ? "#00C9B1" : a.color} />
              <span style={{ fontSize: 12, fontWeight: 700, color: a.label === "File Claim" ? "#fff" : a.color, fontFamily: "DM Sans, sans-serif" }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Details */}
        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          {[
            { label: "Serial Number", val: product.serial },
            { label: "Purchase Price", val: `₹${product.purchasePrice.toLocaleString("en-IN")}` },
            { label: "Store", val: product.store },
            { label: "Warranty Period", val: `${product.warrantyYears} Year${product.warrantyYears > 1 ? "s" : ""}` },
            { label: "Category", val: product.category },
            { label: "Receipt", val: product.receipt ? "✅ Uploaded" : "❌ Not uploaded" },
          ].map((row, i) => (
            <div key={row.label} style={{ padding: "12px 16px", borderBottom: i < 5 ? "1px solid #F1F5F9" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif" }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN: OCR SCANNER ─────────────────────────────────────────────────────
const OCRScanner = ({ onBack, onSave, toast }) => {
  const [step, setStep] = useState(0); // 0=intro, 1=scanning receipt, 2=scanning serial, 3=review
  const [scanning, setScanning] = useState(false);
  const [form, setForm] = useState({ name: "", brand: "", model: "", serial: "", purchaseDate: "", purchasePrice: "", warrantyYears: "1", store: "", category: "Electronics" });

  const simulateScan = (type) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      if (type === "receipt") {
        setForm(f => ({ ...f, name: "Philips Air Purifier", brand: "Philips", purchaseDate: "2026-02-15", purchasePrice: "18999", store: "Amazon India" }));
        setStep(2);
      } else {
        setForm(f => ({ ...f, model: "AC2887/63", serial: "PH-8821AC44", warrantyYears: "2" }));
        setStep(3);
      }
    }, 2200);
  };

  const ScannerView = ({ label, onCapture }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ background: "#0B1C3D", borderRadius: 20, margin: "0 0 20px", overflow: "hidden", position: "relative", height: 220 }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {scanning ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 60, height: 60, border: "3px solid #00C9B1", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
              <div style={{ color: "#00C9B1", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>Scanning & extracting data...</div>
            </div>
          ) : (
            <div style={{ width: "85%", height: "75%", border: "2px dashed rgba(0,201,177,0.5)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
              <Icon name="camera" size={32} color="rgba(0,201,177,0.6)" />
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>Position {label} in frame</div>
            </div>
          )}
        </div>
        {!scanning && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #00C9B1, transparent)", animation: "scanLine 2s ease-in-out infinite" }} />}
      </div>
      {!scanning && (
        <button onClick={onCapture} style={{ width: "100%", background: "linear-gradient(135deg, #00C9B1, #00A896)", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Icon name="camera" size={20} color="#fff" />
          Capture & Scan
        </button>
      )}
    </div>
  );

  const steps = [
    // Step 0: Intro
    <div>
      <div style={{ textAlign: "center", padding: "20px 0 30px" }}>
        <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, #00C9B1, #00A896)", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Icon name="zap" size={36} color="#fff" />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>Zero-Input Capture</div>
        <div style={{ fontSize: 14, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 8, lineHeight: 1.5 }}>Just two photos — our AI does the rest. No typing needed.</div>
      </div>
      {[{ icon: "fileText", label: "Step 1", desc: "Photograph your purchase receipt" }, { icon: "package", label: "Step 2", desc: "Photograph the serial number tag" }, { icon: "check", label: "Done!", desc: "AI extracts all details instantly" }].map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: i === 2 ? "#E6FBF8" : "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={s.icon} size={20} color={i === 2 ? "#00A896" : "#0B1C3D"} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#00C9B1", fontWeight: 700, fontFamily: "DM Sans, sans-serif", textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
            <div style={{ fontSize: 14, color: "#334155", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>{s.desc}</div>
          </div>
        </div>
      ))}
      <button onClick={() => setStep(1)} style={{ width: "100%", marginTop: 10, background: "linear-gradient(135deg, #0B1C3D, #132952)", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
        Start Scanning →
      </button>
    </div>,

    // Step 1: Receipt scan
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>Scan Your Receipt</div>
        <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>Point camera at your purchase receipt</div>
      </div>
      <ScannerView label="receipt" onCapture={() => simulateScan("receipt")} />
    </div>,

    // Step 2: Serial scan
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>Scan Serial Number Tag</div>
        <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>Usually found on the back or bottom of the product</div>
      </div>
      <div style={{ background: "#E6FBF8", borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", gap: 10, alignItems: "center" }}>
        <Icon name="check" size={16} color="#00A896" />
        <div style={{ fontSize: 12, color: "#00A896", fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>Receipt scanned! Name, price & store extracted.</div>
      </div>
      <ScannerView label="serial tag" onCapture={() => simulateScan("serial")} />
    </div>,

    // Step 3: Review & save
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>Review & Save</div>
        <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>AI extracted these details — edit if needed</div>
      </div>
      <div style={{ background: "#E6FBF8", borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", gap: 10 }}>
        <Icon name="zap" size={16} color="#00A896" />
        <div style={{ fontSize: 12, color: "#00A896", fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>AI confidence: 96% — all fields verified</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { label: "Product Name", key: "name" },
          { label: "Brand", key: "brand" },
          { label: "Model Number", key: "model" },
          { label: "Serial Number", key: "serial" },
          { label: "Purchase Date", key: "purchaseDate", type: "date" },
          { label: "Price (₹)", key: "purchasePrice", type: "number" },
          { label: "Store", key: "store" },
        ].map(f => (
          <div key={f.key}>
            <div style={{ fontSize: 11, color: "#64748B", fontFamily: "DM Sans, sans-serif", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{f.label}</div>
            <input
              type={f.type || "text"}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              style={{ width: "100%", background: "#F8FAFF", border: "2px solid #E2E8F0", borderRadius: 10, padding: "10px 12px", fontSize: 13, fontFamily: "DM Sans, sans-serif", color: "#0B1C3D", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ))}
        <div>
          <div style={{ fontSize: 11, color: "#64748B", fontFamily: "DM Sans, sans-serif", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Warranty (Years)</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["1", "2", "3", "5"].map(y => (
              <button key={y} onClick={() => setForm(p => ({ ...p, warrantyYears: y }))} style={{ flex: 1, padding: "10px 0", border: `2px solid ${form.warrantyYears === y ? "#00C9B1" : "#E2E8F0"}`, borderRadius: 10, background: form.warrantyYears === y ? "#E6FBF8" : "#F8FAFF", color: form.warrantyYears === y ? "#00A896" : "#64748B", fontWeight: 700, fontFamily: "DM Sans, sans-serif", fontSize: 13, cursor: "pointer" }}>
                {y}yr
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => { toast("✅ Product saved to your locker!"); onSave(form); }} style={{ marginTop: 8, width: "100%", background: "linear-gradient(135deg, #00C9B1, #00A896)", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
          Save to Locker
        </button>
      </div>
    </div>
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
      <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 20px" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
          <Icon name="chevronLeft" size={16} color="#fff" />
          <span style={{ color: "#fff", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>Back</span>
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2, 3].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "#00C9B1" : "rgba(255,255,255,0.2)", transition: "background 0.3s" }} />)}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>{steps[step]}</div>
    </div>
  );
};

// ─── SCREEN: ALERTS ───────────────────────────────────────────────────────────
const AlertsScreen = ({ products, onAMC, onClaim }) => {
  const [dismissed, setDismissed] = useState([]);
  const alerts = products
    .filter(p => p.daysLeft <= 30 && p.daysLeft > -1 && !dismissed.includes(p.id))
    .sort((a, b) => a.daysLeft - b.daysLeft);
  const expired = products.filter(p => p.daysLeft < 0);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
      <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 24px", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, background: "rgba(245,166,35,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="bell" size={20} color="#F5A623" />
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 800, fontFamily: "DM Sans, sans-serif" }}>Smart Alerts</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>{alerts.length} active · {expired.length} expired</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {alerts.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>⚠️ Expiring Soon</div>
            {alerts.map(p => (
              <div key={p.id} style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: `2px solid ${p.daysLeft <= 7 ? "#FECACA" : "#FEF3C7"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>{p.brand} · {p.model}</div>
                  </div>
                  <div style={{ background: p.daysLeft <= 7 ? "#FEF2F2" : "#FFF8EC", borderRadius: 10, padding: "4px 10px", textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: p.daysLeft <= 7 ? "#EF4444" : "#F5A623", fontFamily: "DM Sans, sans-serif", lineHeight: 1 }}>{p.daysLeft}</div>
                    <div style={{ fontSize: 9, color: p.daysLeft <= 7 ? "#EF4444" : "#F5A623", fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>DAYS</div>
                  </div>
                </div>
                <div style={{ background: "#F8FAFF", borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", marginBottom: 4 }}>🛡️ Extend Coverage</div>
                  <div style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif" }}>Your warranty ends in {p.daysLeft} days. Extend now from ₹799/year</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => onAMC(p)} style={{ flex: 1, background: "linear-gradient(135deg, #F5A623, #E8960F)", border: "none", borderRadius: 10, padding: "10px 0", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Extend Warranty</button>
                  <button onClick={() => onClaim(p)} style={{ flex: 1, background: "#F0F4FF", border: "2px solid #E2E8F0", borderRadius: 10, padding: "10px 0", color: "#0B1C3D", fontSize: 12, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>File Claim</button>
                  <button onClick={() => setDismissed(d => [...d, p.id])} style={{ width: 40, background: "#F0F4FF", border: "2px solid #E2E8F0", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="x" size={14} color="#94A3B8" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {expired.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12, marginTop: 8 }}>❌ Expired Warranties</div>
            {expired.map(p => (
              <div key={p.id} style={{ background: "#fff", borderRadius: 14, padding: "12px 16px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, background: "#FEF2F2", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{catIcon(p.category)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#EF4444", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>Expired {Math.abs(p.daysLeft)} days ago</div>
                </div>
                <button onClick={() => onAMC(p)} style={{ background: "#FEF2F2", border: "none", borderRadius: 8, padding: "6px 10px", color: "#EF4444", fontSize: 11, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Renew</button>
              </div>
            ))}
          </>
        )}
        {alerts.length === 0 && expired.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#94A3B8", fontFamily: "DM Sans, sans-serif" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0B1C3D" }}>All warranties healthy!</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>No expiry alerts right now</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: CLAIM GENERATOR ─────────────────────────────────────────────────
const ClaimGenerator = ({ product, onBack, toast }) => {
  const [step, setStep] = useState(0);
  const [issue, setIssue] = useState("");
  const [desc, setDesc] = useState("");
  const [sent, setSent] = useState(false);
  const service = SERVICE_DIR.find(s => s.brand === product?.brand) || SERVICE_DIR[0];

  if (!product) return (
    <div style={{ height: "100%", background: "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 20 }}>
      <div style={{ fontSize: 48 }}>📋</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", textAlign: "center" }}>Select a product first</div>
      <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", textAlign: "center" }}>Go to your Product Locker and tap "File Claim" on a product</div>
    </div>
  );

  const expirDate = new Date(product.purchaseDate);
  expirDate.setFullYear(expirDate.getFullYear() + product.warrantyYears);

  if (sent) return (
    <div style={{ height: "100%", background: "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 20, textAlign: "center" }}>
      <div style={{ width: 80, height: 80, background: "#E6FBF8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="check" size={40} color="#00A896" />
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>Claim Submitted!</div>
      <div style={{ fontSize: 14, color: "#64748B", fontFamily: "DM Sans, sans-serif", lineHeight: 1.6 }}>Your claim has been sent to {product.brand} support. Reference ID: <strong>WS-2026-{Math.floor(Math.random() * 90000 + 10000)}</strong></div>
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, width: "100%", textAlign: "left", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 8 }}>CLAIM SUMMARY</div>
        {[["Product", product.name], ["Issue", issue], ["Sent to", service.email], ["Status", "✅ Submitted"]].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif" }}>{l}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", maxWidth: "55%", textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={onBack} style={{ width: "100%", background: "#0B1C3D", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Back to Locker</button>
    </div>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
      <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 20px", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
          <Icon name="chevronLeft" size={16} color="#fff" />
          <span style={{ color: "#fff", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>Back</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Icon name="wrench" size={24} color="#00C9B1" />
          <div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, fontFamily: "DM Sans, sans-serif" }}>File a Claim</div>
            <div style={{ color: "#00C9B1", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>{product.name}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "#00C9B1" : "rgba(255,255,255,0.2)", transition: "background 0.3s" }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {step === 0 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", marginBottom: 6 }}>What's the issue?</div>
            <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 16 }}>Select the problem you're experiencing</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ISSUES.map(i => (
                <button key={i} onClick={() => setIssue(i)} style={{ padding: "13px 16px", background: issue === i ? "#E6FBF8" : "#fff", border: `2px solid ${issue === i ? "#00C9B1" : "#E2E8F0"}`, borderRadius: 12, textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: issue === i ? "#00A896" : "#334155", fontFamily: "DM Sans, sans-serif" }}>{i}</span>
                  {issue === i && <Icon name="check" size={16} color="#00A896" />}
                </button>
              ))}
            </div>
            <button onClick={() => { if (issue) setStep(1); }} style={{ marginTop: 16, width: "100%", background: issue ? "linear-gradient(135deg, #0B1C3D, #132952)" : "#E2E8F0", border: "none", borderRadius: 14, padding: "14px", color: issue ? "#fff" : "#94A3B8", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: issue ? "pointer" : "not-allowed" }}>
              Continue →
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", marginBottom: 6 }}>Describe the issue</div>
            <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 16 }}>Optional — add any additional details</div>
            <div style={{ background: "#E6FBF8", borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", gap: 10 }}>
              <Icon name="zap" size={16} color="#00A896" />
              <div style={{ fontSize: 12, color: "#00A896", fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>Pre-filled from your product locker: {product.serial} · {formatDate(product.purchaseDate)}</div>
            </div>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="e.g. The display turns off randomly after 30 minutes of use..." rows={5} style={{ width: "100%", background: "#fff", border: "2px solid #E2E8F0", borderRadius: 12, padding: "12px 14px", fontSize: 13, fontFamily: "DM Sans, sans-serif", color: "#0B1C3D", resize: "none", outline: "none", boxSizing: "border-box" }} />
            <div style={{ marginTop: 16, background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Auto-Generated Claim Draft</div>
              <div style={{ fontSize: 12, color: "#334155", fontFamily: "DM Sans, sans-serif", lineHeight: 1.7, background: "#F8FAFF", borderRadius: 10, padding: 12 }}>
                <strong>To:</strong> {service.email}<br/>
                <strong>Subject:</strong> Warranty Claim — {product.name} (S/N: {product.serial})<br/><br/>
                Dear {product.brand} Support,<br/><br/>
                I am filing a warranty claim for my <strong>{product.name}</strong> (Model: {product.model}, S/N: {product.serial}) purchased on {formatDate(product.purchaseDate)} from {product.store}.<br/><br/>
                <strong>Issue:</strong> {issue}<br/>
                {desc && <><strong>Description:</strong> {desc}<br/><br/></>}
                Warranty valid until: {formatDate(expirDate)}<br/>
                Proof of purchase: Attached
              </div>
            </div>
            <button onClick={() => setStep(2)} style={{ marginTop: 16, width: "100%", background: "linear-gradient(135deg, #0B1C3D, #132952)", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
              Review & Send →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", marginBottom: 6 }}>Ready to Submit</div>
            <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 16 }}>Claim will be sent to {product.brand} support</div>
            {[["Product", product.name], ["Serial No.", product.serial], ["Issue", issue], ["Warranty Expiry", formatDate(expirDate)], ["Sending to", service.email], ["Attachments", "Receipt image · Warranty card"]].map(([l, v]) => (
              <div key={l} style={{ background: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif" }}>{l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", maxWidth: "55%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={() => { toast("📥 Claim PDF downloaded!"); }} style={{ flex: 1, background: "#F0F4FF", border: "2px solid #E2E8F0", borderRadius: 14, padding: "14px 0", color: "#0B1C3D", fontSize: 14, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Icon name="download" size={16} color="#0B1C3D" /> Save PDF
              </button>
              <button onClick={() => { toast("📧 Claim sent to " + product.brand + "!"); setSent(true); }} style={{ flex: 2, background: "linear-gradient(135deg, #00C9B1, #00A896)", border: "none", borderRadius: 14, padding: "14px 0", color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Icon name="send" size={16} color="#fff" /> Send Claim
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: SERVICE DIRECTORY ────────────────────────────────────────────────
const ServiceDirectory = ({ onCall, toast }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = SERVICE_DIR.filter(s => s.brand.toLowerCase().includes(search.toLowerCase()));

  if (selected) return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
      <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 24px", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
          <Icon name="chevronLeft" size={16} color="#fff" />
          <span style={{ color: "#fff", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>All Brands</span>
        </button>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: "DM Sans, sans-serif" }}>{selected.brand}</div>
        <div style={{ fontSize: 12, color: "#00C9B1", fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>{selected.hours}</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button onClick={() => { toast("📞 Calling " + selected.phone); }} style={{ flex: 1, background: "#E6FBF8", border: "2px solid #00C9B1", borderRadius: 14, padding: "14px 0", color: "#00A896", fontWeight: 700, fontFamily: "DM Sans, sans-serif", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Icon name="phone" size={18} color="#00A896" /> Call Now
          </button>
          <button onClick={() => { toast("📧 Opening email to " + selected.brand); }} style={{ flex: 1, background: "#F0F4FF", border: "2px solid #E2E8F0", borderRadius: 14, padding: "14px 0", color: "#0B1C3D", fontWeight: 700, fontFamily: "DM Sans, sans-serif", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Icon name="mail" size={18} color="#0B1C3D" /> Email
          </button>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 16 }}>
          {[["📞 Phone", selected.phone], ["📧 Email", selected.email], ["🌐 Website", selected.website], ["⏰ Hours", selected.hours]].map(([l, v], i) => (
            <div key={l} style={{ padding: "13px 16px", borderBottom: i < 3 ? "1px solid #F1F5F9" : "none", display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 14 }}></span>
              <div>
                <div style={{ fontSize: 11, color: "#94A3B8", fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>{l.replace(/^.+ /, "")}</div>
                <div style={{ fontSize: 13, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", fontWeight: 600, marginTop: 1 }}>{v}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", marginBottom: 10 }}>📍 Nearby Service Centers</div>
        {selected.centers.map((c, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ width: 36, height: 36, background: "#F0F4FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="mapPin" size={18} color="#0B1C3D" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>{c}</div>
              <div style={{ fontSize: 11, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 1 }}>Tap for directions</div>
            </div>
            <button onClick={() => toast("🗺️ Opening maps...")} style={{ background: "#E6FBF8", border: "none", borderRadius: 8, padding: "6px 10px", color: "#00A896", fontWeight: 700, fontSize: 11, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Maps</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
      <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 24px", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, background: "rgba(0,201,177,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="phone" size={20} color="#00C9B1" />
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 800, fontFamily: "DM Sans, sans-serif" }}>Service Directory</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>{SERVICE_DIR.length} brands · instant access</div>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="search" size={16} color="rgba(255,255,255,0.5)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search brand..." style={{ background: "none", border: "none", outline: "none", color: "#fff", fontSize: 14, fontFamily: "DM Sans, sans-serif", flex: 1 }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Brands</div>
        {filtered.map(s => (
          <div key={s.brand} onClick={() => setSelected(s)} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, background: "#F0F4FF", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {({ Samsung: "📺", LG: "❄️", Dell: "💻", Dyson: "🌀", Sony: "🎧", Apple: "🍎", Bosch: "🔧" }[s.brand] || "📱")}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>{s.brand}</div>
              <div style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>{s.phone} · {s.centers.length} centers</div>
            </div>
            <Icon name="chevronRight" size={18} color="#CBD5E1" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SCREEN: WARRANTY TRANSFER ───────────────────────────────────────────────
const WarrantyTransfer = ({ products, onBack, toast }) => {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const token = `WT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  if (done) return (
    <div style={{ height: "100%", background: "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 20, textAlign: "center" }}>
      <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, #7C3AED22, #7C3AED44)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="transfer" size={36} color="#7C3AED" />
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>Transfer Initiated!</div>
      <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", lineHeight: 1.6 }}>Transfer token sent to <strong>{email}</strong>. The buyer can import warranty directly into their WarrantSafe app.</div>
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 8 }}>TRANSFER TOKEN</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#7C3AED", fontFamily: "DM Sans, sans-serif", letterSpacing: 3 }}>{token}</div>
        <div style={{ fontSize: 11, color: "#94A3B8", fontFamily: "DM Sans, sans-serif", marginTop: 6 }}>Valid for 48 hours · Cryptographically signed</div>
      </div>
      <div style={{ background: "#F5F3FF", borderRadius: 12, padding: 12, width: "100%", textAlign: "left" }}>
        {[["Product", selected.name], ["Warranty Remaining", `${selected.daysLeft} days`], ["Original Purchase", formatDate(selected.purchaseDate)], ["Transfer to", email]].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: "#64748B", fontFamily: "DM Sans, sans-serif" }}>{l}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={onBack} style={{ width: "100%", background: "#0B1C3D", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Done</button>
    </div>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
      <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 24px", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
          <Icon name="chevronLeft" size={16} color="#fff" />
          <span style={{ color: "#fff", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>Back</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Icon name="transfer" size={24} color="#7C6BEB" />
          <div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, fontFamily: "DM Sans, sans-serif" }}>Warranty Transfer</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>Sell with verified warranty history</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
          {[0, 1].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "#7C6BEB" : "rgba(255,255,255,0.2)", transition: "background 0.3s" }} />)}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {step === 0 && (
          <div>
            <div style={{ background: "#F5F3FF", borderRadius: 14, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10 }}>
              <Icon name="shield" size={18} color="#7C3AED" />
              <div style={{ fontSize: 12, color: "#7C3AED", fontFamily: "DM Sans, sans-serif", fontWeight: 600, lineHeight: 1.5 }}>Transferring warranty adds verified resale value. Buyers get product history + remaining coverage.</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", marginBottom: 12 }}>Select product to transfer</div>
            {products.filter(p => p.daysLeft > 0).map(p => (
              <div key={p.id} onClick={() => setSelected(p)} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.05)", border: `2px solid ${selected?.id === p.id ? "#7C3AED" : "transparent"}`, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 22 }}>{catIcon(p.category)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#00A896", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>{p.daysLeft} days warranty remaining</div>
                </div>
                {selected?.id === p.id && <Icon name="check" size={18} color="#7C3AED" />}
              </div>
            ))}
            <button onClick={() => { if (selected) setStep(1); }} style={{ marginTop: 8, width: "100%", background: selected ? "linear-gradient(135deg, #7C3AED, #6D28D9)" : "#E2E8F0", border: "none", borderRadius: 14, padding: "14px", color: selected ? "#fff" : "#94A3B8", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: selected ? "pointer" : "not-allowed" }}>
              Continue →
            </button>
          </div>
        )}
        {step === 1 && selected && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", marginBottom: 4 }}>Enter Buyer's Details</div>
            <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 20 }}>A signed transfer token will be sent to them</div>
            <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 8 }}>TRANSFERRING</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>{selected.daysLeft} days · {selected.serial}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Buyer's Email</div>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="buyer@example.com" style={{ width: "100%", background: "#F8FAFF", border: "2px solid #E2E8F0", borderRadius: 10, padding: "12px 14px", fontSize: 14, fontFamily: "DM Sans, sans-serif", color: "#0B1C3D", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ background: "#F5F3FF", borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#7C3AED", fontFamily: "DM Sans, sans-serif", lineHeight: 1.6 }}>
                ✅ Chain-of-ownership logged<br/>
                ✅ Receipt & warranty proof attached<br/>
                ✅ Cryptographic signature included<br/>
                ✅ Your locker archived after transfer
              </div>
            </div>
            <button onClick={() => { if (email) { toast("📧 Transfer token sent!"); setDone(true); } }} style={{ width: "100%", background: email ? "linear-gradient(135deg, #7C3AED, #6D28D9)" : "#E2E8F0", border: "none", borderRadius: 14, padding: "14px", color: email ? "#fff" : "#94A3B8", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: email ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <Icon name="send" size={18} color={email ? "#fff" : "#94A3B8"} /> Send Transfer Token
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: AMC MARKETPLACE ─────────────────────────────────────────────────
const AMCMarketplace = ({ product, onBack, toast }) => {
  const [selected, setSelected] = useState(null);
  const [purchased, setPurchased] = useState(false);

  if (purchased) return (
    <div style={{ height: "100%", background: "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 20, textAlign: "center" }}>
      <div style={{ width: 80, height: 80, background: "#FFF8EC", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 40 }}>🎉</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>Coverage Extended!</div>
      <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", lineHeight: 1.6 }}>Your <strong>{selected?.plan}</strong> from {selected?.provider} is now active for {product?.name || "your product"}.</div>
      <div style={{ background: "#FFF8EC", borderRadius: 14, padding: 16, width: "100%", border: "2px solid #F5A623" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#F5A623", fontFamily: "DM Sans, sans-serif", marginBottom: 8 }}>🛡️ {selected?.provider} {selected?.plan}</div>
        <div style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif" }}>Valid for {selected?.duration} · ₹{selected?.price?.toLocaleString("en-IN")} paid</div>
        <div style={{ height: 1, background: "#F1E6D0", margin: "10px 0" }} />
        <div style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif" }}>Policy ID: AMC-{Math.floor(Math.random() * 900000 + 100000)}</div>
      </div>
      <button onClick={onBack} style={{ width: "100%", background: "#0B1C3D", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Back to Locker</button>
    </div>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
      <div style={{ background: "linear-gradient(135deg, #7C4D00, #F5A623)", padding: "52px 20px 24px", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
          <Icon name="chevronLeft" size={16} color="#fff" />
          <span style={{ color: "#fff", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>Back</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Icon name="store" size={24} color="#fff" />
          <div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, fontFamily: "DM Sans, sans-serif" }}>Extend Warranty</div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>{product ? product.name : "Choose a plan for any product"}</div>
          </div>
        </div>
        {product && (
          <div style={{ background: "rgba(0,0,0,0.15)", borderRadius: 12, padding: "10px 14px", marginTop: 14 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontFamily: "DM Sans, sans-serif" }}>
              Current warranty: <strong style={{ color: "#fff" }}>{product.daysLeft} days left</strong> · Expires {formatDate(new Date(new Date(product.purchaseDate).setFullYear(new Date(product.purchaseDate).getFullYear() + product.warrantyYears)))}
            </div>
          </div>
        )}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", fontFamily: "DM Sans, sans-serif", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>Partner Plans</div>
        {AMC_PLANS.map(plan => (
          <div key={plan.id} onClick={() => setSelected(plan)} style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.07)", border: `2px solid ${selected?.id === plan.id ? "#F5A623" : "transparent"}`, position: "relative" }}>
            {plan.badge && (
              <div style={{ position: "absolute", top: -1, right: 14, background: plan.badge === "Most Popular" ? "#F5A623" : "#0B1C3D", borderRadius: "0 0 8px 8px", padding: "3px 10px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "DM Sans, sans-serif" }}>{plan.badge}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 28 }}>{plan.logo}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>{plan.provider}</div>
                  <div style={{ fontSize: 12, color: "#64748B", fontFamily: "DM Sans, sans-serif" }}>{plan.plan} · {plan.duration}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#F5A623", fontFamily: "DM Sans, sans-serif" }}>₹{plan.price.toLocaleString("en-IN")}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", fontFamily: "DM Sans, sans-serif" }}>per year</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {plan.features.map(f => (
                <div key={f} style={{ background: "#F0F4FF", borderRadius: 8, padding: "4px 8px", display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="check" size={10} color="#00A896" />
                  <span style={{ fontSize: 11, color: "#334155", fontFamily: "DM Sans, sans-serif" }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={12} color={s <= Math.floor(plan.rating) ? "#F5A623" : "#E2E8F0"} />)}
                <span style={{ fontSize: 11, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginLeft: 4 }}>{plan.rating}</span>
              </div>
              {selected?.id === plan.id && <div style={{ fontSize: 11, fontWeight: 700, color: "#F5A623", fontFamily: "DM Sans, sans-serif" }}>✓ Selected</div>}
            </div>
          </div>
        ))}
        <button onClick={() => { if (selected) { toast("🎉 Warranty extended with " + selected.provider + "!"); setPurchased(true); } }} style={{ width: "100%", background: selected ? "linear-gradient(135deg, #F5A623, #E8960F)" : "#E2E8F0", border: "none", borderRadius: 14, padding: "15px", color: selected ? "#fff" : "#94A3B8", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: selected ? "pointer" : "not-allowed", boxShadow: selected ? "0 4px 14px rgba(245,166,35,0.4)" : "none" }}>
          {selected ? `Buy ${selected.provider} Plan — ₹${selected.price.toLocaleString("en-IN")}` : "Select a Plan to Continue"}
        </button>
      </div>
    </div>
  );
};

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const BottomNav = ({ active, onChange, alertCount }) => {
  const tabs = [
    { id: "home", icon: "home", label: "Locker" },
    { id: "alerts", icon: "bell", label: "Alerts", badge: alertCount },
    { id: "scan", icon: "camera", label: "Scan" },
    { id: "service", icon: "phone", label: "Service" },
    { id: "transfer", icon: "transfer", label: "Transfer" },
  ];
  return (
    <div style={{ display: "flex", background: "#fff", borderTop: "1px solid #F1F5F9", padding: "8px 0 20px", flexShrink: 0, boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "4px 0", position: "relative" }}>
          {t.badge > 0 && <div style={{ position: "absolute", top: 0, right: "50%", marginRight: -16, width: 16, height: 16, background: "#EF4444", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 9, color: "#fff", fontWeight: 700, fontFamily: "DM Sans, sans-serif" }}>{t.badge}</span></div>}
          <div style={{ width: 34, height: 34, borderRadius: 12, background: active === t.id ? "#E6FBF8" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            <Icon name={t.icon} size={20} color={active === t.id ? "#00A896" : "#94A3B8"} />
          </div>
          <span style={{ fontSize: 10, fontWeight: active === t.id ? 700 : 500, color: active === t.id ? "#00A896" : "#94A3B8", fontFamily: "DM Sans, sans-serif" }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [splash, setSplash] = useState(true);
  const [tab, setTab] = useState("home");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [claimProduct, setClaimProduct] = useState(null);
  const [amcProduct, setAmcProduct] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [screen, setScreen] = useState("dashboard"); // dashboard | detail | scan | claim | amc | transfer | service

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 3000); };

  const alertCount = products.filter(p => p.daysLeft >= 0 && p.daysLeft <= 30).length;

  const handleNav = (t) => {
    setTab(t);
    setScreen(t === "home" ? "dashboard" : t === "scan" ? "scan" : t === "alerts" ? "alerts" : t === "service" ? "service" : t === "transfer" ? "transfer" : "dashboard");
  };

  if (splash) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0B1C3D" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes pulse { 0%,100%{transform:scale(1);box-shadow:0 0 40px rgba(0,201,177,0.4)} 50%{transform:scale(1.05);box-shadow:0 0 60px rgba(0,201,177,0.6)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes scanLine { 0%,100%{opacity:0;transform:translateX(-100%)} 50%{opacity:1;transform:translateX(400%)} }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        input::placeholder { color: rgba(100,116,139,0.6); }
        textarea::placeholder { color: rgba(100,116,139,0.6); }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={{ width: 390, height: 844, borderRadius: 44, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.1)", position: "relative" }}>
        <SplashScreen onDone={() => setSplash(false)} />
      </div>
    </div>
  );

  const renderScreen = () => {
    if (screen === "detail" && selectedProduct) return <ProductDetail product={selectedProduct} onBack={() => setScreen("dashboard")} onClaim={() => { setClaimProduct(selectedProduct); setScreen("claim"); }} onTransfer={() => setScreen("transfer")} onAMC={() => { setAmcProduct(selectedProduct); setScreen("amc"); }} />;
    if (screen === "scan") return <OCRScanner onBack={() => setScreen("dashboard")} onSave={(f) => { setProducts(p => [...p, { id: Date.now(), name: f.name || "New Product", brand: f.brand || "Unknown", category: f.category, model: f.model || "—", serial: f.serial || "—", purchaseDate: f.purchaseDate || "2026-02-19", purchasePrice: parseInt(f.purchasePrice) || 0, warrantyYears: parseInt(f.warrantyYears) || 1, store: f.store || "—", status: "active", daysLeft: parseInt(f.warrantyYears || 1) * 365, receipt: true }]); setScreen("dashboard"); setTab("home"); }} toast={showToast} />;
    if (screen === "claim") return <ClaimGenerator product={claimProduct} onBack={() => { setClaimProduct(null); setScreen("dashboard"); }} toast={showToast} />;
    if (screen === "amc") return <AMCMarketplace product={amcProduct} onBack={() => { setAmcProduct(null); setScreen("dashboard"); }} toast={showToast} />;
    if (screen === "transfer") return <WarrantyTransfer products={products} onBack={() => setScreen("dashboard")} toast={showToast} />;
    if (screen === "service") return <ServiceDirectory toast={showToast} />;
    if (screen === "alerts") return <AlertsScreen products={products} onAMC={(p) => { setAmcProduct(p); setScreen("amc"); }} onClaim={(p) => { setClaimProduct(p); setScreen("claim"); }} />;
    return <Dashboard products={products} onProductClick={(p) => { setSelectedProduct(p); setScreen("detail"); }} onAddProduct={() => setScreen("scan")} onNav={handleNav} />;
  };

  const showNav = !["scan", "claim"].includes(screen);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "linear-gradient(135deg, #0B1C3D 0%, #1a3a6b 50%, #0A2A1F 100%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes scanLine { 0%{left:-100%} 100%{left:100%} }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        input::placeholder { color: rgba(100,116,139,0.5); }
        textarea::placeholder { color: rgba(100,116,139,0.5); }
        ::-webkit-scrollbar { display: none; }
        button:active { opacity: 0.85; transform: scale(0.97); }
      `}</style>
      <div style={{ width: 390, height: 844, borderRadius: 44, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.1)", position: "relative", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
        {/* Status bar */}
        <div style={{ height: 44, background: screen === "dashboard" || screen === "alerts" || screen === "service" ? "#0B1C3D" : screen === "amc" ? "#7C4D00" : "#0B1C3D", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0, zIndex: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "DM Sans, sans-serif" }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 2 }}>{[3,4,5,4].map((h,i) => <div key={i} style={{ width: 3, height: h, background: "#fff", borderRadius: 1, opacity: i < 3 ? 1 : 0.4 }} />)}</div>
            <span style={{ color: "#fff", fontSize: 11 }}>WiFi</span>
            <span style={{ color: "#fff", fontSize: 11 }}>🔋</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
          {renderScreen()}
          {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}
        </div>

        {/* Bottom nav */}
        {showNav && <BottomNav active={tab} onChange={handleNav} alertCount={alertCount} />}
      </div>
    </div>
  );
}
