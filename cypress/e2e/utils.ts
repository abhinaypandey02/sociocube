import { v4 } from "uuid";

export function createUser() {
  const id = v4().slice(0, 10);
  const email = `test${id}@sociocube.com`;
  const name = `Test user ${id}`;
  // Start from the index page
  cy.viewport("macbook-15");
  cy.visit("/");
  // Go to sign up page
  cy.get("button").contains("Join Us").click();

  // Fill out the sign-up form
  cy.get('input[name="name"]').type(`Test user ${id}`);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(id);
  cy.get('input[name="c_password"]').type(id);

  // Submit the form
  cy.get("button").contains("Sign up").should("be.enabled").click();
  cy.get("button").contains("Sign up").click();

  // Verify successful sign-up
  cy.contains("Let's get you onboarded", { timeout: 8000 }).should(
    "be.visible",
  );

  return { email, id, name };
}

export function createOnboardedUser() {
  const { name, id, email } = createUser();
  cy.get("button").contains("Start now").click();
  cy.get('input[name="instagram"]').type("egupta");
  cy.get('button[type="submit"]').contains("Connect").click();
  cy.contains("Let's know you better").should("be.visible");

  cy.get('input[placeholder="Select the category that best suits you"]').type(
    "Travel",
  );
  cy.contains("Travel").click();

  cy.get('input[placeholder="Select your gender"]').type("Female");
  cy.contains("Female").click();
  cy.get("button:visible").contains("Next").click();
  cy.get('input[name="dob"]').type("2000-01-01");
  cy.get("button:visible").contains("Next").click();
  cy.get('input[placeholder="Select your country"]').type("Spain");
  cy.contains("Spain").click();
  cy.get('input[placeholder="Select your city"]').type("Madrid");
  cy.contains("Madrid").click();
  cy.get("button:visible").contains("Next").click();
  cy.get('input[name="starting"]').type("123");
  cy.get("button:visible").contains("Next").click();
  cy.get('input[name="username"]').type(id);
  cy.get("button:visible").contains("Next").click();
  cy.contains(name, { timeout: 10000 }).should("be.visible");
  return { name, id, email };
}
