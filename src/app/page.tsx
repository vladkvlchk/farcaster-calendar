"use client";

import { useProfile } from "@farcaster/auth-kit";
import { Button } from "@/components/ui/button";
import { sdk } from "@farcaster/frame-sdk";
import { CalendarDays, LogIn } from "lucide-react";
import { useState } from "react";

export default function FrameUserInfo() {
  const { isAuthenticated, profile } = useProfile();
  const [copySuccess, setCopySuccess] = useState<string>("");

  // Function to generate schedule text
  const generateScheduleText = (): string => {
    return (
      `📅 Check out my availability for meetings and calls!\n\n` +
      `Monday: 9AM - 12PM\n` +
      `Tuesday: 2PM - 5PM\n` +
      `Wednesday: 10AM - 3PM\n` +
      `Thursday: 1PM - 4PM\n` +
      `Friday: 9AM - 1PM\n\n` +
      `Book a slot at https://farcaster-calendar.vercel.app/${profile?.fid}`
    );
  };

  // Function to handle sign-in using sdk
  const signIn = async () => {
    try {
      await sdk.actions.signIn({
        nonce: Math.random() + "ddf",
      });
      console.log("Signed in successfully!");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Function to handle sharing schedule via SDK and copy text manually
  const shareSchedule = async () => {
    try {
      const scheduleText = generateScheduleText();

      try {
        //@ts-ignore
        await sdk.actions.composeCast({
          text: scheduleText,
        });
      } catch (e) {}

      // Copy the schedule text to clipboard so user can manually post it
      await navigator.clipboard.writeText(scheduleText);
      setCopySuccess("Schedule text copied to clipboard!");
      console.log("Schedule text copied successfully!");
    } catch (error) {
      console.error("Error sharing schedule:", error);
      setCopySuccess("Failed to copy schedule text.");
    }
  };

  if (!isAuthenticated)
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-black mb-2">Please sign in</div>
        <Button onClick={signIn} className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </div>
    );

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <Button onClick={shareSchedule} className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4" />
        Share my schedule
      </Button>
      {copySuccess && <p className="text-green-600">{copySuccess}</p>}
      <p className="max-w-md text-center text-sm text-muted-foreground">
        You can now paste the copied schedule text manually wherever you want.
      </p>
    </div>
  );
}
