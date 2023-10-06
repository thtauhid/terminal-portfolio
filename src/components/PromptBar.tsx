import { username, hostname, path, symbol } from "../../constants";

const Prompt = (props: { customUserName: string }) => {
  return (
    <span className="mr-1">
      <span className="text-green-800 ">
        {props.customUserName == "" ? username : props.customUserName}@
        {hostname}
      </span>
      :<span className="text-blue-700">{path}</span>
      {symbol}
    </span>
  );
};

export default Prompt;
