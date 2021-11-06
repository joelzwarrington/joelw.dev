import React from "react";
import { useRouter } from "next/router";
import { Emphasis } from "@jobber/components/Emphasis";
import { Page } from "@/components/Page";
import { ErrorBanner } from "@/components/ErrorBanner";

export default function NotFoundPage() {
  const { replace } = useRouter();
  return (
    <Page>
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
