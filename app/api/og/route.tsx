import { ImageResponse } from "next/og";

// Event details - you can edit these
const EVENT_CITY = "GUADALAJARA";
const EVENT_DATE = "FEBRUARY 2026";

// Decryption helper
function decryptLanyardData(
  encrypted: string
): { username: string; variant: "dark" | "light" } | null {
  const OBFUSCATION_KEY = "v0gdl";

  if (!encrypted) return null;
  try {
    let base64 = encrypted.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (base64.length % 4)) % 4;
    base64 += "=".repeat(padding);

    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);

    if (decoded.startsWith(`${OBFUSCATION_KEY}:`)) {
      const withoutKey = decoded.slice(OBFUSCATION_KEY.length + 1);
      const colonIndex = withoutKey.indexOf(":");
      if (colonIndex === -1) return null;

      const variant = withoutKey.slice(0, colonIndex) as "dark" | "light";
      const username = withoutKey.slice(colonIndex + 1);

      if (variant !== "dark" && variant !== "light") return null;

      return { username, variant };
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const encrypted = searchParams.get("u");
    const format = searchParams.get("format") || "og"; // og, twitter, linkedin, square

    const data = encrypted ? decryptLanyardData(encrypted) : null;
    const userName = data?.username || "Attendee";
    const variant = data?.variant || "dark";

    // Format dimensions
    const dimensions = {
      og: { width: 1200, height: 630 }, // Facebook, LinkedIn, Discord
      twitter: { width: 1200, height: 600 }, // Twitter summary_large_image
      linkedin: { width: 1200, height: 627 }, // LinkedIn optimal
      square: { width: 1200, height: 1200 }, // Instagram, WhatsApp
    };

    const { width, height } = dimensions[format as keyof typeof dimensions] || dimensions.og;

    // Colors based on variant
    const isDark = variant === "dark";
    const bgColor = isDark ? "#000000" : "#ffffff";
    const textColor = isDark ? "#ffffff" : "#000000";
    const accentColor = isDark ? "#333333" : "#e5e5e5";
    const subtitleColor = isDark ? "#a3a3a3" : "#737373";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor,
            padding: "60px",
          }}
        >
          {/* Card Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: format === "square" ? "900px" : "1000px",
            }}
          >
            {/* v0 Logo/Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 700,
                  color: textColor,
                  letterSpacing: "-0.02em",
                }}
              >
                v0
              </span>
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 400,
                  color: subtitleColor,
                  marginLeft: "16px",
                }}
              >
                IRL
              </span>
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: format === "square" ? "80px" : "96px",
                fontWeight: 700,
                color: textColor,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                textAlign: "center",
                marginBottom: "24px",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userName}
            </div>

            {/* Divider Line */}
            <div
              style={{
                width: "120px",
                height: "4px",
                backgroundColor: accentColor,
                marginBottom: "32px",
              }}
            />

            {/* City */}
            <div
              style={{
                fontSize: "42px",
                fontWeight: 600,
                color: textColor,
                letterSpacing: "0.15em",
                marginBottom: "16px",
              }}
            >
              {EVENT_CITY}
            </div>

            {/* Date */}
            <div
              style={{
                fontSize: "28px",
                fontWeight: 400,
                color: subtitleColor,
                letterSpacing: "0.1em",
              }}
            >
              {EVENT_DATE}
            </div>
          </div>

          {/* Bottom Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                color: subtitleColor,
                letterSpacing: "0.05em",
              }}
            >
              PROMPT TO PRODUCTION
            </span>
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (e) {
    console.log(`OG Image Generation Error: ${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
