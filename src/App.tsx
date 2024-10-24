import { useState } from "react";
import "./App.css";
import { FormProvider, useForm } from "react-hook-form";
import CurrencyInput from "./Components/CurrencyInput";
interface FormType {
  price: number;
}
function App() {
  const [initialValues] = useState<FormType>({
    price: 1532.31,
  });
  const methods = useForm<FormType>({ defaultValues: initialValues });
  const onSubmit = async (values: FormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="container mt-3"
      >
        <div className="d-md-flex justify-content-between mb-3">
          <div>
            <CurrencyInput
              id="price"
              initialValue={methods.formState.defaultValues?.price}
              label="Price"
              rules={{
                required: "Price is required",
                min: { value: 0, message: "Price must be at least 0." },
                max: { value: 5000, message: "Price must not exceed 5000." },
              }}
              decimalLength={2}
              decimalSeparator="."
              thousandSeparator=","
              currency="₺"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={methods.formState.isSubmitting}
        >
          {methods.formState.isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm mr-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="ps-2">Submitting...</span>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </FormProvider>
  );
}

export default App;
