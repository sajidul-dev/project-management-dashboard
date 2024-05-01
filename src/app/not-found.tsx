"use client";
const NotFoundPage = () => {
  return (
    <div className="h-[100vh] bg-slate-700 flex items-center justify-center">
      <div className=" w-[50%] h-[50%] flex flex-col items-center gap-y-2">
        <span className="flex ">
          <p
            style={{
              fontFamily: "cursive",
            }}
            className=" text-[100px] text-yellow-500 font-bold"
          >
            4
          </p>
          <p
            style={{
              fontFamily: "cursive",
            }}
            className="text-[100px] text-slate-900 font-bold"
          >
            0
          </p>
          <p
            style={{
              fontFamily: "cursive",
            }}
            className="text-[100px] text-yellow-500 font-bold"
          >
            4
          </p>
          <p
            style={{
              fontFamily: "cursive",
            }}
            className="text-[100px] text-slate-900 font-bold"
          >
            !
          </p>
        </span>
        <span className="text-white font-bold">Page Not Found</span>
        <span className="bg-green-500 px-12 py-2 cursor-pointer rounded-md font-bold hover:bg-white  hover:border-2 hover:border-green-500 mt-10">
          Go to Home
        </span>
      </div>
    </div>
  );
};

export default NotFoundPage;
