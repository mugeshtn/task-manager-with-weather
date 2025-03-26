import { toast } from "react-toastify";

export const showToast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };