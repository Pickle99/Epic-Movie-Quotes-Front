context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("User can register if inputs are valid", () => {
    cy.visit("/register");
    cy.get("#username").type("bingobingo");
    cy.get("#email").type("admin@gmail.com");
    cy.get("#password").type("123123123");
    cy.get("#password_confirmation").type("123123123");

    cy.intercept("POST", "http://localhost:8000/api/register", {
      statusCode: 200,
    });
    cy.get("#register-button").click();
    cy.url().should("include", "/email-verification-sent");
  }).timeout(4000);

  it("User can not register if at least one input is invalid", () => {
    cy.visit("/register");
    cy.get("#username").type("bingO");
    cy.get("#email").type("admin@gmail.com");
    cy.get("#password").type("123123123");
    cy.get("#password_confirmation").type("123123123");

    cy.get("#register-button").should("be.disabled");
    cy.url().should("include", "/register");
  }).timeout(4000);
});
