import React, { useRef } from "react";
import {
  useFormContext,
  Controller,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type CurrencySymbol = "€" | "$" | "£" | "₺" | "¥" | "₩";
type Separator = "." | ",";

interface CurrencyInputProps {
  /**
   * The unique identifier for the input field. Used as the name for form field registration.
   */
  id: string;

  /**
   * The initial value for the input field. If not provided, defaults to 0.
   * This value will be formatted as currency.
   */
  initialValue?: number;

  /**
   * Validation rules for react-hook-form.
   * This is an optional field that allows specifying validation such as required fields or pattern matching.
   * The available options are based on `RegisterOptions` from react-hook-form, excluding `valueAsNumber`, `valueAsDate`, `setValueAs`, and `disabled`.
   * Defaults to { required: false } if not specified.
   * @see https://react-hook-form.com/api/useform/register
   */
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;

  /**
   * The number of decimal places to display in the currency format.
   * Defaults to 2 if not specified.
   */
  decimalLength?: number;

  /**
   * The symbol used to separate the decimal part of the number.
   * Defaults to a comma (',').
   */
  decimalSeparator?: Separator;

  /**
   * The symbol used to separate the thousands in large numbers.
   * Defaults to a period ('.').
   */
  thousandSeparator?: Separator;

  /**
   * The currency symbol to display next to the input.
   * This does not affect the form value but is displayed as part of the input for user clarity.
   */
  currency?: CurrencySymbol;

  /**
   * A descriptive label for the input field. This label is displayed above the input.
   */
  label?: string;
}

/**
 * CurrencyInput is a controlled input component that formats user input as currency and created by `SULEYMAN_CAKIR :)`.
 * It is designed to work seamlessly with `react-hook-form` to manage form states and validations.
 *
 * This component handles both formatting (e.g., thousand separators, decimal precision)
 * and validation (e.g., required fields) for currency values.
 *
 * @component
 *
 * @param {string} id - A unique identifier for the input field. This will be used for form registration and as the `name` attribute.
 *
 * @param {number} [initialValue=0] - The initial value that the input field will display.
 * If not provided, it defaults to `0`. This value will be formatted as a currency string.
 *
 * @param {Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined} [rules={ required: false }]
 * - Validation rules used by `react-hook-form`. This allows setting up custom validation such as required fields, minimum/maximum values, etc.
 * Defaults to `{ required: false }`, meaning the field is not required by default.
 *
 * @param {number} [decimalLength=2] - The number of decimal places that should be displayed in the formatted currency value.
 * Defaults to `2` decimal places if not specified.
 *
 * @param {Separator} [decimalSeparator=','] - The symbol used to separate the decimal part of the currency.
 * It defaults to a comma (`,`) but can be customized to other characters like a period (`.`).
 *
 * @param {Separator} [thousandSeparator='.'] - The symbol used to separate groups of thousands in large numbers.
 * It defaults to a period (`.`), but can be customized to a comma or other characters as needed.
 *
 * @param {CurrencySymbol} [currency] - A currency symbol (e.g., €, $, £, ₺) that will be displayed next to the input field.
 * This symbol is purely visual and does not affect the form value.
 *
 * @param {string} [label] - A descriptive label that will be displayed above the input field.
 * It helps users understand what the input field represents, such as "Price" or "Amount".
 *
 * @returns {JSX.Element} A controlled input field that handles currency formatting and integrates with `react-hook-form`.
 *
 * @example
 * // Example usage with react-hook-form:
 * import { useForm, FormProvider } from "react-hook-form";
 * import CurrencyInput from "./CurrencyInput";
 *
 * interface CustomFormType {
 *    ...,
 *    price: number,
 *    ...
 * }
 * function ExampleForm() {
 *   const methods = useForm<CustomFormType>({ defaultValues: { ..., price: 1000.5, ... }});
 *
 *   const onSubmit = (data) => {
 *     console.log(data); // The form data after submission
 *   };
 *
 *   return (
 *     <FormProvider {...methods}>
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         ...
 *         <CurrencyInput
 *           id="price"
 *           initialValue={methods.formState.defaultValues?.price}
 *           rules={{ required: "Price is required", min: { value: 0, message: "Price must be at least 0." } }}
 *           decimalLength={2}
 *           decimalSeparator="."
 *           thousandSeparator=","
 *           currency="$"
 *           label="Price"
 *         />
 *         ...
 *         <button type="submit">Submit</button>
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 * @see https://react-hook-form.com/ for more details on using react-hook-form with custom components.
 */
const CurrencyInput: React.FC<CurrencyInputProps> = (
  props: CurrencyInputProps
) => {
  const {
    id,
    initialValue = 0,
    rules = { required: false },
    decimalLength = 2,
    decimalSeparator = ",",
    thousandSeparator = ".",
    currency,
    label,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const hookFormContext = useFormContext();

  /**
   * Formats a given number into a currency format.
   * @param {string} value - The raw input value to format.
   * @returns {string} - The formatted currency string.
   */
  const formatCurrency = (value: string | number): string => {
    if (typeof value === "number") value = value.toString();
    if (!value || value === "")
      return `0${decimalSeparator}${"0".repeat(decimalLength)}`;

    const regex = new RegExp(`[^0-9\\${decimalSeparator}]`, "g");
    const numericValue = value.replace(regex, "");

    if (numericValue === "")
      return `0${decimalSeparator}${"0".repeat(decimalLength)}`;

    const normalizedValue = numericValue.replace(
      new RegExp(`\\${decimalSeparator}`, "g"),
      "."
    );
    const numberValue = parseFloat(normalizedValue);
    if (isNaN(numberValue))
      return `0${decimalSeparator}${"0".repeat(decimalLength)}`;

    const fixedValue = numberValue.toFixed(decimalLength);
    const parts = fixedValue.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] ? decimalSeparator + parts[1] : "";
    const integerWithThousandSeparator = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSeparator
    );

    return integerWithThousandSeparator + decimalPart;
  };

  /**
   * Parses a formatted currency string back to a raw numeric string.
   * @param {string} value - The formatted currency string.
   * @returns {string} - The parsed numeric string.
   */
  const parseCurrency = (value: string): string => {
    const regexThousand = new RegExp(`\\${thousandSeparator}`, "g");
    const regexDecimal = new RegExp(`\\${decimalSeparator}`, "g");
    const normalizedValue = value
      .replace(regexThousand, "")
      .replace(regexDecimal, ".");
    return normalizedValue;
  };

  /**
   * Handles input change events for react-hook-form.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   * @param {any} field - The field object from react-hook-form.
   */
  const handleReactHookFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    const userInput = e.target.value;
    const cursorPosition = e.target.selectionStart;
    const formattedValue = formatCurrency(userInput);
    const parsedValue = parseCurrency(formattedValue);
    field.onChange(parseFloat(parsedValue));
    if (inputRef.current) {
      window.requestAnimationFrame(() => {
        inputRef.current!.selectionStart = cursorPosition;
        inputRef.current!.selectionEnd = cursorPosition;
      });
    }
  };

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="input-group">
        {currency && <span className="input-group-text">{currency}</span>}
        {hookFormContext && (
          <Controller
            name={id}
            control={hookFormContext.control}
            defaultValue={String(initialValue)}
            rules={rules}
            render={({ field, fieldState, formState }) => (
              <>
                <input
                  {...field}
                  id={id}
                  name={id}
                  type="text"
                  inputMode="decimal"
                  value={formatCurrency(String(field.value))}
                  ref={inputRef}
                  onChange={(e) => handleReactHookFormChange(e, field)}
                  onBlur={field.onBlur}
                  className={`form-control ${
                    fieldState.invalid ? "is-invalid" : ""
                  }`}
                />
                {fieldState.isTouched && fieldState.invalid && (
                  <div className="invalid-feedback">
                    {fieldState.error ? fieldState.error.message : ""}
                  </div>
                )}
              </>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
