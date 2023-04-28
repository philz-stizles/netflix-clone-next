import { ChangeEvent } from "react";

type InputProps = {
    type?: string;
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, id, label, value, onChange }: InputProps) => (
  <div className="relative">
    {/* block */}
    <input
      onChange={onChange}
      value={value}
      type={type}
      id={id}
      className="
       
        rounded-md
        px-6
        pt-6
        pb-1
        w-full
        text-md
      text-white
      bg-neutral-700
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        invalid:border-b-1
        "
      placeholder=" "
    />
    {/* peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3 */}
    <label
      htmlFor={id}
      className="
        absolute 
        text-md
      text-zinc-400
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3
        top-4 
        z-10 
        origin-[0] 
        left-6
     
      "
    >
      {label}
    </label>
  </div>
);

export default Input