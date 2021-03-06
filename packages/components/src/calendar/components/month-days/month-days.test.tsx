// @ts-expect-error Don't know how to do it properly
import * as chr from "chromatic/isChromatic";

import DateTime from "../../../date-time";
import { getIsToday } from "./month-days";

describe("Calendar/MonthDays", () => {
  afterAll(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it("getIsToday should return correct value", () => {
    jest.mock("chromatic/isChromatic", () => ({
      __esModule: true,
      /**
       * Is on Chromatic environment ?
       *
       * @example
       * isChromatic()
       * @returns {boolean} False here
       */
      default: () => false,
    }));

    expect(getIsToday(DateTime.now())).toBe(true);
  });

  it("in Chromatic, getIsToday should return correct value", () => {
    // @ts-expect-error Don't know how to do it properly
    jest.spyOn(chr, "default").mockImplementation(() => true);

    expect(getIsToday(DateTime.now())).toBe(false);
    expect(getIsToday(new DateTime({ year: 2021, month: DateTime.august, day: 26 }))).toBe(true);
  });
});
