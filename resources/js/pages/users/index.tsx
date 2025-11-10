import { DataTable } from '@/components/data-table/app-table';
import { getColumns } from '@/components/data-table/columns/users-table-column';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { TableToolbarActions } from '@/components/toolbar/table-toolbar-actions';
import { TableFilter } from '@/components/data-table/filters/filter-popover';
import { DownloadDialog } from '@/components/toolbar/download-dialog';
import { CreateDialog } from '@/components/toolbar/create-dialog';
import { UpdateSheet } from '@/components/toolbar/update-sheet';
import { DeleteDialog } from '@/components/toolbar/delete-dialog';
import UsersForm from '@/components/forms/users-form';
import users from '@/routes/users';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: users.index().url,
    },
];


export default function Users() {
    const { users, roleOptions = [], filters: initialFilters } = usePage<{
        users?: any;
        roleOptions?: { id: number, nama: string }[];
        filters: Record<string, string>;
    }>().props

    const [openCreate, setOpenCreate] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [selected, setSelected] = useState<any>(null)
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [filters, setFilters] = useState<Record<string, string>>(initialFilters || {
        name: "",
        email: "",
        role_id: "",
    })

    const handleFilterChange = (key: string, value: string) => {
        const updated = { ...filters, [key]: value }
        setFilters(updated)

        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => {
            handleApply(updated)
        }, 500)
    }


    const handleApply = (newFilters: Record<string, string>) => {
        router.get('/users', newFilters, { preserveState: true, replace: true })
    }

    const handleReset = () => {
        setFilters({ name: "", email: "", role_id: "" })
        router.get('/users', {}, { preserveState: true })
    }

    const handleEdit = (item: any) => {
        setSelected(item)
        setOpenEdit(true)
    }

    const handleDelete = (item: any) => {
        setSelected(item)
        setOpenDelete(true)
    }

    const columns = getColumns(handleEdit, handleDelete);

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    title="User"
                    desc="Manajemen user"
                    columns={columns}
                    data={users.data}
                    toolbar={
                        <TableToolbarActions title="User" onCreate={() => setOpenCreate(true)}>
                            <TableFilter
                                fields={[
                                    { key: "name", label: "Nama", type: "text" },
                                    { key: "email", label: "Email", type: "text" },
                                    { key: "role_id", label: "Role", type: "select", options: roleOptions },
                                ]}
                                values={filters}
                                onChange={handleFilterChange}
                                onReset={handleReset}
                            />
                        </TableToolbarActions>
                    }
                />
                <DownloadDialog
                    open={openDownload}
                    onOpenChange={setOpenDownload}
                    nama={selected?.dokumen_nama}
                    path={selected?.dokumen_path}
                />
                <CreateDialog open={openCreate} onClose={() => setOpenCreate(false)} title="User">
                    <UsersForm
                        roleOptions={roleOptions}
                        submitRoute="/users"
                        onSuccess={() => setOpenCreate(false)}
                    />
                </CreateDialog>

                <UpdateSheet open={openEdit} onClose={() => setOpenEdit(false)} title="Edit User">
                    <UsersForm
                        roleOptions={roleOptions}
                        method="put"
                        submitRoute="/users"
                        initialData={selected}
                        onSuccess={() => setOpenEdit(false)}
                    />
                </UpdateSheet>

                <DeleteDialog
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    items={selected?.id}
                    url="/users"
                    label={selected?.nama}
                />
            </div>
        </AppLayout>
    )
}
