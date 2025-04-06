import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import style from './TodoListItem.module.css';
import Text from '../Text/Text';

const TodoListItem = ({ id, text, onDelete, onChange }) => {
  return (
      <div className={style.box}>
        <Text textAlign="center" marginBottom="20">
          TODO #1
        </Text>
        <Text>{text}</Text>
        <button
          className={style.deleteButton}
          type="button"
          onClick={() => onDelete(id)}
        >
          <RiDeleteBinLine size={24} />
        </button>
        <button className={style.editButton} type="button" onClick={() => onChange({ id, text })}>
          <RiEdit2Line size={24} />
        </button>
      </div>
  );
};

export default TodoListItem;
