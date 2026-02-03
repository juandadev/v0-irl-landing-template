import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {
    CheckCircleIcon,
    CircleDollarSignIcon,
    NetworkIcon,
    Share2Icon,
    TrophyIcon,
    UsersIcon
} from 'lucide-react'
import React, {ReactNode} from 'react'
import {TextEffect} from "@/components/motion-primitives/text-effect";
import {transitionVariants} from "@/lib/utils";
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";

const FEATURES_LIST = [
    {
        icon: CircleDollarSignIcon,
        title: "$10 Free v0 Credits",
        description: "Every attendee gets $10 in credits to power their builds and explore the full potential of generative UI."
    },
    {
        icon: Share2Icon,
        title: "Showcase Your Work",
        description: "Build in public! Share your progress on X or LinkedIn to build your brand and show off your speed."
    },
    {
        icon: CheckCircleIcon,
        title: "Official Submission",
        description: "Submit your final production link along with proof of your social post to enter the community challenge."
    },
    {
        icon: UsersIcon,
        title: "Community Voting",
        description: "It’s not just about us—the community decides the best builds. Get your peers to vote for your creation."
    },
    {
        icon: TrophyIcon,
        title: "Winner Announcement",
        description: "Glory awaits. We’ll announce the top-voted builders and crown the champions the week of Feb 10th."
    },
    {
        icon: NetworkIcon,
        title: "Elite Networking",
        description: "Connect with builders across Design, Engineering, Product, and Marketing in a high-energy environment."
    },
]

export default function Features() {
    return (
        <section className="py-16 md:py-32 dark:bg-transparent bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-5xl">
                        Everything You Need to Build
                    </TextEffect>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="p"
                        className="mt-4">
                        We’re providing the tools, the platform, and the community. You just bring the
                        prompts.
                    </TextEffect>
                </div>
                <AnimatedGroup
                    triggerOnView
                    variants={{
                        container: {
                            visible: {
                                transition: {
                                    staggerChildren: 0.05,
                                    delayChildren: 0.75,
                                },
                            },
                        },
                        ...transitionVariants,
                    }}
                >
                    <Card
                        className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16"
                    >
                        {FEATURES_LIST.map((feature, index) => (
                            <div key={`feature-${index}`} className="group shadow-zinc-950/5">
                                <CardHeader className="pb-3">
                                    <CardDecorator>
                                        <feature.icon
                                            className="size-6"
                                            aria-hidden
                                        />
                                    </CardDecorator>
                                    <h3 className="mt-6 font-medium text-xl">{feature.title}</h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </div>
                        ))}
                    </Card>
                </AnimatedGroup>
            </div>
        </section>
    )
}

const CardDecorator = ({children}: { children: ReactNode }) => (
    <div
        className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] dark:opacity-50"
        />

        <div
            className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
