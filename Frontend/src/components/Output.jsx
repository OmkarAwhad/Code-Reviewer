import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

function Output({ review, loading, error }) {
	return (
		<div className="flex flex-col h-full bg-white p-6 rounded-xl shadow-md border border-gray-200 overflow-auto">
			<h2 className="text-2xl font-bold mb-4 text-teal-600">
				AI Review Output
			</h2>
			{loading ? (
				<div className="flex items-center space-x-2 text-gray-500">
					<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
					<p className="italic">Processing your code...</p>
				</div>
			) : error ? (
				<div className="bg-red-50 border border-red-200 rounded-lg p-4">
					<h3 className="text-red-800 font-semibold mb-2">
						Error occurred
					</h3>
				</div>
			) : review ? (
				<div className="prose max-w-none text-gray-800">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={{
							code({
								node,
								inline,
								className,
								children,
								...props
							}) {
								const match = /language-(\w+)/.exec(
									className || ""
								);
								return !inline && match ? (
									<div className="relative my-4">
										<SyntaxHighlighter
											style={oneLight}
											language={match[1]}
											PreTag="div"
											className="rounded-lg "
											{...props}
										>
											{String(
												children
											).replace(/\n$/, "")}
										</SyntaxHighlighter>
										<button
											onClick={() =>
												navigator.clipboard.writeText(
													String(
														children
													)
												)
											}
											className="absolute top-2 right-2 cursor-pointer px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition"
										>
											Copy
										</button>
									</div>
								) : (
									<code
										className={`${className} bg-gray-100 px-1 py-0.5 rounded text-teal-800`}
										{...props}
									>
										{children}
									</code>
								);
							},
							h1: ({ children }) => (
								<h1 className="text-3xl font-bold text-teal-600 mt-6 mb-4 border-b border-gray-200 pb-2">
									{children}
								</h1>
							),
							h2: ({ children }) => (
								<h2 className="text-2xl font-bold text-teal-600 mt-5 mb-3">
									{children}
								</h2>
							),
							ul: ({ children }) => (
								<ul className="list-disc pl-6 mb-4 text-gray-700">
									{children}
								</ul>
							),
							ol: ({ children }) => (
								<ol className="list-decimal pl-6 mb-4 text-gray-700">
									{children}
								</ol>
							),
							p: ({ children }) => (
								<p className="mb-4 text-gray-700">
									{children}
								</p>
							),
						}}
					>
						{review}
					</ReactMarkdown>
				</div>
			) : (
				<p className="text-gray-500 italic">
					Enter code on the left to see the AI review here.
				</p>
			)}
		</div>
	);
}

export default Output;
