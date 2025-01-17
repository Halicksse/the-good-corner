import { gql } from "@apollo/client";

export const CREATE_NEW_AD = gql`
  mutation CreateNewAd($data: AdInput!) {
    createNewAd(data: $data) {
      id
    }
  }
`;

export const DELETE_AD_BY_ID = gql`
  mutation DeleteAdById($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;

export const UPDATE_AD_BY_ID = gql`
  mutation UpdateAdById($data: UpdateAdInput!) {
    updateAd(data: $data)
  }
`;

export const REGISTER = gql`
  mutation Register($data: UserInput!) {
    register(data: $data)
  }
`;

export const LOGIN = gql`
  mutation Login($data: UserInput!) {
    login(data: $data)
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($codeByUser: String!) {
    confirmEmail(codeByUser: $codeByUser)
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($userEmail: String!) {
    forgotPassword(userEmail: $userEmail)
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String!, $code: String!) {
    changePassword(password: $password, code: $code)
  }
`;
