const Dashboard = () => {
  const stats = [
    { title: "Ventes Totales", value: "45,200 MAD", color: "bg-green-100 text-green-800" },
    { title: "Commandes en attente", value: "12", color: "bg-amber-100 text-amber-800" },
    { title: "Produits en stock", value: "156", color: "bg-blue-100 text-blue-800" },
    { title: "Catégories", value: "8", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Aperçu des Statistiques 📊</h2>
      
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 flex items-center justify-center">
          <p className="text-gray-400">Graphique des produits les plus populaires (À venir)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 flex items-center justify-center">
          <p className="text-gray-400">Répartition par catégorie (À venir)</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;