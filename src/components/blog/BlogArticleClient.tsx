"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, User, Tag as TagIcon } from "lucide-react";
import { BlogArticle } from "@/lib/types";
import SocialShareButtons from "@/components/common/SocialShareButtons";

interface BlogArticleClientProps {
  locale: string;
  article: BlogArticle;
}

export default function BlogArticleClient({ locale, article }: BlogArticleClientProps) {
  const t = useTranslations("BlogPage");
  const [shareUrl, setShareUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href={`/${locale}/blog`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back_to_blog")}
          </Link>
        </Button>

        <article>
          <header className="mb-12">
            {article.category && <Badge className="mb-4">{article.category}</Badge>}

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.titre}</h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
              {article.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.published_at).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {article.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.read_time} {t("read_time")}</span>
                </div>
              )}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <SocialShareButtons title={article.titre} url={shareUrl} />

            <Separator className="mt-8" />
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            {article.contenu.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-3xl font-bold mt-12 mb-6">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-2xl font-semibold mt-8 mb-4">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={index} className="mb-6 text-lg leading-relaxed">
                  {paragraph.trim()}
                </p>
              );
            })}
          </div>

          <Separator className="my-12" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">{t("share")}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <SocialShareButtons title={article.titre} url={shareUrl} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
