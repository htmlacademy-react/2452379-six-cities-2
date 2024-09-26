import clsx from 'clsx';
import Header from './header/header';

type LayoutProps = {
  className?: string;
  children: JSX.Element | JSX.Element[];
  disableNav?: boolean;
}

function Layout({ className, children, disableNav }: LayoutProps): JSX.Element {
  return (
    <div className={clsx('page', className)}>
      <Header disableNav={disableNav}/>
      {children}
    </div>
  );
}

export default Layout;
