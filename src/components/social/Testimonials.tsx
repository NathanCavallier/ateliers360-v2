'use client';

import { Testimonial } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
}

export function Testimonials({ testimonials, className = '' }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="overflow-hidden">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Rating Stars */}
              {testimonial.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating!
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-lg italic text-foreground">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-2">
                {testimonial.image_url && (
                  <Avatar>
                    <AvatarImage
                      src={testimonial.image_url}
                      alt={testimonial.author_name}
                    />
                    <AvatarFallback>
                      {testimonial.author_name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    {testimonial.author_name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.author_role}
                  </div>
                  {testimonial.author_establishment && (
                    <div className="text-xs text-muted-foreground">
                      {testimonial.author_establishment}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  columns?: number;
  className?: string;
}

export function TestimonialsGrid({
  testimonials,
  columns = 3,
  className = '',
}: TestimonialsGridProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={`grid ${gridClass[columns as keyof typeof gridClass]} gap-4 ${className}`}
    >
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="flex flex-col overflow-hidden">
          <CardContent className="flex-1 pt-6 space-y-4">
            {/* Rating Stars */}
            {testimonial.rating && (
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating!
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Quote */}
            <blockquote className="text-sm italic text-foreground flex-1">
              "{testimonial.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-3 pt-2">
              {testimonial.image_url && (
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={testimonial.image_url}
                    alt={testimonial.author_name}
                  />
                  <AvatarFallback>
                    {testimonial.author_name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-xs truncate">
                  {testimonial.author_name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {testimonial.author_role}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
