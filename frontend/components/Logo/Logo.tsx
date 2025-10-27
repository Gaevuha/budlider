"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./Logo.module.css";
import React, { useState } from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  const [isClient] = useState(() => typeof window !== "undefined");
  const isTabletOrDesktop = useMediaQuery("(min-width: 768px)");

  const textX = 5;
  const textY = isClient && isTabletOrDesktop ? 78 : 80;

  return (
    <svg
      className={styles.icon__logo}
      viewBox="0 0 400 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text x={textX} y={textY}>
        <tspan className={styles["text__logo-accent"]}>БУД</tspan>
        <tspan className={styles.text__logo} dx="5">
          лідер
        </tspan>
      </text>
    </svg>
  );
};

export default Logo;
