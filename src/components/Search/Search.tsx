import React from 'react';
// import debounce from 'lodash.debounce';
// import { setSearchValue, clearSearchValue } from 'features/filter/api';
// import styles from './search.module.css';
// import { BsSearch } from 'react-icons/bs';
// import { AiOutlineClose } from 'react-icons/ai';
// import { useAppDispatch } from "app/hooks";

const Search: React.FC = () => {
  return <div></div>;
  // const [searchValueLocal, setSearchValueLocal] = React.useState<string>('');
  // const dispatch = useAppDispatch();
  // const searchRef = React.useRef<HTMLInputElement>(null);

  // eslint-disable-next-line
  // const searchDebounce = React.useCallback(
  //     debounce((value: string) => {
  //         dispatch(setSearchValue(value));
  //     }, 350),
  //     [],
  // );

  // const handleSearchInput = (value: string) => {
  //     setSearchValueLocal(value);
  //     searchDebounce(value);
  // };

  // const handleCloseButton = () => {
  //     dispatch(clearSearchValue());
  //     setSearchValueLocal('');
  //     searchRef.current?.focus();
  // };

  // return (
  // <div className={styles.root}>
  //     <BsSearch className={styles.icon} />
  //     <input
  //         value={searchValueLocal}
  //         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInput(e.target.value)}
  //         className={styles.input}
  //         type="text"
  //         placeholder="Поиск..."
  //         ref={searchRef}
  //     />
  //     {searchValueLocal && (
  //         <AiOutlineClose
  //             onMouseDown={(e: React.MouseEvent<SVGElement>) => e.preventDefault()}
  //             onClick={() => handleCloseButton()}
  //             className={styles.icon_close}
  //         />
  //     )}
  // </div>
  // );
};

export default Search;
