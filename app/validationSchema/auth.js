
import * as Yup from "yup";

// Define the validation schema
const loginSchema = Yup.object({
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

// Export a hook for validation
const useLoginValidation = () => {
  return useForm({
    resolver: yupResolver(loginSchema),
  });
};

export default useLoginValidation;

const signUpValidation=Yup.object({
    name:Yup.string().required("Name is required").min(2,"must be more that 2 characters"),
    email: Yup.string().email("Please enter a valid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirm_password:Yup.string().required("Confirm your password").oneOf([Yup.ref('password')],"Entered Password is not matched")
})
const useSignupValidation=()=>{
    return useForm({
       resolver:yupResolver(signUpValidation)
    })
}
export {useSignupValidation};