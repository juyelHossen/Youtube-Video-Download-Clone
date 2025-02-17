import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get("videoUrl");

    if (!videoUrl) {
      return NextResponse.json({ error: "Missing video URL" }, { status: 400 });
    }

    // Fetch the video stream
    const response = await fetch(videoUrl);
    const headers = new Headers(response.headers);

    // Set headers to force download
    headers.set(
      "Content-Disposition",
      'attachment; filename="Imran-video.mp4"'
    );

    return new NextResponse(response.body, {
      headers,
      status: response.status,
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to proxy video" },
      { status: 500 }
    );
  }
}
