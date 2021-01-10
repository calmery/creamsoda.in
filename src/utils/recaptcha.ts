import axios from "axios";

type SuccessResponse = {
  challenge_ts: string;
  hostname: string;
  score: number;
  success: true;
};

type FailureResponse = {
  "error-codes": string[];
  success: false;
};

const isSuccess = (
  maybeSuccessResponse: SuccessResponse | FailureResponse
): maybeSuccessResponse is SuccessResponse => maybeSuccessResponse.success;

export const verifyRecaptcha = async (response: string) => {
  const params = new URLSearchParams();
  params.append("response", response);
  params.append("secret", process.env.RECAPTCHA_SECRET_KEY);

  const { data } = await axios.post<SuccessResponse | FailureResponse>(
    "https://www.google.com/recaptcha/api/siteverify",
    params
  );

  return isSuccess(data);
};