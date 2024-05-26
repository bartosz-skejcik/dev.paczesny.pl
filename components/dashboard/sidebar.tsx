import { readUserSession } from "@/lib/actions";
import {
    createSupabaseServerClientReadOnly,
    getUserProfile,
} from "@/lib/supabase/server";
import { dashboardConfig } from "@/config/dashboard";
import {
    SidebarDropdown,
    SidebarItem,
} from "@/components/dashboard/sidebar-item";
import { Button } from "@nextui-org/button";

import { Bell, Package2 } from "lucide-react";
import Link from "next/link";

type Props = {};

async function Sidebar({}: Props) {
    const { data } = await readUserSession();
    const profile = await getUserProfile(data.session!.user.email!);

    const handleSignout = async (e: FormData) => {
        "use server";

        console.log("signing out");

        const supabase = await createSupabaseServerClientReadOnly();

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error(error);
        }
    };

    return (
        <form
            className="hidden border-r border-foreground-200 bg-foreground-50 md:block"
            action={handleSignout}
        >
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b border-foreground-200 px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        {/* <Package2 className="h-6 w-6" /> */}
                        <span className="">dev.paczesny</span>
                    </Link>
                    {/* <Button
                        variant="bordered"
                        isIconOnly
                        className="ml-auto h-8 w-8"
                        startContent={<Bell className="h-4 w-4" />}
                    >
                        <span className="sr-only">Toggle notifications</span>
                    </Button> */}
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {profile.user_roles?.role === "admin"
                            ? dashboardConfig.sidebar.admin.map((item, idx) => {
                                  return item.href ? (
                                      <SidebarItem
                                          label={item.label}
                                          icon={item.icon}
                                          href={item.href!}
                                          key={idx}
                                      />
                                  ) : (
                                      <SidebarDropdown
                                          label={item.label}
                                          icon={item.icon}
                                          items={item.items!}
                                          key={idx}
                                      />
                                  );
                              })
                            : dashboardConfig.sidebar.client.map(
                                  (item, idx) => {
                                      return item.href ? (
                                          <SidebarItem
                                              label={item.label}
                                              icon={item.icon}
                                              href={item.href!}
                                              key={idx}
                                          />
                                      ) : (
                                          <SidebarDropdown
                                              label={item.label}
                                              icon={item.icon}
                                              items={item.items!}
                                              key={idx}
                                          />
                                      );
                                  }
                              )}
                    </nav>
                </div>
                {/* //! BOTTOM ELEMENT OF THE SIDENAV */}
                <div className="mt-auto p-4">
                    {/* <Card x-chunk="dashboard-02-chunk-0">
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <h1>Upgrade to Pro</h1>
                                <p>
                                    Unlock all features and get unlimited access
                                    to our support team.
                                </p>
                            </CardHeader>
                            <CardBody className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardBody>
                        </Card> */}
                    <Button variant="bordered" className="w-full" type="submit">
                        Sign out
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default Sidebar;
