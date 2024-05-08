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
        <form action={handleSignout} className="w-1/6 h-screen ">
            <aside className="w-full h-full dark:bg-white/5 bg-black/5 p-4 flex flex-col items-center justify-between border-r border-foreground-200">
                <div className="flex flex-col w-full flex-1 items-start justify-start">
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
                        : dashboardConfig.sidebar.client.map((item, idx) => {
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
                          })}
                </div>
                <Button type="submit" variant="flat" color="warning" fullWidth>
                    Logout
                </Button>
            </aside>
        </form>
    );
}

export default Sidebar;
