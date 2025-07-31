import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { encodeMorse } from "./utils";

describe("<App/>", () => {
  it("should render the logo, description, Input field, Output field, Theme Switch, Translate Switch, Copy, and Reset buttons", () => {
    render(<App />);
    const logo1 = screen.getAllByRole("heading")[0];
    const logo2 = screen.getAllByRole("heading")[1];
    const description = screen.getByText(
      /letters are separated by a single space/i
    );
    const inputField = screen.getByLabelText(/original text/i);
    const outputField = screen.getByLabelText(/morse code/i);
    const btnSwitchTheme = screen.getByRole("button", {
      name: /theme switch/i,
    });
    const btnSwitchTranslate = screen.getByRole("button", {
      name: /translate switch/i,
    });
    const btnCopy = screen.getByRole("button", { name: /copy to clipboard/i });
    const btnReset = screen.getByRole("button", { name: /reset/i });

    expect(logo1).toHaveTextContent(/morse code/i);
    expect(logo2).toHaveTextContent(/translator/i);
    expect(description).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(outputField).toBeInTheDocument();
    expect(btnSwitchTheme).toBeInTheDocument();
    expect(btnSwitchTranslate).toBeInTheDocument();
    expect(btnCopy).toBeInTheDocument();
    expect(btnReset).toBeInTheDocument();
  });
  it("should allow the user to type into the input field", async () => {
    const user = userEvent.setup();
    const testValue = "test";
    render(<App />);
    const inputField = screen.getByLabelText(/original text/i);

    await user.type(inputField, testValue);

    expect(inputField).toHaveValue(testValue.toUpperCase());
  });
  it("should convert all typed text into uppercase", async () => {
    const user = userEvent.setup();
    const testValue = "tEsT";
    render(<App />);
    const inputField = screen.getByLabelText(/original text/i);

    await user.type(inputField, testValue);

    expect(inputField).toHaveValue(testValue.toUpperCase());
  });
  it("should convert typed text into morse code", async () => {
    const user = userEvent.setup();
    const testValue = "test";
    const result = encodeMorse(testValue);
    render(<App />);
    const inputField = screen.getByLabelText(/original text/i);
    const outputField = screen.getByLabelText(/morse code/i);

    await user.type(inputField, testValue);

    expect(outputField).toHaveTextContent(result);
  });
  it("should be able to switch the conversion from regular text to morse code", async () => {
    const user = userEvent.setup();
    render(<App />);
    const btnSwitch = screen.getByRole("button", { name: /translate switch/i });

    await user.click(btnSwitch);

    expect(() => screen.getByLabelText(/original/i)).toThrow();
    expect(screen.getByLabelText(/translated/i)).toBeInTheDocument();
  });
  it("should convert the morse code back to original text", async () => {
    const user = userEvent.setup();
    const testValue = "test";
    const morseValue = encodeMorse(testValue);
    render(<App />);
    const btnSwitch = screen.getByRole("button", { name: /translate switch/i });

    await user.click(btnSwitch);
    await user.type(screen.getByLabelText(/morse code/i), morseValue);

    expect(screen.getByLabelText(/translated/i)).toHaveTextContent(
      testValue.toUpperCase()
    );
  });
  it("should be able to reset everything to defaults when clicking on the Reset button", async () => {
    const user = userEvent.setup();
    render(<App />);
    const inputField = screen.getByLabelText(/original/i);
    const outputField = screen.getByLabelText(/morse/i);
    const btnReset = screen.getByRole("button", { name: /reset/i });
    const btnSwitch = screen.getByRole("button", { name: /translate switch/i });

    await user.type(inputField, "test");
    await user.click(btnSwitch);
    await user.click(btnReset);

    expect(() => screen.getByLabelText(/translated/i)).toThrow();
    expect(inputField).toHaveValue("");
    expect(outputField).toHaveTextContent("");
  });
});
