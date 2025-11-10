import { useTransition } from "react";
import { LoaderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { deleteData } from "@/utils/delete"

interface DeleteDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    items: number | number[];
    url: string;
    label?: string;
    onSuccess?: () => void;
}

export function DeleteDialog({
    items,
    url,
    label = "item",
    onSuccess,
    ...props
}: DeleteDialogProps) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(() => {
            deleteData({
                url,
                items,
                onSuccess: () => {
                    props.onOpenChange?.(false)
                    onSuccess?.()
                },
            })
        })
    }

    return (
        <Dialog {...props}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apakah Anda benar-benar yakin?</DialogTitle>
                    <DialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus.{" "}
                        <span className="font-medium">{label}</span> secara permanen.
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
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
