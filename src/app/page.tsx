
'use client';

import {useState, useEffect} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {Switch} from '@/components/ui/switch';
import {useToast} from '@/hooks/use-toast';
import {Slider} from '@/components/ui/slider';
import {cn} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {
  generateChineseName,
  GenerateChineseNameInput,
  GenerateChineseNameOutput,
} from '@/ai/flows/generate-chinese-name';
import {
  generateEnglishName,
  GenerateEnglishNameInput,
  GenerateEnglishNameOutput,
} from '@/ai/flows/generate-english-name';
import {
  summarizeWebPage,
  SummarizeWebPageInput,
  SummarizeWebPageOutput,
} from '@/ai/flows/summarize-web-page';
import {
  translateEnglishToChinese,
  TranslateEnglishToChineseInput,
  TranslateEnglishToChineseOutput,
} from '@/ai/flows/translate-english-to-chinese';
import {Copy, Settings} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';

const AI_FUNCTIONS = [
  {value: 'CNGenerator', label: 'Chinese Name Generator'},
  {value: 'EnGenerator', label: 'English Name Generator'},
  {value: 'DocSummarizer', label: 'Document Summarizer'},
  {value: 'EnToZh', label: 'English to Chinese Translation'},
] as const;

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [aiFunction, setAiFunction] = useState(AI_FUNCTIONS[0].value);
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [defaultModelId, setDefaultModelId] = useState('');
  const [enGeneratorModelId, setEnGeneratorModelId] = useState('');
  const [docSummarizerModelId, setDocSummarizerModelId] = useState('');
  const [characterCount, setCharacterCount] = useState(0); // Character count state

  const {toast} = useToast();

  // Settings dialog state
  const [openSettings, setOpenSettings] = useState(false);

  // Function to update character count
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setCharacterCount(e.target.value.length); // Update character count
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseUrl(e.target.value);
  };

  const handleDefaultModelIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultModelId(e.target.value);
  };

  const handleEnGeneratorModelIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnGeneratorModelId(e.target.value);
  };

  const handleDocSummarizerModelIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocSummarizerModelId(e.target.value);
  };

  const callAiFunction = async () => {
    let apiResult = '';
    try {
      switch (aiFunction) {
        case 'CNGenerator':
          const cnInput: GenerateChineseNameInput = {prompt: inputText};
          const cnOutput: GenerateChineseNameOutput = await generateChineseName(cnInput);
          apiResult = cnOutput?.names?.join('\n') || 'No results';
          break;
        case 'EnGenerator':
          const enInput: GenerateEnglishNameInput = {prompt: inputText};
          const enOutput: GenerateEnglishNameOutput = await generateEnglishName(enInput);
          apiResult = enOutput?.names?.join('\n') || 'No results';
          break;
        case 'DocSummarizer':
          const dsInput: SummarizeWebPageInput = {url: inputText};
          const dsOutput: SummarizeWebPageOutput = await summarizeWebPage(dsInput);
          apiResult = dsOutput?.summary || 'No results';
          break;
        case 'EnToZh':
          const etInput: TranslateEnglishToChineseInput = {text: inputText};
          const etOutput: TranslateEnglishToChineseOutput = await translateEnglishToChinese(etInput);
          apiResult = etOutput?.translatedText || 'No results';
          break;
        default:
          apiResult = 'Invalid AI function selected.';
      }
      setResult(apiResult);
      setHistory([...history, `${aiFunction}: ${inputText} -> ${apiResult}`]);
    } catch (error: any) {
      console.error('API call failed:', error);
      apiResult = `API call failed: ${error.message}`;
      setResult(apiResult);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: 'Copied to clipboard!',
      description: 'The AI generated text has been copied to your clipboard.',
    });
  };

  useEffect(() => {
    // Apply dark mode class to the document body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={cn('min-h-screen bg-background p-4 dark:bg-dark', darkMode && 'dark')}>
      <div className="container mx-auto max-w-2xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>OmniGen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Settings Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4"/>
                  Settings
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">API Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure the OpenAI Compatible API settings.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="base-url">Base URL</Label>
                    <Input id="base-url" value={baseUrl} onChange={handleBaseUrlChange}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" type="password" value={apiKey} onChange={handleApiKeyChange}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="default-model">Default Model ID</Label>
                    <Input id="default-model" value={defaultModelId} onChange={handleDefaultModelIdChange}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="en-generator-model">EnGenerator Model ID</Label>
                    <Input id="en-generator-model" value={enGeneratorModelId} onChange={handleEnGeneratorModelIdChange}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="doc-summarizer-model">DocSummarizer Model ID</Label>
                    <Input id="doc-summarizer-model" value={docSummarizerModelId} onChange={handleDocSummarizerModelIdChange}/>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Direct Settings Access via Dialog */}
            <Dialog open={openSettings} onOpenChange={setOpenSettings}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4"/>
                  Open Settings Dialog
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
                  <DialogDescription>
                    Configure your API settings here.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="base-url">Base URL</Label>
                    <Input id="base-url" value={baseUrl} onChange={handleBaseUrlChange}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" type="password" value={apiKey} onChange={handleApiKeyChange}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="default-model">Default Model ID</Label>
                    <Input id="default-model" value={defaultModelId} onChange={handleDefaultModelIdChange}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="en-generator-model">EnGenerator Model ID</Label>
                    <Input id="en-generator-model" value={enGeneratorModelId} onChange={handleEnGeneratorModelIdChange}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="doc-summarizer-model">DocSummarizer Model ID</Label>
                    <Input id="doc-summarizer-model" value={docSummarizerModelId} onChange={handleDocSummarizerModelIdChange}/>
                  </div>
                </div>
                {/*<DialogFooter>
                 <Button type="submit">Save changes</Button>
                 </DialogFooter>*/}
              </DialogContent>
            </Dialog>

            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="input">Input Text ({characterCount}/100)</Label>
              <Textarea
                id="input"
                placeholder="Enter text (max 100 characters)"
                value={inputText}
                onChange={handleInputChange}
                className="resize-none"
                maxLength={100}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ai-function">AI Function</Label>
              <Select value={aiFunction} onValueChange={setAiFunction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an AI function"/>
                </SelectTrigger>
                <SelectContent>
                  {AI_FUNCTIONS.map((func) => (
                    <SelectItem key={func.value} value={func.value}>
                      {func.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={callAiFunction}>Process with AI</Button>
            <Separator/>
            <div className="grid gap-2">
              <Label>Result</Label>
              <Textarea
                readOnly
                value={result}
                className="resize-none bg-muted text-gray-800 dark:text-gray-200"
              />
            </div>
            <Button variant="secondary" onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4"/>
              Copy Result
            </Button>
            <Separator/>
            <div>
              <Label>History</Label>
              <ul className="list-none pl-0">
                {history.slice(-5).map((item, index) => (
                  <li key={index} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        <a
          href="https://example.com/webui"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Go to Web UI
        </a>
      </div>
    </div>
  );
}
