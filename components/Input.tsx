interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

export default function Input({
  id,
  onChange,
  value,
  label,
  type,
}: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=""
        onChange={onChange}
        value={value}
      />
      <label
        className="absolute text-md text-zinc-400 duraton-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 transition"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
