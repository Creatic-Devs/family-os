import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function JoinFamily(){

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
      } = await supabase.auth.getUser();
            
      const { data, error } = await supabase
      .from
      ('profiles')
      .select()
      .eq('id', user?.id)
      .single();
      
      const profileData: Tables<'profiles'> = data as Tables<'profiles'>; 

    return (
        <>        
        <div className="bg-gray-50 p-10 rounded-xl">
        <h1 className="text-2xl font-semibold mb-2">Join or create a family</h1>
        <p>To start using FamilyOS, you can either join an existing family or create a new one. Joining a family allows you to connect and collaborate with your loved ones, while creating a family gives you the opportunity to bring your family members together on a single platform.</p>
        <p className="font-semibold mt-2">Things to take in mind</p>        
        <p>To join a family, an administrator should invite you.</p>
        <p>To create a family, you must be an administrator.</p>
        {profileData?.role === 'admin' ? (
            <>
            <Dialog>
            <DialogTrigger asChild>                
                <Button className="mt-6" size='lg'>Create new</Button>                
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Family Name</DialogTitle>
                <DialogDescription>
                    Add the name of your family.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label >
                        Name
                    </Label>
                    <Input id="name" value="" className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                <Button type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>            
            </>
        ): null}
        </div>
        
        </>
    );
}