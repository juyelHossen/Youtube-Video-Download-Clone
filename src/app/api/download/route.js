import ytdl from "@distube/ytdl-core";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get("url");

    if (!ytdl.validateURL(videoUrl)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const info = await ytdl.getInfo(videoUrl);

    // Select the best available format with audio and video
    const format = ytdl.chooseFormat(info.formats, {
      quality: "highest",
      filter: "audioandvideo",
    });

    if (!format?.url) {
      return NextResponse.json(
        { error: "No downloadable format found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails.pop()?.url,
      downloadUrl: `/api/download/proxy?videoUrl=${encodeURIComponent(
        format.url
      )}`, // Direct download support
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch video details" },
      { status: 500 }
    );
  }
}
