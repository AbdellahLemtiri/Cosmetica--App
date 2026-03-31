import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../api/axios';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/login', data);
      const user = response.data.user;
      const token = response.data.token;
      
      login(user, token);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Email ou mot de passe incorrect !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex selection:bg-rose-200 selection:text-rose-900">
       <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          
          <div className="text-center lg:text-left mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 mb-6 lg:mx-0 mx-auto text-rose-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Bon retour !
            </h2>
            <p className="mt-3 text-base text-gray-500">
              Accédez à votre espace d'élégance <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">La Cosmetica</span>
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm text-red-600 rounded-2xl text-sm font-medium text-center border border-red-100 animate-pulse">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 ml-1">Adresse Email</label>
                <input
                  type="email"
                  required
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 ease-in-out"
                  placeholder="hello@lacosmetica.com"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between ml-1">
                  <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                  <a href="#" className="text-xs font-semibold text-rose-600 hover:text-rose-500">Oublié ?</a>
                </div>
                <input
                  type="password"
                  required
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 ease-in-out"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl text-sm font-bold text-white transition-all duration-300 ease-out transform ${
                  loading 
                    ? 'bg-rose-300 cursor-wait' 
                    : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-500/30 active:scale-[0.98]'
                }`}
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm text-gray-600">
                Vous n'avez pas de compte ?{' '}
                <Link to="/register" className="font-bold text-rose-600 hover:text-rose-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-500 after:transition-all after:duration-300">
                  Créez-en un ici
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partie Droite : Image Moderne */}
      <div className="hidden lg:block relative w-0 flex-1 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Produits cosmétiques"
        />
        {/* Gradient Overlay pour un look premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/30 to-purple-900/40 mix-blend-multiply" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" aria-hidden="true" />
        
        {/* Quote overlay */}
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h3 className="text-3xl font-bold tracking-tight mb-2">Sublimez votre beauté naturelle.</h3>
          <p className="text-rose-100 text-lg">Rejoignez des milliers de clientes satisfaites.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;