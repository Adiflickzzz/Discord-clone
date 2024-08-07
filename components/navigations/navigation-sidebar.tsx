import { currentProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { NavigationAction } from "@/components/navigations/navigation-action";
import { NavigationItem } from "@/components/navigations/navigation-item";

import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 py-3 flex flex-col items-center h-full text-primary w-full border-r shadow-md dark:bg-[#1E1F22] ">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-200 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 h-full w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-3">
        <div className="w-full flex justify-center">
          <ModeToggle />
        </div>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[46px] w-[46px]",
            },
          }}
        />
      </div>
    </div>
  );
};
