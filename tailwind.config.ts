import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // TenderVault brand colors
        cyan: {
          50: "#e0f7ff",
          100: "#b3ebff",
          200: "#80deff",
          300: "#4dd1ff",
          400: "#26c6ff",
          500: "#00baff",
          600: "#00a3e0",
          700: "#0088b8",
          800: "#006d90",
          900: "#005268",
        },
        navy: {
          50: "#e8eaf0",
          100: "#c5c9d9",
          200: "#9ea5be",
          300: "#7681a3",
          400: "#58638e",
          500: "#3a4479",
          600: "#2d3566",
          700: "#1f2550",
          800: "#121638",
          900: "#050820",
        },
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        glow: "0 0 30px hsl(185 80% 50% / 0.3), 0 0 60px hsl(185 80% 50% / 0.1)",
        "glow-sm": "0 0 15px hsl(185 80% 50% / 0.3)",
        "glow-accent": "0 0 20px hsl(160 80% 45% / 0.4)",
        card: "0 4px 32px hsl(220 20% 2% / 0.6)",
        elevated: "0 8px 40px hsl(220 20% 2% / 0.8)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, hsl(185 80% 50%), hsl(160 80% 45%))",
        "gradient-dark": "linear-gradient(180deg, hsl(220 20% 4%), hsl(220 18% 7%))",
        "gradient-card": "linear-gradient(145deg, hsl(220 18% 8%), hsl(220 20% 11%))",
        "gradient-radial-cyan": "radial-gradient(ellipse at center, hsl(185 80% 50% / 0.15), transparent 70%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(185 80% 50% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(185 80% 50% / 0.6), 0 0 80px hsl(185 80% 50% / 0.2)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "spin-slow": "spin-slow 10s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
