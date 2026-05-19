/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2F80ED',
        'primary-foreground': '#FFFFFF',
        secondary: '#27AE60',
        'secondary-foreground': '#FFFFFF',
        destructive: '#EF4444',
        'destructive-foreground': '#FFFFFF',
        background: '#F8F9FA',
        foreground: '#1E3A5F',
        card: '#FFFFFF',
        'card-foreground': '#1E3A5F',
        'muted': '#E8EAED',
        'muted-foreground': '#5F6368',
        input: '#DADCE0',
        'input-background': '#FFFFFF',
        border: '#E8EAED',
        ring: '#2F80ED',
        sidebar: '#1E3A5F',
        'sidebar-foreground': '#FFFFFF',
        'sidebar-primary': '#2F80ED',
        'sidebar-accent': '#2F80ED',
        'sidebar-accent-foreground': '#FFFFFF',
        'sidebar-border': '#3A4A5F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
