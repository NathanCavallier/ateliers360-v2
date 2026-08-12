'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Copy,
  Share2,
  Check,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  variant?: 'default' | 'outline' | 'compact';
  showLabel?: boolean;
}

export function ShareButtons({
  url,
  title,
  description = '',
  variant = 'default',
  showLabel = true,
}: ShareButtonsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: 'Lien copié',
        description: 'Le lien a été copié dans le presse-papiers.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de copier le lien.',
        variant: 'destructive',
      });
    }
  };

  const shareItems = [
    {
      icon: Facebook,
      label: 'Facebook',
      href: shareLinks.facebook,
      color: '#1877F2',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: shareLinks.linkedin,
      color: '#0A66C2',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: shareLinks.whatsapp,
      color: '#25D366',
    },
    { icon: Mail, label: 'Email', href: shareLinks.email, color: '#666' },
  ];

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            {showLabel && 'Partager'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {shareItems.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem asChild>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 cursor-pointer w-full"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Lien copié
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copier le lien
                </>
              )}
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'outline') {
    return (
      <div className="flex flex-wrap gap-2">
        {shareItems.map((item) => (
          <Button
            key={item.label}
            variant="outline"
            size="sm"
            asChild
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Partager sur ${item.label}`}
            >
              <item.icon className="h-4 w-4" />
              {showLabel && item.label}
            </a>
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          title="Copier le lien"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              {showLabel && 'Copié'}
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              {showLabel && 'Copier'}
            </>
          )}
        </Button>
      </div>
    );
  }

  // Default variant
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground">
        Partager cet atelier
      </p>
      <div className="flex flex-wrap gap-3">
        {shareItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="lg"
            asChild
            className="flex flex-col items-center gap-1 h-auto py-3"
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Partager sur ${item.label}`}
            >
              <item.icon className="h-6 w-6" style={{ color: item.color }} />
              <span className="text-xs">{item.label}</span>
            </a>
          </Button>
        ))}
        <Button
          variant="ghost"
          size="lg"
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-1 h-auto py-3"
          title="Copier le lien"
        >
          {copied ? (
            <>
              <Check className="h-6 w-6 text-green-600" />
              <span className="text-xs">Copié</span>
            </>
          ) : (
            <>
              <Copy className="h-6 w-6 text-gray-600" />
              <span className="text-xs">Copier</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
