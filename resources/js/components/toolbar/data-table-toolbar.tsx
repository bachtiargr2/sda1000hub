import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { PlusIcon } from "lucide-react"
import PulauForm from "../forms/pulau-form"
import pulau from "@/routes/pulau"
import UsersForm from "../forms/users-form"

export function CreateUsersDialog({roleOptions}:any) {
    const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button size="sm">
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                Tambah User
            </Button>
        </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah user</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new user.
          </DialogDescription>
        </DialogHeader>
        <UsersForm roleOptions={roleOptions} submitRoute={pulau.store().url} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
