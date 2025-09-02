import ClassavoPageLocators from "../support/helperLocators/locators"
import ClassavoUIPageFunctions from "../support/uiFunctions/uiHelperFunctions"
import { SIGNUP_URL,LOGIN_URL,DASHBOARD_URL,HOME_URL } from "../support/helperConstants/helperConstants"

describe("Course Join Flow", () => {

    const helperLoc = new ClassavoPageLocators()
    const helperFunc = new ClassavoUIPageFunctions()
    const version = Math.floor(Math.random() * 100) + 1

    const newStudentEmail = `newStudent_${version}@gmail.com`
    const studentPassword = Cypress.env('passwordA')

    const courseDetails = {
        courseName: 'Cypress Test Automation Tool',
        courseId: 'cyp_123'
    }

    beforeEach(() => {
        cy.visit(SIGNUP_URL)
    })

    it("should allow student to sign up, confirm email, login, and join course", () => {

        helperLoc.getSignupEmailField().type(newStudentEmail)
        helperLoc.getSignupPassword().type(studentPassword)
        helperLoc.getRetypePasswordField().type(studentPassword)


        cy.log("Intercepting Response to fetch email verification url and complete email verification process")
        cy.intercept({
            path: '/api/verify-email'
        }).as("verifyEmail")

        helperLoc.getSubmitButton().click()

        cy.wait("@verifyEmail").then(resp => {
            const verifyEmailUrl = JSON.stringify(resp.response.body.verifyEmailUrl)
            cy.visit(verifyEmailUrl)
            helperFunc.verifyMessageToast('User Verified Successfully')
        })
        cy.log('Verify User Lands on Login page after email verification ')
        helperFunc.verifyIfCurrentUrl(LOGIN_URL)

        cy.log('Login to Platform')

        helperFunc.loginToPlatform({
            userEmail: newStudentEmail,
            password: studentPassword
        })
        helperFunc.verifyMessageToast('Login Successfully')

        cy.log('Verify User Lands on Home page ')

        cy.contains('span', 'Welcome to Classavo').should('be.visible')
        helperFunc.verifyIfCurrentUrl(HOME_URL)

        cy.log('Join the course')

        helperFunc.navigateToMenuItem("My Courses")
        helperFunc.joinCourse({
            courseName: courseDetails.courseName,
            courseId: courseDetails.courseId
        })

        cy.log('verify if we are on correct dashboard and start course button visible')

        helperFunc.verifyIfCurrentUrl(DASHBOARD_URL)
        helperFunc.verifyCourseTitleVisibleOnPage(courseDetails.courseName)
        helperLoc.getStartCourseButton().should("be.visible")
    })
})