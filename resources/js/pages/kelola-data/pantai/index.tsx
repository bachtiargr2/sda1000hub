import { useRef, useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import dataPantaiRoutes from '@/routes/kelola-data/pantai';
import { DataTable } from '@/components/data-table/app-table';
import { getColumns } from '@/components/data-table/columns/data-pantai-table-column';
import { Head, router, usePage } from '@inertiajs/react';
import { DeleteDialog } from '@/components/toolbar/delete-dialog';
import { UpdateSheet } from '@/components/toolbar/update-sheet';
import { CreateDialog } from '@/components/toolbar/create-dialog';
import { TableToolbarActions } from '@/components/toolbar/table-toolbar-actions';
import { TableFilter } from '@/components/data-table/filters/filter-popover';
import DataPantaiForm from '@/components/forms/data-pantai-form';
import { DownloadDialog } from '@/components/toolbar/download-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Pantai',
        href: dataPantaiRoutes.index().url,
    },
]

export default function DataPantaiPage() {
    const { data_pantai, pulauOptions = [], jenisDataOptions = [], statusOptions = [], filters: initialFilters } = usePage<{
        data_pantai?: any;
        pulauOptions?: { id: number; nama: string }[];
        jenisDataOptions?: { id: number; nama: string }[];
        statusOptions?: { id: number; nama: string }[];
        filters: Record<string, string>;
    }>().props;
    const [openCreate, setOpenCreate] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [selected, setSelected] = useState<any>(null)
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [filters, setFilters] = useState<Record<string, string>>(initialFilters ||{
        pulau: "",
        id_jenis_data: "",
        tahun: "",
        dokumen_nama: "",
        status: "",
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
        router.get('/kelola-data/pantai', newFilters, { preserveState: true, replace: true })
    }

    const handleReset = () => {
        setFilters({ pulau: "", id_jenis_data: "", tahun: "", dokumen_nama: "", status: "" })
        router.get('/kelola-data/pantai', {}, { preserveState: true })
    }

    const handleDownload = (item: any) => {
        setSelected(item)
        setOpenDownload(true)
    }

    const handleEdit = (item: any) => {
        setSelected(item)
        setOpenEdit(true)
    }

    const handleDelete = (item: any) => {
        setSelected(item)
        setOpenDelete(true)
    }

    const columns = getColumns(handleDownload, handleEdit, handleDelete);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Pantai" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    title="Data Pantai"
                    desc="Data anggaran khusus kategori pantai"
                    columns={columns}
                    data={data_pantai.data}
                    toolbar={
                        <TableToolbarActions title="Data Pantai" onCreate={() => setOpenCreate(true)}>
                            <TableFilter
                                fields={[
                                    { key: "pulau", label: "Nama Pulau", type: "text" },
                                    { key: "id_jenis_data", label: "Jenis Data", type: "select", options: jenisDataOptions },
                                    { key: "tahun", label: "Tahun", type: "year" },
                                    { key: "dokumen_nama", label: "Nama Dokumen", type: "text" },
                                    { key: "status", label: "Status", type: "select", options: statusOptions },
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
                <CreateDialog open={openCreate} onClose={() => setOpenCreate(false)} title="Data Pantai">
                    <DataPantaiForm
                        pulauOptions={pulauOptions}
                        jenisDataOptions={jenisDataOptions}
                        statusOptions={statusOptions}
                        submitRoute="/kelola-data/pantai"
                        onSuccess={() => setOpenCreate(false)}
                    />
                </CreateDialog>

                <UpdateSheet open={openEdit} onClose={() => setOpenEdit(false)} title="Edit Data Pantai">
                    <DataPantaiForm
                        pulauOptions={pulauOptions}
                        jenisDataOptions={jenisDataOptions}
                        statusOptions={statusOptions}
                        method="put"
                        submitRoute="/kelola-data/pantai"
                        initialData={selected}
                        onSuccess={() => setOpenEdit(false)}
                    />
                </UpdateSheet>

                <DeleteDialog
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    items={selected?.id}
                    url="/kelola-data/pantai"
                    label={selected?.nama}
                />
            </div>
        </AppLayout>
    );
}
