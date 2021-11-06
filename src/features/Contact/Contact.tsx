import React from "react";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <div className={styles.contact}>
      <Content>
        <Introduction />
        <div className={styles.options}>
          <Email />
          <Text>or</Text>
          <LinkedIn />
        </div>
      </Content>
    </div>
  );
}

function Introduction() {
  return (
    <div className={styles.introduction}>
      <Content spacing="small">
        <Heading level={1}>Contact</Heading>
        <Text size="small">
          Want to get in touch to discuss a project, opportunity, ask a question
          about a blog post?
        </Text>
      </Content>
    </div>
  );
}

function Email() {
  return (
    <Button
      icon="email"
      url="mailto:joelwarrington@gmail.com"
      label="Email"
      fullWidth
    />
  );
}
function LinkedIn() {
  return (
    <div className={styles.linkedin}>
      <Button
        icon="linkedIn"
        url="https://www.linkedin.com/in/joelwarrington/"
        label="LinkedIn"
        fullWidth
      />
    </div>
  );
}
