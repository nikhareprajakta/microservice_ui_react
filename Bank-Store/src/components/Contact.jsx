import { Form } from "react-router-dom";
import PageHeading from "./PageHeading";
import apiClient from "../api/apiClient";
import { Navigate, useActionData,
  useNavigation ,useSubmit,useLoaderData
} from "react-router-dom";
import { useEffect,useRef } from "react";
import { toast } from "react-toastify";
export default function Contact(){
   const contactInfo = useLoaderData();
 const formRef = useRef(null);
  const actionData = useActionData();
 const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
const submit = useSubmit();
  useEffect(() => {
      if (actionData?.success) {
         formRef.current?.reset();
        toast.success("Your message has been submitted successfully!");
      } else if (actionData?.errors) {
        //toast.error(actionData.errors.message || "Submission failed.");
      }
    }, [actionData]);

    const handleSubmit = (event) => {
   // event.preventDefault();
    const formData = new FormData(formRef.current);
   const userConfirmed = window.confirm(
      "Are you sure you want to submit the form?"
    );

    if(userConfirmed){
    submit(formData, { method: "post" });
    }
  };
    return(
<div className="max-w-[1152px] mx-auto px-1 py-1">
             <PageHeading title="Contact Us !">
               We'd love to hear from you! If you have any questions, feedback or suggetions, please don't hesitate to reach out.
             </PageHeading>
<div className="grid grid-cols-12 gap-4">
  <div className="bg-white shadow border-2 rounded-lg p-4 col-span-4">
    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <ul className="space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Phone:</span> {contactInfo.phone} 
          </li>
          <li>
            <span className="font-semibold">Email:</span> {contactInfo.email} 
          </li>
          <li>
            <span className="font-semibold">Address:</span> {contactInfo.address} 
          </li>
        </ul>
  </div>
  <div className="bg-white shadow-md border-2 rounded-lg p-4 col-span-8">
        <Form ref={formRef} className="space-y-4" method="Post">
         
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Full Name" name="name"
            />
             {actionData?.errors?.name && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.name}
              </p>
            )}
          </div>
           <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Email Address" name="email"
            />
             {actionData?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.email}
              </p>
            )}
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Mobile number" name="mobileNumber"
            />
             {actionData?.errors?.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.mobileNumber}
              </p>
            )}
          </div></div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
           <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Your Message"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              minLength={5}
              maxLength={500}
            ></textarea>
            {actionData?.errors?.message && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.message}
              </p>
            )}
          </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 h-fit rounded-md hover:bg-blue-700 txt-center" 
            >
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
        </Form>
    </div>
  
</div>


</div>
        
    );
}

export async function contactAction({ request }) {
  const data = await request.formData();

  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    message: data.get("message")
  };

  try {
    const response = await apiClient.post("accounts/contact/save_contact_details", contactData, {
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
        errors: { message: "Invalid Contact details" },
      };
    }
     if (error.response?.status === 400) {
      console.log(error.response?.data);
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.message ||
        error.message ||
        "Failed to login. Please try again.",
      { status: error.response?.status || 500 }
    );
  }
}


export async function contactLoader({ request }) {
 

  try {
    const response = await apiClient.get("accounts/contact/contact_details");
    console.log(response.data);
    return  response.data ;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}