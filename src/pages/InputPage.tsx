import { FormEvent, useCallback, useState } from 'react';
import { addRecord } from '../api/db';

function toDateValue(date: Date | null): string {
  if (date == null) {
    return '';
  }

  return (
    date.getFullYear().toString() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  );
}

export function InputPage() {
  const [text, setText] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());

  const onSubmit = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();

      if (date) {
        await addRecord({ text, date });
        setDate(null);
        setText('');
      }
    },
    [text],
  );

  return (
    <section id='InputPage'>
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type='date'
            className='block'
            value={toDateValue(date)}
            onChange={evt => setDate(evt.target.valueAsDate)}
          />
        </label>
        <label>
          Name:
          <textarea className='block textarea' value={text} onChange={evt => setText(evt.target.value)}></textarea>
        </label>
        <div className='mt-10'>
          <input className='button1' type='submit' value='Submit' />
        </div>
      </form>
    </section>
  );
}
