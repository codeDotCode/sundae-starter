import React from "react";
import { render, screen } from "@testing-library/react";
import SummaryForm from "../summaryForm";
import userEvent from "@testing-library/user-event";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: "confirm order" });
  expect(confirmButton).toBeDisabled();
});

test("checkbox enables button for the first click and disables for second click", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: "confirm order" });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover shows out when mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
