
const restEndPoint = Cypress.env('restEndpoint')
const requestEndPoint = Cypress.env('requestEndPoint')

class apiHelperFunctions {
    apiLogin({ userEmail, password }) {
        cy.request({
            method: 'POST',
            url: `${restEndPoint}/login`,
            body: {
                email: userEmail,
                password
            },
            headers: {
                "content-type": "application-json"
            }
        }).then(res => {
            if (res?.body?.auth?.idToken) {
                return cy.setCookie(key('authToken'), res.body.auth.idToken, {
                    domain: '.classavo.com',
                    secure: true,
                    sameSite: true,
                    httpOnly: true,
                })
            }
            if (res.body.userStatus === "Not_Verified") {
                throw new Error("User not verified ")
            }
        })
    }

    apiJoinCourse({ courseName, coursePassword, userId }) {
        let authToken
        cy.getCookie('authToken').then(cookie => {
            authToken = cookie.value
        })

        cy.request({
            method: 'POST',
            url: `${requestEndPoint}/join-course`,
            headers: {
                "content-type": "application-json",
                "Cookie": `token=${authToken}`
            },
            body: {
                courseDetails: {
                    id: courseName,
                    password: coursePassword
                },
                userId,
            }
        }).then(joinResp => {
            expect(joinResp.status).to.eq(200)
            expect(joinResp.body.registrationId).not.to.null
            return joinResp.body
        })
    }

    apiLogout() {
        cy.request({
            method: 'POST',
            url: `${restEndPoint}/logout`,
            headers: {
                "content-type": "application-json"
            }
        })
        cy.clearAllCookies()
    }
}
export default apiHelperFunctions