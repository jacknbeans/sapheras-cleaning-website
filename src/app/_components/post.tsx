"use client";

import { useState, useEffect } from "react";

import { api } from "~/trpc/react";
import { Button, Container, Flex, Text } from "@radix-ui/themes";
import { client as tinaClient } from "../../../tina/__generated__/client";
import AwesomeContent from "./awesome-content";

export function LatestPost() {
  const [graphQLResponse, setGraphQLResponse] = useState<Awaited<ReturnType<typeof tinaClient.queries.my_first_collection>>>();
  useEffect(() => {
    const fetchContent = async () => {
      const result = await tinaClient.queries.my_first_collection({
        relativePath: "Hello-World.md",
      });
      setGraphQLResponse(result);
    };

    fetchContent();
  }, []);

  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <Container width={"100%"} size={"1"}>
      { !graphQLResponse && <Text as="p">Loading...</Text>}
      { graphQLResponse && <AwesomeContent content={ graphQLResponse } /> }
      { latestPost ? (
          <Text as="p" truncate>Your most recent post: { latestPost.name }</Text>
        ) : (
          <Text as="p">You have no posts yet.</Text>
        )
      }
      <Flex direction={"column"} gap={"2"}>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            createPost.mutate({ name });
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            className="w-full rounded-full bg-white/10 px-4 py-2"
          />
          <Flex direction={"column"} align={"center"}>
            <Button type="submit" radius="full" size={"3"}>
              <Text weight={"medium"}>{ createPost.isPending ? "Submitting..." : "Submit" }</Text>
            </Button>
          </Flex>
        </form>
      </Flex>
    </Container>
  );
}
