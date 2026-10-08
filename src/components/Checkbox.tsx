import { CheckIcon } from "@/components/icons/CheckIcon";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <label className="flex cursor-pointer items-center gap-2 text-[15px] text-brand">
    <span className="relative flex size-6 shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer size-full cursor-pointer appearance-none border border-line bg-white transition-colors checked:border-brand checked:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      />
      <CheckIcon
        width={16}
        height={16}
        className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100"
      />
    </span>
    {label}
  </label>
);
