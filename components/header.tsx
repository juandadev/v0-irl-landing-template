'use client'

import Link from 'next/link'
import { V0Logo } from '@/components/icons/v0-logo'
import { VercelLogo } from '@/components/icons/vercel-logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'

interface MenuItem {
  name: string
  href: string
}

const menuItems: MenuItem[] = [
  { name: 'Vercel', href: 'https://vercel.com' },
  { name: 'v0', href: 'https://v0.dev' },
  { name: 'v0 IRL', href: 'https://v0.app/irl' },
]

export function HeroHeader() {
  const [menuState, setMenuState] = React.useState(false)

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed z-20 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="v0 IRL home"
                className="flex items-center gap-2"
              >
                <V0Logo className="h-4 w-auto text-foreground" />
                <span className="text-muted-foreground">/</span>
                <span className="font-mono text-sm text-foreground">IRL</span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-foreground"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-900/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-foreground"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                  <Link
                    href="https://meetup-sdk.vercel.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Host an Event</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
