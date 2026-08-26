import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { Box, Button, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <Flex direction={"column"} minHeight={"100vh"} align={"center"} justify={"center"} className="bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
        <Box className="container">
          <Flex direction={"column"} align={"center"} justify={"center"} gap={"8"} px={"4"} py={"9"}>
            <Heading size={{ initial: "5", sm: "9" }} weight={"bold"} className="tracking-tight">
              Create <Text className="text-[hsl(280,100%,70%)]">T3</Text> App
            </Heading>
            <Grid columns={{ initial: "1", sm: "2" }} gap={{ initial: "4", md: "6" }}>
              <Flex direction={"column"} gap={"4"} p={"4"} style={{ borderRadius: "var(--radius-5)" }} className="max-w-xs bg-white/10 hover:bg-white/20">
                <Link href={"https://create.t3.gg/en/usage/first-steps"} target="_blank">
                  <Heading as="h3" size={"6"} weight={"bold"}>First Steps →</Heading>
                  <Text as="div" size={"4"}>
                    Just the basics - Everything you need to know to set up your
                    database and authentication.
                  </Text>
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"4"} p={"4"} style={{ borderRadius: "var(--radius-5)" }} className="max-w-xs bg-white/10 hover:bg-white/20">
                <Link href={"https://create.t3.gg/en/usage/first-steps"} target="_blank">
                  <Heading as="h3" size={"6"} weight={"bold"}>Documentation →</Heading>
                  <Text as="div" size={"4"}>
                    Learn more about Create T3 App, the libraries it uses, and how
                    to deploy it.
                  </Text>
                </Link>
              </Flex>
            </Grid>
            <Flex direction={"column"} align={"center"} gap={"2"}>
              <Text as="p" size={"6"}>
                { hello ? hello.greeting : "Loading tRPC query..." }
              </Text>

              <Flex direction={"column"} align={"center"} justify={"center"} gap={"4"}>
                <Text as="p" align={"center"} size={"6"}>
                  { session && <Text>Logged in as {session.user?.name}</Text> }
                </Text>
                <Link href={ session ? "/api/auth/signout" : "/api/auth/signin" } className="no-underline">
                  <Button size={"3"} variant="solid" radius="full" style={{ cursor: "pointer" }}>
                    <Text weight={"medium"}>{ session ? "Sign out" : "Sign in" }</Text>
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Flex>

          {session?.user && <LatestPost />}
        </Box>
      </Flex>
    </HydrateClient>
  );
}
