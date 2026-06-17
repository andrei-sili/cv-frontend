"use server";

export async function submitContact(
  _prevState: { status: string; message: string },
  formData: FormData
): Promise<{ status: string; message: string }> {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const res = await fetch("http://localhost:8080/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.status === 201) {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }
  if (res.status === 400) {
    return { status: "error", message: "Please check your input and try again." };
  }
  return { status: "error", message: "Something went wrong. Please try again later." };
}