/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                'chatgpt': {
                    'sidebar': '#202123',
                    'main': '#343541',
                    'hover': '#40414F',
                    'border': '#4E4F60',
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            backgroundColor: {
                'chat-bg': 'hsl(var(--chat-bg))',
                'sidebar-bg': 'hsl(var(--sidebar-bg))',
            },
            borderColor: {
                'chat-border': 'hsl(var(--chat-border))',
            },
            backgroundImage: {
                'vert-dark-gradient': 'linear-gradient(180deg, rgba(53,55,64,0), #353740 58.85%)',
                'vert-light-gradient': 'linear-gradient(180deg, rgba(255,255,255,0), #fff 58.85%)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}; 