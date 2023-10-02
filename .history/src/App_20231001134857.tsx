import { useEffect, useRef, useState } from "react";

import info from "../data.json";
import { username, hostname, path, symbol } from "../constants";

const options = info.options.map((option) => option.label);

function App() {
  const [history, setHistory] = useState([
    {
      command: "help",
      output:
        "Here are the available commands: <br />" + options.join("<br />"),
    },
  ]);

  const [userInput, setUserInput] = useState("");

  const executeCommand = (command: string) => {
    command = command.trim().toLowerCase();

    if (options.includes(command)) {
      let output = info.options.find(
        (option) => option.label === command
      )!.value;

      // check if 'data' exists within the options
      if (info.options.find((option) => option.label === command)?.data) {
        console.log("data exists");
        // append to output
        const data = info.options.find(
          (option) => option.label === command
        )!.data;

        output += data?.map((item) => {
          return `<br /><br />
          <strong>${item.label}</strong> <br /> 
          ${item.value}`;
        });
      }

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
              info.options
                .map((option) => option.label + " - " + option.about)
                .join("<br />") +
              "<br />" +
              info.additional_commands
                .map((option) => option.label + " - " + option.about)
                .join("<br />"),
          },
        ]);
      } else if (command === "clear") {
        setHistory([]);
      } else if (command === "") {
        setHistory((history) => [
          ...history,
          {
            command: command,
            output: "",
          },
        ]);
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

  const inputRef = useRef<HTMLInputElement | null>(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeCommand(userInput);
    setUserInput("");
  };

  useEffect(() => {
    document.addEventListener("click", focusInput);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", focusInput);
    };
  }, []);

  return (
    <div>
      <p className='text-2xl font-bold text-center'>Welcome to my portfolio!</p>
    <div className='font-bold text-xl p-2'>
      {
        /* History */
        history.map((history) => (
          <div className=' mb-2'>
            <Prompt />
            <span>{history.command}</span> <br />
            <span dangerouslySetInnerHTML={{ __html: history.output }} />
          </div>
        ))
      }
      {/* Prompt */}
      <div className='flex flex-col sm:flex-row'>
        <Prompt />
        <span>
          <form onSubmit={handleSubmit} className='mt-2 sm:mt-0'>
            <input
              type='text'
              className='w-[350px] bg-transparent outline-none'
              autoFocus
              value={userInput}
              onChange={handleInputChange}
              ref={inputRef}
              autoComplete='off'
            />
          </form>
        </span>
      </div>
    </div>
    </div>
  );
}

const Prompt = () => {
  return (
    <span className='mr-1'>
      <span className='text-green-800 '>
        {username}@{hostname}
      </span>
      :<span className='text-blue-700'>{path}</span>
      {symbol}
    </span>
  );
};

export default App;
