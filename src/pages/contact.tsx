import React from "react";
import Head from "next/head";
import { Page } from "@/components/Page";
import { Contact } from "@/features/Contact";

export default function ContactPage() {
  return (
    <Page>
      <Head>
        <title>Contact | Joel Warrington</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Contact />
    </Page>
  );
}
