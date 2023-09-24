import { useForm, SubmitHandler } from "react-hook-form";

import data from "../data.json";
import { useState } from "react";

type Input = {
  prompt: string;
};

const options = data.options.map((option) => option.label);

function App() {
  const [history, setHistory] = useState([
    {
      command: "help",
      output:
        "Here are the available commands: <br />" + options.join("<br />"),
    },
  ]);

  const executeCommand = (command: Input["prompt"]) => {
    command = command.trim().toLowerCase();

    if (options.includes(command)) {
      const output = data.options.find(
        (option) => option.label === command
      )!.value;

      setHistory((history) => [
        ...history,
        {
          command,
          output,
        },
      ]);
    } else {
      if (command === "help") {
        setHistory((history) => [
          ...history,
          {
            command: command,
            output:
              "Here are the available commands: <br />" +
              options.join("<br />"),
          },
        ]);
      } else if (command === "clear") {
        setHistory([]);
      } else {
        setHistory((history) => [
          ...history,
          {
            command: command,
            output: "command not found",
          },
        ]);
      }
    }
  };

  const { register, handleSubmit, reset } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => {
    executeCommand(data.prompt);
    reset();
  };

  return (
    <div>
      {
        /* History */
        history.map((history) => (
          <div>
            <Prompt />
            <span>{history.command}</span> <br />
            <span dangerouslySetInnerHTML={{ __html: history.output }} />
          </div>
        ))
      }
      {/* Prompt */}
      <div className='font-bold text-xl flex'>
        <Prompt />
        <span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' className='' {...register("prompt")} />
          </form>
        </span>
      </div>
    </div>
  );
}

const Prompt = () => {
  const username = "visitor";
  const hostname = "tauhids-portfolio";
  const path = "~";
  const symbol = "$";

  return (
    <span className='font-bold text-xl mr-1'>
      <span className='text-green-800 '>
        {username}@{hostname}
      </span>
      :<span className='text-blue-700'>{path}</span>
      {symbol}
    </span>
  );
};

export default App;
