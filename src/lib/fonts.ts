import { Epilogue } from "next/font/google";
import localFont from "next/font/local";

const epilogue = Epilogue({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-epilogue",
});

const clashDisplay = localFont({
  src: "../assets/fonts/ClashDisplay.ttf",
  variable: "--font-clash-display",
  display: "swap",
});

export { clashDisplay, epilogue };
