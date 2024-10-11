import { render, screen } from '@testing-library/react';
import { withMockStore, withRouter } from '../../utils/mock-components';
import LoginPage from './login-page';
import userEvent from '@testing-library/user-event';

describe('Component: LogInPage', () => {
  it('should render inputed data correctly', async () => {
    const emailTestId = 'email';
    const emailText = 'email';
    const passwordTestId = 'password';
    const passwordText = 'password';
    const { component } = withMockStore(withRouter(<LoginPage />));

    render(component);

    await userEvent.type(screen.getByTestId(emailTestId), emailText);
    await userEvent.type(screen.getByTestId(passwordTestId), passwordText);

    expect(screen.getByDisplayValue(emailText)).toBeInTheDocument();
    expect(screen.getByDisplayValue(passwordText)).toBeInTheDocument();
  });
});
