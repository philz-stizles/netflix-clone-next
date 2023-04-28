import { useRouter } from "next/router";
import { CSSProperties, useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { SignInResponse, getSession, signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Image from "next/image";
import { NextPageContext } from "next";
import { ClipLoader, PulseLoader } from "react-spinners";
import Loader from "@/components/ui/Loader";

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [authOption, setAuthOption] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleAuthOptionHandler = useCallback(() => {
    setAuthOption((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  const loginHandler = useCallback(async () => {
    try {
      setIsLoading(true)
      await signIn("credentials", {
        email,
        password,
        // redirect: false,
        callbackUrl: "/profiles",
      });

      // if(response && response.ok) {
      //   router.push("/profiles");
      // }

      setIsLoading(false);

      throw new Error('Unable to login at the moment. Please try again in a few minutes.');
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    } 
  }, [email, password]);

  const registerHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await axios.post("/api/register", {
        email,
        name,
        password,
      });

      console.log(data.data);

      loginHandler();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, name, password, loginHandler]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            className="h-12"
            alt="Logo"
            width={180}
            height={100}
          />
          {/* <img src="/images/logo.png" className="h-12" alt="Logo" /> */}
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {authOption === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {authOption === "register" && (
                <Input
                  id="name"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={authOption === "login" ? loginHandler : registerHandler}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {isLoading ? (
                <Loader />
              ) : authOption === "login" ? (
                "Login"
              ) : (
                "Sign up"
              )}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {authOption === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleAuthOptionHandler}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {authOption === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

 

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}


export default Auth;
