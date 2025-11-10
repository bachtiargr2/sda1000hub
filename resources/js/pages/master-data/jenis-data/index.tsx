import { DataTable } from '@/components/data-table/app-table'
import { getColumns } from '@/components/data-table/columns/jenis-data-table-column'
import AppLayout from '@/layouts/app-layout'
import jenisData from '@/routes/jenis-data'
import { type BreadcrumbItem, type JenisData } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { useRef, useState } from 'react'
import { DeleteDialog } from '@/components/toolbar/delete-dialog'
import { UpdateSheet } from '@/components/toolbar/update-sheet'
import { CreateDialog } from '@/components/toolbar/create-dialog'
import { Badge } from '@/components/ui/badge'
import { TableToolbarActions } from '@/components/toolbar/table-toolbar-actions'
import { TableFilter } from '@/components/data-table/filters/filter-popover'
import JenisDataForm from '@/components/forms/jenis-data-form'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Jenis Data',
        href: jenisData.index().url,
    },
]

export default function JenisDataPage() {
    const { jenis_data } = usePage<any>().props
    const [openCreate, setOpenCreate] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [selected, setSelected] = useState<any>(null)
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [filters, setFilters] = useState({
        nama: "",
        longitude: "",
        latitude: "",
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
        router.get('/master-data/jenis-data', newFilters, { preserveState: true })
    }

    const handleReset = () => {
        setFilters({ nama: "", longitude: "", latitude: "" })
        router.get('/master-data/jenis-data', {}, { preserveState: true })
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Jenis Data" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    title="Jenis Data"
                    desc="Master data jenis data"
                    columns={columns}
                    data={jenis_data.data}
                    toolbar={
                        <TableToolbarActions title="Jenis Data" onCreate={() => setOpenCreate(true)}>
                            <TableFilter
                                fields={[
                                    { key: "nama", label: "Nama Jenis Data", type: "text" },
                                    { key: "deskripsi", label: "Deskripsi", type: "text" },
                                ]}
                                values={filters}
                                onChange={handleFilterChange}
                                onReset={handleReset}
                            />
                        </TableToolbarActions>
                    }
                    badge={
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            {Object.entries(filters)
                                .filter(([_, value]) => value)
                                .map(([key, value]) => (
                                    <Badge key={key} variant="outline" className="gap-1.5">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                                    </Badge>
                                ))}
                        </div>
                    }
                />
                <CreateDialog open={openCreate} onClose={() => setOpenCreate(false)} title="Jenis Data">
                    <JenisDataForm submitRoute="/master-data/jenis-data" onSuccess={() => setOpenCreate(false)} />
                </CreateDialog>

                <UpdateSheet open={openEdit} onClose={() => setOpenEdit(false)} title="Edit Jenis Data">
                    <JenisDataForm method="put" submitRoute="/master-data/jenis-data" initialData={selected} onSuccess={() => setOpenEdit(false)} />
                </UpdateSheet>

                <DeleteDialog
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    items={selected?.id}
                    url="/master-data/jenis-data"
                    label={selected?.nama}
                />
            </div>
        </AppLayout>
    )
}
