"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Aquí puedes integrar tu solución de analytics preferida
    // Por ejemplo, Google Analytics, Plausible, etc.
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    console.log(`Page view: ${url}`)
  }, [pathname, searchParams])

  return null
}
