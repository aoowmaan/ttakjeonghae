import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fffdf8",
          background: "#ff5c46",
          border: "5px solid #161616",
          borderRadius: "18px",
          fontSize: 32,
          fontWeight: 900,
          letterSpacing: "-3px",
        }}
      >
        T!
      </div>
    ),
    size,
  );
}
