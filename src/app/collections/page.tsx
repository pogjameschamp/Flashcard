"use client"
import React from 'react';

const Collections = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Coming Soon!</h1>
        <div className="mb-6">
          <svg className="w-24 h-24 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-xl mb-4 text-gray-600">Explore Other Users' Collections</p>
        <p className="text-gray-500 mb-6">
          Soon you'll be able to discover and learn from flashcard collections created by other users. 
          This feature is currently in development and will be available shortly!
        </p>
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded" role="alert">
          <p className="font-bold">Stay tuned!</p>
          <p>We're working hard to bring you this new feature. Check back soon for updates.</p>
        </div>
      </div>
    </div>
  );
};

export default Collections;
