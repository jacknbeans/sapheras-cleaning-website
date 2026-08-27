import { type Template } from "tinacms";

export const beautifulImageBlock: Template = {
  name: "beautifulImageBlock",
  label: "Beautiful image",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "image",
    },
  ]
}
