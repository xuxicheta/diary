import { Dispatch } from 'react';
import { Message } from '../../api/message.interface';
import { DeleteButton } from '../../components/icons/DeleteButton';
import { EditButton } from '../../components/icons/EditButton';
import { dateFormat } from '../../share/date-format';
import './Record.css';
import { MessageAction } from '../../share/use-crud-reducer';

export function Record({ message, dispatch }: { message: Message; dispatch: Dispatch<MessageAction<Message>> }) {
  const key = dateFormat.format(message.date);

  return (
    <div className='Record' key={key}>
      <div className='record-container'>
        <div className='key'>{key}</div>
        <div className='text'>{message.text}</div>
        <div className='buttons'>
          <EditButton onClick={() => dispatch({ type: 'edit', details: message })} />
          <DeleteButton onClick={() => dispatch({ type: 'delete', details: message })} />
        </div>
      </div>
    </div>
  );
}
