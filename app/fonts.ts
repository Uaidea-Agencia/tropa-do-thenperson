import { Anton, Montserrat, Poppins } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-anton",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});
