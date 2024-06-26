import { useIsExpandSidebar } from "@/app/zustand/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHouse } from "react-icons/fa6";
import { GiCartwheel, GiTabletopPlayers } from "react-icons/gi";
import { HiCubeTransparent } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { PiUsersFourFill } from "react-icons/pi";

const Sidebar = () => {
  const navigate = useRouter();
  const pathname = usePathname();
  const isExpandSidebar = useIsExpandSidebar(
    (state: any) => state.isExpandSidebar
  );
  const setIsExpandSidebar = useIsExpandSidebar(
    (state: any) => state.setIsExpandSidebar
  );

  return (
    <div
      className={`h-[100vh] hidden  ${
        isExpandSidebar ? "w-[250px] px-2" : "w-10 px-8"
      }    py-4 bg-[#171E40] 
         lg:flex flex-col h-screen justify-between  transition-all duration-500 ease-in-out border border-[#185A77]`}>
      <div className=" ">
        {isExpandSidebar ? (
          <div
            onClick={() => {
              navigate.push("/");
            }}
            style={{
              backgroundColor:
                pathname === "/admin" || pathname === "/" ? "#0F8BB6" : "",
            }}
            className="text-base cursor-pointer hover:bg-red-100 hover:opacity-[.8] hover:text-black text-white px-3 py-2 rounded-md mb-3 flex items-center gap-2 transition-all duration-2000 ease-in-out">
            <FaHouse
              className={
                pathname === "/admin" || pathname === "/"
                  ? "text-xl text-black"
                  : " text-xl text-white"
              }
            />
            <Link href="" className="transition-all duration-1000 ease-in-out">
              Home
            </Link>
          </div>
        ) : (
          <FaHouse
            onClick={() => setIsExpandSidebar(!isExpandSidebar)}
            className={
              pathname === "/"
                ? "bg-[#0F8BB6] p-1 rounded-md text-3xl cursor-pointer  mb-4 -ml-3 text-black"
                : " text-3xl cursor-pointer mb-4 -ml-3 text-white"
            }
          />
        )}

        {isExpandSidebar ? (
          <div
            onClick={() => {
              navigate.push("/admin/siteSettings");
            }}
            style={{
              backgroundColor: pathname.includes("/admin/siteSettings")
                ? "#0F8BB6"
                : "",
            }}
            className="text-base  cursor-pointer hover:bg-red-100 hover:opacity-[.8] hover:text-black text-white px-3 py-2 mb-3 rounded-md flex items-center gap-2 transition-all duration-2000 ease-in-out">
            <IoSettings
              className={
                pathname.includes("/admin/siteSettings")
                  ? "text-xl text-black"
                  : " text-xl text-white"
              }
            />
            <Link href="">Site Settings</Link>
          </div>
        ) : (
          <IoSettings
            className={
              pathname.includes("/admin/siteSettings")
                ? "bg-[#0F8BB6] p-1 rounded-md text-3xl cursor-pointer  mb-4 -ml-3 text-black"
                : " text-3xl cursor-pointer mb-4 -ml-3 text-white"
            }
          />
        )}
      </div>

      <div className="">
        {isExpandSidebar ? (
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate.push("/login");
            }}
            className="w-[80%]  text-base cursor-pointer text-white bg-[#3f99b4]  px-3 py-2 rounded-md mb-3 flex items-center gap-2 transition-all duration-2000 ease-in-out">
            <IoMdExit className="text-2xl text-white" />
            <span className="transition-all duration-1000 ease-in-out">
              Log Out
            </span>
          </button>
        ) : (
          <IoMdExit className="text-3xl cursor-pointer absolute bottom-3 text-white -ml-3" />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
