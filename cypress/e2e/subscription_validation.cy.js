import apiHelperFunctions from "../support/apiFunctions/apiHelperFunctions"
import ClassavoPageLocators from "../support/helperLocators/locators"
import ClassavoUIPageFunctions from "../support/uiFunctions/uiHelperFunctions"

import { HOME_URL, BILLING_URL} from "../support/helperConstants/helperConstants"

describe("Subscription Validation", () => {
  const apiFunc = new apiHelperFunctions()
  const helperLoc = new ClassavoPageLocators()
  const helperFunc = new ClassavoUIPageFunctions()
  const studentEmail = Cypress.env('studentAEmail')
  const studentPassword = Cypress.env('passwordA')
  const courseDetails = {
    courseName: 'Cypress Test Automation Tool',
    courseId: 'cyp_123'
  }

  beforeEach(() => {
    apiFunc.apiLogin({
      userEmail: studentEmail,
      password: studentPassword
    })
    cy.visit('/home')
    helperFunc.navigateToMenuItem("My Courses")
  })

  it("Allows access when subscription is Active", () => {
    cy.log('Mocking and Intercepting Subscription API to return Active Status')
    cy.intercept("GET", "/subscription/status", {
      statusCode: 200,
      body: { subscriptionStatus: "Active" }
    }).as("subscriptionCheck")

    helperFunc.joinCourse({
      courseName: courseDetails.courseName,
      courseId: courseDetails.courseId
    })

    cy.wait("@subscriptionCheck")
    helperFunc.verifyCourseTitleVisibleOnPage('Cypress Testing')
    helperLoc.getStartCourseButton().should("be.visible")
  })

  it("Blocks access when subscription is Expired", () => {
    cy.log('Mocking and Intercepting Subscription API to return Expired Status')
    cy.intercept("GET", "/subscription/status", {
      statusCode: 200,
      body: { subscriptionStatus: "Expired" }
    }).as("subscriptionCheck")

    cy.visit(HOME_URL)

    helperFunc.joinCourse({
      courseName: courseDetails.courseName,
      courseId: courseDetails.courseId
    })

    cy.wait("@subscriptionCheck")

    helperFunc.verifyMessageToast("Your license has expired, Please renew to continue")

    helperFunc.verifyIfCurrentUrl(BILLING_URL)
  })

  it("Shows upgrade when subscription is Not Available", () => {
    cy.log('Mocking and Intercepting Subscription API to return Not Available Status')
    cy.intercept("GET", "/subscription/status", {
      statusCode: 200,
      body: { subscriptionStatus: "Not Available" }
    }).as("subscriptionCheck")

    cy.visit(HOME_URL)

    helperFunc.joinCourse({
      courseName: courseDetails.courseName,
      courseId: courseDetails.courseId
    })

    cy.wait("@subscriptionCheck")
    helperFunc.verifyMessageToast("No license assigned")
    helperFunc.verifyIfCurrentUrl(BILLING_URL)
  })
})
