import { useParams } from "react-router-dom";
import { getData, setUsername } from "../api";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import PromptBar from "../components/PromptBar";
import commands from "../commands.json";
import { themes } from "../../constants";

interface State {
  history: {
    command: string;
    output: string;
  }[];
  userInfo: {
    name: string;
    options: {
      label: string;
      about: string;
      value: string;
      data?: {
        label: string;
        value: string;
      }[];
    }[];
  };
  customUserName: string;
  userInput: string;
  historyPos: number;
  historyCommand: string[];
  count: number;
  showWelcomeMessage: boolean;
}

function Profile() {
  const { username } = useParams();

  const [state, setState]: [State, Dispatch<SetStateAction<State>>] =
    useState<State>({
      history: [],
      userInfo: {
        name: "",
        options: [
          {
            label: "",
            about: "",
            value: "",
          },
        ],
      },
      customUserName: "",
      userInput: "",
      historyPos: 1,
      historyCommand: [],
      count: 1,
      showWelcomeMessage: true,
    });

  const [currentTheme, setTheme]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>(themes[0]);

  useEffect(() => {
    setUsername(username!);
    getData().then((data) =>
      setState((prev) => ({
        ...prev,
        userInfo: data,
      }))
    );
  }, [username]);

  const options = state.userInfo.options.map((option) => option.label);

  const handleArrowKeyPress = (event: { key: string }) => {
    if (event.key === "ArrowUp") {
      if (state.historyPos > 0) {
        setState((prev) => ({
          ...prev,
          historyPos: state.historyPos - 1,
          userInput: state.history[state.historyPos - 1]["command"],
        }));
      }
    } else if (event.key === "ArrowDown") {
      if (state.historyPos < state.history.length - 1) {
        setState((prev) => ({
          ...prev,
          historyPos: state.historyPos + 1,
          userInput: state.history[state.historyPos + 1]["command"],
        }));
      } else if ((state.historyPos = state.history.length)) {
        setState((prev) => ({
          ...prev,
          userInput: "",
        }));
      }
    }
  };

  const displayHistory = () => {
    let his = "";
    state.historyCommand.forEach((i) => {
      his += i;
    });
    return his;
  };

  const executeCommand = (command: string) => {
    command = command.trim().toLowerCase();
    if (!command.startsWith("setname")) {
      command = command.split(" ")[0];
    }

    state.historyPos = state.history.length + 1;
    if (
      command !== "history" &&
      command === "theme" &&
      state.userInput.split(" ").length === 1
    ) {
      state.historyCommand.push(state.count++ + ` ` + command + `<br>`);
    }
    if (options.includes(command)) {
      let output = state.userInfo.options.find(
        (option) => option.label === command
      )!.value;

      if (
        state.userInfo.options.find((option) => option.label === command)?.data
      ) {
        // append to output
        const data = state.userInfo.options.find(
          (option) => option.label === command
        )!.data;

        output += data?.map((item) => {
          return `<br /><br />
              <strong>${item.label}</strong> <br /> 
              ${item.value}`;
        });
      }

      setState((prev) => ({
        ...prev,
        history: [
          ...prev.history,
          {
            command,
            output,
          },
        ],
      }));
    } else {
      if (command === "help") {
        setState((prev) => ({
          ...prev,
          history: [
            ...prev.history,
            {
              command: command,
              output:
                "Here are the available commands: <br />" +
                state.userInfo.options
                  .map((option) => option.label + " - " + option.about)
                  .join("<br />") +
                "<br />" +
                commands
                  .map((option) => option.label + " - " + option.about)
                  .join("<br />"),
            },
          ],
        }));
      } else if (command === "clear") {
        setState((prev) => ({
          ...prev,
          history: [],
          showWelcomeMessage: false,
        }));
        state.historyPos -= 1;
      } else if (command === "") {
        setState((prev) => ({
          ...prev,
          history: [
            ...prev.history,
            {
              command: command,
              output: "",
            },
          ],
        }));
      } else if (command === "history") {
        setState((prev) => ({
          ...prev,
          history: [
            ...prev.history,
            {
              command: command,
              output: displayHistory(),
            },
          ],
        }));
      }
      // functionality for setname command
      else if (command.trim().startsWith("setname")) {
        // get the name from the command
        const splitCommand = command.split(" ");
        const name = splitCommand.slice(1).join(" ");
        // set the custom username
        setState((prev) => ({
          ...prev,
          customUserName: name,
        }));
        // update history
        setState((prev) => ({
          ...prev,
          history: [
            ...prev.history,
            {
              command: command,
              output: `Hello ${name}!`,
            },
          ],
        }));
      }
      // functionality for theme command
      else if (command.trim().startsWith("theme")) {
        const commands: string[] = state.userInput.trim().split(" ");
        switch (commands.length) {
          case 1:
            setState((prev) => ({
              ...prev,
              history: [
                ...prev.history,
                {
                  command,
                  output: `
                  - run 'theme list' to list themes<br />
                  - run 'theme set [<i>theme_name<i>]' to set theme
                  `,
                },
              ],
            }));
            break;
          case 2:
            if (commands[1] === "list") {
              setState((prev) => ({
                ...prev,
                history: [
                  ...prev.history,
                  {
                    command: state.userInput.trim(),
                    output: `Available themes: ${themes.join("&nbsp;")}`,
                  },
                ],
              }));
            } else if (commands[1] === "set") {
              setState((prev) => ({
                ...prev,
                history: [
                  ...prev.history,
                  {
                    command: state.userInput.trim(),
                    output: `Invalid <i>theme name</i> passed. Run 'theme list' to list available themes`,
                  },
                ],
              }));
            } else {
              setState((prev) => ({
                ...prev,
                history: [
                  ...prev.history,
                  {
                    command: state.userInput.trim(),
                    output: `Invalid subcommand: ${commands[1]}`,
                  },
                ],
              }));
              return;
            }
            break;
          case 3:
            if (commands[1] !== "set") {
              setState((prev) => ({
                ...prev,
                history: [
                  ...prev.history,
                  {
                    command: state.userInput.trim(),
                    output: `Invalid subcommand: ${commands[1]}`,
                  },
                ],
              }));
            } else {
              if (themes.indexOf(commands[2]) === -1) {
                setState((prev) => ({
                  ...prev,
                  history: [
                    ...prev.history,
                    {
                      command: state.userInput.trim(),
                      output: `Invalid theme: ${commands[2]}`,
                    },
                  ],
                }));
                return;
              } else {
                setTheme(themes[themes.indexOf(commands[2])]);
                setState((prev) => ({
                  ...prev,
                  history: [
                    ...prev.history,
                    {
                      command: state.userInput.trim(),
                      output: `${
                        themes[themes.indexOf(commands[2])]
                      } theme activated`,
                    },
                  ],
                }));
              }
            }
            break;
          default:
            setState((prev) => ({
              ...prev,
              history: [
                ...prev.history,
                {
                  command: state.userInput.trim(),
                  output: `Invalid subcommands`,
                },
              ],
            }));
            return;
        }
        state.historyCommand.push(
          state.count++ + ` ` + state.userInput.trim() + `<br>`
        );
      } else {
        setState((prev) => ({
          ...prev,
          history: [
            ...prev.history,
            {
              command: command,
              output: "command not found",
            },
          ],
        }));
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
    setState((prev) => ({
      ...prev,
      userInput: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeCommand(state.userInput);
    setState((prev) => ({
      ...prev,
      userInput: "",
    }));
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
    <div className={`${currentTheme} min-h-[100vh] w-[100vw] bg-bgcol`}>
      {state.showWelcomeMessage && (
        <p className="font-bold p-2">
          Type 'help' to view all available commands
        </p>
      )}
      <div className="font-bold text-xl p-2">
        {
          /* History */
          state.history.map((history, idx) => (
            <div className="mb-2" key={idx}>
              <PromptBar customUserName={state.customUserName} />
              <span>{history.command}</span> <br />
              <span dangerouslySetInnerHTML={{ __html: history.output }} />
            </div>
          ))
        }
        {/* Prompt */}
        <div className="flex flex-col sm:flex-row">
          <PromptBar customUserName={state.customUserName} />
          <span>
            <form onSubmit={handleSubmit} className="mt-2 sm:mt-0">
              <input
                type="text"
                className="w-[350px] bg-transparent outline-none"
                autoFocus
                value={state.userInput}
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

export default Profile;
