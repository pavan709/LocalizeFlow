import { CheckCircle, Globe, Key, LanguagesIcon, MailCheck, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Multiple Languages",
    description: "Translate your content into numerous languages with a single click, enabling global reach."
  },
  {
    icon: <Key className="h-10 w-10 text-primary" />,
    title: "Preserve Structure",
    description: "Keep your file structure intact with only values translated, maintaining your code integrity."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Fast Processing",
    description: "Leverage the power of AI for quick translations of even complex, large-scale files."
  },
  {
    icon: <LanguagesIcon className="h-10 w-10 text-primary" />,
    title: "Format Flexibility",
    description: "Support for JSON, XML, RESW, and Pages formats for both input and output."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Secure & Private",
    description: "Your files are encrypted and automatically deleted after 30 days for maximum security."
  },
  {
    icon: <MailCheck className="h-10 w-10 text-primary" />,
    title: "Google Authentication",
    description: "Simple and secure sign-in with your Google account for convenient access."
  }
];

export function FeatureSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful Translation Features</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to translate your localization files quickly and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 bg-muted rounded-xl p-8 border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-tight">Ready to translate your files?</h3>
              <p className="text-muted-foreground">
                Join thousands of developers who trust Polyglot for their localization needs.
              </p>
              <ul className="text-sm space-y-2">
                {["Free tier available", "No credit card required", "Cancel anytime"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 justify-center md:justify-start">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-10 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90">
                Get Started Free
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-10 px-4 py-2 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80">
                View Pricing
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}