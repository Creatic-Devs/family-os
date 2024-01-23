
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Navbar from "./components/navbar";
import { Button } from "@/components/ui/button";
import { Bill, Logout, Profile, Setting2 } from "iconsax-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ModeToggle } from "./components/mode-toggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <>
    <div className="h-screen w-full overflow-x-hidden">
      <div className="flex">
        <div className="flex-none fixed">
          <Navbar/>
        </div>
        <div className="flex flex-col pl-64 w-full">
          <div className="flex border-b dark:border-zinc-800 w-full py-2">
          <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-auto mr-2">
          <Button variant="ghost" size="icon">
            <Setting2 className="h-4 w-4" />
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="hover:cursor-pointer">
                <Profile className="mr-2 h-4 w-4" />
                <span>Mi cuenta</span>  
                </Link>          
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/history" className="hover:cursor-pointer">
                <Bill className="mr-2 h-4 w-4" />
                <span>Planes</span>    
                </Link>        
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form action={signOut}>
            <DropdownMenuItem>
              <Button variant='ghost' className="m-0 p-0">
                <Logout className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </Button>
            </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle/>
          </div>
          <div className="p-20">
          {children}
          </div>
        </div>
      </div>
    </div>    
    </>
  );  
}
