import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
  import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';

const Panier = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!token) {
      alert("Vous devez être connecté pour passer une commande !");
      navigate('/login');
      return;
    }

    if (cart.length === 0) return;

    setLoading(true);
    try {
       const orderItems = cart.map(item => ({
        product_id: item.product.id, 
        quantity: item.quantity
      }));

      await axios.post('/orders', { items: orderItems });
      
      alert("Commande passée avec succès ! ");
      clearCart();
      navigate('/mes-commandes');  
    } catch (error) {
      console.error("Erreur lors de la commande", error);
      alert("Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Votre panier est vide 🛒</h2>
        <Link to="/" className="bg-rose-600 text-white px-6 py-3 rounded-xl hover:bg-rose-700 transition">
          Découvrir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Mon Panier 🛍️</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {cart.map((item) => (
              <li key={item.product.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.images && item.product.images[0] ? (
                      <img src={`http://127.0.0.1:8000/storage/${item.product.images[0].url}`} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-rose-50"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-500">{item.product.price} MAD x {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <p className="font-bold text-lg text-rose-600">{(item.product.price * item.quantity).toFixed(2)} MAD</p>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700 font-medium">
                    Retirer
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <p className="text-gray-500">Total à payer :</p>
              <p className="text-3xl font-black text-gray-900">{cartTotal.toFixed(2)} MAD</p>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className={`px-8 py-4 rounded-xl font-bold text-white transition-all shadow-md ${loading ? 'bg-rose-400' : 'bg-rose-600 hover:bg-rose-700 hover:shadow-lg'}`}
            >
              {loading ? 'Traitement...' : 'Passer la commande'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;