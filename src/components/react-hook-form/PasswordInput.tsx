import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { FormDataKeys, IData } from '../../types/types';
import { useEffect, useState } from 'react';
import { showPasswordStrength } from '../../utils/showPasswordStrength';
import passClosed from '../../assets/pass-closed.png';
import passOpened from '../../assets/pass-opened.png';

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
      <div style={{ position: 'relative' }}>
        <label htmlFor="password">Password:</label>
        <input
          type={passwordType}
          id="password"
          {...register(FormDataKeys.password)}
        />
        <button
          style={{ position: 'absolute', top: 25, left: 312 }}
          type="button"
          onClick={() =>
            setPasswordType(passwordType === 'password' ? 'text' : 'password')
          }
        >
          <img
            style={{ height: 15 }}
            src={passwordType === 'password' ? passClosed : passOpened}
            alt="pass-type"
          />
        </button>
        <p style={{ color: 'red' }}>{error.errorPassword ? error.errorPassword : ''}</p>
      </div>
      <div>
        <label htmlFor="password-repeat">Repeat password:</label>
        <input
          type={passwordType}
          id="password-repeat"
          {...register(FormDataKeys.passwordRepeat)}
        />
        <p style={{ color: 'red' }}>{error.errorPasswordRepeat ? error.errorPasswordRepeat : ''}</p>
        {strength ? <div>Strength: {strength} of 4</div> : <></>}
      </div>
    </>
  );
};

export default PasswordInput;