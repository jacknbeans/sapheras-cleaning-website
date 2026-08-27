"use client";
import { useTina } from "tinacms/dist/react";
import type client from "../../../tina/__generated__/client";

import { Container, Em, Heading } from "@radix-ui/themes";

export default function AwesomeContent({ content }: { content: Awaited<ReturnType<typeof client.queries.my_first_collection>> }) {
  const { data, query, variables } = content;
  const pageData = useTina({
    data,
    query,
    variables,
  });

  const amazingTitle = pageData.data.my_first_collection.title;

  return (
    <Container>
      <Heading weight={"bold"}><Em>{ amazingTitle }</Em></Heading>
    </Container>
  )
}