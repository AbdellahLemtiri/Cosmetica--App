import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données de connexion:", credentials);
    
   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Bienvenue ! ✨
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous pour accéder à La Cosmetica
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              placeholder="votre@email.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
          >
            Se Connecter
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Pas encore de compte ? </span>
          <Link to="/register" className="font-medium text-pink-600 hover:text-pink-500 transition-colors">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;