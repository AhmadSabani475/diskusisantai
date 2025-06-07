import { useDispatch, useSelector } from 'react-redux';
import UseInput from '../Hooks/UseInput';
import { useEffect } from 'react';
import { asyncUsersAndThreads } from '../States/shared/action';
import CategoryItem from './CategoryItem';
import PropTypes from 'prop-types';

function CategoryList({ onChangeCategory }) {
  const [select, setSelect] = UseInput('');
  const { threads = [] } = useSelector((states) => states);
  const categoryThread = threads.map(({ category }) => category);
  const uniqueCategory = [...new Set(categoryThread)];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncUsersAndThreads());
  }, [dispatch]);
  const handleClick = (e) => {
    const clickedValue = e.target.value;

    if (clickedValue === select) {
      // Klik dua kali: reset
      const resetEvent = { target: { value: '' } };
      setSelect(resetEvent);
      onChangeCategory(resetEvent);
    } else {
      // Pilih kategori baru
      setSelect(e);
      onChangeCategory(e);
    }
  };

  return (
    <div className="flex flex-col  gap-3 mb-2  p-2 border-b border-b-gray-300 w-full">
      <h2 className="text-xl ">Kategori Populer</h2>
      <div className="flex gap-2">
        {uniqueCategory.map((category, key) => (
          <CategoryItem
            category={category}
            key={key}
            handleClick={handleClick}
            selected={select}
          />
        ))}
      </div>
    </div>
  );
}
CategoryList.propTypes = {
  onChangeCategory: PropTypes.func.isRequired,
};
export default CategoryList;
