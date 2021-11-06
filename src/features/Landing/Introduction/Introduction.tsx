import React from "react";
import { Heading } from "@jobber/components/Heading";
import { Emphasis } from "@jobber/components/Emphasis";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Button } from "@jobber/components/Button";
import styles from "./Introduction.module.css";
import { Link } from "@/components/Link";

export function Introduction() {
  return (
    <div className={styles.introduction}>
      <Content spacing="small">
        <Greeting />
        <Content spacing="small">
          <Name />
          <Lead />
        </Content>
        <Description />
        <CTA />
      </Content>
    </div>
  );
}

export function Greeting() {
  return (
    <div className={styles.greeting}>
      <Text size="small">Hello, my name is</Text>
    </div>
  );
}

export function Name() {
  return (
    <Heading level={1}>
      <Emphasis variation="highlight">Joel Warrington.</Emphasis>
    </Heading>
  );
}

export function Lead() {
  return (
    <div className={styles.lead}>
      <Heading level={2}>I solve problems with valuable software</Heading>
    </div>
  );
}

export function Description() {
  return (
    <div className={styles.description}>
      <Text>
        I am a software engineer and scrum master specializing in building
        exceptional software products which deliver value to users. Right now
        I&apos;m helping small home service businesses at <Job />.
      </Text>
    </div>
  );
}

export function Job() {
  return (
    <div className={styles.job}>
      <Button
        label="Jobber"
        url="https://getjobber.com"
        external
        size="small"
        variation="subtle"
      />
    </div>
  );
}

export function CTA() {
  return (
    <div className={styles.cta}>
      <Link href="/blog">
        <Button label="Check out my blog" />
      </Link>
    </div>
  );
}
