import { render, screen } from '@testing-library/react';
import Header from './header';
import { withMockStore, withRouter } from '../../../utils/mock-components';
import { createFakeUserSlice } from '../../../utils/mocks';

describe('Component: Header', () => {
  const headerNavTestId = 'HeaderNav';
  it('should render correctly when nav enabled', () => {
    const { component } = withMockStore(withRouter(<Header />), { USER: createFakeUserSlice() });
    render(component);

    expect(screen.getByTestId(headerNavTestId)).toBeInTheDocument();
  });

  it('should render correctly when nav disabled', () => {
    render(withRouter(<Header disableNav />));

    expect(screen.queryByTestId(headerNavTestId)).not.toBeInTheDocument();
  });
});
