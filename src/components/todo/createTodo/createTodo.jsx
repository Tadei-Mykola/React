import { TodoService } from '@services';
import { useStatus } from '@hooks';
import { useForm } from'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers';
import './createTodo.scss';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const todoService = new TodoService()

export function CreateTodo() {
  const { setStatus } = useStatus()
  const minDateTime = dayjs().add(1, 'hour');
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['addTodo'],
    mutationFn: (todo) => todoService.createNewTodo(todo),
    onMutate: () => setStatus(todoService.autoSetStatus(true, 'Очікування відповіді від сервера', 'info')),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
      setStatus(todoService.autoSetStatus(false, 'Задачу успішно додано', 'success'))
      reset()
    },
    onError: (error) => setStatus(todoService.autoSetStatus(false, error.message, 'error'))
    }
  )
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
    <form onSubmit={handleSubmit(mutate)}>
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

