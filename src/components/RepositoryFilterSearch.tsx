"use client"

import * as React from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Scale,
  BookOpen,
  GraduationCap,
  Boxes,
  HandCoins,
  Cpu,
  Bean,
  Coffee,
  Banana,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { useState } from "react"

const categoryIcons: Record<string, React.ElementType> = {
  "Policy Brief": Scale,
  "Paper": BookOpen,
  "Research Project": GraduationCap,
}

const focusIcons: Record<string, React.ElementType> = {
  "Clustering": Boxes,
  "Value Adding": HandCoins,
  "Technology": Cpu,
}

const commodityIcons: Record<string, React.ElementType> = {
  "Cacao": Bean,
  "Coffee": Coffee,
  "Cavendish Banana": Banana,
}

type FilterState = {
  categories: string[]
  focuses: string[]
  commodities: string[]
  start_date: string
  end_date: string
  authors: string[]
}

type Props ={
    open: boolean;
}
export default function RepositoryFilterSearch({
    open,
  }: Props) {
  const [categories, setCategories] = useState<string[]>([])
  const [focuses, setFocuses] = useState<string[]>([])
  const [commodities, setCommodities] = useState<string[]>([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [authorInput, setAuthorInput] = useState("")
  const [authors, setAuthors] = useState<string[]>([])

  // New state variable to toggle visibility of the filter panel
  const [isOpen, setIsOpen] = useState(false)

  const handleCheckboxChange = (
    value: string,
    currentValues: string[],
    setValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    setValues(newValues)
  }

  const clearFilters = () => {
    setCategories([])
    setFocuses([])
    setCommodities([])
    setStartDate("")
    setEndDate("")
    setAuthors([])
  }

  const handleAdd = () => {
    console.log("Active filters:", {
      categories,
      focuses,
      commodities,
      start_date: startDate,
      end_date: endDate,
      authors,
    })
  }

  const handleAddAuthor = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ((e as React.KeyboardEvent).key === "Enter" || e.type === "click") {
      e.preventDefault()
      if (authorInput.trim()) {
        setAuthors((prev) => [...prev, authorInput.trim()])
        setAuthorInput("")
      }
    }
  }

  const removeAuthor = (index: number) => {
    setAuthors((prev) => prev.filter((_, i) => i !== index))
  }

  const [fromYear, setFromYear] = useState("1976")
  const currentYear = new Date().getFullYear()
  const [toYear, setToYear] = useState(String(currentYear))

  // Generate ascending years from 1976 to current year for the "From" select
  const ascendingYears = Array.from(
    { length: currentYear - 1976 + 1 },
    (_, i) => 1976 + i
  )

  // Generate descending years from current year to 1976 for the "To" select
  const descendingYears = Array.from(
    { length: currentYear - 1976 + 1 },
    (_, i) => currentYear - i
  )

  return (
    <div className="w-full">
      {/* Toggle Button */}
      {/* <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filter
        {(categories.length > 0 ||
          focuses.length > 0 ||
          commodities.length > 0 ||
          startDate ||
          endDate ||
          authors.length > 0) && (
          <span className="ml-2">
            (
            {[
              categories.length,
              focuses.length,
              commodities.length,
              startDate ? 1 : 0,
              endDate ? 1 : 0,
              authors.length,
            ].reduce((a, b) => a + b, 0)}
            )
          </span>
        )}
      </Button> */}

      {/* Conditionally Rendered Filter Panel */}
      {open && (
        <div className="mt-4 border p-4 space-y-4 rounded-md bg-white shadow-sm">
          {/* Example: If you want the user to scroll specifically here, wrap the content in a <div className="max-h-96 overflow-y-auto"> */}
          {/* <div className="max-h-96 overflow-y-auto space-y-4"> */}

          {/* Author Filter (Commented out as in your original code snippet) */}
          {/* <div className="space-y-2">
            <label className="text-sm font-medium">Authors</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {authors.map((author, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 text-sm bg-muted rounded-full"
                >
                  {author}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeAuthor(index)}
                  />
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add author..."
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                onKeyDown={handleAddAuthor}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddAuthor}
                disabled={!authorInput.trim()}
              >
                Add
              </Button>
            </div>
          </div> */}

          {/* Publication Year */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Publication Year</label>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <Label htmlFor="year-select-from">From</Label>
                <Select value={fromYear} onValueChange={setFromYear}>
                  <SelectTrigger id="year-select-from">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent>
                    {ascendingYears.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <span className="self-center">–</span>
              <div className="flex flex-col">
                <Label htmlFor="year-select-to">To</Label>
                <Select value={toYear} onValueChange={setToYear}>
                  <SelectTrigger id="year-select-to">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent>
                    {descendingYears.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Category Checkboxes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <div className="space-y-2">
              {Object.entries(categoryIcons).map(([key, IconComponent]) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox
                    id={`category-${key}`}
                    checked={categories.includes(key)}
                    onCheckedChange={() =>
                      handleCheckboxChange(key, categories, setCategories)
                    }
                  />
                  <label
                    htmlFor={`category-${key}`}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{key}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Checkboxes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Focus</label>
            <div className="space-y-2">
              {Object.entries(focusIcons).map(([key, IconComponent]) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox
                    id={`focus-${key}`}
                    checked={focuses.includes(key)}
                    onCheckedChange={() =>
                      handleCheckboxChange(key, focuses, setFocuses)
                    }
                  />
                  <label
                    htmlFor={`focus-${key}`}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{key}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Commodity Checkboxes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Commodity</label>
            <div className="space-y-2">
              {Object.entries(commodityIcons).map(([key, IconComponent]) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox
                    id={`commodity-${key}`}
                    checked={commodities.includes(key)}
                    onCheckedChange={() =>
                      handleCheckboxChange(key, commodities, setCommodities)
                    }
                  />
                  <label
                    htmlFor={`commodity-${key}`}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{key}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="flex-1"
              disabled={
                categories.length === 0 &&
                focuses.length === 0 &&
                commodities.length === 0 &&
                !startDate &&
                !endDate &&
                authors.length === 0
              }
            >
              Clear
            </Button>
            <Button
              variant="default"
              onClick={handleAdd}
              className="flex-1"
              disabled={
                categories.length === 0 &&
                focuses.length === 0 &&
                commodities.length === 0 &&
                !startDate &&
                !endDate &&
                authors.length === 0
              }
            >
              Apply
            </Button>
          </div>

          {/* </div> */}
        </div>
      )}
    </div>
  )
}
