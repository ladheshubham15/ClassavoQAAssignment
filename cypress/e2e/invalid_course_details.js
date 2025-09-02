import apiHelperFunctions from "../support/apiFunctions/apiHelperFunctions"
import ClassavoUIPageFunctions from "../support/uiFunctions/uiHelperFunctions"
import { HOME_URL, DASHBOARD_URL} from "../support/helperConstants/helperConstants"

describe('Test with invalid course and details', () => {
  const apiFunc = new apiHelperFunctions()
  const helperFunc = new ClassavoUIPageFunctions()
  const studentEmail = Cypress.env('studentCEmail')
  const studentPassword = Cypress.env('passwordC')

  const courseDetails = {
    courseName: 'Cypress Test Automation Tool',
    courseId: '#cyp_123' //invalid id
  }


  it("should reject invalid course code or password", () => {
    apiFunc.apiLogin({
      userEmail: studentEmail,
      password: studentPassword
    })

    cy.visit(HOME_URL)

    helperFunc.navigateToMenuItem("My Courses")

    helperFunc.joinCourse({
      courseName: courseDetails.courseName,
      courseId: courseDetails.courseId
    })

    helperFunc.verifyMessageToast('Invalid course code or password')
    cy.url().should("not.include", DASHBOARD_URL)
  })
})