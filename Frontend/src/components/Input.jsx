// Input.js
import React from "react";

function Input({ code, setCode, onReview, loading, error }) {
	return (
		<div className="flex flex-col h-full bg-white p-6 rounded-xl shadow-md border border-gray-200">
			<h2 className="text-2xl font-bold mb-4 text-teal-600">
				Enter Code for Review
			</h2>
			<textarea
				className="flex-grow p-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150"
				value={code}
				onChange={(e) => setCode(e.target.value)}
				placeholder="Paste your code here and let AI analyze it..."
			/>
			{error && (
				<p className="text-red-500 mt-2 font-medium">{error}</p>
			)}
			<button
				onClick={onReview}
				disabled={loading}
				className="mt-4 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed transition duration-200 shadow-sm"
			>
				{loading ? "Analyzing..." : "Review Code"}
			</button>
		</div>
	);
}

export default Input;
