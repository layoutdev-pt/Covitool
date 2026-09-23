import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOMetadataProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}

const SEOMetadata: React.FC<SEOMetadataProps> = ({ title, description, canonical, ogImage }) => {
  const image = ogImage || 'https://covitool.pt/logo.png';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOMetadata;
