import { ImageResponse } from "next/og";
import type { ReactNode } from "react";

export const size = {
  width: 1200,
  height: 626,
};

const getInterSemiBold = async () => {
  const response = await fetch(
    `https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.woff`,
  );
  return response.arrayBuffer();
};
const getInterExtraBold = async () => {
  const response = await fetch(
    `https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-800-normal.woff`,
  );
  return response.arrayBuffer();
};

export async function getOgImage(
  title: ReactNode,
  cta?: string,
  subtitle?: string,
  image?: string,
) {
  const [interSemiBold, interExtraBold] = await Promise.all([
    getInterSemiBold(),
    getInterExtraBold(),
  ]);
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          fontFamily: "Inter",
          padding: "30px 0",
          background:
            "linear-gradient(0deg, rgba(79,70,229,0.15) 0%, rgba(79,70,229,0.04) 25%, rgba(244,91,105,0.04) 63%, rgba(244,91,105,0.15) 100%)",
        }}
      >
        <img
          alt="Sociocube"
          height={512}
          src={image || "https://sociocube.com/web-app-manifest-192x192.png"}
          style={{
            height: 200,
            width: 200,
            borderRadius: "50%",
          }}
          width={512}
        />

        <div
          style={{
            textAlign: "center",
            marginTop: 50,
            padding: "0 60px",
            fontSize: 54,
            fontWeight: 800,
            color: "#3d388b",
            display: "flex",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              textAlign: "center",
              marginTop: 10,
              padding: "0 30px",
              fontSize: 26,
              fontWeight: 600,
              color: "#3d388b",
            }}
          >
            {subtitle}
          </div>
        ) : null}

        {cta ? (
          <div
            style={{
              background: "#4f46e5",
              marginTop: 40,
              fontSize: 22,
              fontWeight: 400,
              borderRadius: "8px",
              padding: "10px 20px",
              color: "white",
              boxShadow:
                " 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            }}
          >
            {cta}
          </div>
        ) : null}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Inter",
          data: interExtraBold,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
