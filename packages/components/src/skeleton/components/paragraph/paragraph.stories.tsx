import { Colors } from "@hastics/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Skeleton from "../../skeleton";
import SkeletonParagraph from "./paragraph";

export default {
  title: "Skeleton.Paragraph",
  component: SkeletonParagraph,
} as ComponentMeta<typeof SkeletonParagraph>;

const Template: ComponentStory<typeof SkeletonParagraph> = (args) => <SkeletonParagraph {...args} />;

const ActiveTemplate: ComponentStory<typeof SkeletonParagraph> = (args) => (
  <Skeleton active>
    <SkeletonParagraph {...args} />
  </Skeleton>
);

const CustomColorTemplate: ComponentStory<typeof SkeletonParagraph> = (args) => (
  <Skeleton active color={Colors.red[200]}>
    <SkeletonParagraph {...args} />
  </Skeleton>
);

export const Default = Template.bind({});
Default.args = {
  rows: 1,
};

export const Active = ActiveTemplate.bind({});
Active.args = {
  rows: 1,
};

export const WithAnotherColor = CustomColorTemplate.bind({});
WithAnotherColor.args = {
  rows: 1,
};
