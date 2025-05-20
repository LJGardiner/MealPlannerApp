
export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl bg-primary text-white font-semibold px-4 py-2 hover:bg-blue-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
