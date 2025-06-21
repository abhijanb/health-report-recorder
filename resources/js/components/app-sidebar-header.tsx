import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Searchbar from '@/pages/Searchbar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
     const [theme,setTheme] = useState<'light'|'dark'>(() => {
        return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    });
     useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    // set className in localstorge to toggle when click
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    return (
        <>
        <header className="border-sidebar-border/50  flex justify-between h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4 ">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 " />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <Searchbar  />
            <button className=' ' onClick={toggleTheme}>{theme == 'light' ? <Sun /> :<Moon /> }</button>
        </header>
        </>
    );
}
