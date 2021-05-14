module.exports = {
  defaultError: {
    name: "somethingWentWrong",
    message: "Something went wrong please try again later",
    status: 500,
  },
  badRequest: {
    name: "badRequest",
    message: "Missing required fields",
    status: 400,
  },
  nothingToUpdate: {
    name: "NothingToUpdate",
    message: "No data send for update",
    status: 400,
  },

  clientNotFound: {
    name: "clientkNotFound",
    message: "Client is not found",
    status: 404,
  },
  providerNotFound: {
    name: "providerNotFound",
    message: "Provider is not found",
    status: 404,
  },
  nothingToRemove: {
    name: "nothingToRemove",
    message: "There is nothing to remove",
    status: 404,
  },

  pathIsRequired: {
    name: "PathIsRequired",
    message: "Path is required",
    status: 404,
  },
  emailValidationError: {
    name: "EmailValidationError",
    message: "Invalid email",
    status: 400,
  },
  emailDuplicationError: {
    name: "emailDuplicationError",
    message: "The email address is already registered",
    status: 400,
  },
};
