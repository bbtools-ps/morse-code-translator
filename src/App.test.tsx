import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import App from "./App";
import { encodeMorse } from "./common/functions/utils";

describe("<App/>", () => {
  it("should render the logo, description, Input field, Output field, Switch, Copy, and Reset buttons", () => {
    render(<App />);
    const logo1 = screen.getAllByRole("heading")[0];
    const logo2 = screen.getAllByRole("heading")[1];
    const description = screen.getByText(
      /letters are separated by a single space/i
    );
    const inputField = screen.getByLabelText(/original text/i);
    const outputField = screen.getByLabelText(/morse code/i);
    const btnSwitch = screen.getByRole("button", { name: /switch/i });
    const btnCopy = screen.getByRole("button", { name: /copy to clipboard/i });
    const btnReset = screen.getByRole("button", { name: /reset/i });

    expect(logo1).toHaveTextContent(/morse code/i);
    expect(logo2).toHaveTextContent(/translator/i);
    expect(description).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(outputField).toBeInTheDocument();
    expect(btnSwitch).toBeInTheDocument();
    expect(btnCopy).toBeInTheDocument();
    expect(btnReset).toBeInTheDocument();
  });
  it("should allow the user to type into the input field", async () => {
    const testValue = "test";
    render(<App />);
    const inputField = screen.getByLabelText(/original text/i);

    await userEvent.type(inputField, testValue);

    expect(inputField).toHaveValue(testValue.toUpperCase());
  });
  it("should convert all typed text into uppercase", async () => {
    const testValue = "tEsT";
    render(<App />);
    const inputField = screen.getByLabelText(/original text/i);

    await userEvent.type(inputField, testValue);

    expect(inputField).toHaveValue(testValue.toUpperCase());
  });
  it("should convert typed text into morse code", async () => {
    const testValue = "test";
    const result = encodeMorse(testValue);
    render(<App />);
    const inputField = screen.getByLabelText(/original text/i);
    const outputField = screen.getByLabelText(/morse code/i);

    await userEvent.type(inputField, testValue);

    expect(outputField).toHaveTextContent(result);
  });
  it("should be able to switch the conversion from regular text to morse code", async () => {
    render(<App />);
    const btnSwitch = screen.getByRole("button", { name: /switch/i });

    await userEvent.click(btnSwitch);

    expect(() => screen.getByLabelText(/original/i)).toThrow();
    expect(screen.getByLabelText(/translated/i)).toBeInTheDocument();
  });
  it("should convert the morse code back to original text", async () => {
    const testValue = "test";
    const morseValue = encodeMorse(testValue);
    render(<App />);
    const btnSwitch = screen.getByRole("button", { name: /switch/i });

    await userEvent.click(btnSwitch);
    await userEvent.type(screen.getByLabelText(/morse code/i), morseValue);

    expect(screen.getByLabelText(/translated/i)).toHaveTextContent(
      testValue.toUpperCase()
    );
  });
  it("should be able to reset everything to defaults when clicking on the Reset button", async () => {
    render(<App />);
    const inputField = screen.getByLabelText(/original/i);
    const outputField = screen.getByLabelText(/morse/i);
    const btnReset = screen.getByRole("button", { name: /reset/i });
    const btnSwitch = screen.getByRole("button", { name: /switch/i });

    await userEvent.type(inputField, "test");
    await userEvent.click(btnSwitch);
    await userEvent.click(btnReset);

    expect(() => screen.getByLabelText(/translated/i)).toThrow();
    expect(inputField).toHaveValue("");
    expect(outputField).toHaveTextContent("");
  });
});
