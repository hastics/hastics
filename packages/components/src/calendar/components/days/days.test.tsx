import { render, screen } from "@testing-library/react";

import { SupportedCalendarLocales } from "../../constants";
import Days, { threeFirstLetters } from "./days";

describe("Calendar/Days", () => {
  it("default formatter should work properly", () => {
    expect(threeFirstLetters("monday")).toEqual("mon");
  });

  it("days component should use default formatter", () => {
    render(<Days locale={SupportedCalendarLocales.EN} />);

    expect(screen.getByTestId("monday").textContent).toEqual("mon");
  });

  it("days component should use custom formatter", () => {
    render(<Days locale={SupportedCalendarLocales.EN} formatDay={(day) => day.substr(0, 4)} />);

    expect(screen.getByTestId("monday").textContent).toEqual("mond");
  });
});
