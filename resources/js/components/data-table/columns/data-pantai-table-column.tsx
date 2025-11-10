import { DataAnggaran } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import StatusColumn from '@/components/status-column'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export const getColumns = (
    onDownload: (item: DataAnggaran) => void,
    onEdit: (item: DataAnggaran) => void,
    onDelete: (item: DataAnggaran) => void,
): ColumnDef<DataAnggaran>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorFn: row => row.pulau?.nama ?? '-', header: 'Pulau' },
    { accessorFn: row => row.jenis_data?.nama ?? '-', header: 'Jenis Data' },
    { accessorKey: 'tahun', header: 'Tahun' },
    {
        accessorKey: 'dokumen_nama',
        header: 'Nama Dokumen',
        cell: ({ row }) => (
            <div className="max-w-52 whitespace-normal wrap-break-word">
                {row.getValue('dokumen_nama')}
            </div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusColumn status={row.original?.status} />
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const item = row.original;

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Tindakan</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => onDownload(item)}>
                                Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onEdit(item)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onDelete(item)}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]
