
import './loginUser.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { UserService, LocalStorageService } from '@services';
import { useUser } from '@hooks'
import { useNavigate } from 'react-router-dom';

const schema = yup
.object({
  login: yup.string().required(),
  password: yup.string().min(6).required(),
})
.required()

const userService = new UserService()
const localStorageService = new LocalStorageService()
export function LoginUser({setErrorMessage}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const { setUser } = useUser()
  const navigate = useNavigate();
  const login = (data) => {
    userService.login(data.login, data.password).then((response) => {
      localStorageService.setAccessToken(response.data.access_token)
      setUser(localStorageService.getUserData())
      navigate('/todo')
    })
   .catch((error) => {
    setErrorMessage(error.response.data.message)
   })
  }

  return (
    <div className="login-user">
      <div className="registration">
        <h1></h1>
        <Link style={{textDecoration: 'none'}} to="../create">Реєстрація</Link>
      </div>

      <div className="login">
        <form onSubmit={handleSubmit(login)}>
          <label htmlFor="login">Номер телефону або пошта</label>
          <input name='login' {...register("login")} />
          <p>{errors.login?.message}</p>
          <label htmlFor="password">Пароль</label>
          <input name='password' {...register("password")} />
          <p>{errors.password?.message}</p>
          <button type="submit">Увійти</button>
        </form>
      </div>
    </div>
  );
}

