"use client";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { displayMyRepositories } from "@/api/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Scale, BookOpen, GraduationCap, Boxes, HandCoins, Cpu, Coffee, Banana, Bean, UserRoundPen, SlidersHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RepositoryInterface } from "@/interface/repository.interface";
import { Input } from "@/components/ui/input";
import RepositoryFilterSearch from "../interaction-elements/RepositoryFilterSearch";
import Link from "next/link";

const categoryIcons = {
  "Policy Brief": Scale,
  "Paper": BookOpen,
  "Research Project": GraduationCap,
};

const focusIcons = {
  "Clustering": Boxes,
  "Value Adding": HandCoins,
  "Technology": Cpu,
};

const commodityIcons = {
  "Cacao": Bean,
  "Coffee": Coffee,
  "Cavendish Banana": Banana,
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function DisplayRepositories() {
  const [repositories, setRepositories] = useState<RepositoryInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});

  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);
  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    focuses: [] as string[],
    commodities: [] as string[],
    startYear: '',
    endYear: ''
  });
  const fuse = useMemo(() => {
    if (repositories.length === 0) return null;
    return new Fuse(repositories, {
      keys: [
        'title',
        'description',
        'author_names',
        'select_category',
        'select_focus',
        'select_commodity'
      ],
      threshold: 0.3,
      minMatchCharLength: 2,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [repositories]);
 // Combined filter function
 const filteredRepositories = useMemo(() => {
  let results = repositories;
  
  // Apply search
  if (debouncedSearchKeyword && fuse) {
    results = fuse.search(debouncedSearchKeyword).map(result => result.item);
  }

  // Apply filters
  return results.filter(repo => {
    // Category filter
    if (activeFilters.categories.length > 0 && 
        !activeFilters.categories.includes(repo.select_category)) {
      return false;
    }

    // Focus filter
    if (activeFilters.focuses.length > 0 && 
        !activeFilters.focuses.includes(repo.select_focus)) {
      return false;
    }

    // Commodity filter
    if (activeFilters.commodities.length > 0 && 
        !activeFilters.commodities.includes(repo.select_commodity)) {
      return false;
    }

    // Year filter
    const repoYear = new Date(repo.date_published).getFullYear();
    if (activeFilters.startYear && activeFilters.startYear !== "any" && 
        repoYear < parseInt(activeFilters.startYear)) {
      return false;
    }
    if (activeFilters.endYear && activeFilters.endYear !== "any" && 
        repoYear > parseInt(activeFilters.endYear)) {
      return false;
    }


    return true;
  });
}, [repositories, debouncedSearchKeyword, fuse, activeFilters]);
  const fetchRepositories = async () => {
    try {
      const data = await displayMyRepositories();
      setRepositories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching repositories:", err);
      setError("Failed to load repositories.");
    }
  };

  const toggleDescription = (repoId: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [repoId]: !prev[repoId]
    }));
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <div className="max-w-screen px-5 py-5">
      <div className="flex flex-col gap-4 w-full">
        {/* Banner + Search/Filter row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          {/* Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#f0f4ff] to-[#f9faff] border border-blue-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">Your Gateway to Insightful Repositories</h2>
            <p className="text-sm text-gray-600 mt-1">
              Browse through a collection of research projects, policy briefs, and papers submitted by partner institutions. 
              Use the filter or search tools to find specific topics or contributors.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Input
              type="search"
              placeholder="Search..."
               className="w-full md:w-95"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button variant="outline" onClick={() => setOpen(!open)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Repository List or Error */}
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredRepositories.length === 0 ? (
          <p className="text-gray-500">No repositories found.</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-2">
            {/* Cards Section */}
            <div className="grid grid-cols-1 gap-6 flex-1">
              {filteredRepositories.map((repo) => {
                const CategoryIcon = categoryIcons[repo.select_category as keyof typeof categoryIcons];
                const FocusIcon = focusIcons[repo.select_focus as keyof typeof focusIcons];
                const CommodityIcon = commodityIcons[repo.select_commodity as keyof typeof commodityIcons];
                const isExpanded = expandedDescriptions[repo.id] || false;

                return (
                  <Card key={repo.id} className="shadow-md bg-white p-4">
                    <CardHeader>
                      <CardTitle>{repo.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label className="text-gray-600">Published on: {repo.date_published}</Label>
                      <div className="flex flex-wrap gap-2 mt-2 items-center">
                        <Badge variant="lightGreen" className="flex items-center gap-1">
                          {CategoryIcon && <CategoryIcon className="w-4 h-4" />}
                          {repo.select_category}
                        </Badge>
                        <Badge variant="darkGreen" className="flex items-center gap-1">
                          {FocusIcon && <FocusIcon className="w-4 h-4" />}
                          {repo.select_focus}
                        </Badge>
                        <Badge variant="oppositeGreen" className="flex items-center gap-1">
                          {CommodityIcon && <CommodityIcon className="w-4 h-4" />}
                          {repo.select_commodity}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <UserRoundPen />
                        <Label>{repo.author_names}</Label>
                      </div>
                    </CardContent>
                    <Separator />
                    <CardContent>
                      <div>
                        <p className="text-gray-700">
                          {isExpanded ? repo.description : `${repo.description.substring(0, 150)}...`}
                        </p>
                        {repo.description.length > 150 && (
                          <button
                            onClick={() => toggleDescription(repo.id.toString())}
                            className="text-blue-600 hover:underline text-sm mt-1"
                          >
                            {isExpanded ? "[See Less]" : "[See More]"}
                          </button>
                        )}
                      </div>
                    </CardContent>
                    <CardContent>
                      <Label>
                        Visit the Link:{" "}
                        <Link
                          href={repo.url_repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline mt-2 block"
                        >
                          {repo.url_repository}
                        </Link>
                      </Label>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Filter Sidebar */}
            <div className="w-full md:w-72 p-2">
              <RepositoryFilterSearch
                open={open}
                onApplyFilters={setActiveFilters}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}