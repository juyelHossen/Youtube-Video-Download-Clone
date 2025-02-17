"use client";

import Image from "next/image";
import Link from "next/link"; // Import Next.js Link
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideoDetails = async () => {
    setError(null);
    setVideoData(null);
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/download?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await res.json();

      if (res.ok) {
        setVideoData(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl font-bold my-4 text-center ">
        YouTube Video Downloader
      </h1>

      <div className="flex gap-1 bg-green-500 p-1">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          className="border p-2 w-3/4 outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={fetchVideoDetails}
          disabled={loading}
          className=" text-white rounded w-1/4 py-2 hover:bg-green-600 font-semibold"
        >
          {loading ? "Loading..." : "Get Video Info"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {loading && (
        <div className="mt-4 animate-pulse">
          <div className="w-full h-64 md:h-44 bg-gray-300 rounded-md"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded-md mt-2"></div>
          <div className="w-2/3 h-4 bg-gray-300 rounded-md mt-1"></div>
        </div>
      )}

      {videoData && (
        <div className="mt-4 md:flex md:gap-3">
          <div className="md:w-2/5">
            <Image
              className="w-full"
              src={`${videoData.thumbnail}`}
              alt="Thumbnail"
              width={1280}
              height={720}
            />
          </div>
          <div className="md:w-3/5 mt-2 md:mt-0">
            <h2 className="text-lg font-bold">{videoData.title}</h2>

            {/* Use <a> for external links since next/link is for internal pages */}
            <Link
              href={`${videoData.downloadUrl}`}
              passHref
              legacyBehavior
              download="Imran-video.mp4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="bg-green-500 cursor-pointer rounded text-white px-4 py-2 mt-2 inline-block ">
                Download Video
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
