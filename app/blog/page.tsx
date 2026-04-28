import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notas Técnicas — VMI",
  description: "Posts sobre projetos, ferramentas e aprendizados em healthtech e fintech.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ paddingTop: "calc(var(--nav-height) + 80px)", paddingBottom: "96px" }}>
      <div className="max-w-[860px] mx-auto px-8">

        {/* Header */}
        <div className="mb-16 pb-10 border-b border-rule">
          <div className="flex items-center gap-3.5 font-mono text-tiny text-muted uppercase tracking-[0.16em] mb-[18px]">
            <span className="text-accent font-semibold">§ blog</span>
            <span className="w-8 h-px bg-rule-strong inline-block flex-shrink-0" />
            <span>// notas técnicas</span>
          </div>
          <h1
            className="font-sans font-semibold text-ink m-0 tracking-tight leading-none"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Notas & aprendizados
          </h1>
          <p className="mt-5 font-sans text-[17px] leading-[1.6] text-muted max-w-[560px] m-0">
            Reflexões sobre projetos, ferramentas e o que aprendo na interseção entre
            saúde, finanças e código.
          </p>
        </div>

        {/* Post list */}
        {posts.length === 0 ? (
          <p className="font-mono text-muted text-[13px]">// nenhum post ainda</p>
        ) : (
          <div className="grid gap-4">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="no-underline group">
                <article className="border border-rule bg-panel p-6 transition-[border-color] duration-fast group-hover:border-accent">
                  <div className="font-mono text-[11px] text-muted mb-3 flex flex-wrap items-center gap-3">
                    <span>{post.date}</span>
                    <span className="text-rule-strong">·</span>
                    <span>{post.readingTime} min leitura</span>
                    {post.tags.map(t => (
                      <span
                        key={t}
                        className="px-1.5 py-px border border-rule text-[10px] uppercase tracking-[0.1em]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-sans font-semibold text-ink text-[22px] m-0 tracking-tight transition-colors duration-fast group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="font-sans text-[15px] text-body leading-[1.6] mt-2 m-0">
                    {post.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-rule">
          <Link
            href="/"
            className="font-mono text-[12px] text-muted hover:text-accent transition-colors duration-fast no-underline"
          >
            ← voltar ao portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
