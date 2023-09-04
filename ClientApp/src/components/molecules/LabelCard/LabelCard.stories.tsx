import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LabelCard } from './LabelCard';

export default {
  title: 'molecules/LabelCard',
  component: LabelCard,
} as ComponentMeta<typeof LabelCard>;

const Template: ComponentStory<typeof LabelCard> = (args) => <LabelCard {...args} />;

const TemplateWithChildren: ComponentStory<typeof LabelCard> = (args) => (
  <LabelCard {...args}>
    <div>Child 1</div>
    <div>Child 2</div>
  </LabelCard>
);

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'The label',
};

export const WithLabelAndText = Template.bind({});
WithLabelAndText.args = {
  label: 'The label',
  text: 'The text to go with the label',
};

export const WithLabelAndChildren = TemplateWithChildren.bind({});
WithLabelAndChildren.args = {
  label: 'The label',
};