export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className="w-full h-12 px-5 bg-gray-light rounded-md outline-none ring-0 focus-visible:ring-2 focus-visible:ring-gray-lightest focus-visible:ring-opacity-75"
      {...props}
    />
  );
};

export default Input;
