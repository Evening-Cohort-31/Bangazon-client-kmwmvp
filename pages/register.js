import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useMemo } from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { useAppContext } from "../context/state";
import { register } from "../data/auth";
import { validateEmail, validatePhoneNumber } from "../data/validators";
import { Button, FormField, Title } from "../design";

const PasswordStrengthValidator = ({ passwordRef }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordValidation = useMemo(() => {
    const criteria = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      noSpaces: !/\s/.test(password),
    };

    const score = Object.values(criteria).filter(Boolean).length;
    const maxScore = Object.keys(criteria).length;

    let strength = "Very Weak";
    let color = "#dc3545";

    if (score >= 5) {
      strength = "Strong";
      color = "#28a745";
    } else if (score >= 4) {
      strength = "Good";
      color = "#ffc107";
    } else if (score >= 2) {
      strength = "Fair";
      color = "#fd7e14";
    } else if (score >= 1) {
      strength = "Weak";
      color = "#dc3545";
    }

    return {
      criteria,
      score,
      maxScore,
      strength,
      color,
      isValid: score >= 5,
    };
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordValidation.isValid) {
      console.log("Password is strong enough");
      // Process form submission
    }
  };

  return (
    <div className="field">
      <label className="label">Password</label>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            ref={passwordRef}
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Enter your password"
          />
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-light"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {password && (
        <div className="mt-2">
          <div className="is-flex is-justify-content-space-between mb-1">
            <small>Password Strength:</small>
            <small
              style={{ color: passwordValidation.color, fontWeight: "bold" }}
            >
              {passwordValidation.strength}
            </small>
          </div>
          <progress
            className="progress mb-2"
            value={passwordValidation.score}
            max={passwordValidation.maxScore}
            style={{ accentColor: passwordValidation.color }}
          />
          <div>
            {Object.entries({
              "At least 8 characters": passwordValidation.criteria.minLength,
              "Uppercase letter (A-Z)":
                passwordValidation.criteria.hasUppercase,
              "Lowercase letter (a-z)":
                passwordValidation.criteria.hasLowercase,
              "Number (0-9)": passwordValidation.criteria.hasNumber,
              "Special character (!@#$%^&*)":
                passwordValidation.criteria.hasSpecialChar,
              "No spaces": passwordValidation.criteria.noSpaces,
            }).map(([rule, valid]) => (
              <p
                key={rule}
                className={`help ${valid ? "is-success" : "has-text-grey"}`}
              >
                {valid ? "✓" : "○"} {rule}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Register() {
  const { setToken } = useAppContext();

  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const username = useRef("");
  const password = useRef("");
  const address = useRef("");
  const phone_number = useRef("");
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email.current.value);
    const phoneError = validatePhoneNumber(phone_number.current.value);

    if (emailError || phoneError) {
      setErrors({ email: emailError, phone_number: phoneError });
      return;
    }

    setErrors({});
    setSubmitError(null);

    const user = {
      username: username.current.value,
      password: password.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value,
      address: address.current.value,
      phone_number: phone_number.current.value,
    };

    register(user)
      .then((res) => {
        if (res?.token) {
          setToken(res.token);
          router.push("/products");
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setSubmitError(
            "That username is already taken. Please choose a different one.",
          );
        } else if (err.status === 400) {
          setSubmitError("Please fill in all required fields.");
        } else {
          setSubmitError("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form className="box" onSubmit={submit}>
          <Title>Welcome!</Title>
          {submitError && (
            <p className="notification is-danger is-light">{submitError}</p>
          )}
          <FormField label="First Name" name="firstName" inputRef={firstName} />
          <FormField label="Last Name" name="lastName" inputRef={lastName} />
          <FormField
            label="Email"
            type="email"
            name="email"
            inputRef={email}
            error={errors.email}
          />
          <FormField label="Username" name="username" inputRef={username} />
          <FormField label="Address" name="address" inputRef={address} />
          <FormField
            label="Phone Number"
            type="tel"
            name="phone_number"
            inputRef={phone_number}
            error={errors.phone_number}
          />
          <div className="control">
            <PasswordStrengthValidator passwordRef={password} />
          </div>
          <div className="field is-grouped is-grouped-centered mt-4">
            <div className="control">
              <button type="submit" className="button is-primary">
                Create Account
              </button>
            </div>
            <div className="control">
              <Button color="link" to="/products" className="button is-light">
                Cancel
              </Button>
            </div>
          </div>{" "}
        </form>
      </div>
    </div>
  );
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
