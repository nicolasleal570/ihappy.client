import React, { ChangeEvent, forwardRef, useImperativeHandle } from 'react';

type InputFieldProps = {
  placeholder: string;
  name: string;
  type: string;
  value: string;
  label?: string;
  autoComplete?: string;
  validation: string;
  info?: string;
  className?: string;
  customWidth?: string;
  withMarginBottom?: boolean;
  inputChange: (name: string, value: string) => void;
  disabled?: boolean;
}

/**
 * Este componente es un input de email.
 * @visibleName InputField
 */
const InputField = forwardRef(
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
      customWidth,
      withMarginBottom,
      disabled,
    }: InputFieldProps,
    ref: any
  ) => {
    const [data, setData] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            if (!data.trim()) {
              setError('Este campo es obligatorio');
              return false;
            }
          }

          if (current === 'email') {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!re.test(String(data).toLowerCase())) {
              setError('Ingresa una dirección valida de Email');
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
      <div className={`w-full ${withMarginBottom ? 'mb-4' : ''}`}>
        {label && <label className="w-full block mb-1">{label}</label>}
        <input
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          value={value || data}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`
          ${className}
          ${customWidth ? customWidth : 'w-full'}
          bg-white appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white
          ${
            error
              ? 'border-red-400 text-red-400'
              : 'border-purple-500 text-gray-700'
          }
          `}
        />
        {!error && info && <p className="text-gray-400 mt-2 text-sm">{info}</p>}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    );
  }
);

InputField.defaultProps = {
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

export default InputField;
