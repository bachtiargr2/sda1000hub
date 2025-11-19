import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ClipboardList, Database, User, BriefcaseBusiness } from 'lucide-react';
import AppLogo from './app-logo';
import pantai from '@/routes/kelola-data/pantai';
import limbah from '@/routes/kelola-data/limbah';
import air from '@/routes/kelola-data/air';
import pulau from '@/routes/pulau';
import jenisData from '@/routes/jenis-data';
import unitKerja from '@/routes/unit-kerja';
import users from '@/routes/users';
// import users from '@/routes/user';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        role: ['Admin', 'Operator'],
    },
    {
        title: 'Kelola Data',
        href: '/kelola-data',
        icon: ClipboardList,
        role: ['Admin', 'Operator'],
        subItems: [
            {
                title: 'Pantai',
                href: pantai.index(),
                role: ['Admin', 'Operator'],
            },
            {
                title: 'Air Bersih',
                href: air.index(),
                role: ['Admin', 'Operator'],
            },
            {
                title: 'Air Limbah',
                href: limbah.index(),
                role: ['Admin', 'Operator'],
            },
        ]
    },
    {
        title: 'Master Data',
        href: '/master-data',
        icon: Database,
        role: ['Admin', 'Operator'],
        subItems: [
            {
                title: 'Pulau',
                href: pulau.index(),
                role: ['Admin', 'Operator'],
            },
            {
                title: 'Jenis Data',
                href: jenisData.index(),
                role: ['Admin', 'Operator'],
            },
        ]
    },
    {
        title: 'User',
        href: users.index(),
        icon: User,
        role: ['Admin'],
    },
];

export function AppSidebar() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="xl" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} user={auth.user} />
            </SidebarContent>

            {/* <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter> */}
        </Sidebar>
    );
}
