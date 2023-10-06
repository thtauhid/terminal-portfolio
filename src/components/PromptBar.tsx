import { username, hostname, path, symbol } from "../../constants";

const Prompt = (props: { customUserName: string }) => {
  return (
    <span className="mr-1">
      <span className="text-shebang">
        {props.customUserName == "" ? username : props.customUserName}@
        {hostname}
      </span>
      :<span className="text-symbol">{path}</span>
      {symbol}
    </span>
  );
};

export default Prompt;
