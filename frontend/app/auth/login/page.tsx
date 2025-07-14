'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert("Login failed");
        }
    };

    return (
        <main className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
            </form>
        </main>
    );
}
