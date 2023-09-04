import { ComponentStory, ComponentMeta } from '@storybook/react';
import { QuickSearch } from './QuickSearch';

export default {
  title: 'molecules/QuickSearch',
  component: QuickSearch,
} as ComponentMeta<typeof QuickSearch>;

const Template: ComponentStory<typeof QuickSearch> = (args) => <QuickSearch {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'type here...',
};