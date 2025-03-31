Cypress.on("uncaught:exception", () => {
  return false;
});
Cypress.on("fail", (err) => {
  void fetch("http://localhost:3000/api/delete-user");
  throw err;
});
