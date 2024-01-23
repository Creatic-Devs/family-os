import React from "react";

interface NavItemProps {
  href: string;
  isActive: boolean;
  icon: React.ReactNode;
  text: string;
}

/**
 * Represents a navigation item component. This component is used to render a navigation item.
 *
 * @component
 * @param {NavItemProps} props - The props for the NavItem component.
 * @param {string} props.href - The URL for the navigation item.
 * @param {boolean} props.isActive - Indicates if the navigation item is active.
 * @param {ReactNode} props.icon - The icon for the navigation item.
 * @param {string} props.text - The text for the navigation item.
 * @returns {JSX.Element} The rendered NavItem component.
 */
const NavItem: React.FC<NavItemProps> = ({ href, isActive, icon, text }) => {
  return (
    <li>
      <a
        href={href}
        className={`flex items-center rounded-lg px-3 py-2 ${
          isActive
            ? "text-white bg-primary dark:bg-white dark:text-black"
            : "text-grey-500 hover:text-primary-600 hover:bg-accent dark:text-white "
        }`}
      >
        {icon}
        <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
      </a>
    </li>
  );
};

export default NavItem;
