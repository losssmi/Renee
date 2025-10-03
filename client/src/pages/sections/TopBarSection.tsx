import React from "react";
import { useQuery } from "@tanstack/react-query";

export const TopBarSection = (): JSX.Element => {
  const { data: user } = useQuery<{ id: number; email: string; username?: string }>({
    queryKey: ['/api/auth/user'],
  });

  const displayName = user?.username || user?.email?.split('@')[0] || 'User';

  return (
    <section className="px-6 py-5 bg-[#f5f5f5]">
      <div className="flex flex-col gap-2">
        <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#0f0f0f] text-lg tracking-[0] leading-[normal]">
          Good Morning, {displayName}.
        </h1>

        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new700 text-sm tracking-[0] leading-[21px]">
          Welcome back to Renegade, Here&apos;s your performance snapshot.
        </p>
      </div>
    </section>
  );
};
