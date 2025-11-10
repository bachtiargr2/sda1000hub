import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { FormDialogProps } from "@/types"

export function UpdateSheet({
  title,
  open,
  onClose,
  children,
}: FormDialogProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>Perbarui data {title} dan simpan perubahan.</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
