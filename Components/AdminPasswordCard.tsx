"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface AdminPasswordCardProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  onOldPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
}

export default function AdminPasswordCard({
  oldPassword,
  newPassword,
  confirmPassword,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  submitting,
}: AdminPasswordCardProps) {
  return (
    <Card className="border border-slate-800/70 bg-slate-950/90 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.32)] ring-1 ring-slate-700/80 h-fit">
      <CardHeader>
        <CardTitle className="text-slate-100">Secure Admin Password</CardTitle>
        <CardDescription className="text-slate-400">Update your admin credentials safely.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          className="flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="old-password">Old Password</Label>
            <Input
              id="old-password"
              type="password"
              value={oldPassword}
              onChange={(event) => onOldPasswordChange(event.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) => onNewPasswordChange(event.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => onConfirmPasswordChange(event.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <div className="md:col-span-3 flex justify-center">
            <Button type="submit" variant="secondary" className="rounded-full px-8 cursor-pointer">
              {submitting ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
