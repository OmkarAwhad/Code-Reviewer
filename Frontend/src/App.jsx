// App.js
import React, { useState, useEffect, useRef } from "react";
import Input from "./components/Input";
import axios from "axios";
import Output from "./components/Output";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
	const [code, setCode] = useState("");
	const [review, setReview] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [leftWidth, setLeftWidth] = useState(50);

	const resizerRef = useRef(null);
	const containerRef = useRef(null);
	const isResizing = useRef(false);

	const handleReview = async () => {
		if (!code.trim()) {
			setError("Please enter some code to review.");
			return;
		}

		setLoading(true);
		setError("");
		setReview("");

		try {
			const response = await axios.post(
				BASE_URL,
				{ code },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			setReview(response.data.review);
		} catch (err) {
			setError(
				err.response?.data?.error ||
					err.message ||
					"An error occurred while fetching the review."
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const resizer = resizerRef.current;
		const container = containerRef.current;

		if (!resizer || !container) return;

		const onMouseDown = (e) => {
			isResizing.current = true;
			document.body.style.cursor = "col-resize";
			document.body.style.userSelect = "none";
			e.preventDefault();
		};

		const onMouseMove = (e) => {
			if (!isResizing.current) return;

			const containerRect = container.getBoundingClientRect();
			const newWidthPercent =
				((e.clientX - containerRect.left) / containerRect.width) *
				100;

			// Constrain between 20% and 80%
			const clampedWidth = Math.max(20, Math.min(80, newWidthPercent));
			setLeftWidth(clampedWidth);
		};

		const onMouseUp = () => {
			isResizing.current = false;
			document.body.style.cursor = "default";
			document.body.style.userSelect = "auto";
		};

		resizer.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		return () => {
			resizer.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, []);

	return (
		<div ref={containerRef} className="flex h-screen bg-gray-100">
			<div
				className="p-6 flex flex-col"
				style={{ width: `${leftWidth}%` }}
			>
				<Input
					code={code}
					setCode={setCode}
					onReview={handleReview}
					loading={loading}
					error={error}
				/>
			</div>

			<div
				ref={resizerRef}
				className="w-1 bg-gray-300 hover:bg-teal-400 cursor-col-resize transition-colors duration-200 active:bg-teal-500"
			/>

			<div
				className="p-6 bg-white border-l border-gray-200 overflow-auto"
				style={{ width: `${100 - leftWidth}%` }}
			>
				<Output review={review} loading={loading} error={error} />
			</div>
		</div>
	);
}

export default App;
