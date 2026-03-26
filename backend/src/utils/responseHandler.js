export const responseHandler = (success, statusCode, message, data = null, errors = null) => {
  return {
    success,
    statusCode,
    message,
    ...(data && { data }),
    ...(errors && { errors }),
  };
};
