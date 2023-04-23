// Import React and necessary components
import React from "react";
import Head from "next/head";
import Link from "next/link";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container px-4 mx-auto">
        <header className="py-8 text-center">
          <Link href="/">
            <h1 className="text-3xl font-bold">{title}</h1>
          </Link>
        </header>
        <main className="mb-8">{children}</main>
      </div>
    </>
  );
};

export default Layout;
