import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const CommandesAdmin = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCommandes = async () => {
    try {
      const response = await axios.get('/orders');
      setCommandes(response.data.data || response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/admin/orders/${id}/status`, { status: newStatus });
      fetchCommandes();
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
      alert('Erreur lors de la mise à jour du statut.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Commandes </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium">ID Commande</th>
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Statut Actuel</th>
                <th className="p-4 font-medium text-right">Mettre à jour</th>
              </tr>
            </thead>
            <tbody>
              {commandes.length > 0 ? (
                commandes.map((cmd) => (
                  <tr key={cmd.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">#{cmd.id}</td>
                    <td className="p-4 text-gray-700">{cmd.user?.name || 'Client Inconnu'}</td>
                    <td className="p-4 text-gray-900 font-bold">{cmd.total_price} MAD</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${cmd.status === 'en attente' ? 'bg-amber-100 text-amber-800' : cmd.status === 'en préparation' ? 'bg-blue-100 text-blue-800' : cmd.status === 'livrée' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{cmd.status.toUpperCase()}</span>
                    </td>
                    <td className="p-4 text-right">
                      <select value={cmd.status} onChange={(e) => updateStatus(cmd.id, e.target.value)} disabled={cmd.status === 'annulée' || cmd.status === 'livrée'} className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2 disabled:opacity-50">
                        <option value="en attente">En attente</option>
                        <option value="en préparation">En préparation</option>
                        <option value="livrée">Livrée</option>
                        <option value="annulée">Annulée</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    Aucune commande trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CommandesAdmin;
