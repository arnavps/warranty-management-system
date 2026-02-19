import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { getStatusColor, getStatusBg, formatDate, daysLabel, catIcon } from '../utils/helpers';

const ProductDetail = ({ products, onClaim, onTransfer, onAMC }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) return <div style={{ padding: 20 }}>Product not found</div>;

    const expirDate = new Date(product.purchaseDate);
    expirDate.setFullYear(expirDate.getFullYear() + product.warrantyYears);
    const pct = Math.max(0, Math.min(100, (product.daysLeft / (product.warrantyYears * 365)) * 100));

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
            <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 28px" }}>
                <button onClick={() => navigate(-1)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
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
                        { label: "File Claim", icon: "wrench", color: "#0B1C3D", bg: "#0B1C3D", action: () => navigate(`/claim/${product.id}`) },
                        { label: "Extend Warranty", icon: "shield", color: "#F5A623", bg: "#FFF8EC", action: () => navigate('/alerts') }, // Or specific extend page
                        { label: "Transfer", icon: "transfer", color: "#7C3AED", bg: "#F5F3FF", action: () => navigate(`/transfer/${product.id}`) },
                        { label: "Service Center", icon: "phone", color: "#00A896", bg: "#E6FBF8", action: () => navigate('/service') },
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

export default ProductDetail;
