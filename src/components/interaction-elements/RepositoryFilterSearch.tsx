'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const categoryIcons: Record<string, React.ElementType> = {
  'Policy Brief': Scale,
  Paper: BookOpen,
  'Research Project': GraduationCap,
};

const focusIcons: Record<string, React.ElementType> = {
  Clustering: Boxes,
  'Value Adding': HandCoins,
  Technology: Cpu,
};

const commodityIcons: Record<string, React.ElementType> = {
  Cacao: Bean,
  Coffee: Coffee,
  'Cavendish Banana': Banana,
};

type Props = {
  open: boolean;
  onApplyFilters: (filters: {
    categories: string[];
    focuses: string[];
    commodities: string[];
    startYear: string;
    endYear: string;
  }) => void;
};

export default function RepositoryFilterSearch({ open, onApplyFilters }: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [focuses, setFocuses] = useState<string[]>([]);
  const [commodities, setCommodities] = useState<string[]>([]);
  const [fromYear, setFromYear] = useState('');
  const [toYear, setToYear] = useState('');
  const currentYear = new Date().getFullYear();

  const ascendingYears = Array.from({ length: currentYear - 1976 + 1 }, (_, i) => 1976 + i);

  const descendingYears = Array.from({ length: currentYear - 1976 + 1 }, (_, i) => currentYear - i);

  const handleCheckboxChange = (
    value: string,
    currentValues: string[],
    setValues: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setValues(newValues);
  };

  const clearFilters = () => {
    setCategories([]);
    setFocuses([]);
    setCommodities([]);
    setFromYear('');
    setToYear('');
    onApplyFilters({
      categories: [],
      focuses: [],
      commodities: [],
      startYear: '',
      endYear: '',
    });
  };

  const handleApply = () => {
    onApplyFilters({
      categories,
      focuses,
      commodities,
      startYear: fromYear,
      endYear: toYear,
    });
  };

  return (
    <div className="w-full">
      {open && (
        <div className="border p-4 space-y-4 rounded-md bg-white shadow-sm">
          {/* Publication Year Filter */}
          <div className="space-y-2">
            <Label>Publication Year</Label>
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <Select value={fromYear} onValueChange={setFromYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Add "any" as special value instead of empty string */}
                    <SelectItem value="any">Any</SelectItem>
                    {ascendingYears.map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={toYear} onValueChange={setToYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Add "any" as special value instead of empty string */}
                    <SelectItem value="any">Any</SelectItem>
                    {descendingYears.map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <Label>Category</Label>
            {Object.entries(categoryIcons).map(([key, Icon]) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${key}`}
                  checked={categories.includes(key)}
                  onCheckedChange={() => handleCheckboxChange(key, categories, setCategories)}
                />
                <Label htmlFor={`cat-${key}`} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {key}
                </Label>
              </div>
            ))}
          </div>

          {/* Focus Filter */}
          <div className="space-y-2">
            <Label>Focus</Label>
            {Object.entries(focusIcons).map(([key, Icon]) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  id={`focus-${key}`}
                  checked={focuses.includes(key)}
                  onCheckedChange={() => handleCheckboxChange(key, focuses, setFocuses)}
                />
                <Label htmlFor={`focus-${key}`} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {key}
                </Label>
              </div>
            ))}
          </div>

          {/* Commodity Filter */}
          <div className="space-y-2">
            <Label>Commodity</Label>
            {Object.entries(commodityIcons).map(([key, Icon]) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  id={`com-${key}`}
                  checked={commodities.includes(key)}
                  onCheckedChange={() => handleCheckboxChange(key, commodities, setCommodities)}
                />
                <Label htmlFor={`com-${key}`} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {key}
                </Label>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearFilters} className="flex-1">
              Clear
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
