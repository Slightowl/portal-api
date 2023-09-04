import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AppName } from './AppName';

export default {
  title: 'molecules/AppName',
  component: AppName,
} as ComponentMeta<typeof AppName>;

const Template: ComponentStory<typeof AppName> = (args) => <AppName {...args} />;

export const primary = Template.bind({});
primary.args = { };

export const H1 = Template.bind({});
H1.args = {
  size: 'h1',
};

export const H2 = Template.bind({});
H2.args = {
  size: 'h2',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
};