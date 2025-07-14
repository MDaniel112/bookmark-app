'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Bookmark {
    id: number;
    title: string;
    url: string;
    description: string;
    tags: string[];
    createdAt: string;
}

type User = {
    id: string;
    name: string;
    loggedIn: boolean;
}

export default function Dashboard() {
    const router = useRouter();
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState<User>();
    const [form, setForm] = useState({
        title: "",
        url: "",
        description: "",
        tags: "",
    });

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            fetchBookmarks();
        }
    }, [user]);


    const fetchUser = async () => {
        await fetch(`http://localhost:8080/users/check-auth`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        }).then(async (data) => {
            setUser(await data.json());
        });
    }

    const fetchBookmarks = async () => {
        if (!user) return;
        await fetch(`http://localhost:8080/bookmarks/${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        }).then(async (data) => {
            setBookmarks(await data.json());
        });
    };

    const logout = async () => {
        await fetch("http://localhost:8080/users/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        }).then(() => {
            router.push("/auth/login");
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        if (!user) return;
        e.preventDefault();
        const payload = {
            ...form,
            tags: form.tags.split(",").map(tag => tag.trim()),
            userId: user.id,
        };

        await fetch("http://localhost:8080/bookmarks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload)
        });

        setForm({ title: "", url: "", description: "", tags: "" });
        setShowModal(false);
        fetchBookmarks();
    };

    const deleteBookmark = async (id: number) => {
        await fetch(`http://localhost:8080/bookmarks/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        fetchBookmarks();
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Your Bookmarks</h1>
                <div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600"
                        onClick={() => setShowModal(true)}
                    >
                        Add Bookmark
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    bookmarks.map(bookmark => (
                        <div key={bookmark.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{bookmark.title}</h2>
                            <a href={bookmark.url} target="_blank" className="text-blue-500 dark:text-blue-400">
                                {bookmark.url}
                            </a>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">{bookmark.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {bookmark.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => deleteBookmark(bookmark.id)}
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                }
            </div>

            {showModal && (
                <div key="bookmark-modal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded w-full max-w-md">
                        <h2 className="text-2xl mb-4 text-gray-900 dark:text-gray-100">Add Bookmark</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                                required
                            />
                            <input
                                type="url"
                                placeholder="URL"
                                value={form.url}
                                onChange={e => setForm({ ...form, url: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                value={form.tags}
                                onChange={e => setForm({ ...form, tags: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
}
