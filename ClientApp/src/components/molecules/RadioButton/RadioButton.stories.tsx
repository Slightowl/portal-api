import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from 'src/components/atoms/Flex';
import { RadioButton } from './RadioButton';

export default {
  title: 'molecules/RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args) => <RadioButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'story-group',
  value: '1',
  description: 'option 1',
};

export const ManyOptions: ComponentStory<typeof Flex> = () => (
  <Flex col>
    <RadioButton name="story-group" value="1" description="option 1" onChange={() => { }} />
    <RadioButton name="story-group" value="2" description="option 2" onChange={() => { }} />
    <RadioButton name="story-group" value="3" description="option 3" onChange={() => { }} />
  </Flex>
);