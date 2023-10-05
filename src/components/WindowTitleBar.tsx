import { username, hostname, path } from "../../constants";

const WindowTitleBar = (props: { customUserName: string }) => {
  return (
    <div className="flex flex-row bg-stone-600 w-screen px-2 text-stone-700 gap-4 py-1 items-center">
      <span className="flex flex-row gap-2">
        <div className="outline outline-1 outline-stone-700 rounded-full flex justify-center items-center bg-orange-700 h-5 w-5">
          &#120;
        </div>
        <div className="outline outline-1 outline-stone-700 rounded-full flex justify-center items-center bg-neutral-500 h-5 w-5">
          &#45;
        </div>
        <div className="outline outline-1 outline-stone-700 rounded-full flex justify-center items-center bg-neutral-500 h-5 w-5">
          &#9633;
        </div>
      </span>
      <span className="text-white">
        {props.customUserName == "" ? username : props.customUserName}@
        {hostname}:{path}
      </span>
    </div>
  );
};

export default WindowTitleBar;
