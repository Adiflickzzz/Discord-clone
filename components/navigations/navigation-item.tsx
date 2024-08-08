"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <div>
      <ActionTooltip side="right" align="center" label={name}>
        <button
          onClick={onClick}
          className="group relative flex items-center w-full"
        >
          <div
            className={cn(
              "group absolute left-0 bg-primary rounded-r-full transition-all w-[4px] duration-200 ease-in-out",
              params?.serverId !== id && "group-hover:h-[18px]",
              params?.serverId === id ? "h-[36px]" : "h-[8px]"
            )}
          />
          <div
            className={cn(
              "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden active:translate-y-[2px] active:duration-75 duration-200 ease-in-out",
              params?.serverId === id &&
                "bg-primary/10 text-primary rounded-[16px]"
            )}
          >
            <Image fill src={imageUrl} alt="channel" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
