'use client'

import { Database, Tables } from "@/types/supabase";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { themes } from "@/lib/themes";
import { useConfig } from "../hooks/use-config";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";


export default  function Dashboard(){

    const [ user, setUser ] = useState<User | null>();
    const [profileData, setProfileData] = useState<Tables<'profiles'>>();
    const supabase = createClientComponentClient<Database>()
    

    const fetchProfile = async () => {            
        const {
        data: { user },
        } = await supabase.auth.getUser();
    
        const { data, error } = await supabase
        .from
        ('profiles')
        .select()
        .eq('id', user?.id as string)
        .single();
        
        const profileData: Tables<'profiles'> = data as Tables<'profiles'>; 
        setProfileData(profileData);
        setUser(user);

        if(profileData?.family_id === null || profileData?.family_id === undefined ){
        return redirect("/dashboard/join-family");
        }
    }

    useEffect(() => {
        fetchProfile();
      }
    ,[])

    const chartData = [
        {
          revenue: 10400,
          subscription: 240,
        },
        {
          revenue: 14405,
          subscription: 300,
        },
        {
          revenue: 9400,
          subscription: 200,
        },
        {
          revenue: 8200,
          subscription: 278,
        },
        {
          revenue: 7000,
          subscription: 189,
        },
        {
          revenue: 9600,
          subscription: 239,
        },
        {
          revenue: 11244,
          subscription: 278,
        },
        {
          revenue: 26475,
          subscription: 189,
        },
      ]
    
    const { theme: mode } = useTheme()
    const [config] = useConfig()
    const theme = themes.find((theme) => theme.name === config.theme)
    const [date, setDate] = useState<Date | undefined>(new Date())
    
    return <>
    <h1 className="font-medium text-2xl">Bienvenido/a de nuevo  {profileData?.name}</h1>
    <div className="flex w-full gap-4 mt-10">
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Gastos totales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$15,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% del mes pasado
          </p>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="revenue"
                  activeDot={{
                    r: 6,
                    style: { fill: "var(--theme-primary)", opacity: 0.25 },
                  }}
                  style={
                    {
                      stroke: "var(--theme-primary)",
                      "--theme-primary": `hsl(${
                        theme?.cssVars[mode === "dark" ? "dark" : "light"]
                          .primary
                      })`,
                    } as React.CSSProperties
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
      <CardHeader>
        <CardTitle>Miembros</CardTitle>
        <CardDescription>
          Estás son las personas que pertenecen a tu familia.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">            
            <div>
              <p className="text-sm font-medium leading-none">{profileData?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>          
          <Button variant="outline" size="sm" className="ml-auto">
            Admin{" "}                
          </Button>
        </div>
        <div className="flex items-center justify-between space-x-4">
         <div className="flex items-center space-x-4">            
            <div>
              <p className="text-sm font-medium leading-none">Sin asignar</p>
              <p className="text-sm text-muted-foreground">Invita a alguien</p>
            </div>
          </div>          
          <Button variant="outline" size="sm" className="ml-auto">
            Invitar{" "}                
          </Button>
        </div>
        <div className="flex items-center justify-between space-x-4">
         <div className="flex items-center space-x-4">            
            <div>
              <p className="text-sm font-medium leading-none">Sin asignar</p>
              <p className="text-sm text-muted-foreground">Invita a alguien</p>
            </div>
          </div>          
          <Button variant="outline" size="sm" className="ml-auto">
            Invitar{" "}                
          </Button>
        </div>
        <div className="flex items-center justify-between space-x-4">
         <div className="flex items-center space-x-4">            
            <div>
              <p className="text-sm font-medium leading-none">Sin asignar</p>
              <p className="text-sm text-muted-foreground">Invita a alguien</p>
            </div>
          </div>          
          <Button variant="outline" size="sm" className="ml-auto">
            Invitar{" "}                
          </Button>
        </div>
      </CardContent>
    </Card>
    <Card>
        <CardHeader>
        <CardTitle>Calendario</CardTitle>
        </CardHeader>
        <CardContent>
        <Calendar
            mode="single"            
            selected={date}
            onSelect={setDate}
            className="p-0"/>
        </CardContent>
    </Card>
    </div>
    </>
}