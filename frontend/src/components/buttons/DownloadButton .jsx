
import axiosClient from "../../axiosClient";

const DownloadButton = ({ expenses }) => {
  const handleDownload = async () => {
    try {
      const response = await axiosClient.post(
        "http://localhost:8000/api/download-expenses",
        { expenses },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("PDF download failed:", err);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
};

export default DownloadButton;
