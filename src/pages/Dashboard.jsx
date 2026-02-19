import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { getStatusColor, getStatusBg, catIcon, daysLabel } from '../utils/helpers';

const Dashboard = ({ products }) => {
    const navigate = useNavigate();
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
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0B1C3D 0%, #132952 100%)", padding: "52px 20px 24px", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                        <div style={{ color: "#00C9B1", fontSize: 12, fontFamily: "DM Sans, sans-serif", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Good Morning</div>
                        <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>My Products 🛡️</div>
                    </div>
                    <button onClick={() => navigate('/scan')} style={{ width: 40, height: 40, borderRadius: 12, background: "#00C9B1", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                    <div onClick={() => navigate('/alerts')} style={{ background: "linear-gradient(135deg, #F5A623, #E8960F)", borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 4px 12px rgba(245,166,35,0.3)" }}>
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
                    <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", marginBottom: 12, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 14, transition: "transform 0.1s", border: p.status === "expiring" ? "2px solid #FEF3C7" : "2px solid transparent" }}>
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

export default Dashboard;
