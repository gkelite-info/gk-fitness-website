"use client";

import React, { useState } from 'react';

export default function DeleteAccount() {
    const [email, setEmail] = useState('');
    const [confirmText, setConfirmText] = useState('');

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Account deletion request submitted. Our team will process it shortly.");
        setEmail('');
        setConfirmText('');
    };

    return (
        <div className="bg-[#0A0A0A] min-h-screen p-5 flex flex-col items-center justify-center">
            <div className="max-w-xl w-full bg-[#111111] p-8 rounded-xl border border-[#333] shadow-2xl">
                <h2 className="text-[#C3F400] font-semibold text-3xl mb-6 text-center">Delete Your Account</h2>

                <div className="mb-8 p-5 bg-red-950/20 rounded-lg border border-red-900/50">
                    <h3 className="text-red-500 font-semibold mb-3 text-lg">Warning: Permanent Action</h3>
                    <p className="text-sm text-white leading-relaxed">
                        Deleting your account will permanently remove all your data from GK-GYMLIFE, including your profile, membership details, workout history, and personal preferences. This action <strong>cannot be undone</strong>.
                    </p>
                </div>

                <form onSubmit={handleDelete} className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                            Confirm your email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C3F400] focus:ring-1 focus:ring-[#C3F400] transition-all"
                            placeholder="Enter your registered email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm" className="block text-sm font-medium text-white mb-2">
                            Type <span className="text-[#C3F400] font-bold select-none">DELETE</span> to confirm
                        </label>
                        <input
                            type="text"
                            id="confirm"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C3F400] focus:ring-1 focus:ring-[#C3F400] transition-all"
                            placeholder="Type DELETE"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={confirmText !== 'DELETE' || !email}
                        className="mt-4 w-full py-4 px-4 bg-red-600 hover:bg-red-700 disabled:bg-[#222] disabled:text-gray-500 disabled:border disabled:border-[#333] disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
                    >
                        Permanently Delete My Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Need help? <a href="#" className="text-[#C3F400] hover:underline">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
