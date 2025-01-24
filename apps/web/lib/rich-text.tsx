import { format } from "@flasd/whatsapp-formatting";

export function renderRichText(text: string) {
  const renderedText = format(text);
  const lines = renderedText.split("<br>");
  return lines
    .map((line) =>
      line
        .split(" ")
        .map((element) => {
          if (element.startsWith("http")) {
            return `<a
            class="text-accent underline"
            href="${element}"
            rel="noopener"
            target="_blank"
          >
            ${element}
          </a>`;
          }
          return element;
        })
        .join(" "),
    )
    .join("<br/>");
}
