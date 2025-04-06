"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { displayMyRepositories } from "@/api/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Scale, BookOpen, GraduationCap, Boxes, HandCoins, Cpu, Coffee, Banana, Bean, UserRoundPen } from "lucide-react";
import ModalAddRepository from "@/components/modal/ModalAddRepository";
import { Separator } from "@/components/ui/separator";
import { RepositoryInterface } from "@/interface/repository.interface";
import ModalEditRepository from "@/components/modal/ModalEditRepostory";

const categoryIcons = { //required only one
  "Policy Brief": Scale,
  "Paper": BookOpen,
  "Research Project": GraduationCap,
};

const focusIcons = { //non required but many
  "Clustering": Boxes,
  "Value Adding": HandCoins,
  "Technology": Cpu,
};

const commodityIcons = {//non required but many
  "Cacao": Bean,
  "Coffee": Coffee,
  "Cavendish Banana": Banana,
};

export function DisplayMyRepositories() {
  const [repositories, setRepositories] = useState<RepositoryInterface[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const [selectedRepo, setSelectedRepo] = useState<RepositoryInterface | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});

  // Fetch repositories function
  const fetchRepositories = async () => {
    try {
      const data = await displayMyRepositories();
      if (Array.isArray(data)) {
        setRepositories(data);
      } else {
        throw new Error("Unexpected API response format");
      }
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

    
    <div className="flex items-center max-w-screen p-5">
      <div className="flex flex-row">
    
      <div className="flex flex-col">
      <div className="flex items-center justify-between max-w-screen p-5">
      <h1 className="text-2xl font-bold">My Repositories</h1>
      <Button onClick={() => setOpen(true)}>Add Entry</Button>
    </div>
        {error ? (
          <p className="text-red-500">{error}</p> 
        ) : repositories.length === 0 ? (
          <p className="text-gray-500">No repositories found.</p>
        ) : (
           <div className="grid grid-cols-1 gap-6">
               {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
            {repositories.map((repo) => {
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
                  <Label className="text-gray-500">Published on: {repo.date_published}</Label>
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
                     <br></br>
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
      Visit the Link: 
                    <a
                      href={repo.url_repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline mt-2 block"
                    >
                      {repo.url_repository}
                    </a>
                    </Label>
                  </CardContent>

            
                  <div className="flex gap-2 p-4">
                  <Button onClick={() => setSelectedRepo(repo)}>Edit</Button>
                    <Button variant={"destructive"}>Delete</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      </div>
      <ModalAddRepository open={open} onClose={() => setOpen(false)} 
         onSuccess={() => {
          fetchRepositories(); // Refresh the list
        }}
        > </ModalAddRepository>
      <ModalEditRepository
  open={!!selectedRepo}
  onClose={() => setSelectedRepo(null)}
  repository={selectedRepo!}
  onSuccess={() => {
    fetchRepositories(); // Refresh the list
    setSelectedRepo(null);
  }}
/>
    </div>
  );
}
