"use client"
import { getCookie } from "../../../../../utils/utils"; 
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from "../../../../../slices/authSlice";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { redirect } from "next/navigation";

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function LoginForm({}) {

    const dispatch = useDispatch();
    const { toast } = useToast()

    const [error , setError] = useState({})
    const isUserAuth = useSelector((state) => state.auth.isAuth);
    const isApiRunning = useSelector((state) => state.global.isApiRunning).payload;

    if(isUserAuth){
        redirect('/dashboard');
    }

    /**
     * Handle the form signe submition
     * @param {*} event 
     */
    function handleLogin(event){
        event.preventDefault();
        if(isApiRunning){
          const formData = new FormData(event.target);

          const dataObject = { 
              email: formData.get('email'),
              password: formData.get('password'),
          };
  
          const API_AUTH_SIGNU_URL = `http://localhost/auth/login`;
          
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
                // Redirect the user to the dashboard page on successful login
                redirect('/dashboard');
  
              }
          }).catch((error) => {
              dispatch(setAuth(false));
          });
        }else{
          toast({
            title: "Sorry !",
            description: "Login request is disable. The API status is down.",
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
                Sign In an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to login to your account
              </p>
            </div>
            <form onSubmit={handleLogin} className={error ? "has-errors": '' }>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <p className="text-destructive">{error.message}</p>
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
                            <p className="text-sm text-destructive mt-1">{error.errors?.email[0]}</p>

                        </div>
                        <div className="my-2">
                        <Label htmlFor="password" className="mb-2">Your password</Label>
                        <Input type="text" name="password" defaultValue="simon55*"/>
                        <p className="text-sm text-destructive mt-1">{error.errors?.password}</p>

                        </div>
                    </div>
                    <Button>
                        Sign In with Email
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
