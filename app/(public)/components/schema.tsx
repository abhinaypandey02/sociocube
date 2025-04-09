import Script from "next/script";
import React from "react";

function Schema({ data, id }: { data: object; id: string }) {
  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      id={`jsonld-${id}`}
      type="application/ld+json"
    />
  );
}

export default Schema;
