import { Github as GithubIcon, CoffeeIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import ThemeToggler from '@/components/ThemeToggler'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Header() {
  return (
    <header
      className="h-[var(--nav-height)] w-full border-b bg-background/95
      backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-full items-center justify-between px-4">
        <Link className="flex items-center gap-2" href="/">
          <CoffeeIcon size={18} />
          <h1 className="text-base font-bold">Cup Configurator</h1>
        </Link>
        <div className="flex items-center">
          <ThemeToggler />
          <a
            className={cn(buttonVariants({ variant: 'ghost' }), '!h-9 px-2.5')}
            href={process.env.NEXTGITHUB_REPO_URL}
            target="_blank"
          >
            <GithubIcon height={16} width={16} />
          </a>
        </div>
      </div>
    </header>
  )
}
