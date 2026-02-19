import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { SERVICE_DIR } from '../data/mockData';

const ServiceDirectory = ({ toast }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

    const filtered = SERVICE_DIR.filter(s => s.brand.toLowerCase().includes(search.toLowerCase()));

    if (selected) return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
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
                    <button onClick={() => { if (toast) toast("📞 Calling " + selected.phone); }} style={{ flex: 1, background: "#E6FBF8", border: "2px solid #00C9B1", borderRadius: 14, padding: "14px 0", color: "#00A896", fontWeight: 700, fontFamily: "DM Sans, sans-serif", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Icon name="phone" size={18} color="#00A896" /> Call Now
                    </button>
                    <button onClick={() => { if (toast) toast("📧 Opening email to " + selected.brand); }} style={{ flex: 1, background: "#F0F4FF", border: "2px solid #E2E8F0", borderRadius: 14, padding: "14px 0", color: "#0B1C3D", fontWeight: 700, fontFamily: "DM Sans, sans-serif", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
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
                        <button onClick={() => { if (toast) toast("🗺️ Opening maps..."); }} style={{ background: "#E6FBF8", border: "none", borderRadius: 8, padding: "6px 10px", color: "#00A896", fontWeight: 700, fontSize: 11, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Maps</button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
            <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 24px", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
                <button onClick={() => navigate(-1)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer", marginRight: 8, display: "flex", width: "fit-content", marginBottom: 12 }}>
                    <Icon name="chevronLeft" size={20} color="#fff" />
                </button>
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

export default ServiceDirectory;
