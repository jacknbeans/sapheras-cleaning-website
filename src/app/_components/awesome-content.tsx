"use client";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type client from "../../../tina/__generated__/client";

import { Container, Em, Heading } from "@radix-ui/themes";

export default function AwesomeContent({ content }: { content: Awaited<ReturnType<typeof client.queries.my_first_collection>> }) {
  const { data, query, variables } = content;
  const pageData = useTina({
    data,
    query,
    variables,
  });

  const blocks = pageData.data.my_first_collection.blocks;

  return (
    <Container>
      {
        blocks?.map((block, index) => {
          switch (block?.__typename) {
            case "My_first_collectionBlocksTitleBlock":
              return <Heading key={index} weight={"bold"}><Em>{ block.title }</Em></Heading>;
            case "My_first_collectionBlocksBeautifulImageBlock":
              return <img key={index} src={ block.image ? block.image : undefined } />;
            case "My_first_collectionBlocksIncredibleBody":
              return <TinaMarkdown key={index} content={ block.body } />;
          }
        })
      }
    </Container>
  )
}