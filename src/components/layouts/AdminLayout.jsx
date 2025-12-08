
import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    MessageSquare,
    Star,
    Briefcase,
    FileText,
    LogOut,
    Menu,
    X,
    FolderOpen
} from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export default function AdminLayout() {
    const { user, loading, signOut } = useAuth();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
        { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
        { name: 'Portfolio', href: '/admin/portfolio', icon: FolderOpen },
        { name: 'Case Studies', href: '/admin/case-studies', icon: FileText },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-900 text-white">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Schematter Admin
                </h1>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                ? 'bg-green-600/20 text-green-400'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5"
                    onClick={signOut}
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
                <span className="font-bold text-white">ScheMatter Admin</span>
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 border-r-slate-800 bg-slate-900 w-64">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto md:h-screen pt-16 md:pt-0">
                <div className="p-6 max-w-7xl mx-auto space-y-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
