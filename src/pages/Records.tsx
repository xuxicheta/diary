import { useEffect } from 'react';
import { addRecord, deleteRecord, getAllRecords } from '../api/db';
import { Message } from '../api/message.interface';
import { useCrudReducer } from '../share/use-crud-reducer';
import { Record } from './Record/Record';

export function Records() {
  const [wrapper, dispatch] = useCrudReducer({
    all: getAllRecords,
    delete: deleteRecord,
    edit: (m: Partial<Message>) => Promise.resolve(m as Message),
    add: addRecord,
  });

  useEffect(() => {
    dispatch({ type: 'load-init' });
  }, []);

  return (
    <section id='Records'>
      <h3>Records</h3>

      {wrapper.loading && <span>...loading</span>}
      {!wrapper.loading && wrapper.data && (
        <div className='records-section'>
          {wrapper.data.map(message => (
            <Record key={message.date.getTime()} message={message} dispatch={dispatch} />
          ))}
        </div>
      )}
    </section>
  );
}
