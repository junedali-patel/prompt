
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen, Info, Lightbulb, ThumbsUp } from "lucide-react";
import { AppSidebar } from '@/components/AppSidebar';

const Learning = () => {
  const learningResources = [
    {
      title: "Getting Started with Prompts",
      description: "Learn the basics of writing effective prompts for AI systems",
      icon: BookOpen,
      tips: [
        "Be specific about what you want",
        "Include context and relevant details",
        "Use clear, unambiguous language",
        "Specify the format you want for the response",
        "Break complex tasks into simpler steps"
      ]
    },
    {
      title: "Advanced Prompt Techniques",
      description: "Take your prompts to the next level with these advanced strategies",
      icon: Lightbulb,
      tips: [
        "Use 'chain of thought' prompting for complex reasoning",
        "Try 'few-shot' prompting with examples",
        "Experiment with role-playing prompts",
        "Use system messages to set the behavior",
        "Include specific constraints for better results"
      ]
    },
    {
      title: "Best Practices",
      description: "Expert recommendations for getting the most from AI systems",
      icon: ThumbsUp,
      tips: [
        "Start with a clear goal in mind",
        "Iterate and refine your prompts",
        "Keep a library of effective prompts",
        "Learn from unsuccessful attempts",
        "Share and collaborate with others"
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="container mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Prompt Learning Center</h1>
            <p className="text-muted-foreground">Learn how to create effective prompts for AI systems</p>
          </header>

          {/* Learning resources */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningResources.map((resource, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <resource.icon className="h-5 w-5" />
                    <CardTitle>{resource.title}</CardTitle>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional learning section */}
          <Card className="mt-8">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <CardTitle>Did You Know?</CardTitle>
              </div>
              <CardDescription>Interesting facts about AI and prompt engineering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <p>
                  The way you phrase a prompt can dramatically change the output you receive from an AI. 
                  This field of study is known as "prompt engineering" and has become increasingly 
                  important as large language models have become more powerful and widespread.
                </p>
                <p>
                  Different AI systems may respond better to different prompting styles. What works 
                  well for one model might not be as effective for another. Experimentation is key!
                </p>
                <p>
                  Some researchers believe that as AI systems continue to advance, the importance of 
                  prompt engineering might diminish, as models become better at understanding natural 
                  language and user intent.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Learning;
