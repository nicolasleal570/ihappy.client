import React, { ChangeEvent, forwardRef, useImperativeHandle } from 'react';

type SelectFieldDynamicProps = {
  placeholder: string;
  name: string;
  type: string;
  value: string;
  label?: string;
  autoComplete?: string;
  validation: string;
  info?: string;
  className?: string;
  disabled?: boolean;
  options: Array<{ title: string; value: string }>;
  inputChange: (name: string, value: any) => void;
}

const SelectFieldDynamic = forwardRef(
  (
    {
      placeholder,
      name,
      type,
      value,
      label,
      autoComplete,
      validation,
      inputChange,
      className,
      info,
      options,
      disabled,
    }: SelectFieldDynamicProps,
    ref: any
  ) => {
    const [data, setData] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      if (!disabled) {
        setData(event.target.value);
        setError('');
        inputChange(event.target.name, event.target.value);
      }
    };

    /**
     * return true if it's valid
     */
    const validate = () => {
      if (validation) {
        const rules = validation.split('|');

        for (let i = 0; i < rules.length; i++) {
          const current = rules[i];

          if (current === 'required') {
            if (!data) {
              setError('Este campo es obligatorio');
              return false;
            }
          }

          const pair = current.split(':');
          switch (pair[0]) {
            case 'min':
              if (data.length < Number(pair[1])) {
                setError(`Este campo debe tener más de ${pair[1]} caracteres`);
                return false;
              }
              break;
            case 'max':
              if (data.length > Number(pair[1])) {
                setError(
                  `Este campo debe tener menos de ${pair[1]} caracteres`
                );
                return false;
              }
              break;

            default:
              break;
          }
        }
      }

      return true;
    };

    useImperativeHandle(ref, () => {
      return {
        validate: () => validate(),
      };
    });

    return (
      <div className="w-full mb-4">
        {label && <label className="w-full block mb-1">{label}</label>}
        <select
          ref={ref}
          name={name}
          onChange={handleChange}
          disabled={disabled}
          className={`
          bg-white appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white outline-none focus:shadow-outline 
          ${className}
          ${
            error
              ? 'border-red-400 text-red-400'
              : 'border-purple-500 text-gray-700'
          }
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option value={option.value} key={option.value}>{option.title}</option>
          ))}
        </select>

        {!error && info && <p className="text-gray-400 mt-2 text-sm">{info}</p>}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    );
  }
);

SelectFieldDynamic.defaultProps = {
  placeholder: '',
  name: '',
  type: 'text',
  value: '',
  autoComplete: 'off',
  validation: '',
  className: '',
  info: '',
  disabled: false,
};

export default SelectFieldDynamic;
