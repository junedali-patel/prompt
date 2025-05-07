import { Sidebar } from '../ui/sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {children}
    </div>
  );
}; 