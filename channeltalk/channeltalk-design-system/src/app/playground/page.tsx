"use client";

import { useState, useEffect } from "react";
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/lib/components";
import { Header } from "@/components/header";
import { 
  Play, 
  Palette, 
  Type, 
  Layout,
  Mail,
  Lock,
  Search
} from "lucide-react";

// 미니 컴포넌트 테스터들
const ButtonPlayground = () => {
  const [variant, setVariant] = useState<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'>('default');
  const [size, setSize] = useState<'default' | 'sm' | 'lg'>('default');
  const [disabled, setDisabled] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Button Playground</CardTitle>
        <CardDescription>버튼의 다양한 상태를 실시간으로 테스트해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
              <select 
                value={variant} 
                onChange={(e) => setVariant(e.target.value as 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="default">Default</option>
                <option value="destructive">Destructive</option>
                <option value="outline">Outline</option>
                <option value="secondary">Secondary</option>
                <option value="ghost">Ghost</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select 
                value={size} 
                onChange={(e) => setSize(e.target.value as 'default' | 'sm' | 'lg')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="sm">Small</option>
                <option value="default">Default</option>
                <option value="lg">Large</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center space-x-2 mt-6">
                <input 
                  type="checkbox" 
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Disabled</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="flex justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <Button 
              variant={variant} 
              size={size} 
              disabled={disabled}
            >
              <Play className="w-4 h-4 mr-2" />
              테스트 버튼
            </Button>
          </div>

          {/* Code */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-gray-400 mb-2">{/* 생성된 코드 */}생성된 코드:</div>
            {`<Button 
  variant="${variant}"
  size="${size}"${disabled ? '\n  disabled' : ''}
>
  <Play className="w-4 h-4 mr-2" />
  테스트 버튼
</Button>`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InputPlayground = () => {
  const [type, setType] = useState<'text' | 'password' | 'email'>('text');
  const [placeholder, setPlaceholder] = useState('여기에 입력하세요...');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Playground</CardTitle>
        <CardDescription>인풋의 다양한 상태를 실시간으로 테스트해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value as 'text' | 'password' | 'email')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="text">Text</option>
                <option value="password">Password</option>
                <option value="email">Email</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder</label>
              <input
                type="text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Disabled</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={error}
                  onChange={(e) => setError(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Error State</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="flex justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <div className="w-full max-w-md">
              <Input 
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                errorMessage={error ? "오류가 발생했습니다." : undefined}
                leftIcon={type === 'email' ? <Mail className="w-4 h-4" /> : type === 'password' ? <Lock className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              />
            </div>
          </div>

          {/* Code */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-gray-400 mb-2">{/* 생성된 코드 */}생성된 코드:</div>
            {`<Input 
  type="${type}"
  placeholder="${placeholder}"${disabled ? '\n  disabled' : ''}${error ? '\n  errorMessage="오류가 발생했습니다."' : ''}
  leftIcon={<${type === 'email' ? 'Mail' : type === 'password' ? 'Lock' : 'Search'} className="w-4 h-4" />}
/>`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CardPlayground = () => {
  const [variant, setVariant] = useState<'default' | 'elevated'>('default');
  const [hasHeader, setHasHeader] = useState(true);
  const [hasFooter, setHasFooter] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Playground</CardTitle>
        <CardDescription>카드 컴포넌트의 다양한 구성을 테스트해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
              <select 
                value={variant} 
                onChange={(e) => setVariant(e.target.value as 'default' | 'elevated')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="default">Default</option>
                <option value="elevated">Elevated</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center space-x-2 mt-6">
                <input 
                  type="checkbox" 
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Header</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center space-x-2 mt-6">
                <input 
                  type="checkbox" 
                  checked={hasFooter}
                  onChange={(e) => setHasFooter(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Footer</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="flex justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100">
            <div className="w-full max-w-md">
              <Card variant={variant}>
                {hasHeader && (
                  <CardHeader>
                    <CardTitle>샘플 카드</CardTitle>
                    <CardDescription>이것은 테스트용 카드 컴포넌트입니다.</CardDescription>
                  </CardHeader>
                )}
                <CardContent>
                  <p className="text-gray-600">
                    카드의 본문 내용입니다. 여기에는 다양한 콘텐츠가 들어갈 수 있습니다.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">상태:</span>
                      <span className="text-green-600 font-medium">활성</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">유형:</span>
                      <span className="text-gray-900">{variant}</span>
                    </div>
                  </div>
                </CardContent>
                {hasFooter && (
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">취소</Button>
                    <Button size="sm">확인</Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>

          {/* Code */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-gray-400 mb-2">{/* 생성된 코드 */}생성된 코드:</div>
            {`<Card variant="${variant}">
${hasHeader ? `  <CardHeader>
    <CardTitle>샘플 카드</CardTitle>
    <CardDescription>이것은 테스트용 카드 컴포넌트입니다.</CardDescription>
  </CardHeader>` : ''}
  <CardContent>
    <p>카드의 본문 내용입니다...</p>
  </CardContent>
${hasFooter ? `  <CardFooter>
    <Button variant="outline" size="sm">취소</Button>
    <Button size="sm">확인</Button>
  </CardFooter>` : ''}
</Card>`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function PlaygroundPage() {
  const [activeSection, setActiveSection] = useState("buttons");

  const sections = [
    { id: "buttons", label: "Buttons" },
    { id: "inputs", label: "Inputs" },
    { id: "cards", label: "Cards" },
  ];

  const handleSectionClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 스크롤에 따른 섹션 감지 (시각적 표시만)
  useEffect(() => {
    const sectionElements = sections.map(section => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];
    
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let currentSection = '';
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            currentSection = entry.target.id;
          }
        });
        
        if (currentSection) {
          setActiveSection(currentSection);
        }
      },
      {
        rootMargin: "-150px 0px -50% 0px",
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
      }
    );

    sectionElements.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [sections]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <div className="border-b bg-white sticky top-[65px] z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Playground</h1>
              <p className="text-gray-600">컴포넌트를 실시간으로 테스트하고 커스터마이즈해보세요</p>
            </div>
            
            {/* Mini-map Navigation */}
            <nav className="flex flex-col gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className="group flex items-center gap-3 text-right"
                >
                  <span className={`text-xs font-medium transition-colors ${
                    activeSection === section.id 
                      ? "text-primary-600" 
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}>
                    {section.label}
                  </span>
                  <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    activeSection === section.id 
                      ? "bg-primary-600 scale-125" 
                      : "bg-gray-300 group-hover:bg-gray-400"
                  }`} />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pr-16">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">인터랙티브 컴포넌트 테스트</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            실시간으로 컴포넌트의 속성을 변경하고 결과를 확인하세요. 
            생성된 코드를 복사해서 바로 프로젝트에서 사용할 수 있습니다.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">실시간 미리보기</h3>
            <p className="text-sm text-gray-600">속성을 변경하면 즉시 결과를 확인할 수 있습니다</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Type className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">코드 생성</h3>
            <p className="text-sm text-gray-600">설정에 맞는 코드가 자동으로 생성됩니다</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Layout className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">다양한 조합</h3>
            <p className="text-sm text-gray-600">모든 속성과 상태를 자유롭게 조합해보세요</p>
          </div>
        </div>

        {/* Button Playground */}
        <section id="buttons" className="mb-16">
          <ButtonPlayground />
        </section>

        {/* Input Playground */}
        <section id="inputs" className="mb-16">
          <InputPlayground />
        </section>

        {/* Card Playground */}
        <section id="cards" className="mb-16">
          <CardPlayground />
        </section>
      </div>
    </div>
  );
}