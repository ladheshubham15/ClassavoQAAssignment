class ClassavoPageLocators {
  // ---------- Signup Page ----------
  getSignupEmailField() {
    return cy.get('#useremail')
  }

  getSignupPassword() {
    return cy.get('input[name="password"]')
  }

  getRetypePasswordField(){
     return cy.get('input[name="retype_password"]')
  }

  getSubmitButton() {
    return cy.contains('button', "Submit")
  }

  getSuccessToast(message) {
    return cy.contains('.successToast', message)
  }

  // ---------- Login Page ----------
  getLoginEmail() {
    return cy.get('#login-email')
  }

  getLoginPassword() {
    return cy.get('#login-password')
  }

  getLoginButton() {
    return cy.get('button[name="login-submit"]');
  }

  getWelcomeText() {
    return cy.contains('span', 'Welcome to Classavo');
  }

  // ---------- Navigation ----------
  getMenuMyCourses() {
    return cy.get('.menuItem:contains("My Courses")');
  }

  // ---------- Join Course Modal ----------
  getJoinCourseButton() {
    return cy.get('#joincourseButton');
  }

  getJoinCourseModal() {
    return cy.contains('.ant-modal', 'Join Course');
  }

  getCourseCodeInput() {
    return cy.get('input[name="course-code"]');
  }

  getCoursePasswordInput() {
    return cy.get('input[name="course-password"]');
  }

  getJoinCourseConfirmButton() {
    return cy.get('button[name="join-course-confirm"]');
  }

  // ---------- Course Dashboard ----------
  getCourseTitle(title) {
    return cy.contains('h2', title);
  }

  getStartCourseButton() {
    return cy.get('button[name="Start Course"]');
  }
}

export default ClassavoPageLocators;
