import { useEffect, useState } from "react";
import { Mail, MessageSquare, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { contact, DeleteContact, GetContact } from "@/lib/actions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

const AdminContact = () => {
  const [messages, setMessages] = useState<contact[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await GetContact();
      if (Array.isArray(data)) {
        setMessages(data);
      }else {
        setMessages([])
      }
    };
    void loadMessages();
  }, []);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    setLoading(true);
    await DeleteContact(id);
    setMessages((prev) => prev.filter((item) => item.id !== id));
    setLoading(false);
  };

  return (
    <div className="space-y-10 text-slate-100">
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="border border-slate-800/80 bg-slate-950/95 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.65)] ring-1 ring-slate-700/70">
          <CardHeader className="space-y-3 p-8">
            <CardTitle className="text-3xl text-slate-100">Contact Messages</CardTitle>
            <CardDescription className="text-slate-400">
              Review incoming contact requests, respond to customers, and archive messages when complete.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-amber-500/15 px-4 py-2 text-sm font-semibold text-amber-300">
                Total messages: {messages.length}
              </span>
              <span className="rounded-full bg-slate-800/70 px-4 py-2 text-sm text-slate-300">
                Latest entries appear first
              </span>
            </div>
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6">
              <p className="text-slate-300 leading-7">
                This panel shows real contact inquiries from the site. Use the archive button to remove resolved conversations.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-800/80 bg-slate-900/95 p-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]">
          <CardHeader className="space-y-3 px-0 pb-4">
            <CardTitle className="text-2xl text-slate-100">Quick Actions</CardTitle>
            <CardDescription className="text-slate-400">
              Keep your inbox clean and focused on the latest outreach.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-4 text-slate-300">
            <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-sm">
                Use the delete button only after you have followed up with the sender.
              </p>
            </div>
            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-4 text-slate-100">
              <p className="text-sm font-semibold">Tip:</p>
              <p className="text-sm">Archive old messages to keep the contact board uncluttered.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {messages.length === 0 ? (
          <div className="col-span-full rounded-[2rem] border border-dashed border-slate-700/80 bg-slate-900/80 p-10 text-center text-slate-400">
            No contact messages available yet.
          </div>
        ) : (
          messages.map((message) => (
            <Card
              key={message.id}
              className="border border-slate-800/90 bg-slate-950/95 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)]"
            >
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-slate-100">{message.Subject}</CardTitle>
                    <CardDescription className="text-slate-400">From {message.Full_Name}</CardDescription>
                  </div>
                  <div className="rounded-2xl bg-slate-900/80 p-3 text-amber-400">
                    <Mail className="h-5 w-5" />
                  </div>
                </div>
                <div className="grid gap-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-amber-400" />
                    <span>{message.Full_Name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-amber-400" />
                    <span>{message.Email}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="border-t border-slate-800/90 px-6 py-6 text-slate-300">
                <p className="leading-7">{message.Message}</p>
              </CardContent>
              <div className="flex items-center justify-between gap-4 border-t border-slate-800/80 px-6 py-4">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Message ID {message.id ?? "—"}</span>
                <AlertDialog>
                 <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="rounded-full bg-rose-500 px-4 py-2 text-white hover:bg-rose-400">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the contact message.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => void handleDelete(message.id)}
                        disabled={loading}
                        className="bg-rose-500 text-white hover:bg-rose-400"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminContact