import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from 'src/components/atoms/Flex';
import { OptionButton } from './OptionButton';

export default {
  title: 'molecules/OptionButton',
  component: OptionButton,
} as ComponentMeta<typeof OptionButton>;

const Template: ComponentStory<typeof OptionButton> = (args) => <OptionButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'option 1',
};

export const ManyOptions: ComponentStory<typeof Flex> = () => (
  <Flex col>
    <OptionButton name="story-group" label="option 1" />
    <OptionButton name="story-group" label="option 2" />
    <OptionButton name="story-group" label="option 3" />
  </Flex>
);
