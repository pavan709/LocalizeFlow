"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UploadTranslatePanel } from "@/components/dashboard/upload-translate-panel";
import { HistoryPanel } from "@/components/dashboard/history-panel";

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <main className="flex-1 py-6">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
          
          <Tabs defaultValue="translate" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="translate">Translate</TabsTrigger>
              <TabsTrigger value="history">Translation History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="translate" className="space-y-6">
              <UploadTranslatePanel />
            </TabsContent>
            
            <TabsContent value="history" className="space-y-6">
              <HistoryPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}