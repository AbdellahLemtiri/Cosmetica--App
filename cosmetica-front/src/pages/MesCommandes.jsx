import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const MesCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCommandes = async () => {
    try {
      const response = await axios.get('/orders'); // Laravel khasso y-rje3 ghir l-commandes dyal had l-user
      setCommandes(response.data.data || response.data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Voulez-vous vraiment annuler cette commande ?")) {
      try {
        await axios.put(`/orders/${id}/cancel`); // API bach t-annuler
        fetchCommandes(); // N-actualisiw l-liste
      } catch (error) {
        console.error("Erreur d'annulation:", error);
        alert("Impossible d'annuler cette commande.");
      }
    }
  };

  // Fonction sghira bach n-3tiw couleur l-kola état (Status)
  const getStatusBadge = (status) => {
    switch (status) {
      case 'en attente': return <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">En attente ⏳</span>;
      case 'en préparation': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">En préparation 📦</span>;
      case 'livrée': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">Livrée ✅</span>;
      case 'annulée': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">Annulée ❌</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Mes Commandes 📦</h1>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Chargement de vos commandes...</div>
        ) : commandes.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-gray-100">
            <p className="text-gray-500 mb-4">Vous n'avez passé aucune commande pour le moment.</p>
            <Link to="/" className="text-rose-600 font-bold hover:underline">Aller à la boutique</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {commandes.map((cmd) => (
              <div key={cmd.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Commande <span className="font-bold text-gray-900">#{cmd.id}</span></p>
                    <p className="text-xs text-gray-400">Passée le {new Date(cmd.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                    {getStatusBadge(cmd.status)}
                    <p className="font-black text-lg text-gray-900">{cmd.total_price} MAD</p>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center bg-white">
                  <p className="text-sm text-gray-600">{cmd.items_count || 0} article(s) dans cette commande</p>
                  
                  {/* L-Client y-9der y-annuler ghir ila kant en attente */}
                  {cmd.status === 'en attente' && (
                    <button 
                      onClick={() => handleCancel(cmd.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-bold bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
                    >
                      Annuler la commande
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MesCommandes;