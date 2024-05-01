/* eslint-disable react/prop-types */
"use client";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import Sidebar from "../components/Shared/Sidebar";
import { useIsExpandSidebar } from "../zustand/sidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isExpandSidebar = useIsExpandSidebar(
    (state: any) => state.isExpandSidebar
  );
  const setIsExpandSidebar = useIsExpandSidebar(
    (state: any) => state.setIsExpandSidebar
  );

  return (
    <html>
      <body>
        <div className="flex ">
          <Sidebar />
          <div
            className={`h-[100vh] w-full  ${
              isExpandSidebar
                ? "lg:w-[calc(100vw-230px)]"
                : "lg:w-[calc(100vw-60px)]"
            } overflow-y-scroll  border bg-[#1C234E] border-black  px-3 py-4  `}
          >
            {isExpandSidebar ? (
              <span
                className="hidden lg:block"
                onClick={() => setIsExpandSidebar(!isExpandSidebar)}
              >
                <FaChevronCircleLeft className="text-2xl text-white mb-5 cursor-pointer" />
              </span>
            ) : (
              <span
                className="hidden lg:block"
                onClick={() => setIsExpandSidebar(!isExpandSidebar)}
              >
                <FaChevronCircleRight className="text-2xl text-white mb-5 cursor-pointer" />
              </span>
            )}

            {/* <FaBars
          onClick={() => {
            setIsMobileNav(!isMobileNav);
          }}
          className="block lg:hidden mb-4 font-bold text-white text-2xl"
        />
        {isMobileNav && <MobileNavbar />} */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
