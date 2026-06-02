'use client';

import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, X } from 'lucide-react';
import {
  format,
  isAfter,
  isBefore,
  startOfToday,
  eachDayOfInterval,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { RadioGroup } from '@/components/ui/radio-group';

interface MultiDatePickerProps {
  selectedDates: Date[];
  onDatesChange: (dates: Date[]) => void;
  disabledDates?: Date[];
  minDate?: Date;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function MultiDatePicker({
  selectedDates,
  onDatesChange,
  disabledDates = [],
  minDate = startOfToday(),
  placeholder = 'Sélectionner des dates...',
  label,
  className,
}: MultiDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'multiple' | 'periods'>('multiple');
  // Pour la sélection d'une période temporaire
  const [rangeSelection, setRangeSelection] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  // Liste des périodes sélectionnées (stockées comme {from,to}) pour affichage
  const [selectedPeriods, setSelectedPeriods] = useState<
    { from: Date; to: Date }[]
  >([]);

  const isDateDisabled = (date: Date): boolean => {
    // Désactiver les dates passées
    if (isBefore(date, minDate)) return true;

    // Désactiver les dates spécifiées
    return disabledDates.some(
      (disabledDate) =>
        format(disabledDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const isDateSelected = (date: Date): boolean => {
    return selectedDates.some(
      (selectedDate) =>
        format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    const dateStr = format(date, 'yyyy-MM-dd');
    const isSelected = selectedDates.some(
      (d) => format(d, 'yyyy-MM-dd') === dateStr
    );

    if (isSelected) {
      // Retirer la date
      onDatesChange(
        selectedDates.filter((d) => format(d, 'yyyy-MM-dd') !== dateStr)
      );
    } else {
      // Ajouter la date
      onDatesChange([...selectedDates, date]);
    }
  };

  const handleRangeSelect = (from?: Date, to?: Date) => {
    setRangeSelection({ from, to });
  };

  const addRange = () => {
    const { from, to } = rangeSelection;
    if (!from || !to) return;
    // calculer toutes les dates entre from et to inclus
    const days = eachDayOfInterval({ start: from, end: to });
    // Ajouter sans dupliquer
    const existingStrs = new Set(
      selectedDates.map((d) => format(d, 'yyyy-MM-dd'))
    );
    const newDays = days.filter(
      (d) => !existingStrs.has(format(d, 'yyyy-MM-dd'))
    );
    if (newDays.length === 0) return;
    onDatesChange([...selectedDates, ...newDays]);
    setSelectedPeriods([...selectedPeriods, { from, to }]);
    // reset range selection
    setRangeSelection({});
    setIsOpen(false);
  };

  const handleRemoveDate = (dateToRemove: Date) => {
    onDatesChange(
      selectedDates.filter(
        (d) => format(d, 'yyyy-MM-dd') !== format(dateToRemove, 'yyyy-MM-dd')
      )
    );
  };

  const clearAllDates = () => {
    onDatesChange([]);
  };

  const sortedDates = useMemo(
    () => [...selectedDates].sort((a, b) => a.getTime() - b.getTime()),
    [selectedDates]
  );

  return (
    <div className={cn('space-y-3', className)}>
      {label && <label className="text-sm font-medium">{label}</label>}

      {/* Dates sélectionnées */}
      {sortedDates.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {sortedDates.length} date{sortedDates.length > 1 ? 's' : ''}{' '}
              sélectionnée{sortedDates.length > 1 ? 's' : ''}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllDates}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Effacer tout
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {sortedDates.map((date) => (
              <Badge
                key={format(date, 'yyyy-MM-dd')}
                variant="secondary"
                className="flex items-center gap-1.5 pl-2 pr-1.5"
              >
                {format(date, 'dd MMM', { locale: fr })}
                <button
                  onClick={() => handleRemoveDate(date)}
                  className="ml-1 hover:bg-black/10 rounded p-0.5 transition-colors"
                  aria-label={`Retirer la date ${format(date, 'dd MMMM yyyy', { locale: fr })}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Calendrier */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              selectedDates.length === 0 && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDates.length > 0
              ? `${selectedDates.length} date(s) sélectionnée(s)`
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <RadioGroup value={mode} onValueChange={(v) => setMode(v as any)}>
                <div className="flex gap-2">
                  <label
                    className={cn(
                      'cursor-pointer px-3 py-1 rounded border',
                      mode === 'multiple'
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-transparent'
                    )}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value="multiple"
                      checked={mode === 'multiple'}
                      onChange={() => setMode('multiple')}
                      className="sr-only"
                    />
                    Dates individuelles
                  </label>
                  <label
                    className={cn(
                      'cursor-pointer px-3 py-1 rounded border',
                      mode === 'periods'
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-transparent'
                    )}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value="periods"
                      checked={mode === 'periods'}
                      onChange={() => setMode('periods')}
                      className="sr-only"
                    />
                    Période(s)
                  </label>
                </div>
              </RadioGroup>
            </div>
            <div className="rounded-md border">
              {mode === 'multiple' ? (
                <Calendar
                  required={false}
                  mode="multiple"
                  disabled={isDateDisabled}
                  locale={fr}
                  onDayClick={(day, modifiers, e) => {
                    handleDateClick(day as Date);
                  }}
                  classNames={{
                    day_selected:
                      'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                    day_today: 'bg-accent text-accent-foreground',
                    day_disabled:
                      'text-muted-foreground opacity-50 cursor-not-allowed',
                    day: 'hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 cursor-pointer',
                  }}
                  selected={selectedDates}
                />
              ) : (
                <Calendar
                  required={false}
                  mode="range"
                  disabled={isDateDisabled}
                  locale={fr}
                  onDayClick={(day, modifiers, e) => {
                    const sel = rangeSelection;
                    if (!sel.from || (sel.from && sel.to)) {
                      setRangeSelection({ from: day as Date, to: undefined });
                    } else if (sel.from && !sel.to) {
                      const from = sel.from;
                      const to = day as Date;
                      if (isBefore(to, from)) {
                        setRangeSelection({ from: to, to: from });
                      } else {
                        setRangeSelection({ from, to });
                      }
                    }
                  }}
                  classNames={{
                    day_selected:
                      'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                    day_today: 'bg-accent text-accent-foreground',
                    day_disabled:
                      'text-muted-foreground opacity-50 cursor-not-allowed',
                    day: 'hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 cursor-pointer',
                  }}
                  selected={
                    rangeSelection.from
                      ? { from: rangeSelection.from, to: rangeSelection.to }
                      : undefined
                  }
                />
              )}
            </div>

            {/* Résumé */}
            {mode === 'multiple' && sortedDates.length > 0 && (
              <div className="space-y-2 border-t pt-4">
                <p className="text-sm font-medium">Récapitulatif</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {sortedDates.map((date) => (
                    <div
                      key={format(date, 'yyyy-MM-dd')}
                      className="text-sm text-muted-foreground flex justify-between items-center"
                    >
                      <span>
                        {format(date, 'EEEE dd MMMM yyyy', { locale: fr })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mode === 'periods' && (
              <div className="space-y-2 border-t pt-4">
                <p className="text-sm font-medium">Période sélectionnée</p>
                <div className="text-sm text-muted-foreground flex items-center justify-between">
                  <div>
                    {rangeSelection.from ? (
                      <span>
                        {format(rangeSelection.from, 'dd MMM yyyy', {
                          locale: fr,
                        })}
                        {rangeSelection.to
                          ? ` → ${format(rangeSelection.to, 'dd MMM yyyy', { locale: fr })}`
                          : ' (en attente)'}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Aucune période en cours
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRangeSelection({})}
                    >
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={addRange}
                      disabled={!rangeSelection.from || !rangeSelection.to}
                    >
                      Ajouter la période
                    </Button>
                  </div>
                </div>

                {/* Périodes ajoutées */}
                {selectedPeriods.length > 0 && (
                  <div className="pt-2">
                    <p className="text-sm font-medium">Périodes ajoutées</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedPeriods.map((p, idx) => (
                        <Badge
                          key={`${format(p.from, 'yyyy-MM-dd')}-${idx}`}
                          variant="secondary"
                          className="flex items-center gap-2"
                        >
                          {format(p.from, 'dd MMM')} - {format(p.to, 'dd MMM')}
                          <button
                            onClick={() => {
                              // retirer les dates correspondant à cette période
                              const toRemove = eachDayOfInterval({
                                start: p.from,
                                end: p.to,
                              }).map((d) => format(d, 'yyyy-MM-dd'));
                              onDatesChange(
                                selectedDates.filter(
                                  (d) =>
                                    !toRemove.includes(format(d, 'yyyy-MM-dd'))
                                )
                              );
                              setSelectedPeriods(
                                selectedPeriods.filter((_, i) => i !== idx)
                              );
                            }}
                            className="ml-1 hover:bg-black/10 rounded p-0.5 transition-colors"
                            aria-label={`Retirer la période ${format(p.from, 'dd MMM yyyy')} - ${format(p.to, 'dd MMM yyyy')}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 border-t pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </Button>
              <Button
                className="flex-1"
                onClick={() => setIsOpen(false)}
                disabled={sortedDates.length === 0}
              >
                Confirmer
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
