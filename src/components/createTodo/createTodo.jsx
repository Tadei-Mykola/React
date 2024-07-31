import { TodoService } from '../../services';
import { useStatus } from '../../hooks';
import { useForm } from'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers';
import './createTodo.scss';
import dayjs from 'dayjs';

const todoService = new TodoService()

export function CreateTodo() {
  const {setStatus, setTodos } = useStatus()
  const minDateTime = dayjs().add(1, 'hour');

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      isDone: false,
      date: undefined
    }
  })

  const addTodo = (todo) => {
    setStatus(todoService.autoSetStatus(true, 'Очікування відповіді від сервера', 'info'))
    todoService.createNewTodo(todo).then(data => {
      setStatus(todoService.autoSetStatus(false, 'Задачу успішно додано', 'success'));
      setTodos((prev) => [ ...prev, data]);
      reset();
    })
    .catch (error => {
    setStatus(todoService.autoSetStatus(false, error.message, 'error'))
    })   
  }

  const checkDate = (newDate) => {
    if (newDate && dayjs(newDate).isAfter(minDateTime)) {
      setValue("date", newDate);
      clearErrors("date");
    } else {
      setError("date", {
        type: "manual",
        message: "Invalid date"
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(addTodo)}>
      <div className='create-todo'>
        <div className='field'>
          <label htmlFor="nameItem">Веддіть дію яку хочете зробити</label>
          <input type="text" name='nameItem' maxLength={45} {...register("name", {required: true})}
          style={{borderColor: errors.todo ? 'red' : ""}}/>
          
        </div>
        <DateTimePicker onChange={checkDate} minDateTime={minDateTime} value={getValues("date")}></DateTimePicker>
        <button type='sumbit'>&#10003;</button>
      </div>
    </form>
  );
}

