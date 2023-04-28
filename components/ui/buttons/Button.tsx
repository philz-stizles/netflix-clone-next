interface ButtonProps {
    label?: number,
    icon?: string,
    children: React.ReactNode
    onClick: () => void
}

const Button: React.FC<ButtonProps> = ({label, onClick, children}) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
    >{children}</button>
  );
}

export default Button