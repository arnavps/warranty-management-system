import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => {
            navigate('/dashboard');
        }, 2200);
        return () => clearTimeout(t);
    }, [navigate]);

    return (
        <div style={{ height: "100vh", background: "linear-gradient(160deg, #0B1C3D 0%, #132952 60%, #0A2A1F 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, #00C9B1, #00A896)", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(0,201,177,0.4)", animation: "pulse 1.5s infinite" }}>
                <Icon name="shield" size={40} color="#fff" />
            </div>
            <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "DM Sans, sans-serif", letterSpacing: -1 }}>WarrantSafe</div>
                <div style={{ fontSize: 14, color: "#00C9B1", marginTop: 4, fontFamily: "DM Sans, sans-serif" }}>Your Warranty, Always Protected</div>
            </div>
            <div style={{ position: "absolute", bottom: 60, display: "flex", gap: 6 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: i === 0 ? 20 : 6, height: 6, borderRadius: 3, background: i === 0 ? "#00C9B1" : "rgba(255,255,255,0.3)", transition: "all 0.3s" }} />)}
            </div>
        </div>
    );
};

export default SplashScreen;
