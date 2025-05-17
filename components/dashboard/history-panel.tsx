"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Download, FileText, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
//import { toast } from '@/components/ui/use-toast';

// Mock data for translation history
const mockTranslations = [
  {
    id: '1',
    fileName: 'app-strings.json',
    uploadDate: new Date(2025, 0, 15),
    expiryDate: new Date(2025, 1, 14),
    languages: ['French (France)', 'German (Germany)', 'Spanish (Spain)'],
    outputFormat: 'json',
    fileSize: '34.5 KB',
  },
  {
    id: '2',
    fileName: 'website-content.xml',
    uploadDate: new Date(2025, 0, 10),
    expiryDate: new Date(2025, 1, 9),
    languages: ['Japanese (Japan)', 'Korean (South Korea)', 'Chinese (Simplified, China)'],
    outputFormat: 'xml',
    fileSize: '127.3 KB',
  },
  {
    id: '3',
    fileName: 'product-descriptions.resw',
    uploadDate: new Date(2025, 0, 5),
    expiryDate: new Date(2025, 1, 4),
    languages: ['Italian (Italy)', 'Portuguese (Brazil)', 'Dutch (Netherlands)'],
    outputFormat: 'resw',
    fileSize: '56.8 KB',
  },
];

export function HistoryPanel() {
  const [translations, setTranslations] = useState(mockTranslations);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  const handleDownload = (id: string) => {
    // In a real app, this would trigger a download from the server
    // toast({
    //   title: "Download started",
    //   description: "Your translation package is being downloaded.",
    // });
  };
  
  const handleDelete = () => {
    if (itemToDelete) {
      setTranslations(translations.filter(t => t.id !== itemToDelete));
      // toast({
      //   title: "Translation deleted",
      //   description: "The translation has been deleted successfully.",
      // });
      setItemToDelete(null);
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate: Date) => {
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Translation History</CardTitle>
          <CardDescription>
            Your translated files are stored for 30 days from the translation date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {translations.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Languages</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Expires In</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {translations.map((item) => {
                    const daysLeft = getDaysUntilExpiry(item.expiryDate);
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="truncate max-w-[150px]">
                              {item.fileName}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.fileSize}
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDate(item.uploadDate)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline">
                              {item.languages.length} languages
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="uppercase">
                            {item.outputFormat}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={daysLeft < 7 ? "destructive" : "outline"}
                            className={daysLeft < 7 ? "" : "text-muted-foreground"}
                          >
                            {daysLeft} days
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDownload(item.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            
                            <AlertDialog open={itemToDelete === item.id} onOpenChange={(open) => {
                              if (!open) setItemToDelete(null);
                            }}>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  onClick={() => setItemToDelete(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Translation</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this translation? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No translations yet</h3>
              <p className="text-muted-foreground mt-1">
                Your translation history will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}