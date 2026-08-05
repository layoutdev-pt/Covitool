import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const opcoesAdmin = [
    {
      path: "/admin/destaque-home",
      icon: "star",
      label: "Destaque Mensal",
      desc: "Edita o folheto de destaque que aparece na página inicial.",
      cor: "bg-amber-500",
    },
    {
      path: "/admin/produtos",
      icon: "shopping_bag",
      label: "Produtos (Home)",
      desc: "Gerir os produtos em evidência na montra da página principal.",
      cor: "bg-blue-600",
    },
    {
      path: "/admin/folhetos",
      icon: "auto_stories",
      label: "Gerir Folhetos",
      desc: "Adiciona, remove ou organiza os PDFs dos teus folhetos mensais.",
      cor: "bg-indigo-600",
    },
    {
      path: "/admin/marcas",
      icon: "verified",
      label: "Marcas da Grelha",
      desc: "Configura a grelha de marcas, cores e efeitos.",
      cor: "bg-emerald-600",
    },
    {
      path: "/",
      icon: "public",
      label: "Ver Site",
      desc: "Abre o site público para verificar as alterações em tempo real.",
      cor: "bg-gray-700",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho do Dashboard */}
      <div>
        <h1 className="text-3xl font-black text-brand-blue">
          Bem-vindo, Administrador
        </h1>
        <p className="text-gray-500 mt-2">
          Escolha uma das secções abaixo para começar a gerir o conteúdo da
          Covitool.
        </p>
      </div>

      {/* Grelha de Opções Dinâmica */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opcoesAdmin.map((opcao) => (
          <Link
            key={opcao.path}
            to={opcao.path}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-lime transition-all duration-300 group flex flex-col gap-4"
          >
            <div
              className={`w-14 h-14 ${opcao.cor} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <span className="material-symbols-outlined text-3xl">
                {opcao.icon}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-blue group-hover:text-brand-lime transition-colors">
                {opcao.label}
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {opcao.desc}
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center text-sm font-bold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
              Aceder agora{" "}
              <span className="material-symbols-outlined ml-1 text-sm">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
