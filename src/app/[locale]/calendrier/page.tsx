'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { fr, enUS } from 'date-fns/locale';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isSameMonth, 
  addMonths, 
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
  isBefore,
  startOfDay
} from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Download, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Activity,
  BarChart3
} from 'lucide-react';
import { getEvents } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

type EventWithWorkshop = {
  id: number;
  atelier_id: number;
  date_event: string;
  heure_debut: string;
  heure_fin: string;
  places_disponibles: number;
  adresse?: string;
  ateliers: {
    id: number;
    titre: string;
    description: string;
    public_cible: string;
    duree_heures: number;
    tarif_eur: number;
  };
};

export default function CalendrierPage() {
  const t = useTranslations('CalendarPage');
  const [events, setEvents] = useState<EventWithWorkshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedEvent, setSelectedEvent] = useState<EventWithWorkshop | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const locale = typeof window !== 'undefined' ? window.location.pathname.includes('/en') ? enUS : fr : fr;

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await getEvents() as any[];
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  }

  // Calculer les jours du mois avec semaine complète
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale });
  const calendarEnd = endOfWeek(monthEnd, { locale });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Obtenir les événements par date
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventWithWorkshop[]>();
    events.forEach(event => {
      const dateStr = event.date_event;
      if (!map.has(dateStr)) {
        map.set(dateStr, []);
      }
      map.get(dateStr)?.push(event);
    });
    return map;
  }, [events]);

  // Filtrer les événements par date sélectionnée
  const eventsForSelectedDate = selectedDate
    ? eventsByDate.get(format(selectedDate, 'yyyy-MM-dd')) || []
    : [];

  // Événements à venir (futurs uniquement)
  const upcomingEvents = useMemo(() => {
    const today = startOfDay(new Date());
    return events
      .filter(e => {
        if (!e.date_event) return false;
        const eventDate = new Date(e.date_event);
        return !isNaN(eventDate.getTime()) && !isBefore(eventDate, today);
      })
      .slice(0, 10);
  }, [events]);

  // Événements du mois actuel
  const currentMonthEvents = useMemo(() => {
    return events.filter(e => {
      const eventDate = new Date(e.date_event);
      return isSameMonth(eventDate, currentMonth);
    });
  }, [events, currentMonth]);

  // Statistiques
  const stats = useMemo(() => {
    const today = startOfDay(new Date());
    const totalEvents = events.length;
    const futureEvents = events.filter(e => !isBefore(new Date(e.date_event), today)).length;
    const monthEvents = currentMonthEvents.length;
    const totalSpots = events.reduce((sum, e) => sum + e.places_disponibles, 0);
    
    return {
      totalEvents,
      futureEvents,
      monthEvents,
      totalSpots
    };
  }, [events, currentMonthEvents]);

  // Fonction pour obtenir les événements d'un jour
  const getEventsForDay = (date: Date) => {
    if (!date || isNaN(date.getTime())) return [];
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      return eventsByDate.get(dateStr) || [];
    } catch (e) {
      return [];
    }
  };

  // Naviguer entre les mois
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  // Générer fichier iCal
  const exportToICal = (eventsList: EventWithWorkshop[]) => {
    let icalContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Ateliers 360//Calendar//FR\nCALSCALE:GREGORIAN\n';
    
    eventsList.forEach(event => {
      const startDateTime = `${event.date_event.replace(/-/g, '')}T${event.heure_debut.replace(':', '')}00`;
      const endDateTime = `${event.date_event.replace(/-/g, '')}T${event.heure_fin.replace(':', '')}00`;
      
      icalContent += 'BEGIN:VEVENT\n';
      icalContent += `UID:${event.id}@imulabs.com\n`;
      icalContent += `DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss")}\n`;
      icalContent += `DTSTART:${startDateTime}\n`;
      icalContent += `DTEND:${endDateTime}\n`;
      icalContent += `SUMMARY:${event.ateliers.titre}\n`;
      icalContent += `DESCRIPTION:${event.ateliers.description}\n`;
      if (event.adresse) {
        icalContent += `LOCATION:${event.adresse}\n`;
      }
      icalContent += 'END:VEVENT\n';
    });
    
    icalContent += 'END:VCALENDAR';
    
    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'imulabs-events.ics';
    link.click();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              {t('title')}
            </h1>
            <p className="text-xl text-primary-foreground/90">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="w-full py-8 border-b bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('total_events')}</p>
                    <p className="text-3xl font-bold">{stats.totalEvents}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('upcoming')}</p>
                    <p className="text-3xl font-bold">{stats.futureEvents}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('this_month')}</p>
                    <p className="text-3xl font-bold">{stats.monthEvents}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('available_spots')}</p>
                    <p className="text-3xl font-bold">{stats.totalSpots}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calendrier principal */}
      <section className="w-full py-12 flex-1">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Contrôles et vues */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'month' | 'list')}>
                  <TabsList>
                    <TabsTrigger value="month">{t('month_view')}</TabsTrigger>
                    <TabsTrigger value="list">{t('list_view')}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={goToToday}>
                  {t('today')}
                </Button>
                <Button 
                  onClick={() => exportToICal(events)} 
                  variant="outline"
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('export')}
                </Button>
              </div>
            </div>

            {viewMode === 'month' ? (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Calendrier mensuel */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <CardTitle className="text-2xl">
                          {format(currentMonth, 'MMMM yyyy', { locale })}
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={goToNextMonth}>
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* En-têtes des jours */}
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                          <div key={i} className="text-center text-sm font-semibold text-muted-foreground p-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Grille du calendrier */}
                      <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day, index) => {
                          const dayEvents = getEventsForDay(day);
                          const isCurrentMonth = isSameMonth(day, currentMonth);
                          const isSelected = selectedDate && isSameDay(day, selectedDate);
                          const isDayToday = isToday(day);
                          const isPast = isBefore(day, startOfDay(new Date()));

                          return (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedDate(day);
                                if (dayEvents.length > 0) {
                                  setViewMode('list');
                                }
                              }}
                              disabled={isPast && dayEvents.length === 0}
                              className={`
                                relative aspect-square p-2 rounded-lg border-2 transition-all
                                ${isCurrentMonth ? 'bg-card' : 'bg-muted/30'}
                                ${isSelected ? 'border-primary bg-primary/10' : 'border-transparent'}
                                ${isDayToday && !isSelected ? 'border-primary/50' : ''}
                                ${isPast && !isDayToday ? 'opacity-50' : ''}
                                ${dayEvents.length > 0 ? 'hover:shadow-md cursor-pointer' : ''}
                                ${!isCurrentMonth ? 'text-muted-foreground' : ''}
                                disabled:cursor-not-allowed
                              `}
                            >
                              <span className={`text-sm font-medium ${isDayToday ? 'font-bold' : ''}`}>
                                {format(day, 'd')}
                              </span>
                              
                              {dayEvents.length > 0 && (
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                                  {dayEvents.slice(0, 3).map((_, i) => (
                                    <div 
                                      key={i} 
                                      className="w-1.5 h-1.5 rounded-full bg-primary"
                                    />
                                  ))}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Légende */}
                      <div className="mt-6 pt-6 border-t flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border-2 border-primary"></div>
                          <span className="text-muted-foreground">{t('selected_day')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-card flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-muted-foreground">{t('has_events')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border-2 border-primary/50"></div>
                          <span className="text-muted-foreground">{t('today')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Événements du jour sélectionné / à venir */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {selectedDate 
                          ? format(selectedDate, 'PPP', { locale })
                          : t('upcoming_events')
                        }
                      </CardTitle>
                      <CardDescription>
                        {selectedDate 
                          ? `${eventsForSelectedDate.length} ${eventsForSelectedDate.length === 1 ? t('event') : t('events')}`
                          : `${upcomingEvents.length} ${t('events')}`
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {(selectedDate ? eventsForSelectedDate : upcomingEvents).map(event => (
                          <Card 
                            key={event.id} 
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-sm line-clamp-2">
                                  {event.ateliers.titre}
                                </h4>
                                <Badge 
                                  variant={event.places_disponibles > 0 ? 'secondary' : 'destructive'}
                                  className="text-xs ml-2"
                                >
                                  {event.places_disponibles > 0 
                                    ? event.places_disponibles
                                    : t('full')
                                  }
                                </Badge>
                              </div>
                              
                              {!selectedDate && (
                                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                  <CalendarIcon className="h-3 w-3" />
                                  {format(new Date(event.date_event), 'PPP', { locale })}
                                </p>
                              )}
                              
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {event.heure_debut}-{event.heure_fin}
                                </span>
                                {event.adresse && (
                                  <span className="flex items-center gap-1 truncate">
                                    <MapPin className="h-3 w-3" />
                                    {event.adresse}
                                  </span>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {(selectedDate ? eventsForSelectedDate : upcomingEvents).length === 0 && (
                          <div className="text-center py-8">
                            <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                            <p className="text-sm text-muted-foreground">{t('no_events')}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              /* Vue liste */
              <div className="space-y-4">
                {currentMonthEvents.length > 0 ? (
                  currentMonthEvents.map(event => (
                    <Card 
                      key={event.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-4 flex-1">
                            <div className="text-center min-w-[60px]">
                              <div className="text-3xl font-bold">
                                {format(new Date(event.date_event), 'd')}
                              </div>
                              <div className="text-xs text-muted-foreground uppercase">
                                {format(new Date(event.date_event), 'MMM', { locale })}
                              </div>
                            </div>

                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2">
                                {event.ateliers.titre}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {event.ateliers.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {event.heure_debut} - {event.heure_fin}
                                </span>
                                {event.adresse && (
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {event.adresse}
                                  </span>
                                )}
                                <Badge>
                                  {event.ateliers.public_cible}
                                </Badge>
                                <span className="text-muted-foreground">
                                  {event.ateliers.tarif_eur}€
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <Badge 
                              variant={event.places_disponibles > 0 ? 'default' : 'destructive'}
                              className="mb-2"
                            >
                              {event.places_disponibles > 0 
                                ? `${event.places_disponibles} ${t('spots')}`
                                : t('full')
                              }
                            </Badge>
                            <Button size="sm" disabled={event.places_disponibles === 0}>
                              {event.places_disponibles > 0 ? t('book') : t('full')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <CalendarIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-semibold mb-2">{t('no_events_month')}</p>
                      <p className="text-sm text-muted-foreground mb-4">{t('no_events_month_desc')}</p>
                      <Button onClick={goToNextMonth} variant="outline">
                        {t('next_month')}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal de détails de l'événement */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.ateliers.titre}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.date_event ? format(new Date(selectedEvent.date_event), 'PPP', { locale }) : ''}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-6">
              <p className="text-sm">{selectedEvent.ateliers.description}</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t('time')}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.heure_debut} - {selectedEvent.heure_fin}
                    </p>
                  </div>
                </div>
                
                {selectedEvent.adresse && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{t('location')}</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.adresse}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t('available_spots')}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.places_disponibles} {selectedEvent.places_disponibles === 1 ? t('places_left_one') : t('places_left')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t('related_workshop')}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.ateliers.public_cible} • {selectedEvent.ateliers.tarif_eur}€
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  asChild
                  className="flex-1" 
                  disabled={selectedEvent.places_disponibles === 0}
                >
                  <Link href="/reserver">
                    {selectedEvent.places_disponibles > 0 ? t('book_now') : t('full')}
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => exportToICal([selectedEvent])}>
                  <Download className="mr-2 h-4 w-4" />
                  {t('export_ical')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
