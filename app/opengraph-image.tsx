import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Agrim Verma – Full Stack Engineer & ML Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080810",
          position: "relative",
        }}
      >
        {/* ambient gradient glows */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: "rgba(108, 99, 255, 0.25)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -60,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: "rgba(0, 212, 255, 0.18)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 10,
            color: "#8A8AA0",
            marginBottom: 28,
          }}
        >
          FULL STACK ENGINEER &amp; ML DEVELOPER
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            backgroundImage:
              "linear-gradient(135deg, #6C63FF 0%, #00D4FF 50%, #E8A87C 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Agrim Verma
        </div>
        <div style={{ fontSize: 24, color: "#8A8AA0", marginTop: 30 }}>
          TIET &apos;27 · AI/ML Mentor @ GDG · Open Source
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#3A3A52",
          }}
        >
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
