import { DateTime } from "@hastics/utils";
import { Duration } from "@hastics/utils";
import { act, fireEvent, render } from "@testing-library/react";

import Calendar from "./calendar";
import { MONTHS } from "./constants";

const currDateTime = new DateTime({ year: 2021, month: DateTime.august, day: 26, hour: 21, minute: 14 });

describe("Calendar", () => {
  jest.spyOn(Date, "now").mockImplementation(() => new Date("2021-08-26T21:14:00.000Z").valueOf());

  it("should render successfully", () => {
    const { container } = render(<Calendar initialValue={currDateTime} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should handle previous month", async () => {
    const { container, getByTestId } = render(
      <Calendar
        initialValue={currDateTime}
        events={[
          { date: currDateTime.subtract(Duration.days(60)), title: "Past Event" },
          { date: currDateTime, title: "Storybook Event That Rocks !" },
        ]}
      />,
    );

    const currentMonth = currDateTime.month;
    const currentMonthIndex = currentMonth - 1;

    const month = getByTestId("month");
    const currMonth = MONTHS.en[currentMonthIndex];
    const prevCurrMonth = MONTHS.en[currentMonthIndex - 1];
    const nextCurrMonth = MONTHS.en[currentMonthIndex + 1];

    expect(month.textContent).toEqual(currMonth);
    expect(container.firstChild).toMatchSnapshot();

    const prevMonth = getByTestId("prev-month");
    const nextMonth = getByTestId("next-month");

    act(() => {
      fireEvent.click(prevMonth);
    });

    expect(month.textContent).toEqual(prevCurrMonth);
    expect(container.firstChild).toMatchSnapshot();

    act(() => {
      fireEvent.click(nextMonth);
      fireEvent.click(nextMonth);
    });

    expect(month.textContent).toEqual(nextCurrMonth);
    expect(container.firstChild).toMatchSnapshot();
  });
});
