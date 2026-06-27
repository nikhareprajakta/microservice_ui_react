import { useEffect } from "react";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
  NavLink,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "./context/auth-context";

export default function Login(){
  const actionData = useActionData();
 const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const from = sessionStorage.getItem("redirectPath") || "/home";

  useEffect(() => {
    if (actionData?.success) {
      loginSuccess(actionData.jwtToken, actionData.user);
      sessionStorage.removeItem("redirectPath");
      navigate(from);
    } else if (actionData?.errors) {
      toast.error(actionData.errors.message || "Login failed.");
    }
  }, [actionData]);

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

    return(
         <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="card-header">
          <a href="" class="link-dark text-center link-offset-2 link-opacity-100 link-opacity-50-hover">
            <h1 class="mb-0">
              <b>Admin</b>LTE
            </h1>
          </a>
        </div>
        <div className="card-body login-card-body">
          <p class="login-box-msg">Sign in to start your session</p>
         <Form action="" method="post" className="space-y-5">
            <div class="input-group mb-1">
              <div class="form-floating">
                  <label for="loginEmail" className="block text-sm font-medium text-gray-700">UserName</label>
             
                <input id="loginEmail" type="text"   autoComplete="username" name="username" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  />
               </div>
              <div class="input-group-text">
                <span class="bi bi-envelope"></span>
              </div>
            </div>
            <div class="input-group mb-1">
              <div class="form-floating">
                 <label for="loginPassword" className="block text-sm font-medium text-gray-700">Password</label>
             
                <input
                  id="loginPassword"
                  type="password"
                  name="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder=""
                />
                </div>
              <div class="input-group-text">
                <span class="bi bi-lock-fill"></span>
              </div>
            </div>
           
            <div class="row">
              <div class="col-8 d-inline-flex align-items-center">
                <div class="form-check">
                  <input
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="ml-2 text-sm text-gray-600" for="flexCheckDefault">
                    Remember Me
                  </label>
                </div>
              </div>
              
              <div class="col-4">
                <div class="d-grid gap-2">
                  <button type="submit"
                  disabled={isSubmitting}
                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {isSubmitting ? "Authenticating..." : "Login"}
                   </button>
                </div>
              </div>
    
            </div>
            
          </Form>
              <div class="social-auth-links text-center mb-3 d-grid gap-2">
            <p>- OR -</p>
            <NavLink to="/register" class="btn btn-primary">
              <i className="mt-6 text-center text-sm text-gray-600"></i> Register Here..
            </NavLink>
            <a href="#" class="btn btn-danger">
              <i className="mt-6 text-center text-sm text-gray-600"></i> Sign in using Google+
            </a>
          </div>
         
          <p class="mb-1">
            <a href="forgot-password.html" className="mt-6 text-center text-sm text-gray-600">I forgot my password</a>
          </p>
          <p class="mb-0">
            <a href="register.html" className="mt-6 text-center text-sm text-gray-600">
              Register a new membership
            </a>
          </p>
        </div>
       
      </div>
    </div>
    );
}
export async function loginAction({ request }) {
  const data = await request.formData();

  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const response = await apiClient.post("/auth/login", loginData, {
      headers: { "Content-Type": "application/json" }, // force JSON
    });
    console.log(response);
    const { message, user, jwtToken } = response.data;
    return { success: true, message, user, jwtToken };
  } catch (error) {
    console.log(error);
    if (error.response?.status === 401) {
      return {
        success: false,
        errors: { message: "Invalid username or password" },
      };
    }
    throw new Response(
      error.response?.data?.message ||
        error.message ||
        "Failed to login. Please try again.",
      { status: error.response?.status || 500 }
    );
  }
}