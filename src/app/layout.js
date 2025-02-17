import "@/app/globals.css";

export const metadata = {
  title: "Y-Downloader",
  description: "Download YouTube videos with ease.",
  keywords: [
    "youtube downloader",
    "downloader",
    "video",
    "music",
    "youtube video download",
    "video download",
    "youtube video download",
    "youtube download",
    "video downloader",
  ],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Document</title>
      </head>
      <body>
        <div className="container mx-auto px-1 sm:px-0 overflow-hidden min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
