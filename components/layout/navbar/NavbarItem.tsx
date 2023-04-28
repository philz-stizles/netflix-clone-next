type NavbarItemProps = {
  label: string;
  isActive?: boolean;
};

const NavbarItem: React.FC<NavbarItemProps> = ({ label, isActive }) => {
  return (
    <div
      className={
        isActive
          ? "text-white cursor-default"
          : "text-gray-200 hover:text-gray-300 cursor-pointer transition"
      }
    >
      {label}
    </div>
  );
};

export default NavbarItem;
