import RegisterForm from "../components/registerForm/RegisterForm";

function Register() {
    localStorage.clear()
    return (
      <div>
        <RegisterForm />
      </div>
    );
}

export default Register