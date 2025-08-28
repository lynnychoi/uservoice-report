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
  CardFooter,
  Navigation,
  NavigationItem,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@/lib/components";
import { 
  Copy, 
  Check, 
  Play, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Sun, 
  Moon,
  Search,
  User,
  Mail,
  Home,
  Settings,
  ChevronRight
} from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { Header } from "@/components/header";

const ComponentPreview = ({ 
  title, 
  description, 
  children, 
  code 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode; 
  code: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-md mx-auto';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b border-gray-100">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          
          {/* Mobile Controls */}
          <div className="flex justify-between items-center">
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 ${viewMode === 'desktop' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 ${viewMode === 'tablet' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 ${viewMode === 'mobile' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 border rounded-lg text-gray-500 hover:bg-gray-50"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-2 border rounded-lg text-gray-500 hover:bg-gray-50 transition-colors text-sm"
              >
                <span>Code</span>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center gap-2">
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 ${viewMode === 'desktop' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`p-2 ${viewMode === 'tablet' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 ${viewMode === 'mobile' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 border rounded-lg text-gray-500 hover:bg-gray-50"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-2 border rounded-lg text-gray-500 hover:bg-gray-50 transition-colors text-sm"
              >
                <span>Code</span>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      
      <div className={`p-4 md:p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} min-h-[200px] flex items-center justify-center`}>
        <div className={getViewportClass()}>
          <div className={theme === 'dark' ? 'dark' : ''}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ComponentsPage() {
  const [activeSection, setActiveSection] = useState("buttons");

  const sections = [
    { id: "buttons", label: "Buttons" },
    { id: "inputs", label: "Inputs" },
    { id: "cards", label: "Cards" },
    { id: "navigation", label: "Navigation" },
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
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <div className="border-b bg-white sticky top-[65px] z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Components</h1>
              <p className="text-gray-600">재사용 가능한 UI 컴포넌트 라이브러리</p>
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
        <section id="buttons" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Button</h2>
            <p className="text-gray-600">사용자 액션을 트리거하는 기본 버튼 컴포넌트</p>
          </div>

          <div className="space-y-8">
            {/* Default Variants */}
            <ComponentPreview
              title="Button Variants"
              description="다양한 스타일의 버튼 변형"
              code={`<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>`}
            >
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </ComponentPreview>

            {/* Button Sizes */}
            <ComponentPreview
              title="Button Sizes"
              description="다양한 크기의 버튼"
              code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </ComponentPreview>

            {/* Button States */}
            <ComponentPreview
              title="Button States"
              description="버튼의 다양한 상태"
              code={`<Button>Normal</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>`}
            >
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </ComponentPreview>

            {/* Full Width Button */}
            <ComponentPreview
              title="Full Width Button"
              description="전체 너비를 차지하는 버튼"
              code={`<Button fullWidth>Full Width Button</Button>`}
            >
              <Button fullWidth>Full Width Button</Button>
            </ComponentPreview>

            {/* Icon Buttons */}
            <ComponentPreview
              title="Icon Buttons"
              description="아이콘이 포함된 버튼"
              code={`<Button leftIcon={<Play />}>Play Video</Button>
<Button rightIcon={<ArrowRight />}>Continue</Button>
<Button size="icon">
  <Play />
</Button>`}
            >
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<Play className="w-4 h-4" />}>Play Video</Button>
                <Button rightIcon={<Play className="w-4 h-4" />}>Continue</Button>
                <Button size="icon">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </ComponentPreview>
          </div>
        </section>

        {/* Inputs Section */}
        <section id="inputs" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Input</h2>
            <p className="text-gray-600">사용자 입력을 받는 폼 컴포넌트</p>
          </div>

          <div className="space-y-8">
            {/* Input Variants */}
            <ComponentPreview
              title="Input Variants"
              description="다양한 스타일의 입력 필드"
              code={`<Input placeholder="기본 입력" />
<Input variant="error" placeholder="에러 상태" />
<Input variant="success" placeholder="성공 상태" />`}
            >
              <div className="space-y-4 w-full max-w-md">
                <Input placeholder="기본 입력" />
                <Input variant="error" placeholder="에러 상태" />
                <Input variant="success" placeholder="성공 상태" />
              </div>
            </ComponentPreview>

            {/* Input Sizes */}
            <ComponentPreview
              title="Input Sizes"
              description="다양한 크기의 입력 필드"
              code={`<Input inputSize="sm" placeholder="Small" />
<Input inputSize="default" placeholder="Default" />
<Input inputSize="lg" placeholder="Large" />`}
            >
              <div className="space-y-4 w-full max-w-md">
                <Input inputSize="sm" placeholder="Small" />
                <Input inputSize="default" placeholder="Default" />
                <Input inputSize="lg" placeholder="Large" />
              </div>
            </ComponentPreview>

            {/* Input with Icons */}
            <ComponentPreview
              title="Input with Icons"
              description="아이콘이 포함된 입력 필드"
              code={`<Input leftIcon={<Search />} placeholder="검색..." />
<Input leftIcon={<User />} placeholder="사용자명" />
<Input leftIcon={<Mail />} type="email" placeholder="이메일" />`}
            >
              <div className="space-y-4 w-full max-w-md">
                <Input leftIcon={<Search className="w-4 h-4" />} placeholder="검색..." />
                <Input leftIcon={<User className="w-4 h-4" />} placeholder="사용자명" />
                <Input leftIcon={<Mail className="w-4 h-4" />} type="email" placeholder="이메일" />
              </div>
            </ComponentPreview>

            {/* Password Input */}
            <ComponentPreview
              title="Password Input"
              description="비밀번호 표시/숨기기 기능"
              code={`<Input type="password" placeholder="비밀번호" />
<Input 
  type="password" 
  label="비밀번호" 
  placeholder="비밀번호를 입력하세요"
  helperText="8자 이상 입력해주세요"
/>`}
            >
              <div className="space-y-4 w-full max-w-md">
                <Input type="password" placeholder="비밀번호" />
                <Input 
                  type="password" 
                  label="비밀번호" 
                  placeholder="비밀번호를 입력하세요"
                  helperText="8자 이상 입력해주세요"
                />
              </div>
            </ComponentPreview>

            {/* Input with Labels */}
            <ComponentPreview
              title="Input with Labels & Messages"
              description="라벨과 도움말 텍스트가 있는 입력 필드"
              code={`<Input 
  label="이름" 
  placeholder="이름을 입력하세요" 
  helperText="실명을 입력해주세요"
/>
<Input 
  label="이메일" 
  type="email" 
  placeholder="email@example.com" 
  errorMessage="올바른 이메일 형식이 아닙니다"
/>`}
            >
              <div className="space-y-4 w-full max-w-md">
                <Input 
                  label="이름" 
                  placeholder="이름을 입력하세요" 
                  helperText="실명을 입력해주세요"
                />
                <Input 
                  label="이메일" 
                  type="email" 
                  placeholder="email@example.com" 
                  errorMessage="올바른 이메일 형식이 아닙니다"
                />
              </div>
            </ComponentPreview>
          </div>
        </section>

        {/* Cards Section */}
        <section id="cards" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Card</h2>
            <p className="text-gray-600">콘텐츠를 그룹화하는 카드 컴포넌트</p>
          </div>

          <div className="space-y-8">
            {/* Card Variants */}
            <ComponentPreview
              title="Card Variants"
              description="다양한 스타일의 카드"
              code={`<Card variant="default">
  <CardContent>기본 카드</CardContent>
</Card>
<Card variant="outline">
  <CardContent>아웃라인 카드</CardContent>  
</Card>
<Card variant="elevated">
  <CardContent>엘레베이티드 카드</CardContent>
</Card>`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Card variant="default">
                  <CardContent>기본 카드</CardContent>
                </Card>
                <Card variant="outline">
                  <CardContent>아웃라인 카드</CardContent>  
                </Card>
                <Card variant="elevated">
                  <CardContent>엘레베이티드 카드</CardContent>
                </Card>
              </div>
            </ComponentPreview>

            {/* Card with Header */}
            <ComponentPreview
              title="Card with Header & Footer"
              description="헤더와 푸터가 있는 카드"
              code={`<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명입니다.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>카드의 본문 내용입니다.</p>
  </CardContent>
  <CardFooter>
    <Button>액션</Button>
  </CardFooter>
</Card>`}
            >
              <div className="w-full max-w-md mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>카드 제목</CardTitle>
                    <CardDescription>카드 설명입니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>카드의 본문 내용입니다. 여기에 다양한 콘텐츠를 넣을 수 있습니다.</p>
                  </CardContent>
                  <CardFooter>
                    <Button>액션</Button>
                  </CardFooter>
                </Card>
              </div>
            </ComponentPreview>

            {/* Product Card Example */}
            <ComponentPreview
              title="Product Card Example"
              description="실제 사용 예시 - 제품 카드"
              code={`<Card variant="elevated">
  <CardHeader>
    <CardTitle>채널톡 스타터</CardTitle>
    <CardDescription>소규모 팀을 위한 기본 플랜</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold">무료</div>
    <ul className="mt-4 space-y-2 text-sm">
      <li>• 월 1,000명 방문자</li>
      <li>• 기본 상담 기능</li>
      <li>• 이메일 지원</li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button fullWidth>시작하기</Button>
  </CardFooter>
</Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>채널톡 스타터</CardTitle>
                    <CardDescription>소규모 팀을 위한 기본 플랜</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">무료</div>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      <li>• 월 1,000명 방문자</li>
                      <li>• 기본 상담 기능</li>
                      <li>• 이메일 지원</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button fullWidth>시작하기</Button>
                  </CardFooter>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </section>

        {/* Navigation Section */}
        <section id="navigation" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Navigation</h2>
            <p className="text-gray-600">페이지 간 이동을 도와주는 네비게이션 컴포넌트</p>
          </div>

          <div className="space-y-8">
            {/* Navigation Variants */}
            <ComponentPreview
              title="Navigation Variants"
              description="다양한 스타일의 네비게이션"
              code={`<Navigation variant="default">
  <NavigationItem active>홈</NavigationItem>
  <NavigationItem>서비스</NavigationItem>
  <NavigationItem>회사소개</NavigationItem>
</Navigation>`}
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">기본 스타일</h4>
                  <Navigation variant="default">
                    <NavigationItem active>홈</NavigationItem>
                    <NavigationItem>서비스</NavigationItem>
                    <NavigationItem>회사소개</NavigationItem>
                    <NavigationItem>연락처</NavigationItem>
                  </Navigation>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">필 스타일</h4>
                  <Navigation variant="pills">
                    <NavigationItem variant="pills" active>홈</NavigationItem>
                    <NavigationItem variant="pills">서비스</NavigationItem>
                    <NavigationItem variant="pills">회사소개</NavigationItem>
                    <NavigationItem variant="pills">연락처</NavigationItem>
                  </Navigation>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">언더라인 스타일</h4>
                  <Navigation variant="underline">
                    <NavigationItem variant="underline" active>홈</NavigationItem>
                    <NavigationItem variant="underline">서비스</NavigationItem>
                    <NavigationItem variant="underline">회사소개</NavigationItem>
                    <NavigationItem variant="underline">연락처</NavigationItem>
                  </Navigation>
                </div>
              </div>
            </ComponentPreview>

            {/* Vertical Navigation */}
            <ComponentPreview
              title="Vertical Navigation"
              description="세로 방향 네비게이션"
              code={`<Navigation orientation="vertical">
  <NavigationItem leftIcon={<Home />} active>대시보드</NavigationItem>
  <NavigationItem leftIcon={<User />}>사용자</NavigationItem>
  <NavigationItem leftIcon={<Settings />}>설정</NavigationItem>
</Navigation>`}
            >
              <div className="w-48">
                <Navigation orientation="vertical">
                  <NavigationItem active className="justify-start">
                    <Home className="w-4 h-4 mr-2" />
                    대시보드
                  </NavigationItem>
                  <NavigationItem className="justify-start">
                    <User className="w-4 h-4 mr-2" />
                    사용자
                  </NavigationItem>
                  <NavigationItem className="justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    설정
                  </NavigationItem>
                </Navigation>
              </div>
            </ComponentPreview>

            {/* Breadcrumb */}
            <ComponentPreview
              title="Breadcrumb"
              description="현재 위치를 표시하는 경로 네비게이션"
              code={`<BreadcrumbList>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">홈</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/products">제품</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <span>채널톡</span>
  </BreadcrumbItem>
</BreadcrumbList>`}
            >
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">제품</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <span className="text-gray-900 font-medium">채널톡</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </ComponentPreview>
          </div>
        </section>
      </div>
    </div>
  );
}