import { ApiClient, User } from "@asfilab/janun-client";

export default async function checkLogin() {
  try {
    const apiUrl = "http://localhost:5000";
    const token = localStorage.getItem("token") || "";
    const apiClient = new ApiClient(apiUrl, token);
    const response = await apiClient.hello.testUser();
    // setResponse(response);
    // console.log(response);
    return response == "Hello, Stranger!" ? false : true;
  } catch (error) {
    console.error("Error fetching data:", error);
    // setResponse("error!"); // or any other error handling logic
    return false;
  }
}
