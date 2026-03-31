import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/register', formData); 
      alert('Inscription réussie ! Vous pouvez vous connecter.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('Une erreur est survenue lors de l\'inscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex selection:bg-rose-200 selection:text-rose-900">
       
       {/* Image à gauche pour le registre (équilibre le flow) */}
       <div className="hidden lg:block relative w-0 flex-1 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
          src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Soins cosmétiques"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/40 to-pink-500/20 mix-blend-multiply" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" aria-hidden="true" />
        
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h3 className="text-3xl font-bold tracking-tight mb-2">L'art de prendre soin de soi.</h3>
          <p className="text-rose-100 text-lg">Découvrez nos gammes exclusives pour votre peau.</p>
        </div>
      </div>

       <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Rejoignez-nous
            </h2>
            <p className="mt-3 text-base text-gray-500">
              Créez votre compte pour gérer vos achats et découvrir <span className="font-semibold text-rose-500">nos nouveautés</span>.
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm text-red-600 rounded-2xl text-sm font-medium text-center border border-red-100 animate-pulse">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 ml-1">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 ease-in-out"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 ml-1">Adresse Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 ease-in-out"
                  placeholder="hello@lacosmetica.com"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 ml-1">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 ease-in-out"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 ml-1">Confirmer</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    required
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 ease-in-out"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl text-sm font-bold text-white transition-all duration-300 ease-out transform mt-2 ${
                  loading 
                    ? 'bg-rose-300 cursor-wait' 
                    : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-500/30 active:scale-[0.98]'
                }`}
              >
                {loading ? 'Création en cours...' : 'Créer mon compte'}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm text-gray-600">
                Vous avez déjà un compte ?{' '}
                <Link to="/login" className="font-bold text-rose-600 hover:text-rose-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-500 after:transition-all after:duration-300">
                  Connectez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;