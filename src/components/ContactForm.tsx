"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions";

const initialState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input
        name="name"
        placeholder="Name"
        required
        className="border rounded px-3 py-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border rounded px-3 py-2"
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        rows={4}
        className="border rounded px-3 py-2"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-gray-900 text-white rounded px-4 py-2 disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Send"}
      </button>
      {state.status === "success" && (
        <p className="text-green-600 text-sm">{state.message}</p>
      )}
      {state.status === "error" && (
        <p className="text-red-600 text-sm">{state.message}</p>
      )}
    </form>
  );
}