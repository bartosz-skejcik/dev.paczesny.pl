const { nextui } = require("@nextui-org/react");
import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: "",
    theme: {
        extend: {
            animation: {
                "meteor-effect": "meteor 5s linear infinite",
            },
            keyframes: {
                meteor: {
                    "0%": {
                        transform: "rotate(215deg) translateX(0)",
                        opacity: "1",
                    },
                    "70%": { opacity: "1" },
                    "100%": {
                        transform: "rotate(215deg) translateX(-500px)",
                        opacity: "0",
                    },
                },
            },
        },
    },
    plugins: [nextui()],
} satisfies Config;

export default config;
