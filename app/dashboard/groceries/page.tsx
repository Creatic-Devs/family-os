'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database, Tables } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ShoppingBag } from "iconsax-react";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";


export default function Groceries(){

    const supabase = createClientComponentClient<Database>();
    const [groceries, setGroceries] = useState<Tables<'groceries'>[]>([]);
    const [profileData, setProfileData] = useState<Tables<'profiles'>>();
    const [status, setStatus] = useState('loading');

    const fetchGroceries = async () => {
        setStatus('loading');
        const {
            data: { user },
            } = await supabase.auth.getUser();

        const { data: profile } = await supabase
            .from
            ('profiles')
            .select()
            .eq('id', user?.id as string)
            .single();
        
        const profileData: Tables<'profiles'> = profile as Tables<'profiles'>; 
        setProfileData(profileData);
        
        const { data:groceries, error } = await supabase
            .from
            ('groceries')
            .select('*')
            .eq('family_id', profileData?.family_id!);

        if(error){
            console.log('Error on query groceries', error);
        }
        
        const groceriesData: Tables<'groceries'>[] = groceries as Tables<'groceries'>[];
        setGroceries(groceriesData);
        setStatus('ready');
    }

    const createGrocery = async (grocery: Database['public']['Tables']['groceries']['Insert']) => {
        setStatus('loading');
        let groceryData: Database['public']['Tables']['groceries']['Insert'] = {
            ...grocery,
            family_id: profileData?.family_id,
        }        

        const { error } = await supabase
            .from
            ('groceries')
            .insert(groceryData);
        if(error){
            setStatus('ready');
            toast.error('Error al agregar el producto a la despensa.');
            return console.log('Error on create grocery', error);
        }
        
        await fetchGroceries();
        setStatus('ready');
        toast.success('Producto agregado a la despensa.');
    }

    useEffect(() => {
        fetchGroceries();
    }
    ,[]);

    return <>
        {status === 'loading' && <div className="flex items-center justify-center mt-72">
            <div className="p-4 bg-accent rounded-lg flex">
                <Loader2 className="stroke-1 animate-spin mr-2" />
                <p>Cargando</p>
            </div>
        </div>}
        {status === 'ready' && groceries.length > 0 && withData()}
        {status === 'ready' && groceries.length === 0 && emptyState()}
    </>

    function withData() {
        return <div className="container mx-auto">
         <h1 className="font-semibold text-2xl">Despensa familiar</h1>
         <p className="text-muted-foreground">Visualiza toda la despensa de la familia.</p>
         <DataTable columns={columns} data={groceries} handleSave={(newGrocery)=>{
            createGrocery(newGrocery);
         }} />
        </div>
    }

    function emptyState() {
        return <div className="border border-dashed shadow-sm rounded-lg flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center py-20">
                <div className="p-4 bg-accent rounded-full">
                    <ShoppingBag size={48} />
                </div>
                <h3 className="font-bold text-2xl tracking-tight mt-4">¿Despensa vacía?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Comienza a agregar despensa para tu familia.</p>
                <Dialog>
                    <DialogTrigger asChild>
                    <Button className="mt-8">Agregar despensa</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Nuevo producto</DialogTitle>
                        <DialogDescription>
                            Ingresa los datos del producto. Presiona guardar cuando hayas terminado.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                            Cantidad
                            </Label>
                            <Input id="quantity" name="quantity" type="number" value={1} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Nombre del producto
                            </Label>
                            <Input id="name" name="name" placeholder="Ej. Banana" type="text" className="col-span-3" />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Guardar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>                
            </div>
        </div>;
    }
}