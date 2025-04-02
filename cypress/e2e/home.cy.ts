describe("Sign Up & Connect Instagram", () => {
  it("should allow a user to sign up and connect Instagram", () => {
    cy.viewport("macbook-15");
    cy.visit("/");
    // Go to sign up page
    cy.get("button").contains("Join Us").click();
  });
});
