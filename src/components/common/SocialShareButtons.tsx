"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Mail, Twitter, Link as LinkIcon, Check } from "lucide-react";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
}

export default function SocialShareButtons({ title, url }: SocialShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState(url || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(url || window.location.href);
    }
  }, [url]);

  const handleShare = (platform: "facebook" | "linkedin" | "twitter" | "email" | "copy") => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title || "Ateliers 360");

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    } as const;

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      });
      return;
    }

    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("email")}>
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("copy")}>
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" /> Copied
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4 mr-2" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}
