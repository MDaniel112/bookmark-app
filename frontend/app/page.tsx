'use client'

import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
			<div className="text-center max-w-2xl">
				<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
					Welcome to <span className="text-blue-600">BookmarkVault</span>
				</h1>
				<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
					Your personal space to save, organize, and access your favorite links anytime, anywhere.
				</p>
				<div className="flex flex-col md:flex-row justify-center gap-4">
					<Link href="/auth/login">
						<button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded w-full md:w-auto">
							Login
						</button>
					</Link>
					<Link href="/auth/register">
						<button className="px-6 py-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded w-full md:w-auto">
							Register
						</button>
					</Link>
				</div>
			</div>
		</main>
	);
}
