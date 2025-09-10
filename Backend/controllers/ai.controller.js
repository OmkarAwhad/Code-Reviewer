// controllers/ai.controller.js
const generateContent = require("../config/ai.config");

module.exports.getReview = async (req, res) => {
	try {
		const { code } = req.body;
		if (!code) {
			return res.status(400).json({ error: "Code is required." });
		}

		const response = await generateContent(code);
		if (!response || response === "Error generating content.") {
			return res
				.status(500)
				.json({
					error: "Failed to generate review. Please check your API connection and try again.",
				});
		}

		res.status(200).json({ review: response });
	} catch (error) {
		console.error("Controller Error:", error);

		// Send more specific error messages based on error type
		if (error.message && error.message.includes("fetch failed")) {
			return res.status(500).json({
				error: "Network connection failed. Please check your internet connection and API configuration.",
			});
		}

		if (error.message && error.message.includes("API key")) {
			return res.status(500).json({
				error: "Invalid API key. Please check your Google Gemini API key configuration.",
			});
		}

		res.status(500).json({
			error: `Server error: ${
				error.message || "An unexpected error occurred."
			}`,
		});
	}
};
