import React from "react";
import Head from "next/head";
import { Page } from "@/components/Page";
import { Introduction } from "@/features/Landing";

export default function HomePage() {
  return (
    <Page>
      <Head>
        <title>Joel Warrington | Software Engineer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Introduction />
    </Page>
  );
}
