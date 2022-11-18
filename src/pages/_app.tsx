import type { AppProps } from "next/app";
import { Yeseva_One, Josefin_Sans } from "@next/font/google";

const josefin = Josefin_Sans({
  weight: ["100"],
  subsets: ["latin"],
});

const yeseva = Yeseva_One({
  weight: ["400"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --josefin-font: ${josefin.style.fontFamily};
            --yeseva-font: ${yeseva.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
