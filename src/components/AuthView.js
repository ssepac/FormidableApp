import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { sendCode, verifyCode } from "../networking/auth";

const AuthView = () => {
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [codeSubmitting, setCodeSubmitting] = useState();
  const [codeSubmitted, setCodeSubmitted] = useState();
  const [validationMessage, setValidationMessage] = useState();
  const [verifyCodeSubmitting, setVerifyCodeSubmitting] = useState();
  const [verifySubmitted, setVerifySubmitted] = useState();
  const navigate = useNavigate()

  const submitCodeCallback = useCallback(
    (e) => {
      e.preventDefault();
      setCodeSubmitting(true);
      sendCode(email)
        .then((resp) => {
          if (resp.error) {
            throw new Error();
          }
          setCodeSubmitting(false);
          setCodeSubmitted(true);
          setValidationMessage("");
        })
        .catch((err) => {
          setValidationMessage("Could not submit code.");
          setCodeSubmitting(false);
        });
    },
    [email, codeSubmitting]
  );
  const verifyCodeCallback = useCallback(
    (e) => {
      e.preventDefault();
      setVerifyCodeSubmitting(true);
      verifyCode(code, email)
        .then((resp) => {
          if (resp.error) {
            throw new Error();
          }
          setValidationMessage("");
          setVerifyCodeSubmitting(false);
          setVerifySubmitted(true);
          localStorage.setItem("token", resp.result);
          localStorage.setItem("email", email);
          navigate('/video/list')
        })
        .catch(() => {
          setValidationMessage("Could not verify code.");
          setVerifyCodeSubmitting(false);
        });
    },
    [code, email, verifyCodeSubmitting]
  );

  const loader = <span>Loading...</span>;

  const emailView = useMemo(() => {
    if (!codeSubmitting) {
      return (
        <form onSubmit={submitCodeCallback}>
          <label>
            Email:
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }

    return loader;
  }, [codeSubmitting, email]);

  const verifyView = useMemo(() => {
    const form = verifyCodeSubmitting ? (
      loader
    ) : (
      <form onSubmit={verifyCodeCallback}>
        <label>
          Code:
          <input type="text" onChange={(e) => setCode(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );

    return (
      <>
        {form}
        {<a href="/auth">Back</a>}
      </>
    );
  }, [verifyCodeSubmitting, code]);

  return (
    <div>
      <div>{codeSubmitted ? verifyView : emailView}</div>
      <span style={{ color: "red" }}>{validationMessage}</span>
    </div>
  );
};

export default AuthView;
