import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoadingSkeleton } from './LoadingSkeleton';

export default {
  title: 'atoms/LoadingSkeleton',
  component: LoadingSkeleton,
} as ComponentMeta<typeof LoadingSkeleton>;

const Template: ComponentStory<typeof LoadingSkeleton> = (args) => <LoadingSkeleton {...args} />;

export const Box = Template.bind({});
Box.args = {
  type: 'box',
};

export const Line = Template.bind({});
Line.args = {
  type: 'line',
};

export const Item = Template.bind({});
Item.args = {
  type: 'item',
};

export const Custom = Template.bind({});
Custom.args = {
  type: {
    height: '200px',
    width: '400px',
  },
};