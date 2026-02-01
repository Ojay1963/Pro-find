import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUpload, FaTimes, FaHome, FaMapMarkerAlt, FaMoneyBillWave, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { storage } from '../utils/localStorage';

export default function CreateListing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const [step, setStep] = useState(1);
  
  // Load existing listing if editing
  const existingListing = editId ? storage.getListingById(parseInt(editId)) : null;
  
  const [formData, setFormData] = useState({
    // Basic Info
    title: existingListing?.title || '',
    description: existingListing?.description || '',
    location: existingListing?.location || '',
    propertyType: existingListing?.propertyType || '',
    listingType: existingListing?.listingType || '', // Buy, Rent, Lease
    price: existingListing?.price || '',
    
    // Specifications
    beds: existingListing?.beds || '',
    baths: existingListing?.baths || '',
    area: existingListing?.area || '',
    yearBuilt: existingListing?.yearBuilt || '',
    parking: existingListing?.parking || '',
    
    // Additional
    amenities: existingListing?.amenities || [],
    images: existingListing?.images || [],
    virtualTourUrl: existingListing?.virtualTourUrl || '',
    
    // Contact
    contactName: existingListing?.contactName || '',
    contactEmail: existingListing?.contactEmail || '',
    contactPhone: existingListing?.contactPhone || '',
  });

  const propertyTypes = ['House', 'Apartment', 'Land', 'Commercial'];
  const listingTypes = ['Buy', 'Rent', 'Lease'];
  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 
    'Elevator', 'Air Conditioning', 'Furnished', 'Unfurnished',
    'WiFi', 'Generator', 'Water Supply', '24/7 Security'
  ];

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }
    
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          images: [...formData.images, { file, preview: e.target.result }]
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const toggleAmenity = (amenity) => {
    const amenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities });
  };

  const validateStep = (stepNum) => {
    switch (stepNum) {
      case 1:
        if (!formData.title || !formData.location || !formData.propertyType || !formData.listingType || !formData.price) {
          toast.error('Please fill in all required fields');
          return false;
        }
        return true;
      case 2:
        // For Land, only area is required. For Commercial, area and parking recommended. For residential, beds/baths/area required.
        if (!formData.area) {
          toast.error('Please fill in the area/size');
          return false;
        }
        if (formData.propertyType !== 'Land' && formData.propertyType !== 'Commercial') {
          if (!formData.beds || !formData.baths) {
            toast.error('Please fill in all required specifications');
            return false;
          }
        }
        return true;
      case 3:
        if (formData.images.length === 0) {
          toast.error('Please upload at least one image');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    // In a real app, this would upload to backend
    const currentUser = storage.getCurrentUser();
    const userId = currentUser?.id || parseInt(localStorage.getItem('profind_user_id') || '0');
    
    const listing = {
      ...formData,
      ownerId: userId,
      badge: formData.listingType === 'Buy' ? 'For Sale' : formData.listingType,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    if (editId && existingListing) {
      // Update existing listing
      storage.updateListing(parseInt(editId), listing);
      // Update virtual tour if provided
      if (formData.virtualTourUrl) {
        storage.addVirtualTour(parseInt(editId), formData.virtualTourUrl);
      }
      toast.success('Listing updated successfully!');
    } else {
      // Create new listing
      const savedListing = await storage.addListing(listing);
      // Save virtual tour if provided
      if (formData.virtualTourUrl) {
        storage.addVirtualTour(savedListing.id, formData.virtualTourUrl);
      }
      toast.success('Listing created successfully! It will be reviewed before publishing.');
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{editId ? 'Edit Listing' : 'Create New Listing'}</h1>
          <p className="text-gray-600 mb-6">{editId ? 'Update your listing details' : 'Fill in the details to list your property'}</p>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((num) => (
                <React.Fragment key={num}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= num ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {num}
                    </div>
                    <span className={`ml-2 hidden sm:block ${step >= num ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
                      {num === 1 ? 'Basic Info' : num === 2 ? 'Specifications' : num === 3 ? 'Photos' : 'Review'}
                    </span>
                  </div>
                  {num < 4 && <div className={`flex-1 h-1 mx-2 ${step > num ? 'bg-green-600' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Property Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Modern 3-Bedroom Apartment in Lekki"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Describe your property in detail..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt /> Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Lekki, Lagos"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Property Type *</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select Type</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Listing Type *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {listingTypes.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleInputChange('listingType', type)}
                          className={`p-3 border-2 rounded-lg font-medium transition ${
                            formData.listingType === type
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-300 hover:border-green-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <FaMoneyBillWave /> Price (₦) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="850000000"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Specifications */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Beds - only for residential properties */}
                  {formData.propertyType !== 'Land' && (
                    <div>
                      <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        <FaBed /> Beds {formData.propertyType === 'Commercial' ? '' : '*'}
                      </label>
                      <input
                        type="number"
                        value={formData.beds}
                        onChange={(e) => handleInputChange('beds', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        min="0"
                        required={formData.propertyType !== 'Commercial'}
                      />
                    </div>
                  )}

                  {/* Baths - only for residential properties */}
                  {formData.propertyType !== 'Land' && (
                    <div>
                      <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        <FaBath /> Baths {formData.propertyType === 'Commercial' ? '' : '*'}
                      </label>
                      <input
                        type="number"
                        value={formData.baths}
                        onChange={(e) => handleInputChange('baths', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        min="0"
                        required={formData.propertyType !== 'Commercial'}
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <FaRulerCombined /> Area (sqm) *
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="1200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Parking</label>
                    <input
                      type="number"
                      value={formData.parking}
                      onChange={(e) => handleInputChange('parking', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Year Built</label>
                  <input
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Amenities</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {amenitiesList.map(amenity => (
                      <label
                        key={amenity}
                        className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="rounded"
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Property Photos</h2>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Upload Images (Max 10, 5MB each) *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Choose Images
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.preview}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTimes />
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                            Main
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Virtual Tour (Optional)</h3>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Virtual Tour URL</label>
                    <input
                      type="url"
                      value={formData.virtualTourUrl}
                      onChange={(e) => handleInputChange('virtualTourUrl', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="https://example.com/virtual-tour"
                    />
                    <p className="text-sm text-gray-500 mt-1">Paste a link to a virtual tour (Matterport, YouTube, etc.)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Contact */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Review & Contact Information</h2>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-2">{formData.title}</h3>
                  <p className="text-gray-600 mb-2">{formData.location}</p>
                  <p className="text-green-600 font-bold text-xl">₦{parseInt(formData.price || 0).toLocaleString()}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span>{formData.beds} Beds</span>
                    <span>{formData.baths} Baths</span>
                    <span>{formData.area} sqm</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Contact Name *</label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Contact Email *</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="0803 123 4567"
                    required
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={() => step > 1 ? setStep(step - 1) : navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {step > 1 ? 'Previous' : 'Cancel'}
              </button>
              
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editId ? 'Update Listing' : 'Publish Listing'}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
