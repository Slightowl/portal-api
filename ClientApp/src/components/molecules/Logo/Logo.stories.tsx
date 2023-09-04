import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Logo } from './Logo';

export default {
  title: 'molecules/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};