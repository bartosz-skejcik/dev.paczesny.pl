"use client";

import { Container } from "@ui/Container";
import { Paragraph } from "@ui/Paragraph";
import { IconBrandGithub } from "@tabler/icons-react";
import { Heading } from "@ui/Heading";
import createSupabaseBrowerClient from "@lib/supabase/client";

type Props = {};

function Auth({}: Props) {
    const supabase = createSupabaseBrowerClient();

    async function handleSignInWithGithub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
        });

        console.log(data);

        // handle popups here
        if (error) console.log(error);
    }

    return (
        <Container>
            <span className="text-4xl">🕵️</span>
            <Heading className="font-black">Authenticate</Heading>
            <Paragraph className="mt-4 sm:max-w-lg">
                We need you to authenticate in order to validate your identity.
                Please sign in with your Github account.
            </Paragraph>
            <div className="mt-6 w-1/2">
                <button
                    onClick={handleSignInWithGithub}
                    className="flex w-full items-center justify-center rounded-md bg-transparent px-4 py-2 font-medium text-primary ring-2 ring-primary transition-all duration-200 hover:bg-primary hover:text-black"
                >
                    <IconBrandGithub className="mr-2" />
                    <span>Sign in with Github</span>
                </button>
            </div>
        </Container>
    );
}

export default Auth;
