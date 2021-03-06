import { render, screen } from "@testing-library/react";

import Icon from "../icon";
import Icons from "../icons";
import IconButton from "./icon-button";

it("should render successfully", () => {
  render(<IconButton icon={<Icon icon={Icons.arrow_drop_down} />} onPress={() => null} />);

  expect(screen.getByTestId("icon-button__button")).toMatchSnapshot();
});
