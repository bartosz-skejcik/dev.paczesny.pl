"use client";
import React, { useState } from "react";

const defaultFormState = {
    name: {
        value: "",
        error: "",
    },
    email: {
        value: "",
        error: "",
    },
    message: {
        value: "",
        error: "",
    },
};
export const Contact = () => {
    const [formData, setFormData] = useState(defaultFormState);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Write your submit logic here
        console.log(formData);
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-between gap-5">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-sky-500 px-2 py-2 rounded-md text-sm text-neutral-300 w-full"
                    value={formData.name.value}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            name: {
                                value: e.target.value,
                                error: "",
                            },
                        });
                    }}
                />
                <input
                    type="email"
                    placeholder="Your email address"
                    className="bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-sky-500 px-2 py-2 rounded-md text-sm text-neutral-300 w-full"
                    value={formData.email.value}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            email: {
                                value: e.target.value,
                                error: "",
                            },
                        });
                    }}
                />
            </div>
            <div>
                <textarea
                    placeholder="Your Message"
                    rows={10}
                    className="bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-sky-500 px-2 py-2 rounded-md text-sm text-neutral-300 w-full mt-4"
                    value={formData.message.value}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            message: {
                                value: e.target.value,
                                error: "",
                            },
                        });
                    }}
                />
            </div>
            <button
                className="w-full px-2 py-2 mt-4 bg-neutral-800 rounded-md font-semibold text-neutral-100 hover:bg-sky-500 transition-all duration-200"
                type="submit"
            >
                Submit{" "}
            </button>
        </form>
    );
};
