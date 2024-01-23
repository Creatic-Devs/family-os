import { Home, MenuBoard, Setting2, ShoppingBag } from "iconsax-react";

import NavItem from "./nav-item";
import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Navbar({ }) {  
  const headersList = headers();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  const isActive = (route: string) => {
    return headersList.get("x-pathname") === route;
  };
  return (
    <>
      <aside
        id="sidebar"
        className="left-0 top-0 z-40 h-screen w-64 transition-transform"
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 px-3 py-4 dark:border-zinc-800">
          <div className="flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
            <p className="font-semibold">FamilyOS</p>
            {/* <Image
              src={process.env.ISSUER_LOGO_URL || ""}
              alt="Girasol Logo"
              width={116}
              height={26}
            /> */}
          </div>
          <hr className="border-[#EFEFFC] dark:border-zinc-800 border-[0.5px]" />
          <ul className="space-y-2 text-sm font-medium mt-2">
          <NavItem
            href="/dashboard"
            isActive={isActive("/dashboard")}
            icon={<Home variant={isActive("/dashboard") ? "Linear" : "Outline"} />}
            text="Inicio"
          />

          <NavItem
            href="/dashboard/groceries"
            isActive={isActive("/dashboard/groceries")}
            icon={<ShoppingBag variant={isActive("/dashboard/groceries") ? "Bold" : "Outline"} />}
            text="Despensa"
          />

          <NavItem
            href="/dashboard/food_menu"
            isActive={isActive("/dashboard/food_menu")}
            icon={<MenuBoard variant={isActive("/dashboard/food_menu") ? "Bold" : "Outline"} />}
            text="Menús"
          />
          </ul>
          <div className="mt-auto flex">
            <div className="flex w-full space-x-2">
              <div className="flex flex-col">                           
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
