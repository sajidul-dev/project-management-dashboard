"use client";
import { TinyColor } from "@ctrl/tinycolor";
import { SubmitHandler, useForm } from "react-hook-form";
import getUser from "../hooks/login";
import Input from "../components/Shared/Input";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Inputs = {
  email?: string;
  password?: string;
  remember?: string;
};
const colors1 = ["#6253E1", "#04BEFE"];

const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // useEffect(() => {
  //   // Perform localStorage action
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     router.push("/dashboard");
  //   }
  // }, [router]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.email && data.password) {
      try {
        setLoading(true);
        const result = await getUser(data.email, data.password); // Wait for getUser to return
        if (result) {
          toast.success("Login successfull.", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#3B82F6",
            },
            iconTheme: {
              primary: "#3B82F6",
              secondary: "#FFFAEE",
            },
          });
          localStorage.setItem("user", JSON.stringify(result));
          router.push("/dashboard");
        } else {
          toast.error("Login unsuccessfull.", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#ff0000",
            },
            iconTheme: {
              primary: "#ff0000",
              secondary: "#FFFAEE",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  if (loading) return <Loading />;
  return (
    <div
      style={{
        background:
          "radial-gradient(circle, rgba(204,143,170,1) 0%, rgba(72,132,203,1) 100%)",
      }}
      className="flex justify-center items-center h-[100vh]">
      <div className="w-[90vw] md:w-[50vw] lg:w-[40vw] border-2 border-white bg-white h-[70vh] py-5 px-5 rounded-md">
        {/* page title start */}
        <div className="text-center my-5">
          <p className="text-xl font-bold">Login</p>
        </div>
        {/* page title end */}

        {/* from start */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-8 px-5">
          <Input
            register={register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            type="email"
            placeholder="Enter your email"
            className="mt-4 w-full"
            error={errors.email?.message}
          />
          <div className="relative">
            <Input
              register={register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=?<>{}])(?=.*[^\w\s]).{6,}$/,
                  message:
                    "Password must contain a upper case, a lower case, a number, a special character",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="my-4 w-full"
              error={errors.password?.message}
            />
            <button
              className="pr-4 absolute right-0 top-7"
              onClick={(event) => {
                event.preventDefault();
                setShowPassword((prev) => !prev);
              }}>
              {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
            </button>
          </div>
          <Input
            type="submit"
            value="Log in"
            className="cursor-pointer w-full bg-blue-500 hover:bg-opacity-70"
          />
        </form>
        {/* from start */}
      </div>
    </div>
  );
};

export default Login;
