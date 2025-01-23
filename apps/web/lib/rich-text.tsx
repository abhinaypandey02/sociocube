import { format } from "@flasd/whatsapp-formatting";

export function renderRichText(text: string) {
  const lines = format(text);
  const elements = lines.split(" ");
  return elements
    .map((element) => {
      if (element.startsWith("http")) {
        return (
          <a
            className="text-accent underline"
            href={element}
            key={element}
            rel="noopener"
            target="_blank"
          >
            {element}{" "}
          </a>
        );
      }
      return element;
    })
    .join(" ");
}
