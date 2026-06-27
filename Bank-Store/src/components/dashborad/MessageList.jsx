import PageTitle from "../PageTitle";
import { useLoaderData } from "react-router-dom";
 export default function MessageList(){
   const messageList = useLoaderData();
    return(
<div className="max-w-[1152px] mx-auto px-1 py-100">
             <PageTitle title="Message List !" />
            
<div className="grid grid-cols-12 ">
    <table className="table-auto  bg-white border border-gray-300 w-[1152px]">
        <thead className="bg-pink-500 text-white">
            <tr>
                <th class="border border-gray-300 px-4 py-2">
                  Name
                  </th>
                <th class="border border-gray-300 px-4 py-2">
                  Email
                  </th>
                <th class="border border-gray-300 px-4 py-2">
                  Mobile Number
                  </th>
                    <th class="border border-gray-300 px-4 py-2">
                  Message
                  </th>
                    <th class="border border-gray-300 px-4 py-2">
                  Status
                  </th>
                   <th class="border border-gray-300 px-4 py-2">
                  Action
                  </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="border border-gray-300 px-4 py-2">
                      Shiv
                  </td>
                <td class="border border-gray-300 px-4 py-2">
                      1
                  </td>
                <td class="border border-gray-300 px-4 py-2">
                      Noida
                  </td>
            </tr>
            <tr>
                <td class="border border-gray-300 px-4 py-2">
                      Krishn
                  </td>
                <td class="border border-gray-300 px-4 py-2">
                      2
                  </td>
                <td class="border border-gray-300 px-4 py-2">
                      Noida
                  </td>
            </tr>
            <tr>
                <td class="border border-gray-300 px-4 py-2">
                      Ram
                  </td>
                <td class="border border-gray-300 px-4 py-2">
                      3
                  </td>
                <td class="border border-gray-300 px-4 py-2">
                      Noida
                  </td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
    
    );
}



export async function messageListLoader({ request }) {
  const data = await request.formData();

  const contactData = {
    status: "PENDING"
  };

  try {
    const response = await apiClient.post("accounts/admin/message-list", contactData, {
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
