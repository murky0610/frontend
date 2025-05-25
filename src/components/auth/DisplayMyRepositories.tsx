'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { displayUserRepositories, deleteMyRepository } from '@/api/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Scale,
  BookOpen,
  GraduationCap,
  Boxes,
  HandCoins,
  Cpu,
  Coffee,
  Banana,
  Bean,
  UserRoundPen,
} from 'lucide-react';
import ModalAddRepository from '@/components/modal/ModalAddRepository';
import { Separator } from '@/components/ui/separator';
import { RepositoryInterface } from '@/interface/repository.interface';
import ModalEditRepository from '@/components/modal/ModalEditRepostory';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
const categoryIcons = {
  //required only one
  'Policy Brief': Scale,
  Paper: BookOpen,
  'Research Project': GraduationCap,
};

const focusIcons = {
  //non required but many
  Clustering: Boxes,
  'Value Adding': HandCoins,
  Technology: Cpu,
};

const commodityIcons = {
  //non required but many
  Cacao: Bean,
  Coffee: Coffee,
  'Cavendish Banana': Banana,
};

interface DisplayMyRepositoriesProps {
  userId?: number;
}

export function DisplayMyRepositories({ userId }: DisplayMyRepositoriesProps) {
  console.log('this is the UserId: ', userId);
  const [repositories, setRepositories] = useState<RepositoryInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryInterface | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});

  // Fetch repositories function
  const fetchRepositories = async () => {
    try {
      const data = await displayUserRepositories(userId);
      if (Array.isArray(data)) {
        setRepositories(data);
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (err) {
      console.error('Error fetching repositories:', err);
      setError('Failed to load repositories.');
    }
  };
  const toggleDescription = (repoId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [repoId]: !prev[repoId],
    }));
  };

  useEffect(() => {
    if (userId === undefined || userId === null) return; // Don't run until userId is available
    fetchRepositories();
  }, [userId]);

  return (
    <div className="flex items-center max-w-screen p-5">
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between max-w-screen p-5">
            <div className="w-full mr-10 my-4 p-4 rounded-xl bg-gradient-to-r from-[#f0f4ff] to-[#f9faff] border border-blue-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                Take Charge of Your Repositories
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Easily manage your submitted research projects, policy briefs, and partner papers —
                review, refine, or add new entries anytime to keep your contributions up to date and
                impactful.
              </p>
            </div>

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
                const CategoryIcon =
                  categoryIcons[repo.select_category as keyof typeof categoryIcons];
                const FocusIcon = focusIcons[repo.select_focus as keyof typeof focusIcons];
                const CommodityIcon =
                  commodityIcons[repo.select_commodity as keyof typeof commodityIcons];
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
                          {isExpanded
                            ? repo.description
                            : `${repo.description.substring(0, 150)}...`}
                        </p>
                        {repo.description.length > 150 && (
                          <button
                            onClick={() => toggleDescription(repo.id.toString())}
                            className="text-blue-600 hover:underline text-sm mt-1"
                          >
                            {isExpanded ? '[See Less]' : '[See More]'}
                          </button>
                        )}
                      </div>
                    </CardContent>
                    <CardContent>
                      <Label>
                        Visit the Link:
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

                    <div className="flex gap-2 p-4">
                      <Button onClick={() => setSelectedRepo(repo)}>Edit</Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={'destructive'}>Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              repository and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                try {
                                  await deleteMyRepository(repo.id);
                                  fetchRepositories(); // Refresh list after deletion
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <ModalAddRepository
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          fetchRepositories(); // Refresh the list
        }}
      >
        {' '}
      </ModalAddRepository>
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
