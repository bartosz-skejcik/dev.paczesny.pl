import { readUserSession } from "@/lib/actions";
import { getUserProfile } from "@/lib/supabase/server";
import { dashboardConfig } from "@/config/dashboard";
import {
    SidebarDropdown,
    SidebarItem,
} from "@/components/dashboard/sidebar-item";
type Props = {};

async function Sidebar({}: Props) {
    const { data } = await readUserSession();
    const profile = await getUserProfile(data.session!.user.email!);
    return (
        <div className="w-1/6 h-screen bg-white/5 p-4 flex flex-col items-start justify-start gapy-2">
            {profile.role === "admin"
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
    );
}

export default Sidebar;
