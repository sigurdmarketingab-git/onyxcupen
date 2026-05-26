import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default async function Icon() {
  const logoData = fs.readFileSync(path.join(process.cwd(), "public/logo.png"));
  const base64Logo = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#181B22",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            background: "#F3811F",
            width: "88%",
            height: "88%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "22px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={base64Logo}
            alt=""
            style={{ width: "82%", height: "82%", objectFit: "contain" }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
