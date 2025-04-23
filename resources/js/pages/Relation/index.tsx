import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

const RelationList = ({ relations }) => {
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [relationship, setRelationship] = useState('');

  // Function to generate a 6-digit random code
  const generateCode = () => {
    const generatedCode = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
    setCode(generatedCode.toString()); // Convert to string to fit the input
  };

  const handleAddRelation = () => {
    // Validation to ensure both code and relationship are provided
    if (!code || !relationship) {
      alert('Please enter both a code and a relationship.');
      return;
    }

    // Make a POST request to the Laravel backend with both code and relationship
    router.post('/relation/code', {
      code,
      relationship,
    });

    setShowModal(false);
    setCode('');
    setRelationship('');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6 px-4">
      {/* Add Relation Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Add Relation
        </button>
      </div>

      {/* Relations List */}
      {relations.map((relation, index) => (
        <Link
          key={index}
          href={`/relation/${relation.relation_user_id}`}
          className="block transform transition-all duration-300 hover:scale-[1.015] bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-800"
        >
          <div className="flex items-center space-x-5 p-6">
            <img
              src={relation.relationship_avatar}
              alt={relation.relation_user_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 dark:border-indigo-400"
            />

            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {relation.relation_user_name}
              </h2>

              <div className="text-sm text-gray-700 dark:text-gray-300">
                <span className="mr-1">Relationship:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {relation.relationship_name}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
              View →
            </div>
          </div>
        </Link>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg z-60 relative">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Enter 6-Digit Code and Relation
            </h2>

            {/* Code Input */}
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g. 123456"
            />

            {/* Generate Code Button */}
            <button
              onClick={generateCode}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Generate Code
            </button>

            {/* Relationship Input */}
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full mt-4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter relationship (e.g. Friend, Family)"
            />

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={handleAddRelation}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationList;
