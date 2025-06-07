import PropTypes from 'prop-types';

function CategoryItem({ category, handleClick, selected }) {
  return category === selected ? (
    <button
      type="button"
      className="border cursor-pointer border-gray-300 bg-black text-white p-4 rounded-2xl"
      onClick={handleClick}
      value={category}
    >
      {category}
    </button>
  ) : (
    <button
      type="button"
      className="border cursor-pointer hover:bg-black hover:text-white border-gray-300  p-4 rounded-2xl"
      onClick={handleClick}
      value={category}
    >
      {category}
    </button>
  );
}
CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.string,
};
export default CategoryItem;
