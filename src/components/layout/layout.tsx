import clsx from 'clsx';
import Header from './header/header';
import Footer from './footer/footer';

type LayoutProps = {
  className?: string;
  children: JSX.Element | JSX.Element[];
  disableNav?: boolean;
  footer?: boolean;
}

function Layout({ className, children, disableNav, footer }: LayoutProps): JSX.Element {
  return (
    <div className={clsx('page', className)}>
      <Header disableNav={disableNav} />
      {children}
      {footer && <Footer />}
    </div>
  );
}

export default Layout;
