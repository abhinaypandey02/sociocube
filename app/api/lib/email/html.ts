import {
  EmailComponent,
  EmailComponentType,
  TemplateLayoutOptions,
} from "@backend/lib/email/types";

function getTemplateLayout(
  content: string[] | string,
  props?: TemplateLayoutOptions,
) {
  return `<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing:0;border-collapse:collapse;min-width:unset;max-width:${props?.width ? props.width + "px" : "100%"}">
    <tr>
      <td style="${props?.style || ""}" align="${props?.align || "left"}">${typeof content === "string" ? content : content.join("")}</td>
    </tr>
  </table>`;
}

function getComponentHTML(component: EmailComponent): string {
  switch (component.type) {
    case EmailComponentType.LIST:
      return getTemplateLayout(
        `<ul style="margin:0;">
${component.items.map((item) => `<li style="margin-bottom:6px;font-size:18px;">${item}</li>`).join("")}
</ul>
      `,
        component.options,
      );
    case EmailComponentType.IMAGE:
      return getTemplateLayout(
        `
      <img alt="" src="${component.url}" style="border:none;max-width:initial;object-fit:cover;width:${component.width}px;display:block" width="${component.width}" class="CToWUd" data-bit="iit">
      `,
        component.options,
      );
    case EmailComponentType.GRID:
      return buildTemplate(component.components);
    case EmailComponentType.BUTTON:
      return getTemplateLayout(
        `<a href="${component.url}" target="_blank" style="display:block;"><button style="color:white;background-image:linear-gradient(#65b071,#508959);padding:12px 28px;border-radius:14px;line-height:30px;font-size:20px;border:0;margin:1rem 0;">${component.content}</button></a>`,
        component.options,
      );
    case EmailComponentType.HEADING:
      return getTemplateLayout(
        `<h2 style="font-size:24px;line-height:32px;color:#222222;font-weight: 400;margin-top:1.5rem;margin-bottom:1rem;">${component.content}</h2>`,
        component.options,
      );
    case EmailComponentType.PARAGRAPH:
      return getTemplateLayout(
        `<p style="font-size:18px;">${component.content.replaceAll("\n", "<br/>")}</p>`,
        component.options,
      );
  }
}

export const getRenderedTemplate = (
  heading: string,
  components: EmailComponent[],
) => {
  const content = buildTemplate(components);
  return getTemplateLayout(
    [
      getTemplateLayout(
        [
          getComponentHTML({
            type: EmailComponentType.IMAGE,
            url: "https://sociocube.com/icon1.png",
            width: 50,
            options: {
              align: "center",
              style: "padding-bottom:20px;",
            },
          }),
          getTemplateLayout(heading, {
            align: "center",
            style:
              "padding-bottom:20px;font-size:30px;line-height:36px;color:#5b9364;font-weight:500;",
          }),
          getTemplateLayout(content),
        ],
        {
          width: 640,
          style:
            "padding:40px 20px;background-color:#ffffff;border-radius:12px;",
        },
      ),
      getTemplateLayout("Sociocube", {
        style: "padding-top:40px;",
        align: "center",
      }),
    ],
    {
      align: "center",
      style:
        "background-color:#f5f5f5;font-family:Helvetica,Roboto,Arial,sans-serif;padding:40px 8px;color:#44475b;",
    },
  );
};

function buildTemplate(components: EmailComponent[]) {
  return getTemplateLayout(components.map((c) => getComponentHTML(c)).join(""));
}
