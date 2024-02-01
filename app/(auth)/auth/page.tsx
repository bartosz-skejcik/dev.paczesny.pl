"use client";

// UI Components
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

// React
import { useState } from "react";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs, Tab } from "@nextui-org/react";

// Icons
import { Eye, EyeOff, GithubIcon } from "lucide-react";

// Auth
import { createBrowserClient } from "@supabase/ssr";

type Props = {};

function AuthPage({}: Props) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function handleSignInWithGithub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
            },
        });

        // handle popups here
        if (error) console.log(error);
    }

    const [isPasswordShowing, setIsPasswordShowing] = useState(false);

    return (
        <main className="w-full min-h-screen xl:py-20 2xl:py-0 flex-col flex items-center justify-center">
            <Tabs aria-label="Options">
                <Tab
                    key="login"
                    title="Login"
                    className="w-full flex items-center justify-center"
                >
                    <Card className="w-11/12 sm:w-5/6 md:max-w-md md:w-full">
                        <CardHeader className="flex flex-col items-start">
                            <h1 className="text-4xl font-semibold pt-1 pb-3">
                                Login
                            </h1>
                            <p className="text-sm text-default-500">
                                Use your credentials to login or sign in with
                                Github
                            </p>
                        </CardHeader>
                        <CardBody className="space-y-4 pb-0 mb-0">
                            <div className="space-y-1">
                                {/* <Label htmlFor="username">Username</Label> */}
                                <Input
                                    id="username"
                                    label="Username"
                                    labelPlacement="outside"
                                    placeholder="john_doe"
                                />
                            </div>
                            <div className="space-y-1">
                                {/* <Label htmlFor="password">Password</Label> */}
                                <Input
                                    id="password"
                                    label="Password"
                                    labelPlacement="outside"
                                    type={
                                        isPasswordShowing ? "text" : "password"
                                    }
                                    placeholder="********"
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={() =>
                                                setIsPasswordShowing(
                                                    !isPasswordShowing
                                                )
                                            }
                                        >
                                            {isPasswordShowing ? (
                                                <EyeOff
                                                    size={20}
                                                    className="text-default-400"
                                                />
                                            ) : (
                                                <Eye
                                                    size={20}
                                                    className="text-default-400"
                                                />
                                            )}
                                        </button>
                                    }
                                />
                            </div>
                            <div className="py-5">
                                <Button
                                    variant="shadow"
                                    color="secondary"
                                    className="w-full"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </CardBody>
                        <CardFooter className="flex flex-col pt-0">
                            <div className="w-full flex items-center justify-center gap-2 pb-3">
                                <div className="h-0.5 bg-default-500/50 w-full rounded-full" />
                                <span className="text-default-500 text-sm">
                                    or
                                </span>
                                <div className="h-0.5 bg-default-500/50 w-full rounded-full" />
                            </div>
                            <div className="space-y-1 w-full">
                                <Button
                                    onClick={handleSignInWithGithub}
                                    variant="bordered"
                                    className="w-full"
                                >
                                    <GithubIcon className="w-4 h-4 mr-2" />
                                    Sign in with Github
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </Tab>
                <Tab
                    key="register"
                    title="Register"
                    className="w-full flex items-center justify-center"
                >
                    <Card className="max-w-md w-full">
                        <CardHeader className="flex flex-col items-start">
                            <h1 className="text-4xl font-semibold pt-1 pb-3">
                                Register
                            </h1>
                            <p className="text-sm text-default-500">
                                Fill in the form to create an account or sign in
                                with Github
                            </p>
                        </CardHeader>
                        <CardBody className="space-y-4 pb-0 mb-0">
                            <div className="space-y-1">
                                <Input
                                    id="name"
                                    label="Name"
                                    labelPlacement="outside"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-1">
                                <Input
                                    id="username"
                                    label="Username"
                                    labelPlacement="outside"
                                    placeholder="john_doe"
                                />
                            </div>
                            <div className="space-y-1">
                                <Input
                                    id="password"
                                    type={
                                        isPasswordShowing ? "text" : "password"
                                    }
                                    label="Password"
                                    labelPlacement="outside"
                                    placeholder="********"
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={() =>
                                                setIsPasswordShowing(
                                                    !isPasswordShowing
                                                )
                                            }
                                        >
                                            {isPasswordShowing ? (
                                                <EyeOff
                                                    size={20}
                                                    className="text-default-400"
                                                />
                                            ) : (
                                                <Eye
                                                    size={20}
                                                    className="text-default-400"
                                                />
                                            )}
                                        </button>
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <Input
                                    id="password"
                                    type="password"
                                    labelPlacement="outside"
                                    label="Confirm password"
                                    placeholder="********"
                                />
                            </div>
                            <div className="py-5">
                                <Button
                                    variant="shadow"
                                    color="secondary"
                                    className="w-full"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </CardBody>
                        <CardFooter className="flex flex-col pt-0">
                            <div className="w-full flex items-center justify-center gap-2 pb-3">
                                <div className="h-0.5 bg-default-500/50 w-full rounded-full" />
                                <span className="text-default-500 text-sm">
                                    or
                                </span>
                                <div className="h-0.5 bg-default-500/50 w-full rounded-full" />
                            </div>
                            <div className="space-y-1 w-full">
                                <Button
                                    onClick={handleSignInWithGithub}
                                    variant="bordered"
                                    className="w-full"
                                >
                                    <GithubIcon className="w-4 h-4 mr-2" />
                                    Sign up with Github
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </Tab>
            </Tabs>
        </main>
    );
}

export default AuthPage;
