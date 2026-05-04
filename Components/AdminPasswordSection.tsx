"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { ChangePassword } from "@/lib/actions";
import AdminPasswordCard from "./AdminPasswordCard";
import SectionHeader from "./SectionHeader";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

export default function AdminPasswordSection() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    await ChangePassword(oldPassword, newPassword, setSubmitting, router);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        subtitle="Admin security"
        title="Update the admin password safely"
        description="This dedicated password section keeps credentials separate from content management and makes your admin dashboard more secure."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] items-center">
        <Card className="border border-slate-800/70 bg-slate-950/95 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.35)] ring-1 ring-slate-700/80">
          <CardHeader>
            <CardTitle className="text-slate-100">Password controls</CardTitle>
            <CardDescription className="text-slate-400">
              Change passwords regularly and keep admin access limited to trusted team members.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-slate-300">
            <div className="rounded-3xl border border-slate-800/90 bg-slate-900/95 p-5 shadow-lg shadow-slate-950/20">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
                  <Icon icon="mdi:shield-lock-outline" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Strong admin password</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Use a complex password with numbers, letters, and symbols. Avoid reusing passwords from other accounts.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-3 rounded-3xl border border-slate-800/90 bg-slate-900/95 p-4 text-slate-300">
                <Icon icon="mdi:check-decagram" className="h-5 w-5 text-amber-400" />
                <span>Passwords must be at least 8 characters long.</span>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-800/90 bg-slate-900/95 p-4 text-slate-300">
                <Icon icon="mdi:account-key-outline" className="h-5 w-5 text-amber-400" />
                <span>Admin area updates are authenticated and logged.</span>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-800/90 bg-slate-900/95 p-4 text-slate-300">
                <Icon icon="mdi:shield-check" className="h-5 w-5 text-amber-400" />
                <span>Keep your password secret and only share access with trusted administrators.</span>
              </div>
            </div>
            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Security tip</Badge>
                <span>Update your password whenever a team member leaves or if there is suspicious activity.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <AdminPasswordCard
          oldPassword={oldPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          onOldPasswordChange={setOldPassword}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={handlePasswordChange}
          submitting={submitting}
        />
      </div>
    </div>
  );
}
