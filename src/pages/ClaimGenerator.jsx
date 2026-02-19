import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { formatDate } from '../utils/helpers';
import { SERVICE_DIR, ISSUES } from '../data/mockData';

const ClaimGenerator = ({ products, toast }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id));

    const [step, setStep] = useState(0);
    const [issue, setIssue] = useState("");
    const [desc, setDesc] = useState("");
    const [sent, setSent] = useState(false);

    if (!product) return (
        <div style={{ height: "100vh", background: "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 20 }}>
            <div style={{ fontSize: 48 }}>📋</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif", textAlign: "center" }}>Product not found</div>
            <button onClick={() => navigate('/dashboard')} style={{ background: "#0B1C3D", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Back to Dashboard</button>
        </div>
    );

    const service = SERVICE_DIR.find(s => s.brand === product?.brand) || SERVICE_DIR[0];
    const expirDate = new Date(product.purchaseDate);
    expirDate.setFullYear(expirDate.getFullYear() + product.warrantyYears);

    if (sent) return (
        <div style={{ height: "100vh", background: "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 20, textAlign: "center" }}>
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
            <button onClick={() => navigate('/dashboard')} style={{ width: "100%", background: "#0B1C3D", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>Back to Locker</button>
        </div>
    );

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
            <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 20px", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                <button onClick={() => navigate(-1)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
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
                                <strong>To:</strong> {service.email}<br />
                                <strong>Subject:</strong> Warranty Claim — {product.name} (S/N: {product.serial})<br /><br />
                                Dear {product.brand} Support,<br /><br />
                                I am filing a warranty claim for my <strong>{product.name}</strong> (Model: {product.model}, S/N: {product.serial}) purchased on {formatDate(product.purchaseDate)} from {product.store}.<br /><br />
                                <strong>Issue:</strong> {issue}<br />
                                {desc && <><strong>Description:</strong> {desc}<br /><br /></>}
                                Warranty valid until: {formatDate(expirDate)}<br />
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
                            <button onClick={() => { if (toast) toast("📥 Claim PDF downloaded!"); }} style={{ flex: 1, background: "#F0F4FF", border: "2px solid #E2E8F0", borderRadius: 14, padding: "14px 0", color: "#0B1C3D", fontSize: 14, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                <Icon name="download" size={16} color="#0B1C3D" /> Save PDF
                            </button>
                            <button onClick={() => { if (toast) toast("📧 Claim sent to " + product.brand + "!"); setSent(true); }} style={{ flex: 2, background: "linear-gradient(135deg, #00C9B1, #00A896)", border: "none", borderRadius: 14, padding: "14px 0", color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                <Icon name="send" size={16} color="#fff" /> Send Claim
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClaimGenerator;
