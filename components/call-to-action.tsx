import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {TextEffect} from "./motion-primitives/text-effect"
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";
import {transitionVariants} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React from "react";

export default function CallToAction() {
    return (
        <section className="py-16 mx-2">
            <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
                <div className="text-center">
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-5xl">
                        Don't Miss the v0 Guadalajara Meetup!
                    </TextEffect>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                        className="mt-4 text-muted-foreground">
                        Join us for an evening of AI, code, and networking. Have questions about the venue or agenda?
                        Feel free to reach out.
                    </TextEffect>
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
                        className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                        <TooltipProvider delayDuration={200}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        asChild
                                        size="lg"
                                        className='opacity-70'
                                    >
                                        <span>RSVP for Free</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Sold Out!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="mailto:juanda.martinezn@gmail.com">
                                <span>Ask a Question</span>
                            </Link>
                        </Button>
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    )
}
