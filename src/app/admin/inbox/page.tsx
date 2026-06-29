"use client";

import { Inbox } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";

export default function InboxPage() {
  return (
    <AdminChrome title="Inbox">
      <div className="mx-auto max-w-xl rounded-lg border border-[#E4DAC9] bg-white p-10 text-center">
        <Inbox size={28} className="mx-auto text-[#b6a890]" />
        <h2 className="mt-3 text-lg font-semibold">Contact requests land here</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#5a5246]">
          Every message sent through the site contact form will appear here with name, email,
          subject, type, the related piece, and a status (New / Replied / Waiting / Closed) so you
          can reply, add to a customer note, feed the concierge, or put a piece on hold.
        </p>
        <p className="mt-4 inline-block rounded-full bg-[#F5EFE6] px-3 py-1 text-xs text-[#7a5c12]">
          Turning on next — needs the database key wired
        </p>
      </div>
    </AdminChrome>
  );
}
