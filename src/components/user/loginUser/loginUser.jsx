
import './loginUser.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormInput } from "@UI"
import { UserService, LocalStorageService } from '@services';
import { useUser } from '@hooks'
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@schemas';

const userService = new UserService()
const localStorageService = new LocalStorageService()
export function LoginUser({setErrorMessage}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })
  const { setUser } = useUser()
  const navigate = useNavigate();
  const login = (data) => {
    userService.login(data.login, data.password).then(async (response) => {
      localStorageService.setAccessToken(response.data.access_token)
      setUser(await userService.getUserData())
      navigate('/todo')
    })
   .catch((error) => {
    setErrorMessage(error.response.data.message)
   })
  }

  const formFields = [
    { label: 'Номер телефону або пошта', name: 'login' },
    { label: 'Пароль', name: 'password' },
  ];

  return (
    <div className="login-user">
      <div className="registration">
        <h1></h1>
        <Link style={{textDecoration: 'none'}} to="../create">Реєстрація</Link>
      </div>

      <div className="login">
        <form onSubmit={handleSubmit(login)}>   
          {formFields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              register={register}
              error={errors[field.name]}
            />
          ))}
          <button type="submit">Увійти</button>
        </form>
      </div>
    </div>
  );
}

