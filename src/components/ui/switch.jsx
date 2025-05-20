
export function Switch({ id, checked, onChange }) {
  return (
    <input
      id={id}
      type="checkbox"
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition peer"
      checked={checked}
      onChange={onChange}
    />
  )
}
