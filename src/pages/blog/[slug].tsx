import React from "react";
import { Page } from "@/components/Page";

export default function BlogPage({ slug }: { slug: string }) {
  return <Page>Blog Page: {slug}</Page>;
}

export async function getServerSideProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return {
    props: {
      slug,
    },
  };
}
