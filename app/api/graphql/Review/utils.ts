export function getReviewDeadline() {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  return tenDaysAgo;
}
