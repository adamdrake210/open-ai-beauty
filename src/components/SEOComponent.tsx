import { SITE_NAME, SITE_URL } from "@/constants/constants";
import React from "react";

type SEOComponentProps = {
  title: string;
  description: string;
  imageUrl?: string | null;
  siteUrl?: string;
};

export const SEOComponent = ({
  title,
  description,
  siteUrl,
  imageUrl,
}: SEOComponentProps) => {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@FrontEndDrake" />
      <meta name="twitter:creator" content="@FrontEndDrake" />
      <meta property="og:url" content={siteUrl || SITE_URL} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={
          imageUrl ||
          "https://res.cloudinary.com/dmiizmobu/image/upload/v1668758334/openai-beauty/DALL_E_2022-11-18_08.57.24.png"
        }
      />
      <meta property="og:image:alt" content="" />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="900" />
      <meta property="og:locale" content="en_IE" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="robots" content="index,follow" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  );
};
