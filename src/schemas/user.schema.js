import * as yup from "yup"

export const loginSchema = yup
.object({
  login: yup.string().required(),
  password: yup.string().min(6).required(),
})
.required()

export const registrationSchema = yup
.object({
  username: yup.string().min(2).required('Name is required'),
  email: yup.string().email(),
  phone: yup.string(),
  password: yup.string().min(6).required('Password is required'),
}).test('email-or-phone', 'Either email or phone is required', (value) => {
  return value.email || value.phone;})
.required()