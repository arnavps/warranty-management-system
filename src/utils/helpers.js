export const getStatusColor = (status) => ({ active: "#00C9B1", expiring: "#F5A623", expired: "#EF4444" }[status] || "#00C9B1");
export const getStatusBg = (status) => ({ active: "#E6FBF8", expiring: "#FFF8EC", expired: "#FEF2F2" }[status] || "#E6FBF8");
export const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
export const daysLabel = (d) => d < 0 ? `Expired ${Math.abs(d)}d ago` : d === 0 ? "Expires today!" : `${d} days left`;
export const catIcon = (c) => ({ Electronics: "📱", Appliances: "🏠", Furniture: "🪑", Vehicles: "🚗" }[c] || "📦");
