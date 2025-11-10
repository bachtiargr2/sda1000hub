// import { useEffect, useState } from "react"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { FilterIcon, SearchIcon, X, XIcon } from "lucide-react"
// import { router } from "@inertiajs/react"

// interface FilterField {
//     key: string;
//     label: string;
//     type: "text" | "select";
//     options?: { label: string; value: string }[];
// }

// interface TableFilterProps {
//     fields: FilterField[];
//     url: string;
//     initialFilters?: Record<string, string>;
// }


// export function TableFilter({
//   fields,
//   url,
//   initialFilters = {},
// }: TableFilterProps) {
//   const [open, setOpen] = useState(false)
//   const [filters, setFilters] = useState<Record<string, string>>(initialFilters)

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="outline" size="sm">
//           <FilterIcon className="mr-2 size-4" aria-hidden="true" />
//           Filter
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-96" align="end">
//         <div className="space-y-4">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h4 className="text-sm">Filter Data</h4>
//                     <p className="text-xs text-slate-500">
//                     Sesuaikan kriteria pencarian
//                     </p>
//                 </div>
//                 {/* {hasActiveFilters && ( */}
//                     <Button
//                     variant="ghost"
//                     size="sm"
//                     // onClick={clearFilters}
//                     className="gap-1 h-8"
//                     >
//                     <X className="h-3 w-3" />
//                     Reset
//                     </Button>
//                 {/* )} */}
//             </div>
//           {fields.map((field) => (
//             <div key={field.key} className="space-y-2">
//               <Label htmlFor={field.key}>{field.label}</Label>
//               <div className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                 <Input
//                     id={field.key}
//                     value={filters[field.key] || ""}
//                     onChange={e => handleChange(field.key, e.target.value)}
//                     placeholder={`Cari ${field.label.toLowerCase()}...`}
//                     className="pl-10"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }


// import { useState } from "react"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { FilterIcon, XIcon } from "lucide-react"

// interface FilterField {
//   key: string
//   label: string
//   placeholder?: string
// }

// interface TableFilterProps {
//   fields: FilterField[]
//   values: Record<string, string>
//   onChange: (key: string, value: string) => void
//   onApply: () => void
//   onReset: () => void
// }

// export function TableFilter({
//   fields,
//   values,
//   onChange,
//   onApply,
//   onReset,
// }: TableFilterProps) {
//   const [open, setOpen] = useState(false)

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="outline" size="sm" className="flex items-center gap-2">
//           <FilterIcon className="size-4" />
//           Filter
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-72 p-4 space-y-4" align="end">
//         <div className="space-y-3">
//           {fields.map((field) => (
//             <div key={field.key} className="space-y-1.5">
//               <Label htmlFor={field.key}>{field.label}</Label>
//               <Input
//                 id={field.key}
//                 value={values[field.key] ?? ""}
//                 onChange={(e) => onChange(field.key, e.target.value)}
//                 placeholder={field.placeholder ?? `Cari ${field.label.toLowerCase()}...`}
//               />
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-end gap-2 pt-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => {
//               onReset()
//               setOpen(false)
//             }}
//           >
//             <XIcon className="mr-1 size-4" /> Reset
//           </Button>
//           <Button
//             size="sm"
//             onClick={() => {
//               onApply()
//               setOpen(false)
//             }}
//           >
//             Terapkan
//           </Button>
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FilterIcon, Search, XIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { YearPicker } from "@/components/year-picker"

interface FilterOption {
    id: string | number
    nama: string
}

interface FilterField {
    key: string
    label: string
    type?: string
    placeholder?: string
    options?: FilterOption[]
}

interface TableFilterProps {
    fields: FilterField[]
    values: Record<string, string>
    onChange: (key: string, value: string) => void
    onReset: () => void
}

export function TableFilter({
    fields,
    values,
    onChange,
    onReset,
}: TableFilterProps) {
    const [open, setOpen] = useState(false)

    const handleChange = (key: string, value: string) => {
        onChange(key, value)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FilterIcon className="size-4" />
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" align="end">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm">Filter Data</h4>
                            <p className="text-xs text-slate-500">
                                Sesuaikan kriteria pencarian
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 h-8"
                            onClick={() => {
                                onReset()
                                setOpen(false)
                            }}
                        >
                            <XIcon className="mr-1 size-4" /> Reset
                        </Button>
                    </div>
                    {fields.map((field) => (
                        <div key={field.key} className="space-y-2">
                            <Label htmlFor={field.key}>{field.label}</Label>
                            {field.type === "select" ? (
                                <Select
                                    value={values[field.key] ?? ""}
                                    onValueChange={(value) => handleChange(field.key, value === "all" ? "" : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={`-- Pilih ${field.label} --`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua</SelectItem>
                                        {field.options?.map((option) => (
                                            <SelectItem key={option.id} value={String(option.id)}>
                                                {option.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : field.type === "year" ? (
                                <YearPicker
                                    value={Number(values[field.key]) ?? ""}
                                    onChange={(value) => handleChange(field.key, String(value))}
                                    placeholder="Pilih tahun"
                                    minYear={1950}
                                    maxYear={new Date().getFullYear()}
                                />
                            ) : (
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id={field.key}
                                    value={values[field.key] ?? ""}
                                    type={field.type}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    placeholder={field.placeholder ?? `Cari ${field.label.toLowerCase()}...`}
                                    className="pl-10"
                                />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

