"use client"
import { getCookie } from "../../../../../utils/utils"; 
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from "../../../../../slices/authSlice";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function SignUpForm({}) {
    const { toast } = useToast()
    const dispatch = useDispatch();
    const [error , setError] = useState({})
    const isApiRunning = useSelector((state) => state.global.isApiRunning).payload;

    /**
     * Handle the form signe submition
     * @param {*} event 
     */
    function handleSignUp(event){
        event.preventDefault();
        
        if(isApiRunning){
            const formData = new FormData(event.target);
            const dataObject = { 
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                password_confirmation: formData.get('password_confirmation'),
            };
    
            const API_AUTH_SIGNU_URL = `http://localhost/auth/register`;
            
            fetch(API_AUTH_SIGNU_URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                },
                body: JSON.stringify(dataObject),
    
            }).then((res) => res.json())
            .then((data) => {
                if(data.errors){
                    setError(data)
                  }else{
                    dispatch(setAuth(true));
                  }
            }).catch((error) => {
                dispatch(setAuth(false));
            });
        }else{
            toast({
                title: "Sorry !",
                description: "Sign up request is disable. The API status is down.",
                action: (
                    <ToastAction altText="Goto schedule to undo">Status</ToastAction>
                ),
            });
        }
   
      

    }
    return (
        <>
        <div className="py-20">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your informations below to create to your account
              </p>
            </div>
            <form onSubmit={handleSignUp}>

                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <p className="text-destructive">{error.message}</p>
                        <div className="my-2">
                            <Label htmlFor="name" className="mb-2">
                                Name
                            </Label>
                            <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            defaultValue="Simon"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            />
                        </div>
                        <div className="my-2">
                            <Label htmlFor="email" className="mb-2">
                                Email
                            </Label>
                            <Input
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            defaultValue="ugo@ugo.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            />
                        </div>
                        <div className="my-2">
                            <Label htmlFor="password" className="mb-2">Your password</Label>
                            <Input type="text" name="password" defaultValue="simon55*"/>
                        </div>
                        <div className="my-2">
                            <Label htmlFor="password_confirmation" className="mb-2">Password confirmation</Label>
                            <Input type="text" name="password_confirmation" defaultValue="simon55*"/>
                        </div>
                    </div>
                    <Button type="submit">
                        Create your account
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" >
                Github
            </Button>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        </>
    )
}
