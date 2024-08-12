---
layout: post
title: Production Ready React
permalink: /writing/production-ready-react
tags:
  - react
  - gql
  - ts
render_with_liquid: false
---

A pragmatic guide to maintainable React components powered by GraphQL.

Writing performant, testable, and readable React can be thought of as an art, but instead, I hope to convince you that it can instead be achieved with a simple toolkit 🔧 , a few recipes 🧾, and some examples 🧪 .

## Starting with GraphQL

One common approach and pitfall is to start implementation from the front-end and work backward towards your GraphQL API. In my experience, this can lead towards less-than-ideal schema design, negatively impacting the GraphQL experience for any other consumer of your API, where types end up as sacks of data void of any meaning and without purpose.

Things to consider include:

- How will other frontend views get this data?
- How will nullability be applied?
- Will the data make sense to other developers?

Starting with GraphQL will not only be better for your schema, but it will also be better and crucial for you and your team when building maintainable front-end systems. To start building your GraphQL API and building a truly resilient schema, you should almost certainly consult [Production Ready GraphQL](https://book.productionreadygraphql.com), and a worthy companion tutorial; [Designing a GraphQL API](https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md).

## Making the jump

Now that we've got a production-ready GraphQL schema, how do we implement its consuming counterpart? Let's start with the most fundamental components in our larger application and explore some of the first tools in your toolbox 🔧 ; component composition and GraphQL fragments.

> Fragments let you construct sets of fields, and then include them in queries where you need to.

Fragments can be used to achieve one concept commonly used in React; collocation, where you're able to contain all of the data needed from a component alongside your logic, styling, and rendering.

In practice, you're able to create a component that doesn't need to query its data but instead provides an interface to how it should receive its data when used in other components (hence, component composition).

**Example 🧪**
_A small component that receives all of its data from props and defines how it expects to receive data using a GraphQL fragment._

```tsx
import React from "react";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { FormatRelativeDateTime } from "@jobber/components/FormatRelativeDateTime";
import { Text } from "@jobber/components/Text";
import { Avatar } from "@jobber/components/Avatar";
import { gql } from "@apollo/client";
import { MessageFragment as IMessageFragment } from "@/utils/graphql/types";

export interface MessageProps {
  data: IMessageFragment;
  onRequestUnread(): void;
  onRequestRead(): void;
}

export function Message({
  data: {
    author: { name, avatar },
    message,
    read: hasBeenRead,
    sentAt,
  },
  onRequestUnread,
  onRequestRead,
}: MessageProps) {
  return (
    <Card onClick={hasBeenRead ? onRequestUnread : onRequestRead}>
      <Content>
        <Avatar imageUrl={avatar} name={`${name}'s avatar`} />
        <Text>{message}</Text>
        <FormatRelativeDateTime date={sentAt} />
      </Content>
    </Card>
  );
}

export const MessageFragment = gql`
  fragment Message on ChatMessage {
    id
    author {
      name
      avatar
    }
    read
    message
    sentAt
  }
`;
```

## Is this thing on?

To build maintainable and shippable React, you'll want to test functionality in isolation in a way that makes it very clear when things break so that you and your team will be confident with every release.

Testing React components isn't as hard as it's made to be, especially with modern-day tools such as [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), and [Jest](https://jestjs.io/), which take out all the guesswork of rendering and interacting with a component. Jest will act as the test runner and provide the overall structure of your unit tests, while React Testing Library will provide the methods needed to accurately assert functionality.

### User functionality

Getting started with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is quick and no different than writing unit tests for functions and classes. Every test case should start by rendering a component with the render method and destructuring the return to get access to the rendered result, and document queries such as getByText, getByLabel (see the [query cheat sheet](https://testing-library.com/docs/react-testing-library/cheatsheet/#queries)).

**Example 🧪**
_An example test file using React Testing Library and our previously defined `Message` component. Showing how one could test user functionality with predictable results._

```tsx
import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { Message } from "./Message";

afterEach(cleanup);

describe("<Message />", () => {
  it("displays an avatar", () => {
    const { getByRole } = render(
      <Message
        data={{
          author: {
            name: "Joel Warrington",
            avatar: "https://i.imgur.com/iTvTHkh.jpg",
          },
          read: false,
          message: "Hello World",
          sentAt: "2021-12-25T00:00:00Z",
        }}
        onRequestUnread={jest.fn}
        onRequestRead={jest.fn}
      />
    );
    expect(
      getByRole("image", { name: "Joel Warrington's avatar" })
    ).toBeInTheDocument();
  });

  describe("when message has been read", () => {
    it("will unread on click", () => {
      const onRequestUnreadFn = jest.fn();
      const { getByRole } = render(
        <Message
          data={{
            author: {
              name: "Joel Warrington",
              avatar: "https://i.imgur.com/iTvTHkh.jpg",
            },
            read: true,
            message: "Hello World",
            sentAt: "2021-12-25T00:00:00Z",
          }}
          onRequestUnread={onRequestUnreadFn}
          onRequestRead={jest.fn}
        />
      );
      fireEvent.click(getByRole("button"));
      expect(onRequestUnreadFn).toHaveBeenCalled();
    });
  });

  describe("when message has not been read", () => {
    it("will read on click", () => {
      const onRequestReadFn = jest.fn();
      const { getByRole } = render(
        <Message
          data={{
            author: {
              name: "Joel Warrington",
              avatar: "https://i.imgur.com/iTvTHkh.jpg",
            },
            read: false,
            message: "Hello World",
            sentAt: "2021-12-25T00:00:00Z",
          }}
          onRequestUnread={jest.fn}
          onRequestRead={onRequestReadFn}
        />
      );
      fireEvent.click(getByRole("button"));
      expect(onRequestReadFn).toHaveBeenCalled();
    });
  });
});
```

### Cloudy with a chance of bugs ⛅🐜🐛

Jest uses a package called [Istanbul](https://istanbul.js.org/) to provide test coverage metrics such as statement, branch, function, and line coverage so that you can understand and enforce the quality of your test suite, providing more confidence in releases.

It's highly recommended you set coverage thresholds that make you comfortable and don't burden you with covering every test case and flow, and subsequently integrate coverage tests into your CI/CD pipeline and block failing builds.

To get started and collect test coverage, you can run the following command (or add the --coverage argument to your existing node test script):

```shell
npx jest --coverage
```

Some things to keep in mind when trying to achieve high coverage:

- test units should interact with your component using every variation
- **if** and **early return** statements need to be considered and both or multiple paths need to be tested
- optional chaining (**?.**) gets increasingly harder to test the longer the chain and GraphQL type nullability should be a factor to consider when building your component

At Jobber, our test coverage targets sit around 85%!

## Putting the pieces together 🧩

Now that we've defined our component and how it will get its data, how can we use it at scale and alongside other components? Let's take a look at the loader concept and how to bubble up your fragment!

**Example 🧪**
_Multiple components showing how one can reuse and build larger components made up of smaller components that implement fragment collocation and data fetching (using a loader component). Using the previously defined `Message` component._

```tsx
import React from "react";
import { Message } from "./Message";
export { MessageFragment } from "./Message";
import { gql, useMutation } from "@apollo/client";
import {
  MessageReadMutation,
  MessageReadMutationVariables,
  MessageUnreadMutation,
  MessageUnreadMutationVariables,
  MessageFragment as IMessageFragment,
} from "@/utils/graphql/types";

interface MessagesProps {
  messages: IMessageFragment[];
  isLoading: boolean;
}

export function Messages({ messages, isLoading }: MessagesProps) {
  const [messageRead] = useMutation<
    MessageReadMutation,
    MessageReadMutationVariables
  >(MESSAGE_READ);

  const [messageUnread] = useMutation<
    MessageUnreadMutation,
    MessageUnreadMutationVariables
  >(MESSAGE_READ);

  if (isLoading) return <Spinner />;

  return messages.map((message, index) => (
    <Message
      data={message}
      onRequestUnread={() => handleMessageUnread(message.id)}
      onRequestRead={() => handleMessageRead(message.id)}
    />
  ));

  async function handleMessageRead(id: string) {
    await messageRead({ variables: { id } });
  }

  async function handleMessageUnread(id: string) {
    await messageUnread({ variables: { id } });
  }
}

const MESSAGE_READ = gql`
  mutation MessageRead($id: ID!) {
    messageRead(id: $id) {
      message {
        read
      }
    }
  }
`;

const MESSAGE_UNREAD = gql`
  mutation MessageUnread($id: ID!) {
    messageUnread(id: $id) {
      message {
        read
      }
    }
  }
`;
```

```tsx
import React from "react";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { InputText } from "@jobber/components/InputText";
import { Messages, MessageFragment } from "./Messages";
import { gql, useQuery } from "@apollo/client";
import { ConversationQuery } from "@/utils/graphql/types";

interface ConversationProps {
  data: ConversationQuery;
  isLoading: boolean;
}

export function Conversation({ data, isLoading }: ConversationProps) {
  return (
    <Card title={`Conversation with ${data?.conversation.withPerson.name}`}>
      <Content>
        <Messages
          messages={data?.conversation.messages.nodes || []}
          isLoading={loading}
        />
        <InputText palceholder="Message" />
      </Content>
    </Card>
  );
}

export const CONVERSATION_QUERY = gql`
  query Conversation($id: ID!) {
    withPerson {
      name
    }
    conversation(id: $id, last: 25) {
      messages {
        nodes {
          ...MessageFragment
        }
      }
    }
  }
  ${MessageFragment}
`;
```

```tsx
import React from "react";
import { Conversation, ConversationQuery } from "./Conversation";
import { gql, useQuery } from "@apollo/client";
import {
  ConversationQuery as ConversationQueryType,
  ConversationQueryVariables,
} from "@/utils/graphql/types";

export function ConversationLoader() {
  const { data, loading } = useQuery<
    ConversationQuery,
    ConversationQueryVariables
  >(CONVERSATION_QUERY);

  return <Conversation data={data} isLoading={loading} />;
}
```

Using the `loader` pattern, we can easily implement and test our `Conversation` component and handle query transformation in our loader component. In addition, we don't need to mock as much using `MockedProvider` from Apollo ([see testing react components using Apollo](https://www.apollographql.com/docs/react/development-testing/testing/)). In addition, queries or fragments will be much easier to add when using a tool such as [GraphQL Code Generator](https://www.graphql-code-generator.com/) our Typescript types become very easy to implement!
