"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-infinite-logo-slider";

import { getRoute } from "@/constants/routes";

const BRANDS = [
  {
    logo: "/brands/dot-key.webp",
    id: 62,
    name: "Dot & Key",
    className: "opacity-80",
  },
  {
    logo: "/brands/sugar.png",
    id: 65,
    name: "Sugar Cosmetics",
    className: "opacity-70",
  },
  {
    logo: "/brands/aqualogica.svg",
    id: 81,
    name: "Aqualogica",
  },
  {
    logo: "/brands/zouk.png",
    id: 42,
    name: "Zouk",
  },
  {
    logo: "/brands/lakme.png",
    id: 66,
    name: "Lakme",
  },
  {
    logo: "/brands/agaro.png",
    id: 121,
    name: "Agaro",
    className: "opacity-80",
  },
  {
    logo: "/brands/sleep-company.png",
    id: 89,
    name: "The Sleep Company",
    className: "opacity-80",
  },
];

export default function BrandsSlider() {
  return (
    <>
      <div className="sm:hidden">
        <Slider duration={30} width="130px">
          {BRANDS.map((brand) => (
            // @ts-expect-error -- type not defined in package
            <Slider.Slide key={brand.id} className="self-end">
              <Link href={`${getRoute("Campaigns")}/${brand.id}`}>
                <Image
                  alt={brand.name}
                  className={`grayscale ${brand.className}`}
                  height={30}
                  src={brand.logo}
                  width={100}
                />
              </Link>
            </Slider.Slide>
          ))}
        </Slider>
      </div>

      <div className="max-sm:hidden">
        <Slider
          blurBorderColor="#fdfcfb"
          blurBorders
          duration={60}
          width="200px"
        >
          {BRANDS.map((brand) => (
            // @ts-expect-error -- type not defined in package
            <Slider.Slide key={brand.id} className="self-end">
              <Link href={`${getRoute("Campaigns")}/${brand.id}`}>
                <Image
                  alt={brand.name}
                  className={`grayscale ${brand.className}`}
                  height={30}
                  src={brand.logo}
                  width={100}
                />
              </Link>
            </Slider.Slide>
          ))}
        </Slider>
      </div>
    </>
  );
}
