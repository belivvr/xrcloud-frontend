import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout: FC<Props> = ({ children }) => <>{children}</>;

export default MinimalLayout;
