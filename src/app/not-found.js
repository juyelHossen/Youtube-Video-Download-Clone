"use client";

import "@/app/globals.css";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="">
        <h1 className="flex items-center">
          <span className="text-5xl text-black font-semibold mr-1">404</span>
          <span className="text-5xl mr-1 text-green-500 font-light">|</span>
          <span className="text-2xl text-gray-700">Page Not Found</span>
        </h1>
        <div className="mt-5">
          <Link href="/">
            <span className="block w-full text-3xl py-2 text-center bg-green-500 text-white rounded-lg">
              Go to home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
