import { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Calendar, FileText, Users, Settings, LogOut, User, Shield } from 'lucide-react';
import { LogoutButton } from '@/components/admin/LogoutButton';

export const metadata = {
  title: 'Admin Dashboard - Ateliers 360',
  description: 'Administration panel for Ateliers 360 workshops',
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/admin/login');
  }
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </div>
          <nav className="space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/reservations">
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Réservations
              </Button>
            </Link>
            <Link href="/admin/ateliers">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Ateliers
              </Button>
            </Link>
            <Link href="/admin/groups">
              <Button variant="ghost" className="w-full justify-start">
                 <Users className="mr-2 h-4 w-4" />
                 Groupes
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Utilisateurs
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </Link>
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-6 border-t space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
            </div>
          </div>
          <div className="pt-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 w-full justify-center">
              <Shield className="mr-1 h-3 w-3" />
              Super Admin
            </Badge>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
