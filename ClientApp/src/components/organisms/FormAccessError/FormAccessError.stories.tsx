import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { FormAccessError } from './FormAccessError';

export default {
  title: 'organisms/FormAccessError',
  component: FormAccessError,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as ComponentMeta<typeof FormAccessError>;

const Template: ComponentStory<typeof FormAccessError> = (args) => <FormAccessError {...args} />;

export const Primary = Template.bind({});
Primary.args = { };