import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";

import Colors from "../colors";
import Chip, { ChipProps } from "./chip";
import classes from "./chip.stories.module.scss";

export default {
  title: "Chip",
  component: Chip,
  decorators: [(story) => <div className={classes.wrapper}>{story()}</div>],
  argTypes: {
    color: { control: { disable: true } },
    onPress: { control: { disable: true } },
    onDeletePress: { control: { disable: true } },
    avatar: { control: { disable: true } },
  },
} as Meta<ChipProps>;

/**
 * Default Chip template
 *
 * @param   {ChipProps}   args The props
 * @example
 * <Template {...} />
 * @returns {JSX.Element}      The Chip component
 */
const Template: Story<ChipProps> = (args) => <Chip {...args} />;

const defaultProps: Partial<ChipProps> = {
  onPress: null,
  onDeletePress: null,
  className: "",
  color: Colors.grey[200],
  children: "Hello Chip",
  disabled: false,
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const Clickable = Template.bind({});
Clickable.args = {
  ...defaultProps,
  onPress: action("click"),
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultProps,
  color: Colors.blue[500],
  onPress: action("press"),
  onDeletePress: action("delete"),
  avatar: <img alt="avatar" src="https://wl-sympa.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" />,
  disabled: true,
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  ...defaultProps,
  avatar: <span>M</span>,
};

export const WithAvatarImage = Template.bind({});
WithAvatarImage.args = {
  ...defaultProps,
  avatar: <img alt="avatar" src="https://wl-sympa.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" />,
};

export const WithDelete = Template.bind({});
WithDelete.args = {
  ...defaultProps,
  onPress: action("press"),
  onDeletePress: action("delete"),
  avatar: <img alt="avatar" src="https://wl-sympa.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" />,
};

export const WithDifferentColor = Template.bind({});
WithDifferentColor.args = {
  ...defaultProps,
  color: Colors.blue[700],
  onPress: action("press"),
  onDeletePress: action("delete"),
  avatar: <img alt="avatar" src="https://wl-sympa.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" />,
};
