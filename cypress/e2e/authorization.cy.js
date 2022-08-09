context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("User can not register if user dont exist", () => {
    cy.visit("/login");
    cy.get("#user").type("bingobingo");
    cy.get("#password").type("123123123");

    cy.get("#login-button").click();
    cy.url().should("include", "/login");
  }).timeout(4000);

  it("User can authorize if user exist", () => {
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

    cy.visit("/login");
    cy.get("#user").type("bingobingo");
    cy.get("#password").type("123123123");
    cy.intercept("POST", "http://localhost:8000/api/login");
    cy.get("#login-button").click();
    cy.url().should("not.include", "/login");
  }).timeout(4000);

  it("User can not register even if user exists but at least one input is invalid", () => {
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

    cy.visit("/login");
    cy.get("#user").type("bingobingo");
    cy.get("#password").type("123123124");
    cy.intercept("POST", "http://localhost:8000/api/login", {
      statusCode: 404,
    });
    cy.get("#login-button").click();
    cy.url().should("include", "/login");
  }).timeout(4000);
});
