import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Welcome = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CB</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">CloudBlitz CRM</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Need Help?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              We're Here for You
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Submit your enquiry and our team will get back to you as soon as possible. Track your request status in real-time.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg text-lg"
            >
              Submit Enquiry
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg text-lg border-2 border-blue-600"
            >
              Track My Enquiry
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-3xl">✍️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Easy to Submit
            </h3>
            <p className="text-gray-600">
              Submit your enquiry in seconds with our simple form. No complicated process.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Quick Response
            </h3>
            <p className="text-gray-600">
              Our team responds to your enquiries as soon as possible. We value your time.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-3xl">👁️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Track Status
            </h3>
            <p className="text-gray-600">
              Check your enquiry status anytime. Know exactly where your request stands.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Your information is safe with us. We protect your privacy and data security.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Direct Communication
            </h3>
            <p className="text-gray-600">
              Get updates directly. Our team keeps you informed throughout the process.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Problem Solved
            </h3>
            <p className="text-gray-600">
              We're committed to resolving your enquiry. Your satisfaction is our priority.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-12 shadow-lg mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">&lt;24h</div>
              <div className="text-gray-600">Average Response</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Secure & Private</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white shadow-xl">
          <h3 className="text-3xl font-bold mb-4">
            Have a Question or Need Assistance?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Submit your enquiry now and our team will help you as soon as possible.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg text-lg"
          >
            Submit Your Enquiry Now
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">
              © 2025 CloudBlitz CRM. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
