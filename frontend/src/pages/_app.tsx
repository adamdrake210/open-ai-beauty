import React, { useEffect } from "react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Script from "next/script";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { useRouter } from "next/router";
import * as gtag from "@/utils/gtag";
import config from "@/constants/next-seo.config";

import { theme } from "@/styles/theme";

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
      <DefaultSeo {...config} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <NotificationsProvider>
              <Component {...pageProps} />
            </NotificationsProvider>
          </MantineProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
