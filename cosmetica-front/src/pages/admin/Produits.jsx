import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const Produits = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
   const [formData, setFormData] = useState({ name: '', description: '', price: '', category_id: '' });
  const [images, setImages] = useState([]);  
  const [editId, setEditId] = useState(null);

   const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        axios.get('/products'),
        axios.get('/categories')
      ]);
      setProduits(prodRes.data.data || prodRes.data);
      setCategories(catRes.data.data || catRes.data);
    } catch (error) {
      console.error("Erreur de récupération :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Mni l-admin kay-khtar tsawer
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("⚠️ Limite de 4 images par produit dépassée !");
      e.target.value = null; // Msse7 dakchi li khtar
      setImages([]);
    } else {
      setImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category_id', formData.category_id);
    data.append('stock', formData.stock);
    
     images.forEach((img, index) => {
      data.append(`images[${index}]`, img);
    });

    try {
      if (editId) {
        data.append('_method', 'PUT');  
        await axios.post(`/products/${editId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error("Erreur d'enregistrement :", error);
      alert("Erreur: Vérifiez les champs ou la taille des images.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        await axios.delete(`/products/${id}`);
        fetchData();
      } catch (error) {
        console.error("Erreur de suppression :", error);
      }
    }
  };

  const openModal = (produit = null) => {
    if (produit) {
      setFormData({ 
        name: produit.name, 
        description: produit.description || '', 
        price: produit.price, 
        category_id: produit.category_id 
      });
      setEditId(produit.id);
    } else {
      setFormData({ name: '', description: '', price: '', category_id: '',stock: '', images: [] });
      setEditId(null);
    }
    setImages([]);  
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Produits 📦</h2>
        <button onClick={() => openModal()} className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm">
          + Nouveau Produit
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium">Nom</th>
                <th className="p-4 font-medium">Catégorie</th>
                <th className="p-4 font-medium">Prix</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.length > 0 ? (
                produits.map((prod) => (
                  <tr key={prod.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{prod.name}</td>
                    <td className="p-4 text-gray-500">{prod.category?.name || '---'}</td>
                    <td className="p-4 text-gray-900 font-bold">{prod.price} MAD</td>
                    <td className="p-4 text-right space-x-3">
                      <button onClick={() => openModal(prod)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Modifier</button>
                      <button onClick={() => handleDelete(prod.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Supprimer</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="p-8 text-center text-gray-500">Aucun produit trouvé.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{editId ? 'Modifier' : 'Nouveau'} Produit</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (MAD)</label>
                  <input type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" />
                </div>  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">stock</label>
                  <input type="number" step="0.01" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select required value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none bg-white">
                    <option value="">Sélectionner</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images (Max 4)</label>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 transition-colors"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-50">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium">Annuler</button>
                <button type="submit" className="px-4 py-2 text-white bg-rose-600 hover:bg-rose-700 rounded-xl font-medium">{editId ? 'Mettre à jour' : 'Créer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produits;