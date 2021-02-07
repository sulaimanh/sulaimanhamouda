export default function Button({
  children,
  handler,
  className,
  textColor,
  borderColor,
  color,
  hoverBorderColor,
  hoverTextColor,
  hoverColor
}) {
  return (
    <button
      className={`p-3 border-2 bg-${color} text-${textColor} border-${borderColor} hover:border-${hoverBorderColor} hover:bg-${hoverColor} hover:text-${hoverTextColor} hover:shadow-lg rounded-md ${className}`}
      onClick={handler}
    >
      {children}
    </button>
  );
}
