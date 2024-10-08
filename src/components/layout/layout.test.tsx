import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../const';
import { State } from '../../store/type';
import { createFakeUserSlice } from '../../utils/mocks';
import { withMockStore, withRouter } from '../../utils/mock-components';
import Layout from './layout';

describe('Component: Layout', () => {
  const headerTestId = 'Header';
  const footerTestId = 'Footer';
  const testContent = 'test';
  const testChild = <div>{testContent}</div>;

  it('should render correctly', () => {
    const initialState: Pick<State, NameSpace.User> = { USER: createFakeUserSlice() };
    const { component } = withMockStore(withRouter(<Layout>{testChild}</Layout>), initialState);

    render(component);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
    expect(screen.queryByTestId(footerTestId)).not.toBeInTheDocument();
  });

  it('should render correctly with footer', () => {
    const initialState: Pick<State, NameSpace.User> = { USER: createFakeUserSlice() };
    const { component } = withMockStore(withRouter(<Layout footer>{testChild}</Layout>), initialState);

    render(component);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
    expect(screen.getByTestId(footerTestId)).toBeInTheDocument();
  });
});
