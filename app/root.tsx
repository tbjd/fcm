import type {LinksFunction} from "@remix-run/node";
import {Links, LiveReload, Outlet,} from "@remix-run/react";
import styles from "./styles/tailwind.css";

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: styles
        },
    ];
};

function Document({
                      children,
                      title = `FCM`,
                  }: {
    children: React.ReactNode;
    title?: string;
}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <title>{title}</title>
            <Links/>
        </head>
        <body className="min-h-screen bg-gray-800 text-gray-300">
        {children}
        <LiveReload/>
        </body>
        </html>
    );
}

export default function App() {
    return (
        <Document>
            <Outlet/>
        </Document>
    );
}

export function ErrorBoundary({error}: { error: Error }) {
    return (
        <Document title="Uh-oh!">
            <div className="error-container">
                <h1>App Error</h1>
                <pre>{error.message}</pre>
            </div>
        </Document>
    );
}
