import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EditEnquiryModal = ({ enquiry, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: enquiry.customerName,
    email: enquiry.email,
    phone: enquiry.phone,
    message: enquiry.message,
    status: enquiry.status,
    assignedTo: enquiry.assignedTo?._id || '',
  });
  const [staffUsers, setStaffUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  // Fetch staff users
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setStaffUsers(data.users.filter(u => u.role === 'staff' || u.role === 'admin'));
        }
      } catch (error) {
        console.error('Failed to fetch staff');
      }
    };
    fetchStaff();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/enquiries/${enquiry._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Enquiry updated successfully!');
        onSuccess();
      } else {
        toast.error('Failed to update enquiry');
      }
    } catch (error) {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">Edit Enquiry</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

         <div className="flex gap-4">
  {/* Status */}
  <div className="flex-1">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Status *
    </label>
    <select
      name="status"
      value={formData.status}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
    >
      <option value="new">New</option>
      <option value="in-progress">In Progress</option>
      <option value="closed">Closed</option>
    </select>
  </div>

  {/* Assign To */}
  <div className="flex-1">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Assign To
    </label>
    <select
      name="assignedTo"
      value={formData.assignedTo}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
    >
      <option value="">Unassigned</option>
      {staffUsers.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name} ({user.role})
        </option>
      ))}
    </select>
  </div>
</div>


          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-green-300"
            >
              {loading ? 'Updating...' : 'Update Enquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEnquiryModal;
