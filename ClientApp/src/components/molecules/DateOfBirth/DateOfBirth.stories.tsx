import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateOfBirth } from './DateOfBirth';

export default {
  title: 'molecules/DateOfBirth',
  component: DateOfBirth,
} as ComponentMeta<typeof DateOfBirth>;

const Template: ComponentStory<typeof DateOfBirth> = (args) => (
  <div style={{ width: '400px' }}>
    <DateOfBirth {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {

};