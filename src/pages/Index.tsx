
import { useState } from "react";
import { ContentProvider } from "@/context/ContentContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import PlatformSelector from "@/components/PlatformSelector";
import ContentForm from "@/components/ContentForm";
import ContentOutput from "@/components/ContentOutput";
import ContentPreview from "@/components/ContentPreview";
import ContentHistory from "@/components/ContentHistory";

const Index = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <ContentProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="create">Create Content</TabsTrigger>
              <TabsTrigger value="history">Content History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-background rounded-lg border p-6">
                    <h2 className="text-2xl font-bold mb-6">Content Generator</h2>
                    <PlatformSelector />
                    <ContentForm />
                  </div>
                  
                  <div className="bg-background rounded-lg border p-6">
                    <h2 className="text-2xl font-bold mb-6">Generated Content</h2>
                    <ContentOutput />
                  </div>
                </div>
                
                <div className="bg-background rounded-lg border p-6">
                  <ContentPreview />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <div className="bg-background rounded-lg border p-6">
                <h2 className="text-2xl font-bold mb-6">Content History</h2>
                <ContentHistory />
              </div>
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
    </ContentProvider>
  );
};

export default Index;
