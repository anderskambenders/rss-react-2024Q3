import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { FormDataKeys, IData } from '../../types/types';
import { useEffect, useState } from 'react';
import { showPasswordStrength } from '../../utils/showPasswordStrength';
import passClosed from '../../assets/pass-closed.png';
import passOpened from '../../assets/pass-closed.png';

const PasswordInput = ({
  error,
  register,
  watchPassword,
}: {
  watchPassword: string | undefined;
  error: {
    errorPassword: string | undefined;
    errorPasswordRepeat: string | undefined;
  };
  register: (
    name: FormDataKeys,
    options?: RegisterOptions<IData, FormDataKeys> | undefined
  ) => UseFormRegisterReturn<FormDataKeys>;
}) => {
  const [strength, setStrength] = useState(0);
  const [passwordType, setPasswordType] = useState('password');

  useEffect(() => {
    if (watchPassword)
      showPasswordStrength(watchPassword).then((strength) => {
        setStrength(strength);
      });
  }, [watchPassword]);
  return (
    <>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type={passwordType}
          id="password"
          {...register(FormDataKeys.password)}
        />
        <button
          type="button"
          onClick={() =>
            setPasswordType(passwordType === 'password' ? 'text' : 'password')
          }
        >
          <img
            src={passwordType === 'password' ? passClosed : passOpened}
            alt="pass-type"
          />
        </button>
        <p>{error.errorPassword ? error.errorPassword : ''}</p>
      </div>
      <div>
        <label htmlFor="password-repeat">Repeat password:</label>
        <input
          type={passwordType}
          id="password-repeat"
          {...register(FormDataKeys.passwordRepeat)}
        />
        <p>{error.errorPasswordRepeat ? error.errorPasswordRepeat : ''}</p>
        {strength ? <div>Strength: {strength} of 4</div> : <></>}
      </div>
    </>
  );
};

export default PasswordInput;