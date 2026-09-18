import { notFound } from "next/navigation";
import { KryptonPage } from "@/components/krypton-page";
import { pages, type PageKey } from "@/lib/content";
export function generateStaticParams() { return Object.keys(pages).filter((slug) => slug !== "home").map((slug) => ({ slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!(slug in pages) || slug === "home") notFound(); return <KryptonPage page={slug as PageKey} />; }
