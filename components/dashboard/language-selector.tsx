"use client";

import { useState } from 'react';
import { Check, ChevronsUpDown, Globe, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Comprehensive list of languages with regions
const languages = [
  { code: 'ar-SA', name: 'Arabic (Saudi Arabia)' },
  { code: 'cs-CZ', name: 'Czech (Czech Republic)' },
  { code: 'da-DK', name: 'Danish (Denmark)' },
  { code: 'de-DE', name: 'German (Germany)' },
  { code: 'de-AT', name: 'German (Austria)' },
  { code: 'de-CH', name: 'German (Switzerland)' },
  { code: 'el-GR', name: 'Greek (Greece)' },
  { code: 'en-US', name: 'English (United States)' },
  { code: 'en-GB', name: 'English (United Kingdom)' },
  { code: 'en-AU', name: 'English (Australia)' },
  { code: 'en-CA', name: 'English (Canada)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'es-MX', name: 'Spanish (Mexico)' },
  { code: 'es-AR', name: 'Spanish (Argentina)' },
  { code: 'fi-FI', name: 'Finnish (Finland)' },
  { code: 'fr-FR', name: 'French (France)' },
  { code: 'fr-CA', name: 'French (Canada)' },
  { code: 'fr-BE', name: 'French (Belgium)' },
  { code: 'fr-CH', name: 'French (Switzerland)' },
  { code: 'he-IL', name: 'Hebrew (Israel)' },
  { code: 'hi-IN', name: 'Hindi (India)' },
  { code: 'hu-HU', name: 'Hungarian (Hungary)' },
  { code: 'id-ID', name: 'Indonesian (Indonesia)' },
  { code: 'it-IT', name: 'Italian (Italy)' },
  { code: 'it-CH', name: 'Italian (Switzerland)' },
  { code: 'ja-JP', name: 'Japanese (Japan)' },
  { code: 'ko-KR', name: 'Korean (South Korea)' },
  { code: 'nl-NL', name: 'Dutch (Netherlands)' },
  { code: 'nl-BE', name: 'Dutch (Belgium)' },
  { code: 'no-NO', name: 'Norwegian (Norway)' },
  { code: 'pl-PL', name: 'Polish (Poland)' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)' },
  { code: 'ro-RO', name: 'Romanian (Romania)' },
  { code: 'ru-RU', name: 'Russian (Russia)' },
  { code: 'sk-SK', name: 'Slovak (Slovakia)' },
  { code: 'sv-SE', name: 'Swedish (Sweden)' },
  { code: 'th-TH', name: 'Thai (Thailand)' },
  { code: 'tr-TR', name: 'Turkish (Turkey)' },
  { code: 'uk-UA', name: 'Ukrainian (Ukraine)' },
  { code: 'vi-VN', name: 'Vietnamese (Vietnam)' },
  { code: 'zh-CN', name: 'Chinese (Simplified, China)' },
  { code: 'zh-TW', name: 'Chinese (Traditional, Taiwan)' },
];

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onChange: (languages: string[]) => void;
  disabled?: boolean;
}

export function LanguageSelector({ 
  selectedLanguages = [], 
  onChange,
  disabled = false
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);

  const toggleLanguage = (languageName: string) => {
    if (selectedLanguages.includes(languageName)) {
      onChange(selectedLanguages.filter(lang => lang !== languageName));
    } else {
      onChange([...selectedLanguages, languageName]);
    }
  };

  const removeLanguage = (languageName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedLanguages.filter(lang => lang !== languageName));
  };
  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              {selectedLanguages.length > 0 
                ? `${selectedLanguages.length} language${selectedLanguages.length > 1 ? 's' : ''} selected`
                : "Select languages..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
        <Command>
        <CommandInput placeholder="Search languages..." />
        <CommandEmpty>No language found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <ScrollArea className="h-[300px]">
              {languages.map((language) => (
                <CommandItem
                  key={language.code}
                  value={language.name}
                  onSelect={() => toggleLanguage(language.name)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedLanguages.includes(language.name) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {language.name}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </CommandList>
      </Command>
        </PopoverContent>
      </Popover>
      
      {selectedLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLanguages.map((language) => (
            <Badge 
              key={language} 
              variant="secondary"
              className="flex items-center gap-1"
            >
              {language}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={(e) => removeLanguage(language, e)}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}