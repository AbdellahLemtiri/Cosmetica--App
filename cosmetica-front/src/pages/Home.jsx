import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const Home = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get('/products');


        const data = {
          products: response.data.data,
          categories: response.data.categories,
          images: response.data.images,
          stock : response.data.stock,
          
        }
        setProduits(response.data.data || response.data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Découvrez <span className="text-rose-600">La Cosmetica</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Des soins naturels et premium pour sublimer votre beauté au quotidien.
          </p>
        </div>

         {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {produits.map((prod) => (
              <Link key={prod.id} to={`/produit/${prod.slug}`} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                
                 <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 h-64 relative">
                  {prod.images && prod.images.length > 0 ? (
                    <img 
                      src={`http://127.0.0.1:8000/storage/${prod.images[0].path}`} 
                      alt={prod.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-rose-50 text-rose-300">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {prod.category?.name || 'Soin'}
                  </div>
                </div>

                 <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors truncate">
                    {prod.name}
                  </h3>
                  <p className="mt-2 text-2xl font-black text-gray-900">
                    {prod.price} <span className="text-sm text-gray-500 font-medium">MAD</span>
                  </p>
                  
                   <div className="mt-4 w-full block text-center bg-rose-50 text-rose-600 font-medium py-2 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    Voir les détails
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;