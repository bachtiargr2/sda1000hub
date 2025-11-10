import { useRef, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import pulau from '@/routes/pulau';
import { type BreadcrumbItem, type Pulau } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table/app-table';
import { getColumns } from '@/components/data-table/columns/pulau-table-column';
import { TableToolbarActions } from '@/components/toolbar/table-toolbar-actions';
import { CreateDialog } from '@/components/toolbar/create-dialog';
import { UpdateSheet } from '@/components/toolbar/update-sheet';
import PulauForm from '@/components/forms/pulau-form';
import { DeleteDialog } from '@/components/toolbar/delete-dialog';
import { TableFilter } from '@/components/data-table/filters/filter-popover';
import { Badge } from '@/components/ui/badge';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data Pulau',
        href: pulau.index().url,
    },
];

export default function Pulau() {
    const { pulau } = usePage<any>().props
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
        router.get('/master-data/pulau', newFilters, { preserveState: true })
      }

      const handleReset = () => {
        setFilters({ nama: "", longitude: "", latitude: "" })
        router.get('/master-data/pulau', {}, { preserveState: true })
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
            <Head title="Master Data Pulau" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    title="Pulau"
                    desc="Master data pulau"
                    columns={columns}
                    data={pulau.data}
                    toolbar={
                        <TableToolbarActions title="Pulau" onCreate={() => setOpenCreate(true)}>
                            <TableFilter
                                fields={[
                                { key: "nama", label: "Nama Pulau", type: "text" },
                                { key: "longitude", label: "Longitude", type: "number" },
                                { key: "latitude", label: "Latitude", type: "number" },
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
                <CreateDialog open={openCreate} onClose={() => setOpenCreate(false)} title="Pulau">
                    <PulauForm submitRoute="/master-data/pulau" onSuccess={() => setOpenCreate(false)} />
                </CreateDialog>

                <UpdateSheet open={openEdit} onClose={() => setOpenEdit(false)} title="Edit Pantai">
                    <PulauForm method="put" submitRoute="/master-data/pulau" initialData={selected} onSuccess={() => setOpenEdit(false)} />
                </UpdateSheet>

                <DeleteDialog
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    items={selected?.id}
                    url="/master-data/pulau"
                    label={selected?.nama}
                />
            </div>
        </AppLayout>
    );
}
