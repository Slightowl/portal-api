import { vi } from 'vitest';
import { fireEvent, render, screen } from 'src/utils/test-utils';
import { Button } from './Button';

describe('Button', () => {

  test('should render the Button', () => {
    const text = 'My Button';

    render(
      <Button label={text} />
    );

    expect(screen.getByRole('button', { name: /my button/i })).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  })

  test('calls onClick prop when clicked', () => {
    const handleClick = vi.fn();

    render(
      <Button label="Click Me" onClick={handleClick} />
    );

    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  })
})
