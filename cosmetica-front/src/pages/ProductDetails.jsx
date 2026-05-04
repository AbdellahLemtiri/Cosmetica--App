import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${slug}`);
        setProduit(response.data.data || response.data);
      } catch (error) {
        console.error('Erreur:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, navigate]);

   const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(produit, quantity);
    alert(`Ajouté au panier : ${quantity} x ${produit.name}`);
   };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (!produit) return null;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-rose-600 font-medium mb-8 flex items-center transition-colors">
          &larr; Retour au catalogue
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Section Images */}
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-w-1 aspect-h-1 h-96">{produit.images && produit.images.length > 0 ? <img src={`http://localhost:8000/storage/${produit.images[mainImage].url}`} alt={produit.name} className="w-full h-full object-cover object-center" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">Pas d'image</div>}</div>

            {produit.images && produit.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {produit.images.map((img, idx) => (
                  <button key={img.id} onClick={() => setMainImage(idx)} className={`rounded-xl overflow-hidden h-24 border-2 transition-all ${mainImage === idx ? 'border-rose-600' : 'border-transparent'}`}>
                    <img src={`http://127.0.0.1:8000/storage/${img.url}`} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold tracking-widest text-rose-500 uppercase">{produit.category?.name}</span>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">{produit.name}</h1>
            <p className="mt-4 text-3xl font-black text-gray-900">{produit.price} MAD</p>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-3 text-base text-gray-600 whitespace-pre-line leading-relaxed">{produit.description}</p>
            </div>

            <div className="mt-10 flex items-center space-x-4">
              <div className="flex items-center border-2 border-gray-200 rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-bold">
                  -
                </button>
                <span className="px-4 py-3 font-bold text-gray-900 w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-bold">
                  +
                </button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-rose-200 transition-all">
                Ajouter au panier 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
