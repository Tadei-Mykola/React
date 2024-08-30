
import './formInput.scss';

export function FormInput({ label, name, register, error }) {
  return (
    <div className="formInput">
        <label htmlFor={name}>{label}</label>
        <input name={name} {...register(name)} />
        <p>{error?.message}</p>
    </div>
  );
}

