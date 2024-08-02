const Spinner = ({
  stroke = "#000",
  h = 5,
  w = 5,
}: {
  stroke?: string;
  h?: number;
  w?: number;
}) => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className={`animate-spin text-blue-500 ${"h-" + h} ${"w-" + w}`}
        stroke="#ffffff"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={stroke}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray="50 214"
        />
      </svg>
    </div>
  );
};

export default Spinner;
