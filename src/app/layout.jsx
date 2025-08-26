import "./globals.css";

export const metadata = {
    title: "Sebo na Tela",
    description: "Sebo de livros online",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}

