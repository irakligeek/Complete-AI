export default function Output({ children, type }) {
  let classes = "text-white p-5 rounded-md mb-4";
  if (type === "error") {
    classes += " bg-red-500";
  } else if (type === "success") {
    classes += " bg-green-500";
  } else if (type === "userInput") {
    classes += " bg-purple-500";
  } else {
    classes += " bg-blue-500 text-sm";
  }

  return (
    <div className={classes}>
      {type === "json" ? (
        <div>
          <pre className=" text-wrap break-all">{children}</pre>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
