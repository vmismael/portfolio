import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost, renderMarkdown } from "@/lib/blog";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — VMI`,
    description: post.description,
  };
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);

  return (
    <article
      className="max-w-[720px] mx-auto px-8 pb-24"
      style={{ paddingTop: "calc(var(--nav-height) + 64px)" }}
    >
      {/* Back */}
      <Link
        href="/blog"
        className="font-mono text-[12px] text-muted hover:text-accent transition-colors duration-fast no-underline inline-flex items-center gap-1.5 mb-12"
      >
        ← todas as notas
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="font-mono text-[11px] text-muted mb-4 flex flex-wrap items-center gap-3">
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
        <h1
          className="font-sans font-semibold text-ink m-0 tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
        >
          {post.title}
        </h1>
        <p className="mt-4 font-sans text-[17px] text-muted leading-[1.6] m-0">
          {post.description}
        </p>
        <div className="mt-8 h-px bg-rule" />
      </header>

      {/* Body */}
      <div
        className="mdx-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-16 pt-8 border-t border-rule">
        <Link
          href="/blog"
          className="font-mono text-[12px] text-muted hover:text-accent transition-colors duration-fast no-underline"
        >
          ← todas as notas
        </Link>
      </div>
    </article>
  );
}
