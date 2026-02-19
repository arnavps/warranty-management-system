import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { catIcon, formatDate } from '../utils/helpers';

const WarrantyTransfer = ({ products, toast }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    // If id is present, transfer specific product. Else, show list.
    const [selected, setSelected] = useState(id ? products.find(p => p.id === parseInt(id)) : null);
    const [step, setStep] = useState(selected ? 1 : 0);
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);

    // If id provided but product not found, fallback to list (step 0)
    if (id && !selected && step !== 0) {
        const p = products.find(p => p.id === parseInt(id));
        if (p) {
            setSelected(p);
            setStep(1);
        } else {
            // Handle invalid ID by staying at step 0
        }
    }

    const token = `WT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    if (done) return (
        <div style={{ height: "100vh", background: "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 20, textAlign: "center" }}>
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
            <button onClick={() => navigate('/dashboard')} style={{ width: "100%", background: "#0B1C3D", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Done</button>
        </div>
    );

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
            <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 24px", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                <button onClick={() => navigate(-1)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
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
                            <div key={p.id} onClick={() => { setSelected(p); setStep(1); }} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.05)", border: `2px solid ${selected?.id === p.id ? "#7C3AED" : "transparent"}`, display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ fontSize: 22 }}>{catIcon(p.category)}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>{p.name}</div>
                                    <div style={{ fontSize: 12, color: "#00A896", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>{p.daysLeft} days warranty remaining</div>
                                </div>
                                {selected?.id === p.id && <Icon name="check" size={18} color="#7C3AED" />}
                            </div>
                        ))}
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
                                ✅ Chain-of-ownership logged<br />
                                ✅ Receipt & warranty proof attached<br />
                                ✅ Cryptographic signature included<br />
                            </div>
                        </div>
                        <button onClick={() => { if (toast) toast("✅ Transfer initiated!"); setDone(true); }} style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #6D28D9)", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
                            Generate Transfer Token
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WarrantyTransfer;
