import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

const Navbar = () => {
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 h-8 w-full max-w-screen-xl xl:mx-0 mx-5 my-2 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">HackClub Tier List</h1>
      </div>
      <div className="flex justify-center items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className = 'w-full max-w-screen-xl pt-12 m-auto'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
