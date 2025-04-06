import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos, onDelete, onChange }) => {
  return (
    <Grid>
      {todos.map(({id, text}) => (
        <GridItem key={id}>
          <TodoListItem id={id} text={text} onDelete={onDelete} onChange={onChange} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
