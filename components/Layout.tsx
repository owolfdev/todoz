// Import React and necessary components
import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { IoIosHelpCircle } from "react-icons/io";
import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";
import supabase from "@/lib/supabaseClient";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const allowedEmails = [
  "oliverwolfson@gmail.com",
  "owolfdev@gmail.com",
  "air.puthita@gmail.com",
  "silomsoi8.air@gmail.com",
];

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session?.user && session.user.email) {
      if (allowedEmails.includes(session.user.email)) {
        console.log("Authorized email:", session.user.email);
        //router.push("/signin"); // Redirect to /signin after successful login
      } else {
        console.error("Unauthorized email:", session.user.email);
        signOut();
      }
    }
  }, [session]);
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      //router.push("/"); // Redirect to a different page after signing out (e.g., home page)
    }
  }
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
            {session ? (
              <Link href="/signin">Sign Out</Link>
            ) : (
              <Link href="/signin">Sign In</Link>
            )}
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
