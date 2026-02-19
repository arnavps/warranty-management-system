# WarrantSafe - Warranty Management System

WarrantSafe is a comprehensive warranty management application designed to help users track, manage, and extend warranties for their products. 
Built with **React** and **Vite**, it offers a seamless experience for organizing product details, filing claims, and transferring warranties.

## 🚀 Features

- **Product Locker**: Store and manage all your product warranties in one place.
- **Smart Alerts**: Get notified before your warranties expire.
- **OCR Scanner**: Quickly add products by scanning receipts and serial tags (Simulated).
- **Claim Generator**: Auto-generate warranty claim emails and PDFs.
- **Service Directory**: Instant access to customer support contacts for major brands, including service center locations.
- **Warranty Transfer**: Securely transfer warranties when selling products.
- **AMC Marketplace**: Browse and purchase extended warranty plans.

## 📂 Project Structure

The project follows a modular directory structure for scalability and maintainability.

```
warranty-management-system/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Generic UI elements (Icon, Toast)
│   │   └── BottomNav.jsx # Bottom navigation bar
│   ├── data/            # Mock data and constants
│   │   └── mockData.js  # static data for products, service centers, etc.
│   ├── pages/           # Application screens/pages
│   │   ├── SplashScreen.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── OCRScanner.jsx
│   │   ├── Alerts.jsx
│   │   ├── ClaimGenerator.jsx
│   │   ├── ServiceDirectory.jsx
│   │   └── WarrantyTransfer.jsx
│   ├── utils/           # Helper functions
│   │   └── helpers.js   # Formatting, status helpers
│   ├── App.jsx          # Main application component & Routing
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── .gitignore           # Git ignore rules
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS (with CSS Modules support potential), inline styles for rapid prototyping.
- **Icons**: Custom SVG component system (`src/components/ui/Icon.jsx`).

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd warranty-management-system
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📱 Navigation

The app features a bottom navigation bar for easy access to key sections:
- **Locker**: Dashboard showing all products.
- **Alerts**: Notifications for expiring warranties.
- **Scan**: OCR tool to add new products.
- **Service**: Directory of brand customer support.
- **Transfer**: Tool to transfer product ownership.

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
