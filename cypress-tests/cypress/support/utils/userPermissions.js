import { commonSelectors } from "Selectors/common";
import { usersSelector } from "Selectors/manageUsers";
import { usersText } from "Texts/manageUsers";
import * as users from "Support/utils/manageUsers";
import * as common from "Support/utils/common";
import { path } from "Texts/common";
import { groupsSelector } from "Selectors/manageGroups";
import { groupsText } from "Texts/manageGroups";
import { dashboardSelector } from "../../constants/selectors/dashboard";

export const adminLogin = () => {
  common.logout();
  cy.appUILogin();
  common.navigateToManageGroups();
};

export const addNewUserSW = (firstName, lastName, email) => {
  common.navigateToManageUsers();
  cy.get(usersSelector.inviteUserButton).click();

  users.inviteUser(firstName, lastName, email);
  cy.clearAndType(usersSelector.passwordInput, usersText.password);
  cy.clearAndType(usersSelector.confirmPasswordInput, usersText.password);
  cy.get(usersSelector.finishSetup).click();
  cy.verifyToastMessage(
    commonSelectors.toastMessage,
    usersText.swPasswordSuccessToast
  );
  cy.url().should("include", path.loginPath);

  cy.login(email, usersText.password);
  cy.get(usersSelector.dropdownText).verifyVisibleElement(
    "have.text",
    "My workspace"
  );
};

export const reset = () => {
  common.navigateToManageGroups();
  cy.contains(groupsText.allUsers).click();
  cy.get(groupsSelector.permissionsLink).click();

  cy.get(groupsSelector.appsCreateCheck).then(($el) => {
    if ($el.is(":checked")) {
      cy.get(groupsSelector.appsCreateCheck).uncheck();
    }
  });

  cy.get(groupsSelector.permissionsLink).click();
  cy.get(groupsSelector.appsDeleteCheck).then(($el) => {
    if ($el.is(":checked")) {
      cy.get(groupsSelector.appsDeleteCheck).uncheck();
    }
  });

  cy.get(groupsSelector.permissionsLink).click();
  cy.get(groupsSelector.foldersCreateCheck).then(($el) => {
    if ($el.is(":checked")) {
      cy.get(groupsSelector.foldersCreateCheck).uncheck();
    }
  });
};

export const addNewUserMW = (firstName, lastName, email, companyName) => {
  common.navigateToManageUsers();
  users.inviteUser(firstName, lastName, email);
  cy.clearAndType(commonSelectors.passwordInputField, usersText.password);
  cy.get(commonSelectors.acceptInviteButton).click();
  cy.get(commonSelectors.workspaceName).verifyVisibleElement(
    "have.text",
    "My workspace"
  );
  cy.get(commonSelectors.workspaceName).click();
  cy.contains("Untitled workspace").should("exist");
};
