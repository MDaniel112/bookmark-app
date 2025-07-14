'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    
    const logout = async () => {
        await fetch("http://localhost:8080/users/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        }).then(() => {
            router.push("/auth/login");
        });
    }

    return (
        <main>
            Welcome!
            <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded w-full" onClick={logout}>Log out!</button>
        </main>
    );
}