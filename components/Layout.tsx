// Import React and necessary components
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { IoIosHelpCircle } from "react-icons/io";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container px-4 mx-auto">
        <nav className="flex items-end py-8 space-x-5">
          <Link href="/">
            <h1 className="text-5xl font-bold">{title}</h1>
          </Link>
          <div className="hover:text-gray-500">
            <Link href="/add-todo">Add Todo</Link>
          </div>
          <div className="hover:text-gray-500">
            <button>Sign In</button>
          </div>
          <div className="flex text-2xl hover:text-gray-500">
            <button onClick={() => router.push("/docs")}>
              <IoIosHelpCircle />
            </button>
          </div>
        </nav>
        <main className="mb-8">{children}</main>
      </div>
    </>
  );
};

export default Layout;
