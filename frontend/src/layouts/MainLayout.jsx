import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            CloudBlitz CRM
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600">
          © 2025 CloudBlitz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
