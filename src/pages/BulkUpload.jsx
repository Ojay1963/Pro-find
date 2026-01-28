import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUpload, FaFileExcel, FaDownload, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';
// Simple CSV parser - for production, install papaparse: npm install papaparse
const parseCSV = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length === 0) return { data: [], errors: [] };
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const data = [];
  const errors = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    if (values.length !== headers.length) {
      errors.push(`Row ${i + 1}: Column count mismatch`);
      continue;
    }
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] || '';
    });
    data.push(row);
  }
  
  return { data, errors };
};

const unparseCSV = (data) => {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = [headers.join(',')];
  data.forEach(row => {
    rows.push(headers.map(h => `"${row[h] || ''}"`).join(','));
  });
  return rows.join('\n');
};

export default function BulkUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        toast.error('Please upload a CSV file');
        return;
      }
      setFile(selectedFile);
      previewCSV(selectedFile);
    }
  };

  const previewCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const result = parseCSV(text);
      setPreview(result.data.slice(0, 5));
      if (result.errors.length > 0) {
        toast.error('CSV parsing errors detected');
      }
    };
    reader.readAsText(file);
  };

  const handleBulkUpload = () => {
    if (!file) {
      toast.error('Please select a CSV file');
      return;
    }

    setUploading(true);
    const currentUser = storage.getCurrentUser();
    const userId = currentUser?.id || localStorage.getItem('profind_user_id');

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const result = parseCSV(text);
      
      if (result.errors.length > 0 && result.data.length === 0) {
        setUploading(false);
        toast.error('Error parsing CSV: ' + result.errors[0]);
        return;
      }
      
      const listings = [];
      const errors = [];

      result.data.forEach((row, index) => {
        try {
          // Validate required fields
          if (!row.title || !row.location || !row.price || !row.propertyType || !row.listingType) {
            errors.push(`Row ${index + 2}: Missing required fields`);
            return;
          }

          const listing = {
            id: Date.now() + index,
            userId: userId,
            title: row.title,
            description: row.description || '',
            location: row.location,
            propertyType: row.propertyType,
            listingType: row.listingType, // Buy, Rent, Lease
            price: row.price,
            beds: parseInt(row.beds) || 0,
            baths: parseInt(row.baths) || 0,
            area: parseInt(row.area) || 0,
            yearBuilt: row.yearBuilt || '',
            parking: row.parking || '',
            amenities: row.amenities ? row.amenities.split(',').map(a => a.trim()) : [],
            images: [],
            contactName: row.contactName || currentUser?.name || '',
            contactEmail: row.contactEmail || currentUser?.email || '',
            contactPhone: row.contactPhone || currentUser?.phone || '',
            virtualTourUrl: row.virtualTourUrl || '',
            badge: row.listingType === 'Buy' ? 'For Sale' : row.listingType,
            createdAt: new Date().toISOString(),
            status: 'pending'
          };

          listings.push(listing);
        } catch (error) {
          errors.push(`Row ${index + 2}: ${error.message}`);
        }
      });

      // Save all listings
      const existingListings = storage.getListings();
      const updatedListings = [...existingListings, ...listings];
      localStorage.setItem('profind_listings', JSON.stringify(updatedListings));

      // Save virtual tours
      listings.forEach(listing => {
        if (listing.virtualTourUrl) {
          storage.addVirtualTour(listing.id, listing.virtualTourUrl);
        }
      });

      setUploading(false);
      
      if (errors.length > 0) {
        toast.error(`${listings.length} listings created, ${errors.length} errors`);
      } else {
        toast.success(`${listings.length} listings uploaded successfully! They will be reviewed before publishing.`);
      }
      
      setTimeout(() => navigate('/dashboard'), 1500);
    };
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const template = [
      {
        title: 'Modern 3-Bedroom Apartment',
        description: 'Beautiful apartment in prime location',
        location: 'Lekki, Lagos',
        propertyType: 'Apartment',
        listingType: 'Rent',
        price: '5000000',
        beds: '3',
        baths: '2',
        area: '150',
        yearBuilt: '2020',
        parking: '2',
        amenities: 'Swimming Pool, Gym, Security',
        contactName: 'John Doe',
        contactEmail: 'john@example.com',
        contactPhone: '08031234567',
        virtualTourUrl: ''
      }
    ];

    const csv = unparseCSV(template);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Template downloaded!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Bulk Upload Properties</h1>
            <p className="text-gray-600">Upload multiple properties at once using a CSV file</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Upload CSV File</h2>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaDownload />
                Download Template
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FaFileExcel className="text-5xl text-green-600 mx-auto mb-4" />
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="cursor-pointer inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaUpload className="inline mr-2" />
                Choose CSV File
              </label>
              {file && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Selected: {file.name}</p>
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm"
                  >
                    <FaTimes className="inline mr-1" />
                    Remove
                  </button>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">CSV format only. Max file size: 5MB</p>
            </div>

            {preview && preview.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Preview (first 5 rows)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(preview[0]).map(key => (
                          <th key={key} className="border border-gray-200 px-3 py-2 text-left">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, idx) => (
                        <tr key={idx}>
                          {Object.values(row).map((cell, cellIdx) => (
                            <td key={cellIdx} className="border border-gray-200 px-3 py-2">
                              {cell?.toString().substring(0, 30) || ''}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleBulkUpload}
                disabled={!file || uploading}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Upload Properties
                  </>
                )}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-bold mb-3 text-blue-900">CSV Format Instructions</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Required fields: title, location, price, propertyType, listingType</li>
              <li>• Property types: House, Apartment, Land, Commercial</li>
              <li>• For Land properties, beds and baths are not required</li>
              <li>• For Commercial properties, beds and baths are optional</li>
              <li>• Listing types: Buy, Rent, Lease</li>
              <li>• Amenities: Separate multiple with commas (e.g., "Pool, Gym, Security")</li>
              <li>• Virtual tour URLs are optional</li>
              <li>• All uploaded listings will have "pending" status until admin approval</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
