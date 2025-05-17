"use client";

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { LanguageSelector } from '@/components/dashboard/language-selector';
import { ArrowRight, Globe, Upload } from 'lucide-react';
import Link from 'next/link';
//import { motion } from 'framer-motion';

export function HeroSection() {
  const { login, isAuthenticated } = useAuth();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the selected JSON file here
      console.log('Selected file:', file);
    }
  };

  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Translate Your Files With{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 ml-2">
              AI Precision
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your content to multiple languages instantly while preserving your file structure. Upload once, download in any language.
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="group">
                  Start Translating
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" onClick={() => login()} className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
            <Link href="/features">
              <Button size="lg" variant="outline">
                See Features
              </Button>
            </Link>
          </div> */}

          {/* <div className="text-xs text-muted-foreground mt-4">
            No credit card required. Free plan available.
          </div> */}
        </div>

        {/* Mockup */}
        <div className="mt-16 relative">
          <div className="rounded-lg overflow-hidden shadow-2xl border">
            <div className="bg-muted border-b flex items-center p-4">
              <div className="flex space-x-2 absolute left-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="w-full text-center text-sm font-medium">Polyglot Translation Dashboard</div>
            </div>
            <div className="bg-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 bg-muted/50 rounded-lg p-4 border border-dashed border-muted-foreground/20 flex flex-col items-center justify-center text-center h-64">
                  <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="font-medium">Drag & drop your file here</p>
                  <p className="text-sm text-muted-foreground mt-1">JSON supported • XML, RESW, Pages upcoming</p>
                  <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </Button>
                </div>
                <div className="col-span-2 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Languages</label>
                    <LanguageSelector
                      selectedLanguages={selectedLanguages}
                      onChange={setSelectedLanguages}
                    />
                  </div>

                  <div className="space-y-2">
  <label className="text-sm font-medium">Output Format</label>
  <p className="text-xs text-muted-foreground mb-1">
    Currently, only <span className="font-semibold text-primary">JSON</span> output is available.<br />
    <span className="text-muted-foreground">Other formats are upcoming.</span>
  </p>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="flex items-center justify-center bg-secondary text-secondary-foreground rounded p-2 text-sm font-medium">
                        JSON
                      </div>
                      <div className="flex items-center justify-center bg-muted text-muted-foreground rounded p-2 text-sm">
                        XML
                      </div>
                      <div className="flex items-center justify-center bg-muted text-muted-foreground rounded p-2 text-sm">
                        RESW
                      </div>
                      <div className="flex items-center justify-center bg-muted text-muted-foreground rounded p-2 text-sm">
                        Pages
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Translate Now</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Shadow effect */}
          <div className="bg-primary/30 blur-3xl rounded-full h-32 w-2/3 absolute -bottom-16 left-1/2 transform -translate-x-1/2 -z-10"></div>
        </div>
      </div>
    </section>
  );
}