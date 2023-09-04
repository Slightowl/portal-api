import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SwitchInput } from './SwitchInput';

export default {
  title: 'atoms/SwitchInput',
  component: SwitchInput,
} as ComponentMeta<typeof SwitchInput>;

const Template: ComponentStory<typeof SwitchInput> = (args) => <SwitchInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Switch input',
};