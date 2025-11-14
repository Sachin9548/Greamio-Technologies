import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import AddEnquiryModal from '../components/AddEnquiryModal';
import EditEnquiryModal from '../components/EditEnquiryModal';
import ViewEnquiryModal from '../components/ViewEnquiryModal';

const EnquiryDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const { token, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch enquiries
  const fetchEnquiries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEnquiries(data.enquiries);
        setFilteredEnquiries(data.enquiries);
      }
    } catch (error) {
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Filter by tab and search
  useEffect(() => {
    let filtered = enquiries;

    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter((enq) => enq.status === activeTab);
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(
        (enq) =>
          enq.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enq.phone.includes(searchTerm)
      );
    }

    setFilteredEnquiries(filtered);
  }, [activeTab, searchTerm, enquiries]);

  // Delete enquiry
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Enquiry deleted successfully');
        fetchEnquiries();
      }
    } catch (error) {
      toast.error('Failed to delete enquiry');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'all', label: 'All', count: enquiries.length },
    { id: 'new', label: 'New', count: enquiries.filter((e) => e.status === 'new').length },
    { id: 'in-progress', label: 'In Progress', count: enquiries.filter((e) => e.status === 'in-progress').length },
    { id: 'closed', label: 'Closed', count: enquiries.filter((e) => e.status === 'closed').length },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CloudBlitz CRM</h1>
              <p className="text-sm text-gray-600">Enquiry Management System</p>
            </div>
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <button
                  onClick={() => navigate('/users')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  👥 Manage Users
                </button>
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Actions */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Enquiries</h2>
            <p className="text-gray-600">Manage customer enquiries</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
          >
            + Add Enquiry
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading enquiries...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No enquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{enquiry.customerName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{enquiry.email}</p>
                        <p className="text-sm text-gray-600">{enquiry.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 truncate max-w-xs">
                          {enquiry.message}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            enquiry.status
                          )}`}
                        >
                          {enquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedEnquiry(enquiry);
                              setShowViewModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View
                          </button>
                          {/* Only show Edit/Delete if user is admin/staff OR owns the enquiry */}
                          {(user?.role === 'admin' || 
                            user?.role === 'staff' || 
                            enquiry.createdBy?._id === user?.id) && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedEnquiry(enquiry);
                                  setShowEditModal(true);
                                }}
                                className="text-green-600 hover:text-green-800 font-medium text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(enquiry._id)}
                                className="text-red-600 hover:text-red-800 font-medium text-sm"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showAddModal && (
        <AddEnquiryModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchEnquiries();
          }}
        />
      )}

      {showEditModal && selectedEnquiry && (
        <EditEnquiryModal
          enquiry={selectedEnquiry}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEnquiry(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setSelectedEnquiry(null);
            fetchEnquiries();
          }}
        />
      )}

      {showViewModal && selectedEnquiry && (
        <ViewEnquiryModal
          enquiry={selectedEnquiry}
          onClose={() => {
            setShowViewModal(false);
            setSelectedEnquiry(null);
          }}
        />
      )}
    </div>
  );
};

export default EnquiryDashboard;
