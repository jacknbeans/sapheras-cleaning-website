import { defineConfig } from "tinacms";
import { amazingTitleBlock } from "~/app/_templates/amazing-header/amazing-header.template";
import { beautifulImageBlock } from "~/app/_templates/beautiful-image/beautiful-image.template";
import { incredibleBodyBlock } from "~/app/_templates/incredible-body/incredible-body.template";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "my_first_collection",
        label: "My first collection",
        path: "content/first",
        fields: [
          {
            type: "object",
            name: "blocks",
            label: "Blocks",
            list: true,
            templates: [
              amazingTitleBlock,
              beautifulImageBlock,
              incredibleBodyBlock,
            ],
          },
        ],
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "Hello-World") {
              return "/";
            }
          },
        },
      },
    ],
  },
});
