'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8080/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push("/auth/login");
        } else {
            alert("Registration failed");
        }
    };

    return (
        <main className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full" required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
            </form>
        </main>
    );
}
