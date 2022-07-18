import { useState } from 'react';
import styles from './ContactForm.module.css';
import {
  useAddContactMutation,
  useFetchContactsQuery,
} from 'redux/contactsApi';
import { nanoid } from 'nanoid';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

export function ContactForm() {
  const { data: contacts } = useFetchContactsQuery();
  const [createContact] = useAddContactMutation();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();
  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    const hasName = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (hasName) {
      notyf.error(`${name} is allready in phonebook`);
      reset();
    } else {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      createContact(contact);
      notyf.success(`Contact ${name} added`)
      reset();
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor={nameInputId} className={styles.lable}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          id={nameInputId}
          placeholder="Enter name..."
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </label>
      <label htmlFor={numberInputId} className={styles.lable}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          id={numberInputId}
          placeholder="Enter number..."
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
      </label>

      <button
        disabled={!name || !number}
        className={styles.button}
        type="submit"
      >
        Add contact
      </button>
    </form>
  );
}

