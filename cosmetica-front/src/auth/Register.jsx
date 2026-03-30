import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données d'inscription:", formData);
     
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Créer un compte 🧴
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez La Cosmetica aujourd'hui
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
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
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              name="password_confirmation"
              required
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
          >
            S'inscrire
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Vous avez déjà un compte ? </span>
          <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500 transition-colors">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;