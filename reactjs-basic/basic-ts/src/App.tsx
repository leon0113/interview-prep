/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormFields = z.infer<typeof schema>;

// type FormFields = {
//   email: string;
//   password: string;
// };

function App() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@gmail.com",
      password: "12345678"
    },
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "Wrong credentials"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          // required: "Email is required",
          // validate: (value) => {
          //   if (!value.includes("@")) {
          //     return "Email must include @"
          //   }
          //   return true;
          // }
          // pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        })}
        type="text"
        placeholder="Email"
      />
      {errors.email && <small>{errors.email.message}</small>}
      <input
        {...register("password", {
          // required: "Password is required",
          // minLength: 8
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <small>{errors.password.message}</small>}
      <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading" : "Submit"}</button>
      {errors.root && <small>{errors.root.message}</small>}
    </form>
  )
}

export default App