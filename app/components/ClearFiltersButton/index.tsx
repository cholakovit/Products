
interface ClearFilterButtonsProps {
  clearParams: () => void; // Assuming clearParams is a function that takes no parameters and returns nothing
}

const ClearFilterButtons: React.FC<ClearFilterButtonsProps> = ({ clearParams }) => {

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
