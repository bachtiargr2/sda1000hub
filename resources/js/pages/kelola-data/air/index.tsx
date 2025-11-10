import { DataTable } from '@/components/data-table/app-table'
import { getColumns } from '@/components/data-table/columns/data-air-table-column'
import AppLayout from '@/layouts/app-layout'
import dataAirRoutes from '@/routes/kelola-data/air'
import { type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { useRef, useState } from 'react'
import { TableToolbarActions } from '@/components/toolbar/table-toolbar-actions'
import { TableFilter } from '@/components/data-table/filters/filter-popover'
import { DownloadDialog } from '@/components/toolbar/download-dialog'
import { CreateDialog } from '@/components/toolbar/create-dialog'
import { UpdateSheet } from '@/components/toolbar/update-sheet'
import { DeleteDialog } from '@/components/toolbar/delete-dialog'
import DataAirForm from '@/components/forms/data-air-form'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Air Bersih',
        href: dataAirRoutes.index().url,
    },
]

export default function DataAirPage() {
    const { data_air, pulauOptions = [], jenisDataOptions = [], statusOptions = [], filters: initialFilters } = usePage<{
        data_air?: any;
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

    const [filters, setFilters] = useState<Record<string, string>>(initialFilters || {
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
        router.get('/kelola-data/air', newFilters, { preserveState: true, replace: true })
    }

    const handleReset = () => {
        setFilters({ pulau: "", id_jenis_data: "", tahun: "", dokumen_nama: "", status: "" })
        router.get('/kelola-data/air', {}, { preserveState: true })
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
            <Head title="Data Air Bersih" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    title="Data Air Bersih"
                    desc="Data anggaran khusus kategori air bersih"
                    columns={columns}
                    data={data_air.data}
                    toolbar={
                        <TableToolbarActions title="Data Air Bersih" onCreate={() => setOpenCreate(true)}>
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
                <CreateDialog open={openCreate} onClose={() => setOpenCreate(false)} title="Data Air Bersih">
                    <DataAirForm
                        pulauOptions={pulauOptions}
                        jenisDataOptions={jenisDataOptions}
                        statusOptions={statusOptions}
                        submitRoute="/kelola-data/air"
                        onSuccess={() => setOpenCreate(false)}
                    />
                </CreateDialog>

                <UpdateSheet open={openEdit} onClose={() => setOpenEdit(false)} title="Edit Data Air Bersih">
                    <DataAirForm
                        pulauOptions={pulauOptions}
                        jenisDataOptions={jenisDataOptions}
                        statusOptions={statusOptions}
                        method="put"
                        submitRoute="/kelola-data/air"
                        initialData={selected}
                        onSuccess={() => setOpenEdit(false)}
                    />
                </UpdateSheet>

                <DeleteDialog
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    items={selected?.id}
                    url="/kelola-data/air"
                    label={selected?.nama}
                />
            </div>
        </AppLayout>
    );
}
