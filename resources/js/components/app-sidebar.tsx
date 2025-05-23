import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, BookOpenCheck, Folder, LayoutGrid , Handshake} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutGrid,
    },
    {
        title:'Records',
        href:'/health-record',
        icon:BookOpenCheck
    },
    {
        title:'Add Record',
        href:'/health-record/create',
        icon:BookOpenCheck
    },
    {
        title: 'Reminder',
        href: '/reminder',
        icon: BookOpen,
    },
    {
        title: 'Add Reminder',
        href: '/reminder/create',
        icon: BookOpen,
    },
    {
        title: 'Medicine',
        href: '/medicine',
        icon: Folder,
    },
    {
        title: 'Add Medicine',
        href: '/medicine/create',
        icon: Folder,
    },
    {
        title:'Relation',
        href:'/relation/',
        icon: Handshake
    }

];

const footerNavItems: NavItem[] = [
    
    
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                            {/* app logo */}
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
