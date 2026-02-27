import React, { useState } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';

export default function VirtualTour({ propertyId, tours = [] }) {
  const [selectedTour, setSelectedTour] = useState(null);

  if (tours.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Virtual Tours</h3>

      {/* Virtual Tours */}
      {tours.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <FaPlay className="text-green-600" />
            Virtual Tours
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {tours.map((tour, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedTour(tour)}
                className="relative cursor-pointer group rounded-lg overflow-hidden border border-gray-200 hover:border-green-500 transition-colors"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <FaPlay className="text-4xl text-green-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm">
                  Virtual Tour {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tour Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] relative">
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100"
            >
              <FaTimes />
            </button>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-4">Virtual Tour</h3>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                {selectedTour.tourUrl ? (
                  <iframe
                    src={selectedTour.tourUrl}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                    title="Virtual Tour"
                  />
                ) : (
                  <p className="text-white">Virtual tour embed URL not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
