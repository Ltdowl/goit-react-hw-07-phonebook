import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactListElement.module.css';
import { VscTrash, VscPerson, VscCallIncoming } from 'react-icons/vsc';
export const ContactListElement = ({ id, name, number, onDeleteContact }) => {
  return (
    <li className={styles.listElement}>
      <div className={styles.wraper}>
        <p className={styles.listPerson}>
          <VscPerson className={styles.listPersonIcon} />
          {name}
        </p>
        <p className={styles.listPhone}>
          <VscCallIncoming className={styles.listPersonIcon} />
          {number}
        </p>
      </div>
      <button
        className={styles.listBtn}
        type="submit"
        onClick={() => onDeleteContact(id)}
      >
        <VscTrash className={styles.listBtnIcon} />
      </button>
    </li>
  );
};

ContactListElement.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
