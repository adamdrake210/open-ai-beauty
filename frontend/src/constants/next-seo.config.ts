import { DefaultSeoProps } from "next-seo";
import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from "./constants";

const config: DefaultSeoProps = {
  openGraph: {
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE,
        width: 1200,
        height: 600,
        alt: SITE_NAME,
        type: "image/jpeg",
      },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    handle: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
    cardType: "summary_large_image",
  },
};

export default config;
