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
import { useState, useTransition } from "react"
import { Download, LoaderIcon, PlusIcon } from "lucide-react"
import PulauForm from "../forms/pulau-form"
import pulau from "@/routes/pulau"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { router } from "@inertiajs/react"
import { toast } from "sonner"

export function DownloadDialog({ nama, path }: any) {
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)

    const handleDownload = () => {
        startTransition(() => {
            const url = `/download/${path}/${nama}`;
            window.location.href = url;
            setOpen(false);
            toast.success(`Dokumen "${nama}" sedang diunduh. Cek di folder Download.`)
        })
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 size-4" aria-hidden="true" />
                <span className="font-normal whitespace-normal text-left break-words">{nama}</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Klik untuk Mengunduh</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
            <DialogTitle><span className="text-muted-foreground">Unduh dokumen?</span></DialogTitle>
                <DialogDescription>
                    <p className="font-medium text-foreground">{nama}</p>
                    <p className="pt-3 text-xs text-muted-foreground">
                        Cek file di folder Download.setelah mengunduh
                    </p>
                </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
                variant="default"
                onClick={handleDownload}
                disabled={isPending}
            >
                {isPending && (
                    <LoaderIcon className="mr-1.5 size-4 animate-spin" aria-hidden="true" />
                )}
                Download
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
