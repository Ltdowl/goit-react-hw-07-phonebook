import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getFilter } from 'redux/contactsSlice';
import { VscSearch } from 'react-icons/vsc';
import styles from './Filter.module.css';
export function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onChange = e => dispatch(setFilter(e.target.value));
  return (
    <label>
      <p className={styles.filterTitle}>Find contact by name</p>
      <div className={styles.filterWraper}>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={onChange}
          className={styles.filterInput}
        />
        <VscSearch className={styles.filterIcon} />
      </div>
    </label>
  );
}
