import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useTransition } from "react"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { LoaderIcon } from "lucide-react"
import { SheetClose, SheetFooter } from "@/components/ui/sheet"
import InputError from "../input-error"
import { createData } from "@/utils/create"
import { updateData } from "@/utils/update"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type UsersFormProps = {
  roleOptions: { id: number; nama: string }[]
  initialData?: any
  onSuccess?: () => void
  submitRoute: string
  method?: "post" | "put"
}

export default function UsersForm({
  roleOptions,
  initialData,
  onSuccess,
  submitRoute,
  method = "post",
}: UsersFormProps) {
  const [isPending, startTransition] = useTransition()
  const { data, setData, errors, reset, setError } = useForm({
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      password: initialData?.password ?? "",
      role_id: initialData?.role_id ?? "",
  })

  const handleChange = (field: keyof typeof data, value: any) => {
    setData(field, value)
    if (errors[field]) setError(field, "")
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    startTransition(() => {
      if (method === "put" && initialData?.id) {
        updateData({
          url: submitRoute,
          id: initialData.id,
          data,
          label: "User",
          onSuccess,
        })
      } else {
        createData({
          url: "/users",
          data,
          label: "User",
          onSuccess: () => {
            reset()
            onSuccess?.()
          },
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className={cn("flex flex-col gap-4", method === "put" && "px-4")}>
        <div>
            <Label className={errors.name && "text-red-500"}>
            Nama<span className="text-red-500">*</span>
            </Label>
            <Input
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Masukkan nama user"
            className={errors.name && "border-red-500 placeholder:text-red-500"}
            />
            {errors.name && <InputError message={errors.name} />}
        </div>
        <div>
            <Label className={errors.email && "text-red-500"}>
            Email<span className="text-red-500">*</span>
            </Label>
            <Input
            value={data.email}
            type="email"
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Masukkan email"
            className={errors.email && "border-red-500 placeholder:text-red-500"}
            />
            {errors.email && <InputError message={errors.email} />}
        </div>
        <div>
            <Label className={errors.password && "text-red-500"}>
            Password<span className={method === "post" ? "text-red-500" : "hidden"}>*</span>
            </Label>
            <Input
            value={data.password}
            type="password"
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Masukkan password"
            className={errors.password && "border-red-500 placeholder:text-red-500"}
            />
            {errors.password && <InputError message={errors.password} />}
        </div>
        <div>
          <Label>Role<span className="text-red-500">*</span></Label>
          <Select
                value={data.role_id?.toString() ?? ""}
                onValueChange={(value) => handleChange("role_id", Number(value))}
            >
                <SelectTrigger>
                    <SelectValue placeholder="-- Pilih role --" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {roleOptions.map((role) => (
                            <SelectItem key={role.id} value={role.id.toString()}>{role.nama}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
          {errors.role_id && <InputError message={errors.role_id} />}
        </div>
      </div>

      {method === "post" ? (
        <DialogFooter className="gap-2 pt-2 sm:space-x-0">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending}>
            {isPending && <LoaderIcon className="mr-1.5 size-4 animate-spin" />}
            Create
          </Button>
        </DialogFooter>
      ) : (
        <SheetFooter className="gap-2 pt-2 sm:space-x-0">
          <SheetClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </SheetClose>
          <Button disabled={isPending}>
            {isPending && <LoaderIcon className="mr-1.5 size-4 animate-spin" />}
            Save
          </Button>
        </SheetFooter>
      )}
    </form>
  )
}
