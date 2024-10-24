# React Currency Input

A customizable and easy-to-use currency input component for React, designed to integrate seamlessly with `react-hook-form`. Format currency values, apply validation rules, and handle user inputs effortlessly with this component.

## Features

- **Currency Formatting**: Supports formatting for different currencies such as `₺`, `$`, `€`, etc.
- **Validation**: Easily apply form validation rules like `required`, `min`, `max`, and more using `react-hook-form`.
- **Flexible Separators**: Choose custom decimal and thousand separators.
- **Customizable**: Configure the number of decimal places and set the default value.
- **React-Hook-Form Integration**: Built to work flawlessly with `react-hook-form`.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gokay-ozturk/react-currency-input.git
   
2. Navigate into the project directory:
   ```bash
   cd react-currency-input

3. Install dependencies:
   ```bash
   npm install
## Props

| Prop              | Type                                                         | Description                                                                                     | Default          |
|-------------------|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------|------------------|
| `id`              | `string`                                                     | The unique identifier for the input field.                                                      | -                |
| `initialValue`    | `number`                                                     | The initial value for the input field, formatted as currency. If not provided, defaults to `0`.  | `0`              |
| `rules`           | `Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>` | Validation rules used by `react-hook-form`. Allows custom validation like `required` fields.     | `{ required: false }` |
| `decimalLength`   | `number`                                                     | The number of decimal places to display. Defaults to `2`.                                        | `2`              |
| `decimalSeparator`| `'.' \| ','`                                                 | The symbol used to separate the decimal part. Defaults to a comma (`,`).                         | `','`            |
| `thousandSeparator`| `'.' \| ','`                                                | The symbol used to separate thousands in large numbers. Defaults to a period (`.`).              | `'.'`            |
| `currency`        | `'$' \| '€' \| '₺' \| '£' \| '¥' \| '₩'`                     | The currency symbol displayed next to the input. It is for visual purposes only.                 | -                |
| `label`           | `string`                                                     | A descriptive label displayed above the input field.                                             | -                |

## Example

```tsx
import { useForm, FormProvider } from "react-hook-form";
import CurrencyInput from "./CurrencyInput";

interface CustomFormType {
  price: number;
}

function ExampleForm() {
  const methods = useForm<CustomFormType>({ defaultValues: { price: 1000.5 } });

  const onSubmit = (data: CustomFormType) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CurrencyInput
          id="price"
          initialValue={methods.formState.defaultValues?.price}
          rules={{ required: "Price is required", min: { value: 0, message: "Price must be at least 0." } }}
          decimalLength={2}
          decimalSeparator="."
          thousandSeparator=","
          currency="$"
          label="Price"
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

export default ExampleForm;

