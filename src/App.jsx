import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import Dashboard from './pages/Dashboard';
import ProductDetail from './pages/ProductDetail';
import Alerts from './pages/Alerts';
import ClaimGenerator from './pages/ClaimGenerator';
import ServiceDirectory from './pages/ServiceDirectory';
import WarrantyTransfer from './pages/WarrantyTransfer';
import OCRScanner from './pages/OCRScanner';
import Toast from './components/ui/Toast';
import { INITIAL_PRODUCTS } from './data/mockData';

function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length + 1,
      status: "active",
      daysLeft: 365 * parseInt(product.warrantyYears), // Rough estimate
      receipt: true
    };
    setProducts([newProduct, ...products]);
  };

  return (
    <BrowserRouter>
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/dashboard" element={<Dashboard products={products} />} />
        <Route path="/product/:id" element={<ProductDetail products={products} />} />
        <Route path="/scan" element={<OCRScanner onSave={addProduct} toast={showToast} />} />
        <Route path="/alerts" element={<Alerts products={products} />} />
        <Route path="/claim/:id" element={<ClaimGenerator products={products} toast={showToast} />} />
        <Route path="/service" element={<ServiceDirectory toast={showToast} />} />
        <Route path="/transfer" element={<WarrantyTransfer products={products} toast={showToast} />} />
        <Route path="/transfer/:id" element={<WarrantyTransfer products={products} toast={showToast} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
