'use client'
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

export default function Login() {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>();

  const signIn = async (formData: FormData) => {        

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;    

    if(email.length <= 0){
      setErrorMsg("Ingresa tu correo electrónico.");
      return;
    }

    if(password.length <= 0){
      setErrorMsg("Ingresa tu contraseña.");
      return;
    }

    setIsLoading(true);

    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      return toast.error("Verifica tus credenciales.");
    }

    return redirect("/dashboard");
  };

  const signUp = async (formData: FormData) => {    
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;    
    const supabase = createClientComponentClient();    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          full_name: name,
        }
      },
    });

    if (error) {
      console.log(error);
      return toast.error("Hubo un problema al crear tu cuenta.");
    }

    return toast("Revisa tu correo electrónico para continuar con el proceso de registro.");    
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link> */}
      

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >              
        <h1 className="font-semibold mb-4 text-xl self-center">Family OS</h1>
        <div className="mb-4">
          <Label htmlFor="name">Nombre Completo</Label>
          <Input type="text" id="name" placeholder="Ingresa tu nombre" name="name" />
        </div>       
        <div className="mb-4">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input type="email" id="email" placeholder="Ingresa tu correo electrónico" name="email" />
        </div>       
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input type="password" id="password" placeholder="Ingresa tu contraseña" name="password" />
        </div>
        {errorMsg ? <p className="text-red-500 text-xs">{errorMsg}</p> : null}
        <Button
        className="mt-4"
        disabled={isLoading}>
          {isLoading ? (
              <Loader2 className="h-4 w-full animate-spin" />) : null}
          {isLoading ? "" : "Iniciar sesión"}
          </Button>
        <Button 
        formAction={signUp}
        variant="secondary"
        >Registrarme</Button>
      </form>
    </div>
  );
}
