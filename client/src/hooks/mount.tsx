"use client"

import { useEffect, useState } from "react";

export default function useMounetd() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted
}