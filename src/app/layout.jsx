import "./globals.css";
import { FavoritesProvider } from '@/contexts/FavoritesContext';

export const metadata = {
    title: "Sebo na Tela",
    description: "Sebo de livros online",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body suppressHydrationWarning={true}>
                <FavoritesProvider>
                    {children}
                </FavoritesProvider>
            </body>
        </html>
    );
}

