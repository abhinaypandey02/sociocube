export function getCurrency(
  isBarter: boolean,
  currencyCode?: string | null,
  price?: number | null,
) {
  const priceString = currencyCode && price && `${currencyCode}${price}`;
  const priceStringWithBarter = isBarter ? ` (${priceString})` : priceString;
  return `${isBarter ? "Barter" : ""}${priceString ? priceStringWithBarter : ""}`;
}
