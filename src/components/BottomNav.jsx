import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from './ui/Icon';

const BottomNav = ({ alertCount }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const tabs = [
        { id: "home", icon: "home", label: "Locker", path: "/dashboard" },
        { id: "alerts", icon: "bell", label: "Alerts", path: "/alerts", badge: alertCount },
        { id: "scan", icon: "camera", label: "Scan", path: "/scan" },
        { id: "service", icon: "phone", label: "Service", path: "/service" },
        { id: "transfer", icon: "transfer", label: "Transfer", path: "/transfer" },
    ];

    return (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: "flex", background: "#fff", borderTop: "1px solid #F1F5F9", padding: "8px 0 20px", flexShrink: 0, boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 100 }}>
            {tabs.map(t => {
                const isActive = currentPath === t.path;
                return (
                    <button key={t.id} onClick={() => navigate(t.path)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "4px 0", position: "relative" }}>
                        {t.badge > 0 && <div style={{ position: "absolute", top: 0, right: "50%", marginRight: -16, width: 16, height: 16, background: "#EF4444", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 9, color: "#fff", fontWeight: 700, fontFamily: "DM Sans, sans-serif" }}>{t.badge}</span></div>}
                        <div style={{ width: 34, height: 34, borderRadius: 12, background: isActive ? "#E6FBF8" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                            <Icon name={t.icon} size={20} color={isActive ? "#00A896" : "#94A3B8"} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? "#00A896" : "#94A3B8", fontFamily: "DM Sans, sans-serif" }}>{t.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;
