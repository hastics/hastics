import { ComponentMeta, ComponentStory } from "@storybook/react";

import Flex from "../flex";
import Icons from "../icons";
import Button, { ButtonProps, Emphasis } from "./button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    color: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
} as ComponentMeta<typeof Button>;

const ExpoTemplate: ComponentStory<typeof Button> = (args) => (
  <Flex.Row gap={8}>
    <Button {...args} emphasis={Emphasis.low} />
    <Button {...args} emphasis={Emphasis.medium} />
    <Button {...args} emphasis={Emphasis.high} />
  </Flex.Row>
);

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const defaultProps: Partial<ButtonProps> = {
  disabled: false,
  block: false,
  className: "",
};

export const Default = ExpoTemplate.bind({});
Default.args = {
  ...defaultProps,
  children: "Button",
};
Default.argTypes = {
  emphasis: { control: { disable: true } },
};

export const LowEmphasis = Template.bind({});
LowEmphasis.args = {
  ...defaultProps,
  children: "Button",
  emphasis: Emphasis.low,
};
LowEmphasis.parameters = {
  docs: {
    description: {
      story: "Text buttons are typically used for less important actions.",
    },
  },
};

export const MediumEmphasis = Template.bind({});
MediumEmphasis.args = {
  ...defaultProps,
  children: "Button",
  emphasis: Emphasis.medium,
};
MediumEmphasis.parameters = {
  docs: {
    description: {
      story: "Outlined buttons are used for more emphasis than text buttons due to the stroke.",
    },
  },
};

export const HighEmphasis = Template.bind({});
HighEmphasis.args = {
  ...defaultProps,
  children: "Button",
  emphasis: Emphasis.high,
};
HighEmphasis.parameters = {
  docs: {
    description: {
      story: "Contained buttons have more emphasis, as they use a color fill and shadow.",
    },
  },
};

export const WithIcon = ExpoTemplate.bind({});
WithIcon.args = {
  ...defaultProps,
  children: "Button",
  emphasis: Emphasis.high,
  icon: Icons.star,
};
WithIcon.argTypes = {
  emphasis: { control: { disable: true } },
};

export const Block = Template.bind({});
Block.args = {
  ...defaultProps,
  children: "Button",
  emphasis: Emphasis.high,
  icon: Icons.star,
  block: true,
};
