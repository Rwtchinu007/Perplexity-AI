import React, { useState } from "react";
import { Link } from "react-router";
import bgimage from "../../../assets/auth_assets/img/bg-image.png";
import audex from "../../../assets/auth_assets/fonts/Audex-Regular.otf";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      username,
      email,
      password,
    });
  };

  return (
    <>
    <style>
      {
        `
        @font-face {
          font-family: 'Audex';
          src: url(${audex}) format('opentype');
           font-weight: 400;
          font-display: swap;
            }`
      }
    </style>
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
        px-4
        py-4
        sm:px-6
        sm:py-6
        md:px-8
      "
      style={{
        backgroundImage: `url(${bgimage})`,
      }}
    >
      {/* DARK OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-black/45
        "
      />

      {/* MAIN AUTH CONTAINER */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-2rem)]
          w-full
          max-w-5xl
          items-center
          justify-center
          sm:min-h-[calc(100vh-3rem)]
        "
      >
        <div
          className="
            grid
            w-full
            max-w-5xl
            min-h-0
            overflow-hidden
            rounded-2xl
            border
            border-white/20
            bg-white/[0.03]
            shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            backdrop-blur-[2px]
            md:min-h-[610px]
            md:grid-cols-2
            md:rounded-[24px]
          "
        >
          {/* =====================================
              LEFT SIDE — REGISTER FORM
          ====================================== */}

          <div
            className="
              flex
              min-h-0
              flex-col
              justify-center
              bg-black/[0.78]
              px-6
              py-7
              sm:px-10
              sm:py-8
              md:min-h-[610px]
              md:px-8
              md:py-10
              lg:px-10
            "
          >
            {/* LOGO */}

            <div className="mb-7 sm:mb-10 .logo">
              <h1
                className="
                  text-[18px]
                  font-semibold
                  tracking-[-0.02em]
                  text-[#e08d2e]
                  sm:text-[20px]
                  font-[Audex]
                "
              >
                Hermes<span className="text-white/70 font-sans">.ai</span>
              </h1>
            </div>

            {/* FORM AREA */}

            <div
              className="
                mx-auto
                flex
                w-full
                max-w-[340px]
                flex-1
                items-center
              "
            >
              <div className="w-full">
                {/* HEADING */}

                <h2
                  className="
                    text-[20px]
                    font-medium
                    tracking-tight
                    text-white
                    sm:text-[22px]
                  "
                >
                  Sign up for an account
                </h2>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-1.5
                    max-w-[290px]
                    text-[11px]
                    leading-[1.5]
                    text-white/35
                    sm:text-[12px]
                  "
                >
                  Create your account and get started with
                  Hermes.ai.
                </p>

                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="
                    mt-6
                    space-y-3
                  "
                >
                  {/* USERNAME */}

                  <div>
                    <label
                      htmlFor="username"
                      className="sr-only"
                    >
                      Username
                    </label>

                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(event) =>
                        setUsername(event.target.value)
                      }
                      placeholder="Username"
                      required
                      className="
                        h-10
                        w-full
                        rounded-[5px]
                        border
                        border-white/[0.04]
                        bg-white/[0.035]
                        px-3
                        text-[12px]
                        text-white
                        outline-none
                        placeholder:text-white/25
                        transition
                        duration-200
                        focus:border-[#31b8c6]/40
                        focus:bg-white/[0.055]
                        sm:h-10
                        sm:text-[14px]
                      "
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="sr-only"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="Email"
                      required
                      className="
                        h-10
                        w-full
                        rounded-[5px]
                        border
                        border-white/[0.04]
                        bg-white/[0.035]
                        px-3
                        text-[12px]
                        text-white
                        outline-none
                        placeholder:text-white/25
                        transition
                        duration-200
                        focus:border-[#31b8c6]/40
                        focus:bg-white/[0.055]
                        sm:h-10
                        sm:text-[14px]
                      "
                    />
                  </div>

                  {/* PASSWORD */}

                  <div>
                    <label
                      htmlFor="password"
                      className="sr-only"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Password"
                      required
                      className="
                        h-10
                        w-full
                        rounded-[5px]
                        border
                        border-white/[0.04]
                        bg-white/[0.035]
                        px-3
                        text-[12px]
                        text-white
                        outline-none
                        placeholder:text-white/25
                        transition
                        duration-200
                        focus:border-[#31b8c6]/40
                        focus:bg-white/[0.055]
                        sm:h-10
                        sm:text-[14px]
                      "
                    />
                  </div>

                  {/* REGISTER BUTTON */}

                  <button
                    type="submit"
                    className="
                      mt-1
                      h-10
                      w-full
                      rounded-[5px]
                      bg-white
                      px-3
                      text-[12px]
                      font-medium
                      text-black
                      transition-all
                      duration-200
                      hover:bg-zinc-200
                      active:scale-[0.99]
                      sm:text-[14px]
                    "
                  >
                    Register
                  </button>
                </form>

                {/* LOGIN */}

                <p
                  className="
                    mt-5
                    text-center
                    text-[11px]
                    text-white/30
                    sm:text-[12px]
                  "
                >
                  Already have an account?

                  <Link
                    to="/login"
                    className="
                      ml-1
                      font-medium
                      text-[#ea9e33]
                      transition-colors
                      duration-200
                      hover:text-[#c3cacb]
                    "
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* =====================================
              RIGHT SIDE — IMAGE
          ====================================== */}

          <div
            className="
              relative
              hidden
              min-h-[610px]
              overflow-hidden
              md:block
            "
          >
            <div
              className="
                absolute
                inset-0
                z-10
                bg-black/5
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                z-0
                h-56
                w-56
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white/5
                blur-3xl
              "
            />

            <img
              src={bgimage}
              alt="Hermes AI"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-[75%_25%]
                transition-all
              "
            />
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default Register;