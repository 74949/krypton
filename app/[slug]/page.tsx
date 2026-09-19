import { notFound } from "next/navigation";
import { AronxxTechPage } from "@/components/aronxx-tech-page";
import { pages, type PageKey } from "@/lib/content";
import { ArchitectureVeil } from "@/components/architecture-veil";
export function generateStaticParams() { return Object.keys(pages).filter((slug) => slug !== "home").map((slug) => ({ slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!(slug in pages) || slug === "home") notFound(); return <><AronxxTechPage page={slug as PageKey} />{slug === "how-it-works" && <div className="standalone-architecture"><ArchitectureVeil /></div>}</>; }
