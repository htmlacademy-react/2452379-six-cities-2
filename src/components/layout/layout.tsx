import clsx from 'clsx';
import Header from '../header/header';

type LayoutProps = {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

function Layout({ className, children }: LayoutProps): JSX.Element {
  return (
    <div className={clsx('page', className)}>
      <Header/>
      {children}
    </div>
  );
}

export default Layout;
