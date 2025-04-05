"use client";

import { SignInButton, useProfile } from "@farcaster/auth-kit";

export default function FrameUserInfo() {
  const {
    isAuthenticated,
    profile: { username, fid },
  } = useProfile();

  return (
    <div>
      <SignInButton />
      <div>
        {isAuthenticated ? (
          <p>
            Hello {username} Your fid is {fid}
          </p>
        ) : (
          <p>Youre not signed in</p>
        )}
      </div>
    </div>
  );
}
