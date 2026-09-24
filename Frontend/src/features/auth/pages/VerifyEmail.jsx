import React from "react";
import { Link } from "react-router";
import audex from "../../../assets/auth_assets/fonts/Audex-Regular.otf";

const VerifyEmail = () => {
  return (
    <>
      <style>
        {`
          @font-face {
            font-family: 'Audex';
            src: url(${audex}) format('opentype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
        `}
      </style>

      <main className="min-h-screen bg-[#1f1d1d] flex items-center justify-center px-5">

        <div
          className="
            w-full
            max-w-[430px]
            rounded-[14px]
            border
            border-[#4a4a4a]
            bg-[#333333]
            px-6
            py-10
            text-center
            shadow-[0_10px_30px_rgba(0,0,0,0.18)]
            sm:px-10
            outline-mist-500
          "
        >

          {/* Logo */}
          <h1
            className="
              mb-8
              font-[Audex]
              text-[24px]
              font-semibold
              tracking-tight
            "
          >
            <span className="text-[#e08d2e]">Hermes</span>
            <span className="font-sans text-white/70">.AI</span>
          </h1>


          {/* Email Icon */}
          <div className="mb-5 text-[38px]">
            ✉
          </div>


          {/* Heading */}
          <h2
            className="
              text-[24px]
              font-medium
              tracking-tight
              text-white
            "
          >
            Check your email
          </h2>


          {/* Description */}
          <p
            className="
              mx-auto
              mt-3
              max-w-[320px]
              text-[14px]
              leading-6
              text-white/50
            "
          >
            We've sent a verification link to your email address.
            Please verify your email to start using Hermes.ai.
          </p>


          {/* Small note */}
          <p
            className="
              mt-6
              text-[12px]
              text-white/30
            "
          >
            Didn't receive the email? Check your spam folder.
          </p>


          {/* Login */}
          <Link
            to="/login"
            className="
              mt-7
              inline-block
              rounded-[6px]
              bg-white
              px-6
              py-2.5
              text-[13px]
              font-medium
              text-black
              transition
              duration-200
              hover:bg-zinc-300
            "
          >
            Back to Login
          </Link>

        </div>

      </main>
    </>
  );
};

export default VerifyEmail;