import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Alert } from './Alert';

import * as i from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'molecules/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  text: 'This is an alert',
};

export const BasicWithIcon = Template.bind({});
BasicWithIcon.args = {
  text: 'This is an alert',
  icon: i.faExclamation,
};
