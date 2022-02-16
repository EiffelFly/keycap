// import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Keyboard from "../components/Keyboard";

export default {
  title: "Component/Keyboard",
  component: Keyboard,
} as ComponentMeta<typeof Keyboard>;

export const Primary: ComponentStory<typeof Keyboard> = () => <Keyboard />;
