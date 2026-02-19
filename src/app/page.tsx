"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Bookmark, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            <span className="text-lg font-semibold tracking-tight">
              Bookmarks
            </span>
          </div>
          <Authenticated>
            <UserButton />
          </Authenticated>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-4 pt-8">
        <AuthLoading>
          <div className="space-y-6">
            <Skeleton className="h-10 w-full max-w-sm" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-36 rounded-lg" />
              ))}
            </div>
          </div>
        </AuthLoading>

        <Unauthenticated>
          <div className="flex flex-col items-center justify-center gap-6 pt-32">
            <div className="rounded-full bg-muted p-4">
              <Bookmark className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Bookmark Manager
              </h1>
              <p className="text-muted-foreground max-w-md">
                Save your favorite links, organize them with tags, and find them
                instantly. Sign in to get started.
              </p>
            </div>
            <SignInButton mode="modal">
              <Button size="lg" className="gap-2">
                <LogIn className="h-4 w-4" />
                Sign in to start
              </Button>
            </SignInButton>
          </div>
        </Unauthenticated>

        <Authenticated>
          <div className="text-center py-20 text-muted-foreground">
            Dashboard coming next...
          </div>
        </Authenticated>
      </main>
    </div>
  );
}
