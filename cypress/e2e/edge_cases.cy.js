import apiHelperFunctions from "../support/apiFunctions/apiHelperFunctions"
import ClassavoUIPageFunctions from "../support/uiFunctions/uiHelperFunctions"
import { COURSE_URL } from "../support/helperConstants/helperConstants"

describe("Edge cases Tests", () => {
  const apiFunc = new apiHelperFunctions()
  const helperFunc = new ClassavoUIPageFunctions()
  const studentEmail = Cypress.env('studentAEmail')
  const studentPassword = Cypress.env('passwordA')
  const student2Email = Cypress.env('studentBEmail')
  const student2Password = Cypress.env('passwordB')
  let userID
  let courseSecret

  const courseDetails = {
    courseName: 'Cypress Test Automation Tool',
    courseId: 'cyp_123'
  }

  it("handles API timeout gracefully", () => {
    apiFunc.login({
      userEmail: studentEmail,
      password: studentPassword
    })

    cy.log('Mocking API Response to get failed due to network error')
    cy.intercept("POST", "/api/join-course", {
      forceNetworkError: true,
    }).as("joinCourse")

    helperFunc.joinCourse({
      courseName: courseDetails.courseName,
      courseId: courseDetails.courseId
    })

    cy.contains("Something went wrong with subscriptions").should("be.visible")
  })

  it("Blocks access to course dashboard without enrollment", () => {
    cy.log('Student A Joins the course')
    apiFunc.apiLogin({
      userEmail: studentEmail,
      password: studentPassword
    }).then(response => {
      userID = response.body.userId
    })

    apiFunc.apiJoinCourse({
      courseName: courseDetails.courseName,
      coursePassword: courseDetails.courseId,
      userId: userID
    }).then(joinResp => {
      courseSecret = joinResp.coursesecret

      cy.log('Student A logs out')
      apiFunc.apiLogout()
      cy.log('Student B logs in who do not have any enrollment for the course')
      apiFunc.apiLogin({
        userEmail: student2Email,
        password: student2Password
      })
      cy.visit(`${COURSE_URL}/${courseSecret}`)

      cy.contains("Access denied").should("be.visible")
    })
  })

})