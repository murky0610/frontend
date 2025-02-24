"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import {
  CalendarIcon,
  Scale,
  BookOpen,
  GraduationCap,
  Boxes,
  HandCoins,
  Cpu,
  Bean,
  Coffee,
  Banana,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RepositoryInterface } from "@/interface/repository.interface";
import { editMyRepository } from "@/app/endpoint/api";
import { AddRepositoryType, addRepositorySchema } from "@/schema/addrepository.schema";

import { toast } from "sonner"

interface ModalEditRepositoryProps {
  open: boolean;
  onClose: () => void;
  repository: RepositoryInterface | null;
  onSuccess: () => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  "Policy Brief": Scale,
  "Paper": BookOpen,
  "Research Project": GraduationCap,
};

const focusIcons: Record<string, React.ElementType> = {
  "Clustering": Boxes,
  "Value Adding": HandCoins,
  "Technology": Cpu,
};

const commodityIcons: Record<string, React.ElementType> = {
  "Cacao": Bean,
  "Coffee": Coffee,
  "Cavendish Banana": Banana,
};

export default function ModalEditRepository({
  open,
  onClose,
  repository,
  onSuccess,
}: ModalEditRepositoryProps) {
  const [formData, setFormData] = useState<RepositoryInterface>({
    id: 0,
    title: '',
    description: '',
    author_names: '',
    url_repository: '',
    user: 0,
    date_published: '',
    select_focus: '',
    select_commodity: '',
    select_category: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  useEffect(() => {
    if (repository) {
      setFormData(repository);
    }
  }, [repository]);

  const handleInputChange = (field: keyof RepositoryInterface, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setFormData(prev => ({
        ...prev,
        date_published: formattedDate
      }));
    }
  };

  const renderSelectItems = (items: Record<string, React.ElementType>) => {
    return Object.entries(items).map(([key, IconComponent]) => (
      <SelectItem key={key} value={key}>
        <div className="flex items-center gap-2">
          <IconComponent className="w-4 h-4" />
          <span>{key}</span>
        </div>
      </SelectItem>
    ));
  };
  const renderSelectTrigger = (
    value: string,
    icons: Record<string, React.ElementType>,
    placeholder: string
  ) => {
    const IconComponent = value ? icons[value] : null;
    return (
      <SelectTrigger>
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="w-4 h-4" />}
          {value || placeholder}
        </div>
      </SelectTrigger>
    );
  };
  const handleSubmit = async () => {
      setErrors({}); // Clear any previous errors
    
      // Validate form data with Zod
      const validation = addRepositorySchema.safeParse(formData);
      if (!validation.success) {
        // ❌ Validation error
        const formattedErrors = validation.error.format();
        const newErrors: Record<string, string[]> = {};
    
        Object.entries(formattedErrors).forEach(([key, val]) => {
          if (key !== "_errors") {
            newErrors[key] = val?._errors || [];
          }
        });
    
        setErrors(newErrors);
        return;
      }
    try {
      if (formData.id) {
        await editMyRepository(formData.id, {
          title: formData.title,
          description: formData.description,
          author_names: formData.author_names,
          url_repository: formData.url_repository,
          date_published: formData.date_published,
          select_focus: formData.select_focus,
          select_commodity: formData.select_commodity,
          select_category: formData.select_category
        });
        toast("Repository Edited Successfully!");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Failed to update repository:', error);
    }
  };

  if (!open || !repository) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Card className="w-full max-w-4xl shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between p-5">
            <CardTitle>Edit Repository</CardTitle>
            <Button onClick={onClose}>X</Button>
          </div>
          <CardDescription>Update repository details</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Title</Label>
                <Input 
                  id="name" 
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
                      {errors.title?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
              </div>

              {/* Category, Focus, Commodity */}
              <div className="flex flex-row gap-8">
               {/* Category Select */}
  <div className="w-48 space-y-1.5">
    <Label htmlFor="category">Category</Label>
    <Select
      value={formData.select_category}
      onValueChange={(value) => handleInputChange('select_category', value)}
    >
      {renderSelectTrigger(formData.select_category, categoryIcons, "Select Category")}
      <SelectContent>
        {Object.entries(categoryIcons).map(([key, Icon]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {key}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {errors.select_category?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
  </div>

  {/* Focus Select */}
  <div className="w-48 space-y-1.5">
    <Label htmlFor="focus">Focus</Label>
    <Select
      value={formData.select_focus}
      onValueChange={(value) => handleInputChange('select_focus', value)}
    >
      {renderSelectTrigger(formData.select_focus, focusIcons, "Select Focus")}
      <SelectContent>
        {Object.entries(focusIcons).map(([key, Icon]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {key}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {errors.select_focus?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
  </div>

  {/* Commodity Select */}
  <div className="w-48 space-y-1.5">
    <Label htmlFor="commodity">Commodity</Label>
    <Select
      value={formData.select_commodity}
      onValueChange={(value) => handleInputChange('select_commodity', value)}
    >
      {renderSelectTrigger(formData.select_commodity, commodityIcons, "Select Commodity")}
      <SelectContent>
        {Object.entries(commodityIcons).map(([key, Icon]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {key}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {errors.select_commodity?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
  </div>
              </div>

              {/* Authors */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="authors">Authors</Label>
                <Input 
                  id="authors"
                  value={formData.author_names}
                  onChange={(e) => handleInputChange('author_names', e.target.value)}
                />
                    {errors.authors?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
                    {errors.description?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
              </div>

              {/* Date Published */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="datePublished">Date Published</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !formData.date_published && "text-muted-foreground"
                      )}
                    >
                      {formData.date_published ? 
                        format(new Date(formData.date_published), "PPP") : 
                        <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date_published ? new Date(formData.date_published) : undefined}
                      onSelect={handleDateChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date_published?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
              </div>

              {/* Link */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="link">Link</Label>
                <Input 
                  id="link" 
                  value={formData.url_repository}
                  onChange={(e) => handleInputChange('url_repository', e.target.value)}
                />
                     {errors.url_repository?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}