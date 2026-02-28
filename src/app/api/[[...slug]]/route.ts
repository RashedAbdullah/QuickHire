import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";
  const searchParams = request.nextUrl.searchParams;

  const backendUrl = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}?${searchParams}`,
  );

  try {
    const response = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
        Cookie: request.headers.get("Cookie") || "",
      },
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";
  const body = await request.json();

  const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
        Cookie: request.headers.get("Cookie") || "",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";
  const body = await request.json();

  const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;

  try {
    const response = await fetch(backendUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
        Cookie: request.headers.get("Cookie") || "",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";

  const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;

  try {
    const response = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
        Cookie: request.headers.get("Cookie") || "",
      },
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 },
    );
  }
}
