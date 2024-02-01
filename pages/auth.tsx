/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "@/components/Input";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/profiles",
      });
    } catch (err) {
      console.log(err);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
      });

      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, username, password, login]);
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold text-center">
              {variant === "login" ? "Sign in" : "Create an account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  type="text"
                  label="Username"
                  onChange={(e: any) => setUsername(e.target.value)}
                  value={username}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
              />
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Login" : "Register"}
              </button>

              <div className="flex items-center gap-4 mt-4 justify-center">
                <div
                  onClick={() =>
                    signIn("google", {
                      redirect: true,
                      callbackUrl: "/profiles",
                    })
                  }
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={() =>
                    signIn("github", {
                      redirect: true,
                      callbackUrl: "/profiles",
                    })
                  }
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FaGithub size={30} />
                </div>
              </div>

              <p className="text-nertral-500 mt-2 text-center">
                {variant === "login"
                  ? "First time using Netflix? "
                  : "You had an account? "}
                <span
                  onClick={toggleVariant}
                  className="font-bold text-white cursor-pointer"
                >
                  {variant === "login" ? "Create an account!" : "Sign in"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
