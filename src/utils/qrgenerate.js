export function generateQr(res) {
  if (res.status === 200) {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const filename = "qrcode.pdf";
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
}
