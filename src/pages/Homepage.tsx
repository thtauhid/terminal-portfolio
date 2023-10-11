import { useEffect, useRef, useState } from "react";

import info from "../../data.json";
import { themes } from "../../constants";

const options = info.options.map((option) => option.label);
import { Queue } from "queue-typescript";
import PromptBar from "../components/PromptBar";
import { IDataType } from "../types";

const historyCommand = new Queue<string>();
let count = 1;
let historyPos = 1;

function Homepage() {
  const [currentTheme, setTheme] = useState<string>(themes[0]);
  const [history, setHistory] = useState([
    {
      command: "help",
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
  const [customUserName, setCustomUserName] = useState("");
  const [userInput, setUserInput] = useState("");
  const handleArrowKeyPress = (event: { key: string }) => {
    if (event.key === "ArrowUp") {
      if (historyPos > 0) {
        setUserInput(history[historyPos - 1]["command"]);
        historyPos -= 1;
      }
    } else if (event.key === "ArrowDown") {
      if (historyPos < history.length - 1) {
        setUserInput(history[historyPos + 1]["command"]);
        historyPos += 1;
      } else if ((historyPos = history.length)) {
        setUserInput("");
        // historyPos+=1
      }
    }
  };
  const executeCommand = (command: string) => {
    if (command.trim().startsWith("setname")) {
      command = command;
      //Handled by previous commit
    } else {
      command = command.split(" ")[0];
    }
    command = command.trim().toLowerCase();
    historyPos = history.length + 1;
    if (command !== "history") {
      historyCommand.enqueue(count++ + ` ` + command + `<br>`);
    }
    if (options.includes(command)) {
      let output = info.options.find(
        (option) => option.label === command
      )!.value;

      // check if 'data' exists within the options
      if (info.options.find((option) => option.label === command)?.data) {
        console.log("data exists");
        // append to output
        const data: Array<IDataType> =
          info.options.find((option) => option.label === command)!.data ?? [];

        if (command === "projects") {
          output += data?.map((item) => {
            return `<br /><br /> <strong><a class="underline" href="${item.url}" target="_blank" rel="noopener norefferer">${item.label}</a></strong> <br /> ${item.value}`;
          });
        } else {
          output += data?.map((item) => {
            return `<br /><br /> <strong>${item.label}</strong> <br /> ${item.value}`;
          });
        }
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
        historyPos -= 1;
      } else if (command === "") {
        setHistory((history) => [
          ...history,
          {
            command: command,
            output: "",
          },
        ]);
      } else if (command === "history") {
        setHistory((history) => [
          ...history,
          {
            command: command,
            output: displayHistory(),
          },
        ]);
      }
      // functionality for setname command
      else if (command.trim().startsWith("setname")) {
        // get the name from the command
        const splitCommand = command.split(" ");
        const name = splitCommand.slice(1).join(" ");
        // set the custom username
        setCustomUserName(name);
        // update history
        setHistory((history) => [
          ...history,
          {
            command: command,
            output: `Hello ${name}!`,
          },
        ]);
      }
      // functionality for setname command
      else if (command.trim().startsWith("theme")) {
        const commands: string[] = userInput.trim().split(" ");
        switch (commands.length) {
          case 1:
            setHistory((history) => [
              ...history,
              {
                command,
                output: `
                - run 'theme list' to list themes<br />
                - run 'theme set [<i>theme_name<i>]' to set theme
                `,
              },
            ]);
            break;
          case 2:
            if (commands[1] === "list") {
              setHistory((history) => [
                ...history,
                {
                  command: userInput.trim(),
                  output: `Available themes: ${themes.join("&nbsp;")}`,
                },
              ]);
            } else if (commands[1] === "set") {
              setHistory((history) => [
                ...history,
                {
                  command: userInput.trim(),
                  output: `Invalid <i>theme name</i> passed. Run 'theme list' to list available themes`,
                },
              ]);
            } else {
              setHistory((history) => [
                ...history,
                {
                  command: userInput.trim(),
                  output: `Invalid subcommand: ${commands[1]}`,
                },
              ]);
            }
            break;
          case 3:
            if (commands[1] !== "set") {
              setHistory((history) => [
                ...history,
                {
                  command: userInput.trim(),
                  output: `Invalid subcommand: ${commands[1]}`,
                },
              ]);
            } else {
              if (themes.indexOf(commands[2]) === -1) {
                setHistory((history) => [
                  ...history,
                  {
                    command: userInput.trim(),
                    output: `Invalid theme: ${commands[2]}`,
                  },
                ]);
              } else {
                setTheme(themes[themes.indexOf(commands[2])]);
                setHistory((history) => [
                  ...history,
                  {
                    command: userInput.trim(),
                    output: `${
                      themes[themes.indexOf(commands[2])]
                    } theme activated`,
                  },
                ]);
              }
            }
            break;
          default:
            setHistory((history) => [
              ...history,
              {
                command: userInput.trim(),
                output: `Invalid subcommands`,
              },
            ]);
            break;
        }
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

  const displayHistory = () => {
    let his = "";
    const HistoryArray = historyCommand.toArray();
    HistoryArray.forEach((i) => {
      his += i;
    });
    return his;
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
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  };

  useEffect(() => {
    document.addEventListener("click", focusInput);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", focusInput);
    };
  }, []);

  return (
    <div className={`${currentTheme}`}>
      <div className="font-bold text-xl p-2 w-[100vw] min-h-[100vh] bg-bgcol">
        {
          /* History */
          history.map((history) => (
            <div className="mb-2 text-command">
              <PromptBar customUserName={customUserName} />
              <span>{history.command}</span> <br />
              <span dangerouslySetInnerHTML={{ __html: history.output }} />
            </div>
          ))
        }
        {/* Prompt */}
        <div className="flex flex-col sm:flex-row">
          <PromptBar customUserName={customUserName} />
          <span>
            <form onSubmit={handleSubmit} className="mt-2 sm:mt-0">
              <input
                type="text"
                className="w-[350px] bg-transparent outline-none text-command"
                autoFocus
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleArrowKeyPress}
                ref={inputRef}
                autoComplete="off"
              />
            </form>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
