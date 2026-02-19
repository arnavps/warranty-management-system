export const INITIAL_PRODUCTS = [
  { id: 1, name: "Samsung 65\" QLED TV", brand: "Samsung", category: "Electronics", model: "QN65Q80C", serial: "SN-4829XK01", purchaseDate: "2023-08-15", purchasePrice: 89999, warrantyYears: 2, store: "Croma", status: "active", daysLeft: 42, receipt: true },
  { id: 2, name: "LG Double Door Refrigerator", brand: "LG", category: "Appliances", model: "GL-T522FPZX", serial: "LG-7821KR44", purchaseDate: "2022-11-03", purchasePrice: 54500, warrantyYears: 2, store: "Vijay Sales", status: "expiring", daysLeft: 8, receipt: true },
  { id: 3, name: "Dell XPS 15 Laptop", brand: "Dell", category: "Electronics", model: "XPS-9530", serial: "DL-9823MX77", purchaseDate: "2024-01-20", purchasePrice: 149999, warrantyYears: 1, store: "Dell Online", status: "active", daysLeft: 234, receipt: true },
  { id: 4, name: "Dyson V15 Vacuum", brand: "Dyson", category: "Appliances", model: "V15 Detect", serial: "DY-7612SV22", purchaseDate: "2023-03-10", purchasePrice: 52900, warrantyYears: 2, store: "Dyson Store", status: "active", daysLeft: 98, receipt: true },
  { id: 5, name: "Sony WH-1000XM5", brand: "Sony", category: "Electronics", model: "WH-1000XM5", serial: "SO-3321HX09", purchaseDate: "2022-06-18", purchasePrice: 29990, warrantyYears: 1, store: "Amazon", status: "expired", daysLeft: -180, receipt: false },
];

export const SERVICE_DIR = [
  { brand: "Samsung", phone: "1800-40-SAMSUNG", email: "support@samsung.in", website: "samsung.com/in", centers: ["Connaught Place, Delhi", "Andheri West, Mumbai", "Koramangala, Bengaluru"], hours: "Mon–Sat 9AM–6PM" },
  { brand: "LG", phone: "1800-315-9999", email: "lgcare@lgindia.com", website: "lg.com/in", centers: ["Karol Bagh, Delhi", "Bandra, Mumbai", "Indiranagar, Bengaluru"], hours: "Mon–Sat 9AM–7PM" },
  { brand: "Dell", phone: "1800-425-4051", email: "dell_india_support@dell.com", website: "dell.com/support", centers: ["Nehru Place, Delhi", "Powai, Mumbai", "MG Road, Bengaluru"], hours: "24/7 Phone Support" },
  { brand: "Dyson", phone: "1800-102-1011", email: "support@dyson.in", website: "dyson.in", centers: ["Khan Market, Delhi", "Juhu, Mumbai", "Whitefield, Bengaluru"], hours: "Mon–Fri 9AM–6PM" },
  { brand: "Sony", phone: "1800-103-7799", email: "sonyindia@sony.com", website: "sony.co.in", centers: ["Rajouri Garden, Delhi", "Dadar, Mumbai", "HSR Layout, Bengaluru"], hours: "Mon–Sat 10AM–6PM" },
  { brand: "Apple", phone: "000800-040-1966", email: "support@apple.com", website: "apple.com/in/support", centers: ["Select Citywalk, Delhi", "Phoenix Mills, Mumbai", "Orion Mall, Bengaluru"], hours: "Mon–Sun 10AM–8PM" },
  { brand: "Bosch", phone: "1800-266-1880", email: "bosch.care@in.bosch.com", website: "bosch-home.com/in", centers: ["South Extension, Delhi", "Worli, Mumbai", "Jayanagar, Bengaluru"], hours: "Mon–Sat 9AM–5PM" },
];

export const AMC_PLANS = [
  { id: 1, provider: "Onsitego", logo: "🛡️", plan: "Comprehensive Cover", duration: "1 Year", price: 1299, features: ["Unlimited repairs", "Doorstep service", "Spare parts included", "24/7 support"], rating: 4.7, badge: "Most Popular" },
  { id: 2, provider: "Servify", logo: "⚡", plan: "Extended Warranty+", duration: "2 Years", price: 2199, features: ["All damage covered", "No repair limit", "Free pickup & drop", "Dedicated RM"], rating: 4.5, badge: "Best Value" },
  { id: 3, provider: "WarrantyBazaar", logo: "🔰", plan: "Basic Protection", duration: "1 Year", price: 799, features: ["Manufacturing defects", "Technical support", "Online claim filing"], rating: 4.2, badge: null },
];

export const ISSUES = ["Won't turn on / No power", "Screen damage / Display issue", "Overheating", "Physical damage", "Performance issues", "Water damage", "Battery problem", "Other"];
