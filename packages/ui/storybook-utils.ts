export function enumArgTypes(Enum: object, type?: string) {
  return {
    options: Object.values(Enum).filter((x) => typeof x === "string"),
    mapping: Enum,
    control: { type: type || "radio" },
  };
}
