'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { searchUsers } from '@/lib/supabase';
import { Profile } from '@/lib/types';

interface UserSearchProps {
  onSelect: (user: Profile) => void;
  selectedUserId?: string;
}

export function UserSearch({ onSelect, selectedUserId }: UserSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [users, setUsers] = React.useState<Profile[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (value.length > 1) {
        setLoading(true);
        const results = await searchUsers(value);
        setUsers(results);
        setLoading(false);
      } else {
        setUsers([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedUserId
            ? users.find((user) => user.id === selectedUserId)?.full_name || 
              users.find((user) => user.id === selectedUserId)?.email || "Utilisateur sélectionné"
            : "Rechercher un utilisateur..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}> 
          {/* We handle filtering manually via backend search */}
          <CommandInput 
            placeholder="Nom ou email..." 
            value={value} 
            onValueChange={setValue} 
          />
          <CommandList>
            <CommandEmpty>{loading ? 'Recherche...' : 'Aucun utilisateur trouvé.'}</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={(currentValue: string) => {
                    onSelect(user);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUserId === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{user.full_name || 'Sans nom'}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
