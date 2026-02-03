import {TextEffect} from "@/components/motion-primitives/text-effect";
import React from "react";
import {transitionVariants} from "@/lib/utils";
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";

const AGENDA_ITEMS = [
    {
        time: "6:00 PM",
        title: "Check-in & Networking",
        description: "Registration opens. Grab your badge, meet fellow builders, and get settled in."
    },
    {
        time: "6:30 PM",
        title: "Kickoff & v0 Live Demo",
        description: "Welcome remarks followed by a live demonstration of v0's generative UI capabilities."
    },
    {
        time: "6:50 PM",
        title: "Build Time!",
        description: "Hands-on session. Turn your prompts into production-ready apps. (Don't forget to post your progress!)"
    },
    {
        time: "8:15 PM",
        title: "Showcase Sprint",
        description: "Lightning round demos. A quick look at what the community managed to ship in just over an hour."
    },
    {
        time: "8:45 PM",
        title: "Group Photo & Closing",
        description: "Capturing the moment with the community before we wrap up the night."
    }
];

export default function Agenda() {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:grid-cols-[1fr_auto]">
                    <div className="text-center lg:text-left">
                        <TextEffect
                            triggerOnView
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            as="h2"
                            className="mb-4 text-3xl font-semibold md:text-4xl">
                            Agenda
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
                        className="divide-y space-y-4 divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0"
                    >
                        {AGENDA_ITEMS.map((item, index) => (
                            <div key={`agenda-${index}`} className="pb-2">
                                <div className="font-medium space-x-2">
                                    <span className='text-muted-foreground font-mono '>{item.time}</span>
                                    <span>- {item.title}</span>
                                </div>
                                <p className="text-muted-foreground mt-4">{item.description}</p>
                            </div>
                        ))}
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    )
}
