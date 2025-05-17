"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
//import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { FileUploader } from './file-uploader';
import { LanguageSelector } from './language-selector';
import { OutputFormatSelector } from './output-format-selector';

// Mock translation process for demonstration
const mockTranslate = (file: File, languages: string[], format: string) => {
  return new Promise<void>((resolve) => {
    const totalTime = 5000; // 5 seconds
    const interval = 100; // Update every 100ms
    let progress = 0;
    
    const timer = setInterval(() => {
      progress += (interval / totalTime) * 100;
      
      if (progress >= 100) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });
};

export function UploadTranslatePanel() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [outputFormat, setOutputFormat] = useState<string>('json');
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleFileSelected = (selectedFile: File) => {
    // Check file extension
    const validExtensions = ['.json', '.xml', '.resw', '.pages'];
    const extension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (!validExtensions.includes(extension)) {
      // toast({
      //   title: "Invalid file format",
      //   description: "Please upload a .json, .xml, .resw, or .pages file.",
      //   variant: "destructive"
      // });
      return;
    }
    
    setFile(selectedFile);
  };
  
  const removeFile = () => {
    setFile(null);
  };
  
  const startTranslation = async () => {
    if (!file) {
      // toast({
      //   title: "No file selected",
      //   description: "Please upload a file to translate.",
      //   variant: "destructive"
      // });
      return;
    }
    
    if (selectedLanguages.length === 0) {
      // toast({
      //   title: "No languages selected",
      //   description: "Please select at least one target language.",
      //   variant: "destructive"
      // });
      return;
    }
    
    try {
      setIsTranslating(true);
      
      // Simulate translation process with progress
      const totalTime = 5000; // 5 seconds
      const interval = 100; // Update every 100ms
      let currentProgress = 0;
      
      const progressTimer = setInterval(() => {
        currentProgress += (interval / totalTime) * 100;
        setProgress(Math.min(currentProgress, 99)); // Max at 99% until complete
        
        if (currentProgress >= 100) {
          clearInterval(progressTimer);
        }
      }, interval);
      
      // Simulate the actual translation
      await mockTranslate(file, selectedLanguages, outputFormat);
      
      // Complete the progress
      setProgress(100);
      
      // Show success message
      // toast({
      //   title: "Translation complete",
      //   description: `Your file has been translated to ${selectedLanguages.length} languages.`,
      // });
      
      // Simulate download trigger
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob(['Simulated ZIP file content'], { type: 'application/zip' }));
        a.download = `translations_${file.name.split('.')[0]}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Reset state
        setIsTranslating(false);
        setProgress(0);
      }, 1000);
      
    } catch (error) {
      console.error('Translation error:', error);
      // toast({
      //   title: "Translation failed",
      //   description: "An error occurred during translation. Please try again.",
      //   variant: "destructive"
      // });
      setIsTranslating(false);
      setProgress(0);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Upload File</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a file containing key-value pairs to translate.
                </p>
                
                {file ? (
                  <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="flex-shrink-0 bg-background rounded-md p-2">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                      disabled={isTranslating}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <FileUploader onFileSelected={handleFileSelected} disabled={isTranslating} />
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Output Format</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose the format for your translated files.
                </p>
                <OutputFormatSelector
                  value={outputFormat}
                  onChange={setOutputFormat}
                  disabled={isTranslating}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Select Target Languages</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose the languages you want to translate your content into.
                </p>
                
                <LanguageSelector
                  selectedLanguages={selectedLanguages}
                  onChange={setSelectedLanguages}
                  disabled={isTranslating}
                />
              </div>
              
              {isTranslating ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Translation in progress...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This may take a few moments depending on the file size and number of languages.
                  </p>
                </div>
              ) : (
                <Button 
                  className="w-full"
                  size="lg"
                  disabled={!file || selectedLanguages.length === 0 || isTranslating}
                  onClick={startTranslation}
                >
                  Translate Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {selectedLanguages.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Translation Summary</h3>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="font-medium text-sm">Target Languages:</div>
                {selectedLanguages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium text-sm">Source File:</div>
                <span className="text-sm">{file?.name || 'No file selected'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium text-sm">Output Format:</div>
                <span className="text-sm uppercase">{outputFormat}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}