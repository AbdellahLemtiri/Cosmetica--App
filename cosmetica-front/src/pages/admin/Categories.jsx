import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
   const [formData, setFormData] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);  
   const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/categories');
       setCategories(response.data.data || response.data); 
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
         await axios.put(`/categories/${editId}`, formData);
      } else {
         await axios.post('/categories', formData);
      }
      fetchCategories();  
      closeModal();
    } catch (error) {
      console.error("Erreur d'enregistrement :", error);
      alert("Une erreur s'est produite !");
    }
  };

   const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      try {
        await axios.delete(`/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Erreur de suppression :", error);
      }
    }
  };

   const openModal = (category = null) => {
    if (category) {
      setFormData({ name: category.name, description: category.description || '' });
      setEditId(category.id);
    } else {
      setFormData({ name: '', description: '' });
      setEditId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', description: '' });
    setEditId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Catégories 🏷️</h2>
        <button 
          onClick={() => openModal()}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm"
        >
          + Nouvelle Catégorie
        </button>
      </div>

       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Nom</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-gray-500">#{cat.id}</td>
                    <td className="p-4 font-medium text-gray-900">{cat.name}</td>
                    <td className="p-4 text-gray-500 truncate max-w-xs">{cat.description || '-'}</td>
                    <td className="p-4 text-right space-x-3">
                      <button onClick={() => openModal(cat)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Modifier
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">Aucune catégorie trouvée.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

       {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {editId ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la catégorie</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                  placeholder="Ex: Soins du visage"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all resize-none"
                  placeholder="Description (Optionnelle)"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 text-white bg-rose-600 hover:bg-rose-700 rounded-xl font-medium transition-colors shadow-sm">
                  {editId ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;