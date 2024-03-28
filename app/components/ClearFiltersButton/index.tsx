import { FC } from "react";

const ClearFilterButtons: FC<ClearFilterButtonsProps> = ({ clearParams }) => {
  return (
    <button
      className="bg-black text-gray-300 rounded-full px-4 py-2 hover:bg-gray-800 hover:text-white transition-colors duration-300"
      onClick={clearParams}
    >
      Remove Filters
    </button>
  );
};

export default ClearFilterButtons;
