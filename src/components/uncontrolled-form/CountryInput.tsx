import { MutableRefObject } from 'react';
import { useAppSelector } from '../../store/hooks/hooks';

const CountriesInput = ({
  countryRef,
  error,
}: {
  countryRef: MutableRefObject<HTMLInputElement | null>;
  error?: string;
}) => {
  const countries = useAppSelector((state) => state.countriesReducer.countries);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: 10 }} htmlFor="countries">
          Countries:
        </label>
        <input
          id="countries"
          type="text"
          className="w-full"
          placeholder="Choose country..."
          list="countries-list"
          ref={countryRef}
        />
        <datalist id="countries-list">
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </datalist>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CountriesInput;