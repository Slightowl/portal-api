import { render, screen } from 'src/utils/test-utils';
import { Badge } from './Badge';

describe('Badge',  () => {

  test('should render the Badge',  () => {
    const text = 'My Badge';

    render(
      <Badge text={text} />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  })
})
