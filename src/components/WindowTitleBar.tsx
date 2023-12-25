import { username, hostname, path } from "../../constants";

const WindowTitleBar = (props: { customUserName: string }) => {
  return (
    <div className="flex flex-row bg-stone-600 w-screen px-2 text-stone-700 gap-4 py-1 items-center">
      <span className="flex flex-row gap-2">
        <div className="outline outline-1 outline-stone-700 rounded-full flex justify-center items-center bg-orange-700 h-5 w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="outline outline-1 outline-stone-700 rounded-full flex justify-center items-center bg-neutral-500 h-5 w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </div>
        <div className="outline outline-1 outline-stone-700 rounded-full flex justify-center items-center bg-neutral-500 h-5 w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
            />
          </svg>
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
