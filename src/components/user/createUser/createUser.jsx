
import './createUser.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { UserService, LocalStorageService } from '@services';
import { useUser } from '@hooks'
import { useNavigate } from 'react-router-dom';

const schema = yup
.object({
  username: yup.string().min(2).required('Name is required'),
  email: yup.string().email(),
  phone: yup.string(),
  password: yup.string().min(6).required('Password is required'),
}).test('email-or-phone', 'Either email or phone is required', (value) => {
  return value.email || value.phone;})
.required()

const userService = new UserService()
const localStorageService = new LocalStorageService()
export function CreateUser( {setErrorMessage} ) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: '',
    }
  })
  const { setUser } = useUser()
  const navigate = useNavigate();

  const registration = (data) => {
    userService.registration(data).then((response) => {
      localStorageService.setAccessToken(response.data)
      setUser(localStorageService.getUserData())
      navigate('/todo')
    })
   .catch((error) => {
    setErrorMessage(error.response.data.message)
   })
  }



  return (
    <div className="create-user">
      <div className="registration">
        <form onSubmit={handleSubmit(registration)}>
          <label htmlFor="username">Ведіть імʼя</label>
          <input name='username' {...register("username")} />
          <p>{errors.username?.message}</p>
          <label htmlFor="phone">Ведіть номер тоелефону</label>
          <input name='phone' {...register("phone")}/>
          <p>{errors.phone?.message}</p>
          <label htmlFor="email">Ведіть пошту</label>
          <input name='email' {...register("email")} />
          <p>{errors.email?.message}</p>
          <label htmlFor="password">Ведіть пароль</label>
          <input name='password' {...register("password")} />
          <p>{errors.password?.message}</p>
          <button type="submit">Зареєструватися</button>
        </form>  
      </div>

      <div className="login">
        <Link to="../login" style={{textDecoration: 'none'}}>Увійти</Link>
      </div>

    </div>
  );
}

