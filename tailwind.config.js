/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Palette "Premium / Dark Mode"
                midnight: {
                    900: '#0B0F19', // Très sombre, bleu nuit
                    800: '#151B2B',
                    700: '#1F2940',
                },
                gold: {
                    400: '#FFD700', // Or Standard
                    500: '#D4AF37', // Or Métallique
                    600: '#AA8C2C',
                },
                diamond: {
                    400: '#70E1F5', // Cyan diamant
                    500: '#00C9FF', // Cyan vif
                },
                primary: '#D4AF37', // Or par défaut
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(to right bottom, #0B0F19, #151B2B)',
            }
        },
    },
    plugins: [],
}
