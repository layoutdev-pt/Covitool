import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const location = useLocation();

    const menuItems = [
    { path: '/admin', icon: 'dashboard', label: 'Visão Geral' },
    { path: '/admin/destaque-home', icon: 'star', label: 'Destaque Mensal' }, 
    { path: '/admin/folhetos', icon: 'auto_stories', label: 'Gerir Folhetos' },
    { path: '/admin/produtos', icon: 'shopping_bag', label: 'Produtos (Home)' },
    { path: '/admin/marcas', icon: 'verified', label: 'Marcas e Destaques (não feito)' },
    { path: '/', icon: 'public', label: 'Ver Site' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-black text-[#004BFF] tracking-tighter">
            Painel <span className="text-[#B5D318] font-medium">Admin</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-[#004BFF]/10 text-[#004BFF] font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#004BFF]'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800">Administração</h2>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#004BFF] text-white rounded-full flex items-center justify-center font-bold">
              AD
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* O `<Outlet />` é onde as páginas específicas (como o formulário de folhetos) vão ser injetadas */}
          <Outlet /> 
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;