import React from 'react';
import { ContactListElement } from './ContactListElement';
import { useSelector } from 'react-redux';
import {
  useDeleteContactMutation,
  useFetchContactsQuery,
} from 'redux/contactsApi';
import { getFilter } from 'redux/contactsSlice';
import styles from './ContactListElement.module.css';

export function ContactList() {
 const { data: contacts } = useFetchContactsQuery();
 const [deleteContact] = useDeleteContactMutation();
 const filter = useSelector(getFilter);

  const contactsFilter = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase().trim());
    });
  };

  const renderContacts = filter === '' ? contacts : contactsFilter();

  return (
    <>
      <ul className={styles.list}>
        {contacts &&
          renderContacts.map(({ id, name, phone }) => (
            <ContactListElement
              key={id}
              id={id}
              name={name}
              number={phone}
              onDeleteContact={deleteContact}
            />
          ))}
      </ul>
    </>
  );
}
