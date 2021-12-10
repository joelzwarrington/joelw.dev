import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Emphasis } from "@jobber/components/Emphasis";
import { Page } from "@/components/Page";
import { ErrorBanner } from "@/components/ErrorBanner";

export default function ServerErrorPage() {
  const { replace } = useRouter();
  return (
    <Page>
      <Head>
        <title>500 | Joel Warrington</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ErrorBanner
        action={{
          icon: "home",
          ariaLabel: "Go to Home Page",
          variation: "subtle",
          type: "tertiary",
          onClick: () => {
            replace("/");
          },
        }}
      >
        <Emphasis variation="bold">500</Emphasis>: error processing your request
      </ErrorBanner>
    </Page>
  );
}
