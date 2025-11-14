const ViewEnquiryModal = ({ enquiry, onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">Enquiry Details</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">Name:</span>
                <span className="text-gray-900">{enquiry.customerName}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">Email:</span>
                <span className="text-gray-900">{enquiry.email}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">Phone:</span>
                <span className="text-gray-900">{enquiry.phone}</span>
              </div>
            </div>
          </div>

          {/* Enquiry Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Enquiry Details</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-32">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(enquiry.status)}`}>
                  {enquiry.status}
                </span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">Created:</span>
                <span className="text-gray-900">
                  {new Date(enquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">Updated:</span>
                <span className="text-gray-900">
                  {new Date(enquiry.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Message</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{enquiry.message}</p>
          </div>

          {/* Created By */}
          {enquiry.createdBy && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Created By</h3>
              <div className="space-y-1">
                <p className="text-gray-900">{enquiry.createdBy.name}</p>
                <p className="text-gray-600 text-sm">{enquiry.createdBy.email}</p>
              </div>
            </div>
          )}

          {/* Assigned To */}
          {enquiry.assignedTo && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Assigned To</h3>
              <div className="space-y-1">
                <p className="text-gray-900">{enquiry.assignedTo.name}</p>
                <p className="text-gray-600 text-sm">{enquiry.assignedTo.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiryModal;
