import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Emphasis } from "@jobber/components/Emphasis";
import { Page } from "@/components/Page";
import { ErrorBanner } from "@/components/ErrorBanner";

export default function NotFoundPage() {
  const { replace } = useRouter();
  return (
    <Page>
      <Head>
        <title>404: Not Found | Joel Warrington</title>
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
        <Emphasis variation="bold">404</Emphasis>: page not found
      </ErrorBanner>
    </Page>
  );
}
