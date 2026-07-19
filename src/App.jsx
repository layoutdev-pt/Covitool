import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // Importação do Footer
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

// Layout Público (Com Header e Footer)
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-32 bg-gray-50">
      <Outlet />
    </main>
    <Footer /> {/* O Footer entra aqui, logo a seguir ao conteúdo principal! */}
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rotas Públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/folhetos" element={<Folhetos />} />
        </Route>

        {/* Rotas de Administração */}
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