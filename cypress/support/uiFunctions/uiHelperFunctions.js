import ClassavoPageLocators from "../helperLocators/locators"

const helperLoc = new ClassavoPageLocators()

class ClassavoUIPageFunctions {

    loginToPlatform({ userEmail, password }) {
        helperLoc.getLoginEmail().type(userEmail)
        helperLoc.getLoginPassword().type(password)
        helperLoc.getLoginButton().click()
    }

    joinCourse({ courseName, courseId }) {
        helperLoc.getJoinCourseModal().within(() => {
            helperLoc.getCourseCodeInput().type(courseName)
            helperLoc.getCoursePasswordInput().type(courseId)
            helperLoc.getJoinCourseConfirmButton().click()
        })
    }

    verifyMessageToast(toastMessage) {
        cy.contains('.messageToast', toastMessage).should('be.visible')
    }

    verifyIfCurrentUrl(urlPath) {
        cy.url().then(url => {
            expect(url).to.include.text(urlPath)
        })
    }

    navigateToMenuItem(menuOption) {
        helperLoc.getMenuItem(menuOption).click()
    }

    verifyCourseTitleVisibleOnPage(courseTitle) {
        cy.contains('h2', courseTitle).should('be.visible')
    }
}

export default ClassavoUIPageFunctions
