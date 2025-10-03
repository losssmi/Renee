import React from "react";

export const TopBarSection = (): JSX.Element => {
  return (
    <section className="px-6 py-5 bg-[#f5f5f5]">
      <div className="flex flex-col gap-2">
        <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#0f0f0f] text-lg tracking-[0] leading-[normal]">
          Good Morning, Antoine.
        </h1>

        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-new700 text-sm tracking-[0] leading-[21px]">
          Welcome back to Renegade, Here&apos;s your performance snapshot.
        </p>
      </div>
    </section>
  );
};
