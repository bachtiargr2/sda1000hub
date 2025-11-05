import { useState, useTransition } from "react"
import { router } from "@inertiajs/react"
import { toast } from "sonner"
import { TrashIcon, LoaderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface DeleteDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    data: number | number[]
    url: string
    label?: string
    onSuccess?: () => void
    showTrigger?: boolean
}

export function DeleteDialog({
    data,
    url,
    label = "item",
    onSuccess,
    showTrigger = true,
    ...props
}: DeleteDialogProps) {
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)

    const handleDelete = () => {
        startTransition(() => {
            if (Array.isArray(data)) {
                router.delete(url, {
                  data: { ids: data },
                  onSuccess: () => {
                    toast.success(`${data.length} ${label ?? "item"} deleted successfully`)
                    props.onOpenChange?.(false)
                    onSuccess?.()
                  },
                  onError: () => toast.error("Failed to delete"),
                })
              } else {
                router.delete(`${url}/${data}`, {
                  onSuccess: () => {
                    toast.success(`${label ?? "Item"} deleted successfully`)
                    props.onOpenChange?.(false)
                    onSuccess?.()
                  },
                  onError: () => toast.error("Failed to delete"),
                })
            }
        })
    }

    return (
        <Dialog {...props}>
            {showTrigger && (
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                        Delete
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle><span className="text-muted-foreground">Hapus pulau?</span></DialogTitle>
                    <DialogDescription>
                        <p className="font-medium text-foreground">{label}</p>
                        <p className="pt-3 text-xs text-muted-foreground">
                        Setelah dihapus, data tidak dapat dikembalikan.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending && (
                            <LoaderIcon className="mr-1.5 size-4 animate-spin" aria-hidden="true" />
                        )}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
