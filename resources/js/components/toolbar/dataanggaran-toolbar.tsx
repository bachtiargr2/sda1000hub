import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function DataAnggaranToolbar({ table, pulauOptions, jenisDataOptions, statusOptions }: any) {
  const [search, setSearch] = useState("")
  const tahunOptions = [...new Set(table.getRowModel().rows.map((r: any) => r.original.tahun))].sort()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    table.getColumn("dokumen_nama")?.setFilterValue(value)
  }

  const handleFilter = (columnId: string, value: any) => {
    table.getColumn(columnId)?.setFilterValue(value === "all" ? undefined : value)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b">
      {/* 🔍 Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Cari dokumen..."
          value={search}
          onChange={handleSearch}
          className="w-64"
        />
      </div>

      {/* 🧭 Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Pulau */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Pulau <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleFilter("pulau.nama", "all")}>Semua</DropdownMenuItem>
            {pulauOptions.map((p: any) => (
              <DropdownMenuItem key={p.id} onClick={() => handleFilter("pulau.nama", p.nama)}>
                {p.nama}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Jenis Data */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Jenis Data <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleFilter("jenis_data.nama", "all")}>Semua</DropdownMenuItem>
            {jenisDataOptions.map((j: any) => (
              <DropdownMenuItem key={j.id} onClick={() => handleFilter("jenis_data.nama", j.nama)}>
                {j.nama}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tahun */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Tahun <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleFilter("tahun", "all")}>Semua</DropdownMenuItem>
            {tahunOptions.map((t: any) => (
              <DropdownMenuItem key={t} onClick={() => handleFilter("tahun", t)}>
                {t}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleFilter("status", "all")}>Semua</DropdownMenuItem>
            {statusOptions.map((s: any) => (
              <DropdownMenuItem key={s.value} onClick={() => handleFilter("status", s.value)}>
                {s.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
