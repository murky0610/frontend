"use client";
import * as React from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
} from "@/components/ui/select";
import { addRepositorySchema, AddRepositoryType } from "@/schema/addrepository.schema";
import { addMyRepository } from "@/api/api";
import { toast } from "sonner"
interface ModalAddRepositoryProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onSuccess: () => void;
}

// Icon mappings for each select option (keys must match the select item values)
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


export default function ModalAddRepository({
  open,
  onClose,
  onSuccess,
  
}: ModalAddRepositoryProps) {
  const [formData, setFormData] = useState<Omit<AddRepositoryType, 'id' | 'user'>>({
    title: '',
    description: '',
    author_names: '',
    url_repository: '',
    date_published: '',
    select_focus: '',
    select_commodity: '',
    select_category: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const handleInputChange = (field: keyof typeof formData, value: string) => {
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

// In your ModalAddRepository component's submit handler
const handleSubmit = async () => {
  setErrors({}); // Clear any previous errors

  // Validate form data with Zod
  const validation = addRepositorySchema.safeParse(formData);
  if (!validation.success) {
    // ❌ Validation error
    const formattedErrors = validation.error.format();
    const newErrors: Record<string, string[]> = {};

    Object.entries(formattedErrors).forEach(([key, val]) => {
      if (typeof val === "object" && "_errors" in val) {
        newErrors[key] = val._errors;
      } else {
        newErrors[key] = [];
      }
    });

    setErrors(newErrors);
    return;
  }

  // ✅ Data is valid, proceed with API call
  try {
    await addMyRepository(formData);
    console.log("this is the passed data:", formData);

    // If backend returns the final repository data, you could re-validate or just trust your own form
    // const validatedResponse = addRepositorySchema.parse(response.data);

    toast("Repository added successfully!");
    onSuccess();
    onClose();
  } catch (error) {
    console.error("Failed to create repository:", error);
    toast("Error adding repository");
  }
};

if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Card className="w-full max-w-4xl shadow-lg rounded-lg">
        <CardHeader>
          {/* Header remains the same */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Title</Label>
                <Input 
                  id="name" 
                  placeholder="Name of your project"
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
                {/* Category */}
                <div className="w-48 space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange('select_category', value)}
                    value={formData.select_category}
                  >
                    <SelectTrigger id="category">
                      {formData.select_category ? (
                        <div className="flex items-center gap-2">
                          {categoryIcons[formData.select_category] && 
                            React.createElement(categoryIcons[formData.select_category], { className: "w-4 h-4" })}
                          <span>{formData.select_category}</span>
                        </div>
                      ) : (
                        "Select Category"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {renderSelectItems(categoryIcons)}
                    </SelectContent>
                  </Select>
                  {errors.select_category?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
                </div>

                {/* Focus */}
                <div className="w-48 space-y-1.5">
                  <Label htmlFor="focus">Focus</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange('select_focus', value)}
                    value={formData.select_focus}
                  >
                    <SelectTrigger id="focus">
                      {formData.select_focus ? (
                        <div className="flex items-center gap-2">
                          {focusIcons[formData.select_focus] && 
                            React.createElement(focusIcons[formData.select_focus], { className: "w-4 h-4" })}
                          <span>{formData.select_focus}</span>
                        </div>
                      ) : (
                        "Select Focus"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {renderSelectItems(focusIcons)}
                    </SelectContent>
                  </Select>
                  {errors.select_focus?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
                </div>

                {/* Commodity */}
                <div className="w-48 space-y-1.5">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange('select_commodity', value)}
                    value={formData.select_commodity}
                  >
                    <SelectTrigger id="commodity">
                      {formData.select_commodity ? (
                        <div className="flex items-center gap-2">
                          {commodityIcons[formData.select_commodity] && 
                            React.createElement(commodityIcons[formData.select_commodity], { className: "w-4 h-4" })}
                          <span>{formData.select_commodity}</span>
                        </div>
                      ) : (
                        "Select Commodity"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {renderSelectItems(commodityIcons)}
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
                  placeholder="Add Authors"
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
                  placeholder="Type your message here."
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
                  placeholder="Add Link or the File itself"
                  value={formData.url_repository}
                  onChange={(e) => handleInputChange('url_repository', e.target.value)}
                />
              </div>
              {errors.url_repository?.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
