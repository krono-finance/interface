import { Toaster } from "react-hot-toast";

const ReactToaster = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#122c44",
          border: "1px solid #163954",
          color: "#f0f8ff",
        },
        success: {
          style: {
            color: "#2fd9a3",
          },
        },
        error: {
          style: {
            color: "#fcd94c",
          },
        },
      }}
    />
  );
};

export default ReactToaster;
