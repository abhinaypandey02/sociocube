export function renderRichText(text: string) {
  const lines = text.split("\n");
  return lines.map(renderLine).map((line) => (
    <>
      {line}
      <br />
    </>
  ));
}
function renderLine(line: string) {
  const elements = line.split(" ");
  let isBoldMode = false;
  return elements.map((element) => {
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
    if (element.startsWith("*") && element.endsWith("*")) {
      return <strong key={element}>{element.slice(1, -1)} </strong>;
    }
    if (element.endsWith("*")) {
      isBoldMode = false;
      return <strong key={element}>{element.slice(0, -1)} </strong>;
    }

    if (element.startsWith("*") || isBoldMode) {
      isBoldMode = true;
      return (
        <strong key={element}>
          {element.slice(Number(element.startsWith("*")))}{" "}
        </strong>
      );
    }

    return `${element} `;
  });
}
