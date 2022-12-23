import React, { useEffect } from "react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Yeseva_One, Josefin_Sans } from "@next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useRouter } from "next/router";
import * as gtag from "@/utils/gtag";
import config from "@/constants/next-seo.config";

import "../styles/globals.css";
import UserProvider from "@/context/userContext";

const josefin = Josefin_Sans({
  weight: ["100"],
  subsets: ["latin"],
});

const yeseva = Yeseva_One({
  weight: ["400"],
  subsets: ["latin"],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-YJ10VDLDF5`}
      />
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJ10VDLDF5', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <style jsx global>
        {`
          :root {
            --josefin-font: ${josefin.style.fontFamily};
            --yeseva-font: ${yeseva.style.fontFamily};
          }
        `}
      </style>
      <DefaultSeo {...config} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
