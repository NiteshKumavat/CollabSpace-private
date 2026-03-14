import React from "react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-20">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          Choose your <span className="text-purple-400">Plan</span>
        </h1>
        <p className="text-gray-400 mt-4">
          Simple pricing for developers and teams using CollabSpace.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Free Plan */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Free</h2>
          <p className="text-gray-400 mb-6">Perfect for individual developers</p>

          <h3 className="text-4xl font-bold mb-6">₹0</h3>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li>✔ Explore projects</li>
            <li>✔ Join teams</li>
            <li>✔ Basic chat</li>
            <li>✔ Developer profile</li>
          </ul>

          <button className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
            Current Plan
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/40 rounded-2xl p-8 relative">

          <span className="absolute top-4 right-4 bg-purple-500 text-xs px-3 py-1 rounded-full">
            Popular
          </span>

          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <p className="text-gray-400 mb-6">For serious builders & teams</p>

          <h3 className="text-4xl font-bold mb-6">
            ₹199<span className="text-lg text-gray-400">/month</span>
          </h3>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li>✔ Create unlimited teams</li>
            <li>✔ Priority project listing</li>
            <li>✔ Advanced chat</li>
            <li>✔ File sharing</li>
            <li>✔ Team collaboration tools</li>
          </ul>

          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition">
            Upgrade to Pro
          </button>
        </div>

      </div>
    </div>
  );
};

export default Pricing;