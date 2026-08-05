import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const location = useLocation();

  // Estados para gerir a autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // Verifica se já existe uma sessão ativa ao carregar a página
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // AQUI DEFINES A TUA SENHA (neste caso, covi2026)
    if (password === "covi2026") {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  const menuItems = [
    { path: "/admin", icon: "dashboard", label: "Visão Geral" },
    { path: "/admin/destaque-home", icon: "star", label: "Destaque Mensal" },
    { path: "/admin/produtos", icon: "shopping_bag", label: "Produtos (Home)" },
    { path: "/admin/marcas", icon: "verified", label: "Marcas da Grelha" },
    { path: "/admin/folhetos", icon: "auto_stories", label: "Gerir Folhetos" },
    { path: "/", icon: "public", label: "Ver Site" },
  ];

  // ECRÃ DE BLOQUEIO (Se não estiver autenticado)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 w-full max-w-md text-center relative overflow-hidden">
          {/* Efeito visual no fundo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-lime rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>

          <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
            <span className="material-symbols-outlined text-[#B5D318] text-4xl">
              lock
            </span>
          </div>
          <h2 className="text-3xl font-black text-[#153A81] mb-2 relative z-10 tracking-tight">
            Acesso Restrito
          </h2>
          <p className="text-gray-500 mb-8 font-medium relative z-10">
            Área de gestão do website Covitool.
          </p>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 relative z-10"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduza a palavra-passe"
              className={`p-4 border-2 rounded-2xl outline-none transition-all text-center tracking-widest font-bold ${
                error
                  ? "border-red-400 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-[#B5D318] bg-gray-50"
              }`}
            />
            {error && (
              <p className="text-red-500 text-sm font-semibold">
                Palavra-passe incorreta.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-brand-lime hover:bg-[#a1bc12] text-[#153A81] font-black py-4 rounded-2xl transition-all shadow-md hover:-translate-y-1 mt-2"
            >
              Entrar no Painel
            </button>
            <Link
              to="/"
              className="text-gray-400 hover:text-[#153A81] text-sm mt-4 transition-colors font-semibold flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              Voltar ao site público
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // ECRÃ DA DASHBOARD (Se a senha estiver correta)
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-20">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#153A81] rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-[#B5D318] text-lg">
              settings
            </span>
          </div>
          <h1 className="text-xl font-black text-[#153A81] tracking-tighter">
            Admin <span className="text-[#B5D318]">Panel</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold ${
                  isActive
                    ? "bg-[#153A81] text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-100 hover:text-[#153A81]"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Botão de Terminar Sessão no rodapé da Sidebar */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold text-red-500 hover:bg-red-50 w-full"
          >
            <span className="material-symbols-outlined">logout</span>
            Terminar Sessão
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto bg-gray-50 relative">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#153A81]">
            Gestão de Conteúdo
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-500">
              Modo Administrador
            </span>
            <div className="w-10 h-10 bg-brand-lime text-[#153A81] rounded-full flex items-center justify-center font-black shadow-sm">
              AD
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto pb-24">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
