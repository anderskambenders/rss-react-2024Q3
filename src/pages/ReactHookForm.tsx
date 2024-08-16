import { useNavigate } from "react-router-dom";
import { formInputs } from "../components/formInputs";
import './form.css';
import { useAppDispatch } from "../store/hooks/hooks";
import { useForm } from "react-hook-form";
import { dataListSlice } from "../store/slices/formData.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../utils/validation";
import FormInput from "../components/react-hook-form/FormInput";
import PasswordInput from "../components/react-hook-form/PasswordInput";
import CountriesInput from "../components/react-hook-form/CountryInput";
import GenderInput from "../components/react-hook-form/GenderInput";

const ReactHookFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const { addNewSubmit } = dataListSlice.actions;

  const onSubmit = handleSubmit((data) => {
    dispatch(addNewSubmit(data));
    navigate('/', { state: { from: 'react-hook-form' } });
  });
  return (
    <>
      <h2>React Hook Form</h2>
      <form onSubmit={onSubmit}>
        {formInputs.map((item, ind) => {
          return (
            <FormInput
              key={ind}
              props={item}
              error={errors[item.name]?.message}
              register={register}
            ></FormInput>
          );
        })}
        <PasswordInput
          error={{
            errorPassword: errors.password?.message,
            errorPasswordRepeat: errors.passwordRepeat?.message,
          }}
          register={register}
          watchPassword={watch('password')}
        />
        <div>
          <CountriesInput error={errors.country?.message} register={register} />
        </div>
        <GenderInput register={register} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default ReactHookFormPage;
