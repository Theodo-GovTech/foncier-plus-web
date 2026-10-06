interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const Toggle = ({ label, checked, onChange }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className="group flex items-center gap-3 text-[15px] text-brand outline-none"
  >
    <span
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-brand ${checked ? "bg-brand" : "bg-line"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : ""}`}
      />
    </span>
    {label}
  </button>
);
