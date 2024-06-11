import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import { cn } from "./shadcn";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name) {
      domNode.attribs.className = cn(
        
        ["",domNode.attribs.className],{
          "text-beige":domNode.attribs.className?.includes("text-beige"),
        }
      );
    }
  },
};

export const parseText = (text: string) => {
  return parse(text, options);
};
