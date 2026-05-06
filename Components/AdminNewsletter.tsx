"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  CreateNewsletterIssue,
  DeleteNewsletterSubscriber,
  GetNewsletterIssues,
  GetNewsletterSubscribers,
  newsletterIssue,
  newsletterSubscriber,
} from "@/lib/actions";
import { Badge } from "./ui/badge";
import { Trash2 } from "lucide-react";

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState<newsletterSubscriber[]>([]);
  const [issues, setIssues] = useState<newsletterIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    content: "",
  });

  const loadData = async () => {
    const [subscribersData, issuesData] = await Promise.all([
      GetNewsletterSubscribers(),
      GetNewsletterIssues(),
    ]);
    if (Array.isArray(subscribersData)) {
      setSubscribers(subscribersData);
    }
    if (Array.isArray(issuesData)) {
      setIssues(issuesData);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  return (
    <div className="space-y-8">
      <Card className="border border-slate-800/80 bg-slate-950/95">
        <CardHeader>
          <CardTitle className="text-slate-100">Newsletter Admin</CardTitle>
          <CardDescription className="text-slate-400">
            Manage subscribers, post newsletters to all active subscribers, and view sent history.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border border-slate-800/80 bg-slate-950/95">
          <CardHeader>
            <CardTitle className="text-slate-100">Subscribers</CardTitle>
            <CardDescription className="text-slate-400">
              Emails collected from footer newsletter form.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {subscribers.length ? (
              subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-3"
                >
                  <div>
                    <p className="text-sm text-slate-100">{subscriber.email}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(subscriber.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={subscriber.is_active ? "secondary" : "outline"}>
                      {subscriber.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-300 hover:text-red-200"
                      onClick={async () => {
                        await DeleteNewsletterSubscriber(subscriber.id);
                        await loadData();
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No newsletter subscribers yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border border-slate-800/80 bg-slate-950/95">
          <CardHeader>
            <CardTitle className="text-slate-100">Post Newsletter</CardTitle>
            <CardDescription className="text-slate-400">
              Create a newsletter post that is sent to all active subscribers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const result = await CreateNewsletterIssue(formData, setLoading);
                if (result) {
                  setFormData({ title: "", subject: "", content: "" });
                  await loadData();
                }
              }}
            >
              <input
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Title"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
              <input
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="Email subject"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
              <textarea
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Newsletter content"
                rows={8}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
              <Button type="submit" className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400">
                {loading ? "Posting..." : "Post Newsletter"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-slate-800/80 bg-slate-950/95">
        <CardHeader>
          <CardTitle className="text-slate-100">Posted Newsletters</CardTitle>
          <CardDescription className="text-slate-400">
            History of all newsletter posts published from this portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {issues.length ? (
            issues.map((issue) => (
              <div key={issue.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-slate-100">{issue.title}</h4>
                  <Badge variant="secondary">{issue.recipients_count} recipients</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-400">{issue.subject}</p>
                <p className="mt-3 text-sm text-slate-300 whitespace-pre-wrap">{issue.content}</p>
                <p className="mt-3 text-xs text-slate-500">
                  {new Date(issue.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No newsletters posted yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNewsletter;
