import clsx from "clsx";

interface IProps extends React.PropsWithChildren {
  className?: string;
  breakpoint?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid';
}

// bootstrap container docs:
// https://getbootstrap.com/docs/5.2/layout/containers/

const getClasses = (props: IProps): string => {
  switch (props.breakpoint) {
    case 'sm': return clsx('container-sm', props.className);
    case 'md': return clsx('container-md', props.className);
    case 'lg': return clsx('container-lg', props.className);
    case 'xl': return clsx('container-xl', props.className);
    case 'xxl': return clsx('container-xxl', props.className);
    case 'fluid': return clsx('container-fluid', props.className);
    default: return clsx('container', props.className);
  }
}

export const Container: React.FC<IProps> = (props): JSX.Element => (
  <div className={getClasses(props)}>
    {props.children}
  </div>
);

Container.defaultProps = {
  breakpoint: 'default',
}
