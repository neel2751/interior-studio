"use client";

import { useState, useEffect } from "react";
import { PROJECTS } from "@/lib/constants";
import type { ResidentialService } from "@/types/service";

interface ResidentialServiceClientProps {
  service: ResidentialService;
  related: typeof PROJECTS;
}

export default function ResidentialServiceClient({ service, related }: ResidentialServiceClientProps) {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
    </div>
  );
}