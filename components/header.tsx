import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AI Tools Nav
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
