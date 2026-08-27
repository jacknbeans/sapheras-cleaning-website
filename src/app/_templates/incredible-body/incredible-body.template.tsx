import { type Template } from "tinacms";

export const incredibleBodyBlock: Template = {
  name: "incredibleBody",
  label: "Incredible body",
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
  ]
}
