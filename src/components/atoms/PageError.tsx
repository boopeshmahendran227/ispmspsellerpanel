import Error from "next/error";

interface PageErrorProps {
  statusCode: number;
}

const getErrorMessage = (statusCode) => {
  if (statusCode === 404) {
    return "Page not found";
  } else if (statusCode === 401) {
    return "Unauthorized";
  } else if (statusCode === 403) {
    return "Forbidden";
  } else if (statusCode >= 500) {
    return "An unexpected error has occured. Please try again";
  }
  return "Error";
};

const PageError = (props: PageErrorProps) => {
  const { statusCode } = props;

  return <Error title={getErrorMessage(statusCode)} statusCode={statusCode} />;
};

export default PageError;
