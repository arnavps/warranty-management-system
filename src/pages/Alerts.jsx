import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { catIcon } from '../utils/helpers';

const Alerts = ({ products, onAMC }) => {
    const navigate = useNavigate();
    const [dismissed, setDismissed] = useState([]);

    const alerts = products
        .filter(p => p.daysLeft <= 30 && p.daysLeft > -1 && !dismissed.includes(p.id))
        .sort((a, b) => a.daysLeft - b.daysLeft);
    const expired = products.filter(p => p.daysLeft < 0);

    const handleClaim = (p) => {
        navigate(`/claim/${p.id}`);
    };

    const handleAMC = (p) => {
        if (onAMC) onAMC(p);
    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
            <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 24px", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={() => navigate(-1)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer", marginRight: 8, display: "flex" }}>
                        <Icon name="chevronLeft" size={20} color="#fff" />
                    </button>
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
                                    <button onClick={() => handleAMC(p)} style={{ flex: 1, background: "linear-gradient(135deg, #F5A623, #E8960F)", border: "none", borderRadius: 10, padding: "10px 0", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Extend Warranty</button>
                                    <button onClick={() => handleClaim(p)} style={{ flex: 1, background: "#F0F4FF", border: "2px solid #E2E8F0", borderRadius: 10, padding: "10px 0", color: "#0B1C3D", fontSize: 12, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>File Claim</button>
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
                                <button onClick={() => handleAMC(p)} style={{ background: "#FEF2F2", border: "none", borderRadius: 8, padding: "6px 10px", color: "#EF4444", fontSize: 11, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Renew</button>
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

export default Alerts;
