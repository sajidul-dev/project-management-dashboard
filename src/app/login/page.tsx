"use client";
import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
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
  return (
    <div
      style={{
        // background: "rgb(204,143,170)",
        background:
          "radial-gradient(circle, rgba(204,143,170,1) 0%, rgba(72,132,203,1) 100%)",
      }}
      className="flex justify-center items-center h-[100vh]"
    >
      <div className="w-[90vw] md:w-[50vw] lg:w-[40vw] border-2 border-white bg-white h-[70vh] py-5 px-5 rounded-md">
        {/* page title start */}
        <div className="text-center my-5">
          <p className="text-xl font-bold">Login</p>
        </div>
        {/* page title end */}

        {/* from start */}
        <form className="w-full flex flex-col gap-y-8 px-5">
          <div className="flex flex-col items-start gap-y-2">
            <label className="text-gray-700 text-sm" htmlFor="username">
              Username
            </label>
            <Input placeholder="Type yours username" />
            {/* <input
              type="text"
              placeholder="Type yours username"
              className="w-full text-sm px-2 py-1 outline-none border-b-2 border-gray-300 focus:border-blue-700"
            /> */}
          </div>

          <div className="flex flex-col items-start gap-y-2">
            <label className="text-gray-700 text-sm" htmlFor="password">
              Password
            </label>
            <Input.Password placeholder="Input password" />
            {/* <input
              type="password"
              placeholder="Type your password"
              className="w-full text-sm px-2 py-1 outline-none border-b-2 border-gray-300"
            /> */}
          </div>

          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(135deg, ${colors1.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                    colors1
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                    colors1
                  ).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button
              className="font-bold"
              style={{ fontWeight: "700" }}
              shape="round"
              type="primary"
              size="large"
            >
              Login
            </Button>
          </ConfigProvider>
        </form>
        {/* from start */}
      </div>
    </div>
  );
};

export default Login;
