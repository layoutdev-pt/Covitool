import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Marcas from './pages/Marcas';
import SobreNos from './pages/SobreNos';
import Folhetos from './pages/Folhetos';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import AdminFolhetos from './pages/admin/AdminFolhetos';
import AdminProdutos from './pages/admin/AdminProdutos'; 
import AdminDestaque from './pages/admin/AdminDestaque';
import AdminMarcas from './pages/admin/AdminMarcas'; 

const PublicLayout = () => (
  <>
    <Header />
    <main className="flex-grow pt-32 min-h-screen bg-gray-50">
      <Outlet />
    </main>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/folhetos" element={<Folhetos />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="folhetos" element={<AdminFolhetos />} />
          <Route path="produtos" element={<AdminProdutos />} /> 
          <Route path="destaque-home" element={<AdminDestaque />} />
          <Route path="marcas" element={<AdminMarcas />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;