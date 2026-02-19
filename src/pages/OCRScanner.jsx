import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';

const OCRScanner = ({ onSave, toast }) => {
    const navigate = useNavigate();
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

    const handleSave = () => {
        onSave(form);
        navigate('/dashboard');
        // Toast should be handled by parent or context, but for now passed as prop
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
        <div key="step0">
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
        <div key="step1">
            <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#0B1C3D", fontFamily: "DM Sans, sans-serif" }}>Scan Your Receipt</div>
                <div style={{ fontSize: 13, color: "#64748B", fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>Point camera at your purchase receipt</div>
            </div>
            <ScannerView label="receipt" onCapture={() => simulateScan("receipt")} />
        </div>,

        // Step 2: Serial scan
        <div key="step2">
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
        <div key="step3">
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
                <button onClick={handleSave} style={{ marginTop: 8, width: "100%", background: "linear-gradient(135deg, #00C9B1, #00A896)", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
                    Save to Locker
                </button>
            </div>
        </div>
    ];

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F0F4FF" }}>
            <div style={{ background: "linear-gradient(135deg, #0B1C3D, #132952)", padding: "52px 20px 20px" }}>
                <button onClick={() => navigate(-1)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
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

export default OCRScanner;
