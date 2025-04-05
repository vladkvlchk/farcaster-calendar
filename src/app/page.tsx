"use client";

import { SignInButton, useProfile } from "@farcaster/auth-kit";

export default function FrameUserInfo() {
  const { isAuthenticated, profile } = useProfile();

  console.log(profile);

  return (
    <div>
      {!isAuthenticated && (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <div className="text-2xl text-black mb-2">Please sign in</div>
          <SignInButton />
        </div>
      )}
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="">
          {isAuthenticated ? (
            <p>
              Hello {profile.username}! Your fid is {profile.fid}
            </p>
          ) : (
            <p>You're not signed in</p>
          )}
        </div>
      </div>
    </div>
  );
}
