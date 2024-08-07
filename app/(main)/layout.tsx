import { NavigationSidebar } from "@/components/navigations/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <div className="flex w-[70px] z-30 flex-col fixed inset-y-0">
        <div className="h-full custom-show">
          <NavigationSidebar />
        </div>
      </div>
      <main className="md:pl-[70px] h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
