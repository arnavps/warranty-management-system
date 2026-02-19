import React from 'react';
import Icon from './Icon';

const Toast = ({ msg, onClose }) => (
    <div style={{ position: "absolute", bottom: 90, left: 16, right: 16, background: "#0B1C3D", color: "#fff", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", animation: "slideUp 0.3s ease" }}>
        <span style={{ fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>{msg}</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#00C9B1", cursor: "pointer", padding: 0, marginLeft: 12 }}><Icon name="x" size={16} /></button>
    </div>
);

export default Toast;
