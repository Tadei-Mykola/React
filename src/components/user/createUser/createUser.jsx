
import './createUser.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserService, LocalStorageService } from '@services';
import { useUser } from '@hooks'
import { useNavigate } from 'react-router-dom';
import { registrationSchema } from '@schemas';
import { FormInput } from "@UI"


const userService = new UserService()
const localStorageService = new LocalStorageService()
export function CreateUser( {setErrorMessage} ) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      phone: '',
    }
  })
  const { setUser } = useUser()
  const navigate = useNavigate();

  const registration = (data) => {
    userService.registration(data).then(async(response) => {
      localStorageService.setAccessToken(response.data)
      setUser(await userService.getUserData())
      navigate('/todo')
    })
   .catch((error) => {
    setErrorMessage(error.response.data.message)
   })
  }

  const formFields = [
    { label: 'Ведіть імʼя', name: 'username' },
    { label: 'Ведіть номер тоелефону', name: 'phone' },
    { label: 'Ведіть пошту', name: 'email' },
    { label: 'Ведіть пароль', name: 'password' },
  ];


  return (
    <div className="create-user">
      <div className="registration">
        <form onSubmit={handleSubmit(registration)}>
          {formFields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              register={register}
              error={errors[field.name]}
            />
          ))}
          <button type="submit">Зареєструватися</button>
        </form>  
      </div>

      <div className="login">
        <Link to="../login" style={{textDecoration: 'none'}}>Увійти</Link>
      </div>

    </div>
  );
}

