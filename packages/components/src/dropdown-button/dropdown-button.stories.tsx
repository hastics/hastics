import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";

import Icons from "../icons";
import DropdownButton, { DropdownButtonProps } from "./dropdown-button";
import classes from "./dropdown-button.stories.module.scss";

/**
 * Helper to generate dropdown items.
 *
 * @param   {number}                            [n = 100] Number of items to generate
 * @example
 * generateItems() // generates 100 items
 * generateItems(5) // generates 5 items
 * @returns {{ value: number, text: string }[]}           The items.
 */
const generateItems = (n = 100) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push({ value: i.toString(), text: `Item ${i}` });
  }
  return result;
};

export default {
  title: "DropdownButton",
  component: DropdownButton,
  decorators: [(story) => <div style={{ padding: 32 }}>{story()}</div>],
  args: {
    items: generateItems(),
    onChange: action("select"),
  },
  argTypes: {
    items: { control: { disable: true } },
    onChange: { control: { disable: true } },
    icon: { control: { disable: true } },
    classNames: { control: { disable: true } },
  },
} as Meta<DropdownButtonProps>;

/**
 * Default DropdownButton template
 *
 * @param   {DropdownButtonProps} args The props
 * @example
 * <Template {...args} />
 * @returns {JSX.Element}              The DropdownButton component
 */
const Template: Story<DropdownButtonProps> = (args) => <DropdownButton {...args} />;

const defaultProps: Partial<DropdownButtonProps> = {
  allowEmpty: false,
  value: "12",
  placeholder: undefined,
  iconSize: 24,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithEmptyValue = Template.bind({});
WithEmptyValue.args = {
  ...defaultProps,
  value: undefined,
  allowEmpty: true,
  placeholder: "Please select an option",
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  ...defaultProps,
  icon: Icons.auto_graph,
};

export const WithCustomClassNames = Template.bind({});
WithCustomClassNames.args = {
  ...defaultProps,
  classNames: {
    wrapper: classes.wrapper,
    item_list: classes.item_list,
    item_list_item: classes.item_list_item,
  },
};
